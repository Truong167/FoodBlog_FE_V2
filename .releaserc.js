// .releaserc.js - Cấu hình FINAL (hy vọng vậy!)

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
        message: "chore(release): ${nextRelease.version} [skip ci]",
      },
    ],
    [
      "@semantic-release/github",
      {
        // *** ĐIỂM THAY ĐỔI Ở ĐÂY ***
        // Sử dụng `repositoryUrl` trực tiếp từ context của template.
        // Hoặc chúng ta có thể xây dựng URL tĩnh nếu biết nó không đổi.
        releaseBodyTemplate: `
### {{#if nextRelease.prerelease}}🧪 Prerelease {{/if}}✨ Release v\${nextRelease.version}

Please refer to the [CHANGELOG.md](https://github.com/Truong167/FoodBlog_FE_V2/blob/\${nextRelease.gitTag}/CHANGELOG.md) for full details on this release.

{{#if nextRelease.prerelease}}
**This is a pre-release version and may contain bugs.**
{{/if}}
        `,
      },
    ],
  ],
};
