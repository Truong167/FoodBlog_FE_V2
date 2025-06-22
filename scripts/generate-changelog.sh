#!/bin/bash

# Cấu hình Git để commit tự động
git config user.name "CI/CD Bot"
git config user.email "ci-cd-bot@yourcompany.com"

# Lấy branch hiện tại (phù hợp với CI/CD environment variables nếu có)
# Đối với GitHub Actions: GITHUB_REF_NAME
# Đối với GitLab CI/CD: CI_COMMIT_BRANCH
# Nếu không trong CI/CD, có thể dùng: git rev-parse --abbrev-ref HEAD
CURRENT_BRANCH=${GITHUB_REF_NAME:-$(git rev-parse --abbrev-ref HEAD)}

# Chỉ xử lý nếu merge vào dev hoặc main
if [[ "$CURRENT_BRANCH" != "dev" && "$CURRENT_BRANCH" != "main" ]]; then
    echo "Không phải nhánh 'dev' hoặc 'main'. Bỏ qua cập nhật CHANGELOG."
    exit 0
fi

echo "Cập nhật CHANGELOG cho nhánh $CURRENT_BRANCH..."

# Lấy danh sách các commit từ lần cập nhật CHANGELOG gần nhất đến HEAD
# Hoặc lấy từ commit merge gần nhất nếu muốn
# Ở đây ta lấy tất cả các commit kể từ commit cuối cùng có message "docs: Cập nhật CHANGELOG tự động"
# hoặc từ đầu lịch sử nếu chưa có commit đó.
LAST_CHANGELOG_COMMIT=$(git log --grep="docs: Cập nhật CHANGELOG tự động" --format="%H" -1)

if [ -z "$LAST_CHANGELOG_COMMIT" ]; then
    # Nếu chưa có commit cập nhật CHANGELOG tự động, lấy từ commit đầu tiên của branch
    COMMITS_TO_PROCESS=$(git log --pretty=format:"%s" "$CURRENT_BRANCH")
else
    # Lấy các commit từ sau commit cập nhật CHANGELOG gần nhất đến HEAD
    COMMITS_TO_PROCESS=$(git log --pretty=format:"%s" "$LAST_CHANGELOG_COMMIT".."$CURRENT_BRANCH")
fi

# Tạo một file tạm để chứa các thay đổi mới
NEW_CHANGELOG_ENTRIES_FILE=$(mktemp)

echo -e "\n## $(date +%Y-%m-%d) - Merge vào $CURRENT_BRANCH" >> "$NEW_CHANGELOG_ENTRIES_FILE"

# Khai báo các mảng để lưu trữ các thay đổi theo type
declare -A CHANGES_BY_TYPE

# Duyệt qua từng commit message
while IFS= read -r COMMIT_MSG; do
    # Kiểm tra định dạng commit message
    if [[ "$COMMIT_MSG" =~ ^([a-zA-Z]+/[a-zA-Z0-9_-]+):[[:space:]](.*) ]]; then
        COMMIT_TYPE="${BASH_REMATCH[1]}"
        COMMIT_OBJECT="${BASH_REMATCH[2]}"

        # Trích xuất type (phần trước dấu '/')
        TYPE=$(echo "$COMMIT_TYPE" | cut -d'/' -f1)

        # Trích xuất object (phần sau dấu ':')
        OBJECT="$COMMIT_OBJECT"

        # Thêm vào mảng tương ứng
        if [[ -n "${CHANGES_BY_TYPE[$TYPE]}" ]]; then
            CHANGES_BY_TYPE[$TYPE]+="\n- $OBJECT"
        else
            CHANGES_BY_TYPE[$TYPE]="- $OBJECT"
        fi
    fi
done <<< "$COMMITS_TO_PROCESS"

# Ghi các nhóm thay đổi vào file tạm
for TYPE_KEY in "${!CHANGES_BY_TYPE[@]}"; do
    # Chuyển đổi type_key thành tiêu đề dễ đọc hơn (ví dụ: feat -> Features)
    case "$TYPE_KEY" in
        "feat") ECHO_TYPE="Features";;
        "fix") ECHO_TYPE="Bug Fixes";;
        "docs") ECHO_TYPE="Documentation";;
        "chore") ECHO_TYPE="Chores";;
        "refactor") ECHO_TYPE="Refactoring";;
        "perf") ECHO_TYPE="Performance Improvements";;
        "test") ECHO_TYPE="Tests";;
        *) ECHO_TYPE=$(echo "$TYPE_KEY" | sed 's/\b./\u&/g');; # Viết hoa chữ cái đầu
    esac

    echo -e "\n### $ECHO_TYPE" >> "$NEW_CHANGELOG_ENTRIES_FILE"
    echo -e "${CHANGES_BY_TYPE[$TYPE_KEY]}" >> "$NEW_CHANGELOG_ENTRIES_FILE"
done

# Đọc nội dung hiện tại của CHANGELOG.md (bỏ qua dòng tiêu đề # Changelog)
# và các dòng thông tin định dạng ban đầu
EXISTING_CHANGELOG=$(grep -v "^#" CHANGELOG.md | tail -n +5) # Bỏ qua 4 dòng đầu và dòng # Changelog

# Ghi lại tiêu đề ban đầu và nội dung mới, sau đó là nội dung cũ
echo "# Changelog" > CHANGELOG.md
echo -e "\nAll notable changes to this project will be documented in this file." >> CHANGELOG.md
echo -e "\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)," >> CHANGELOG.md
echo -e "and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n" >> CHANGELOG.md

cat "$NEW_CHANGELOG_ENTRIES_FILE" >> CHANGELOG1.md
echo -e "$EXISTING_CHANGELOG" >> CHANGELOG1.md # Dòng này sẽ thêm nội dung cũ vào cuối

# Xóa file tạm
rm "$NEW_CHANGELOG_ENTRIES_FILE"

# Add, commit và push CHANGELOG.md
git add CHANGELOG1.md
git commit -m "docs: Cập nhật CHANGELOG tự động sau merge vào $CURRENT_BRANCH" || echo "Không có thay đổi để commit."
git push

echo "CHANGELOG1.md đã được cập nhật thành công."