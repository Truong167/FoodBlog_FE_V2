// changelog-config/index.js

const parserOpts = {
  // Regex để phân tích commit message của bạn
  // Ví dụ: "feat/user: add login flow"
  headerPattern: /^(\w+)\/(\w+):\s(.+)$/,
  headerCorrespondence: ["type", "scope", "subject"],
  // Regex để tìm Breaking Changes trong body hoặc footer
  noteKeywords: ["BREAKING CHANGE"],
  // Các kiểu commit mà bạn muốn hiển thị trong changelog
  // (ví dụ: 'feat' -> Features, 'fix' -> Bug Fixes)
  // Các type khác sẽ không được đưa vào changelog theo mặc định
};

const writerOpts = {
  transform: (commit, context) => {
    // Nếu bạn muốn bỏ qua một số commit không có type bạn quan tâm
    if (commit.type === null) {
      return;
    }

    // Ánh xạ type của bạn thành tên hiển thị trong changelog
    // Đây là nơi bạn định nghĩa "type" của mình sẽ hiển thị như thế nào
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
        // Nếu bạn muốn bỏ qua các commit 'chore' trong changelog
        return;
      case "revert":
        commit.type = "Reverts";
        break;
      default:
        // Nếu có type không mong muốn, bạn có thể bỏ qua hoặc xử lý khác
        return;
    }

    // Nếu bạn muốn thêm scope vào subject
    if (commit.scope && typeof commit.scope === "string") {
      commit.subject = `${commit.scope}: ${commit.subject}`;
    }

    return commit;
  },
  // Định nghĩa thứ tự hiển thị các loại trong changelog
  groupBy: "type",
  commitGroupsSort: (a, b) => {
    const order = [
      "Features",
      "Bug Fixes",
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

    if (aIndex === -1 && bIndex === -1) return 0; // Both not in order, keep original order
    if (aIndex === -1) return 1; // A not in order, B is, A comes after B
    if (bIndex === -1) return -1; // B not in order, A is, B comes after A

    return aIndex - bIndex;
  },
  commitsSort: ["scope", "subject"],
  // Bạn có thể tùy chỉnh template handle (header, commit, footer) tại đây nếu cần
  // Ví dụ: headerPartial, commitPartial, footerPartial
};

// module.exports = Promise.resolve({
//   parserOpts,
//   writerOpts,
// });

module.exports = Promise.resolve({
  parserOpts: {
    // Đây là parser cơ bản nhất cho Conventional Commits
    // Thử dùng preset angular làm cơ sở
    headerPattern: /^(\w*)(?:\((.*)\))?!?: (.*)$/,
    headerCorrespondence: ["type", "scope", "subject"],
    noteKeywords: ["BREAKING CHANGE"],
  },
  writerOpts: {}, // Để trống
});
