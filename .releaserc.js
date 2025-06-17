// .releaserc.js - CHANGELOG.md đầy đủ, GitHub Release Body là link TỪ TEMPLATE

const parserOpts = {
  headerPattern:
    /^(feat|fix|build|chore|ci|docs|perf|refactor|revert|style|test)\/([\w-]+):\s(.+)$/,
  headerCorrespondence: ["type", "scope", "subject"],
  noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING-CHANGE"],
  issuePrefixes: ["#"],
};

module.exports = {
  debug: true,
  branches: [
    "main",
    {
      name: "feat/dev",
      prerelease: "dev",
    },
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        parserOpts,
        releaseRules: [
          { type: "feat", scope: "*", release: "minor" },
          { type: "feat", release: "minor" },
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
        // Sử dụng preset để tạo CHANGELOG.md đầy đủ và có cấu trúc.
        // Đây cũng là nội dung sẽ được lưu vào nextRelease.notes.
        preset: "conventionalcommits",
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
        npmPublish: false,
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        // Giữ tin nhắn commit ngắn gọn, không đưa toàn bộ notes vào.
        message: "chore(release): ${nextRelease.version} [skip ci]",
      },
    ],
    [
      "@semantic-release/github",
      {
        // *** ĐÂY LÀ ĐIỂM QUAN TRỌNG NHẤT: SỬ DỤNG `releaseBodyTemplate` VỚI CHUỖI ***
        // Sử dụng biến của semantic-release để tạo URL động
        // `nextRelease.gitTag` sẽ là vX.Y.Z hoặc vX.Y.Z-dev.N
        // `nextRelease.version` sẽ là X.Y.Z hoặc X.Y.Z-dev.N
        // `config.repositoryUrl` sẽ là https://github.com/Truong167/FoodBlog_FE_V2
        releaseBodyTemplate: `
### {{#if nextRelease.prerelease}}🧪 Prerelease {{/if}}✨ Release v\${nextRelease.version}

Please refer to the [CHANGELOG.md](\${config.repositoryUrl}/blob/\${nextRelease.gitTag}/CHANGELOG.md) for full details on this release.

{{#if nextRelease.prerelease}}
**This is a pre-release version and may contain bugs.**
{{/if}}
        `,
        // Bỏ hoàn toàn releaseNotes: getGitHubReleaseBody
        // Vì nó đã báo lỗi là không chấp nhận hàm.
      },
    ],
  ],
};
