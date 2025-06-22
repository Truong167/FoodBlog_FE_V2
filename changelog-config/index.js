// changelog-config/index.js

const parserOpts = {
  // Regex của bạn để khớp với "type/scope: subject"
  headerPattern: /^(\w+)\/(\w+):\s(.+)$/,
  headerCorrespondence: ["type", "scope", "subject"],
  noteKeywords: ["BREAKING CHANGE"],
  // Regex để tìm các commit được tạo bởi standard-version/release
  // Đảm bảo nó cũng hiểu các commit release của chính standard-version
  revertPattern: /^revert:\s"?([\s\S]*?)"?\s*This reverts commit (\w*)\./,
  revertCorrespondence: [`header`, `hash`],
};

const writerOpts = {
  transform: (commit, context) => {
    // Nếu parser không phân tích được type, bỏ qua commit này
    if (!commit.type) {
      return;
    }

    // Ánh xạ type của bạn sang tên hiển thị trong changelog
    // Nếu bạn muốn hiển thị các type khác ngoài feat/fix, hãy thêm vào đây
    switch (commit.type) {
      case "feat":
        commit.type = "Features";
        break;
      case "fix":
        commit.type = "Bug Fixes";
        break;
      case "docs":
        commit.type = "Documentation";
        break;
      case "style":
        commit.type = "Styles";
        break;
      case "refactor":
        commit.type = "Code Refactoring";
        break;
      case "perf":
        commit.type = "Performance Improvements";
        break;
      case "test":
        commit.type = "Tests";
        break;
      case "build":
        commit.type = "Build System";
        break;
      case "ci":
        commit.type = "Continuous Integration";
        break;
      case "chore":
        // Các commit chore thường không hiển thị trong changelog chính
        // Trừ khi có breaking change
        if (commit.notes && commit.notes.length > 0) {
          commit.type = "Breaking Changes"; // Move chore with BREAKING CHANGE to a breaking section
          break;
        }
        return; // Bỏ qua các commit chore không có breaking change
      case "revert":
        commit.type = "Reverts";
        break;
      default:
        // Nếu có type không được định nghĩa, bạn có thể bỏ qua hoặc xử lý khác
        return;
    }

    // Nếu bạn muốn thêm scope vào subject trong changelog
    if (commit.scope && typeof commit.scope === "string") {
      commit.subject = `${commit.scope}: ${commit.subject}`;
    }

    return commit;
  },
  // Định nghĩa thứ tự hiển thị các loại trong changelog
  groupBy: "type",
  commitGroupsSort: (a, b) => {
    // Sắp xếp các nhóm theo thứ tự mong muốn
    const order = [
      "Features",
      "Bug Fixes",
      "Breaking Changes",
      "Performance Improvements",
      "Code Refactoring",
      "Reverts",
      "Documentation",
      "Styles",
      "Tests",
      "Build System",
      "Continuous Integration",
    ];
    const aIndex = order.indexOf(a.title);
    const bIndex = order.indexOf(b.title);

    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  },
  commitsSort: ["scope", "subject"],
};

// ĐÂY LÀ PHẦN QUAN TRỌNG NHẤT BẠN CẦN THÊM HOẶC SỬA
// Định nghĩa logic để standard-version quyết định khi nào thì bump major/minor/patch
const recommendedBumpOpts = {
  whatBump: (commits) => {
    let level = null; // 0 = major, 1 = minor, 2 = patch
    let breakings = 0;
    let features = 0;
    let fixes = 0;

    commits.forEach((commit) => {
      if (commit.notes && commit.notes.length > 0) {
        // Tìm BREAKING CHANGE
        breakings++;
        level = 0; // Major
      } else if (commit.type === "feat" || commit.type === "Features") {
        // Kiểm tra 'feat' (hoặc 'Features' nếu bạn đã map trong transform)
        features++;
        if (level === null || level > 1) {
          level = 1; // Minor
        }
      } else if (commit.type === "fix" || commit.type === "Bug Fixes") {
        // Kiểm tra 'fix' (hoặc 'Bug Fixes')
        fixes++;
        if (level === null || level > 2) {
          level = 2; // Patch
        }
      }
      // Các loại commit khác (docs, chore, refactor, v.v.) sẽ không bump version mặc định
    });

    return {
      level: level,
      reason: breakings
        ? `${breakings} breaking change(s)`
        : features
        ? `${features} new feature(s)`
        : fixes
        ? `${fixes} bug fix(es)`
        : null,
    };
  },
};

module.exports = Promise.resolve({
  parserOpts,
  writerOpts,
  recommendedBumpOpts, // Thêm recommendedBumpOpts vào export
});
