// .releaserc.js
const parserOpts = {
  // Đảm bảo regex này khớp với định dạng của bạn một cách chính xác
  headerPattern:
    /^(feat|fix|build|chore|ci|docs|perf|refactor|revert|style|test)\/([\w-]+):\s(.+)$/,
  headerCorrespondence: ["type", "scope", "subject"],
  noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING-CHANGE"],
  issuePrefixes: ["#"],
};

const getReleaseNotes = async ({ nextRelease: { version, gitTag } }) => {
  const changelogUrl = `https://github.com/Truong167/FoodBlog_FE_V2/blob/${gitTag}/CHANGELOG.md`;

  let releaseBody = `Please refer to the [CHANGELOG.md](${changelogUrl}) for full details on this release.`;

  // Bạn có thể thêm nội dung ngắn gọn cho từng loại release nếu muốn
  if (gitTag.includes("-beta") || gitTag.includes("-dev")) {
    releaseBody =
      `### 🧪 Prerelease v${version}\n\n` +
      releaseBody +
      "\n\n**This is a pre-release version and may contain bugs.**";
  } else {
    releaseBody = `### ✨ Release v${version}\n\n` + releaseBody;
  }

  return releaseBody;
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
        releaseNotes: getReleaseNotes,
      },
    ],
  ],
};
