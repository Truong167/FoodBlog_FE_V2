// .releaserc.js
const parserOpts = {
  // Regex để phân tích tiêu đề commit: type/scope: description
  // Nhóm 1: type (e.g., feat, fix)
  // Nhóm 2: scope (e.g., authentication, dashboard)
  // Nhóm 3: subject (description)
  headerPattern:
    /^(feat|fix|build|chore|ci|docs|perf|refactor|revert|style|test)\/([\w-]+):\s(.+)$/,
  headerCorrespondence: ["type", "scope", "subject"],
  // Regex để tìm các từ khóa cho Breaking Changes (ở cuối commit body hoặc footer)
  noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING-CHANGE"],
  // Regex để tìm các issue references (e.g., Closes #123)
  issuePrefixes: ["#"],
};

const writerOpts = {
  // Hàm transform để định dạng lại output cho CHANGELOG
  // Bạn có thể tùy chỉnh hiển thị scope và type ở đây
  transform: (commit, context) => {
    console.log({ commit, context });
    let discard = true; // Mặc định bỏ qua nếu không khớp rules dưới đây
    const issues = [];

    commit.notes.forEach((note) => {
      note.title = "BREAKING CHANGES";
      discard = false;
    });

    // Các rule để quyết định hiển thị commit nào trong CHANGELOG
    // Và map các type tùy chỉnh về các section mong muốn
    if (commit.type === "feat") {
      commit.type = "✨ Tính năng mới"; // Hoặc '🚀 Tính năng tùy chỉnh'
    } else if (commit.type === "fix") {
      commit.type = "🐛 Sửa lỗi";
    } else if (commit.type === "perf") {
      commit.type = "⚡ Cải thiện hiệu suất";
    } else if (commit.type === "refactor") {
      commit.type = "💡 Tái cấu trúc";
    } else if (commit.type === "docs") {
      commit.type = "📚 Tài liệu";
    } else if (commit.type === "build") {
      commit.type = "📦 Build";
    } else if (commit.type === "ci") {
      commit.type = "💻 CI/CD";
    } else if (commit.type === "chore") {
      discard = true; // Ẩn chore mặc định
    } else if (commit.type === "test") {
      discard = true; // Ẩn test mặc định
    } else if (commit.type === "style") {
      discard = true; // Ẩn style mặc định
    } else if (commit.type === "revert") {
      commit.type = "⏪ Hoàn tác";
    }

    // Nếu không khớp với bất kỳ type nào trên, bạn có thể phân loại là 'Other'
    if (discard) return;

    // Xử lý issues references
    if (commit.scope === "*") {
      commit.scope = "";
    }

    // Đảm bảo issue references được xử lý đúng cách
    if (typeof commit.hash === "string") {
      commit.hash = commit.hash.substring(0, 7);
    }

    if (typeof commit.subject === "string") {
      let url = context.repository
        ? `${context.host}/${context.owner}/${context.repository}`
        : context.linkReferences;
      if (url) {
        // Thay thế issue references trong subject bằng link
        commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
          issues.push(issue);
          return `[#${issue}](${url}/issues/${issue})`;
        });
      }
    }

    return commit;
  },
  // Nhóm các type lại trong CHANGELOG
  groupBy: "type",
  commitSort: ["scope", "subject"],
  // Đặt thứ tự các section trong CHANGELOG
  commitGroupsSort: [
    "BREAKING CHANGES",
    "✨ Tính năng mới",
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
        parserOpts, // Sử dụng parserOpts đã định nghĩa ở trên
        // Định nghĩa các quy tắc release dựa trên type và scope
        releaseRules: [
          { type: "feat", release: "minor" }, // 'feat' type (bao gồm feat/<scope>) sẽ bump minor
          { type: "fix", release: "patch" }, // 'fix' type sẽ bump patch
          { type: "perf", release: "patch" },
          { type: "refactor", release: "patch" },
          { type: "docs", release: "patch" },
          { type: "revert", release: "patch" },
          { type: "build", release: "patch" },
          { type: "ci", release: "patch" },
          // Rule cho Breaking Changes
          { breaking: true, release: "major" },
        ],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        parserOpts, // Sử dụng parserOpts đã định nghĩa ở trên
        writerOpts, // Sử dụng writerOpts đã định nghĩa ở trên
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
