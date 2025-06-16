// .releaserc.js
const parserOpts = {
  // Đảm bảo regex này khớp với định dạng của bạn một cách chính xác
  headerPattern:
    /^(feat|fix|build|chore|ci|docs|perf|refactor|revert|style|test)\/([\w-]+):\s(.+)$/,
  headerCorrespondence: ["type", "scope", "subject"],
  noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING-CHANGE"],
  issuePrefixes: ["#"],
};

const writerOpts = {
  transform: (commit, context) => {
    let discard = true;
    const issues = [];

    commit.notes.forEach((note) => {
      note.title = "BREAKING CHANGES";
      discard = false;
    });

    // Tạo một biến để lưu trữ loại commit hiển thị
    let displayType = "";

    // Dựa vào commit.type (đã được parserOpts trích xuất) để quyết định hiển thị gì
    if (commit.type === "feat") {
      displayType = "✨ Tính năng mới";
      discard = false; // Luôn hiển thị tính năng mới
    } else if (commit.type === "fix") {
      displayType = "🐛 Sửa lỗi";
      discard = false;
    } else if (commit.type === "perf") {
      displayType = "⚡ Cải thiện hiệu suất";
      discard = false;
    } else if (commit.type === "refactor") {
      displayType = "💡 Tái cấu trúc";
      discard = false;
    } else if (commit.type === "docs") {
      displayType = "📚 Tài liệu";
      discard = false;
    } else if (commit.type === "build") {
      displayType = "📦 Build";
      discard = false;
    } else if (commit.type === "ci") {
      displayType = "💻 CI/CD";
      discard = false;
    } else if (commit.type === "revert") {
      displayType = "⏪ Hoàn tác";
      discard = false;
    } else if (
      commit.type === "chore" ||
      commit.type === "test" ||
      commit.type === "style"
    ) {
      discard = true; // Ẩn các loại này mặc định
    } else {
      // Nếu không khớp với bất kỳ type nào khác, vẫn có thể hiển thị nếu muốn
      // Ví dụ: displayType = '❓ Khác';
      // discard = false;
      discard = true; // Mặc định ẩn nếu không khớp
    }

    if (discard) return; // Nếu discard là true, bỏ qua commit này

    // Gán displayType vào một thuộc tính mà writerOpts có thể sử dụng
    // Hoặc sửa đổi commit.header nếu bạn muốn thay đổi toàn bộ tiêu đề
    // Cách tốt nhất là sử dụng một thuộc tính custom cho việc nhóm trong CHANGELOG
    commit.changelogGroup = displayType; // Tạo một thuộc tính mới để nhóm

    // Xử lý issues references
    if (commit.scope === "*") {
      commit.scope = "";
    }

    if (typeof commit.hash === "string") {
      commit.hash = commit.hash.substring(0, 7);
    }

    if (typeof commit.subject === "string") {
      let url = context.repository
        ? `${context.host}/${context.owner}/${context.repository}`
        : context.linkReferences;
      if (url) {
        commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
          issues.push(issue);
          return `[#${issue}](${url}/issues/${issue})`;
        });
      }
    }

    return commit; // Trả về đối tượng commit đã được sửa đổi (nhưng không phải thuộc tính immutable)
  },
  // Nhóm các type lại trong CHANGELOG sử dụng thuộc tính mới 'changelogGroup'
  groupBy: "changelogGroup", // THAY ĐỔI TỪ 'type' SANG 'changelogGroup'
  commitSort: ["scope", "subject"],
  commitGroupsSort: [
    "BREAKING CHANGES",
    "✨ Tính năng mới",
    "🚀 Tính năng tùy chỉnh", // Đảm bảo đúng thứ tự nếu bạn có cả hai
    "🐛 Sửa lỗi",
    "⚡ Cải thiện hiệu suất",
    "💡 Tái cấu trúc",
    "📚 Tài liệu",
    "⏪ Hoàn tác",
    "📦 Build",
    "💻 CI/CD",
  ],
};

module.exports = {
  branches: ["main"], // Branch chính của bạn
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        parserOpts,
        releaseRules: [
          // Thêm rule này để đảm bảo khớp với type có scope
          { type: "feat", scope: "*", release: "minor" },
          { type: "feat", release: "minor" }, // Giữ cái này nếu bạn cũng dùng "feat: message"
          { type: "fix", scope: "*", release: "patch" },
          { type: "fix", release: "patch" },
          { type: "perf", release: "patch" },
          { type: "refactor", release: "patch" },
          { type: "docs", release: "patch" },
          { type: "revert", release: "patch" },
          { type: "build", release: "patch" },
          { type: "ci", release: "patch" },
          { breaking: true, release: "major" },
        ],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        parserOpts,
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
    [
      "@semantic-release/npm",
      {
        // Tùy chọn: chỉ publish nếu dự án có package.json
        npmPublish: true, // Đặt false nếu bạn không muốn publish lên npm registry
        // Ví dụ: chỉ cần update version trong package.json
        // pkgRoot: "./dist" // nếu bạn muốn update package.json trong thư mục dist
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"], // Các file sẽ được commit lại sau khi update version
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}", // Commit message cho release commit
      },
    ],
    [
      "@semantic-release/github",
      {
        // Tạo GitHub Release và cập nhật các Pull Request/Issues
        // assets: [{ path: "your-binary-file", label: "Binary" }] // Nếu bạn có file đính kèm release
      },
    ],
  ],
};
