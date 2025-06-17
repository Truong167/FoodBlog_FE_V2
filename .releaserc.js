// .releaserc.js - Giải pháp mới: Custom writerOpts trong release-notes-generator

const parserOpts = {
  headerPattern:
    /^(feat|fix|build|chore|ci|docs|perf|refactor|revert|style|test)\/([\w-]+):\s(.+)$/,
  headerCorrespondence: ["type", "scope", "subject"],
  noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING-CHANGE"],
  issuePrefixes: ["#"],
};

module.exports = {
  debug: true, // GIỮ ĐỂ DEBUG
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
        // *** ĐÂY LÀ ĐIỂM QUAN TRỌNG: Custom writerOpts để tạo nội dung release bạn muốn ***
        writerOpts: {
          // Hàm này sẽ được gọi để tạo release notes.
          // Bạn có thể tùy chỉnh nó hoàn toàn để tạo ra chuỗi Markdown mong muốn.
          transform: (commit, context) => {
            // Không thay đổi commit, chỉ là một ví dụ
            // Đây là nơi bạn có thể tạo ra nội dung chi tiết từ commit nếu muốn
            return commit;
          },
          // Customize the "sections" (e.g., Features, Bug Fixes)
          // Để đảm bảo nội dung của bạn được thêm vào, bạn sẽ cần tùy chỉnh các template handlebars.
          // Cách đơn giản nhất là ghi đè toàn bộ template hoặc thêm vào cuối.

          // Để có nội dung hoàn chỉnh và tùy chỉnh theo ý bạn,
          // chúng ta sẽ sử dụng template `mainTemplate` và `commitPartial`.
          // Điều này sẽ phức tạp hơn một chút, nhưng là cách duy nhất đáng tin cậy.

          // *********************************************************************************
          // CÁCH TỐT NHẤT LÀ SỬ DỤNG MỘT PRESET VÀ THAY ĐỔI NÓ, HOẶC CHỈ CẤU HÌNH writerOpts ĐƠN GIẢN
          // Thay vì writerOpts phức tạp ở đây, hãy dùng một preset và sau đó thêm đoạn text của bạn
          // vào phần body của GitHub.
          // *********************************************************************************

          // Hãy thử lại với preset 'conventionalcommits' và sau đó điều chỉnh body GitHub.
          // HOẶC cách đơn giản nhất là chỉ sử dụng một writerOpts rất đơn giản
          // để thêm text của bạn vào cuối nội dung mặc định.

          // Để tránh quá phức tạp, chúng ta sẽ tạo một writerOpts đơn giản nhất
          // để thêm ghi chú của bạn vào.
          mainTemplate: `
{{> header}}
{{#if noteGroups}}
{{#each noteGroups}}
### {{title}}

{{#each commits}}
* {{#if scope}}**{{scope}}:** {{/if}}{{subject}} ([{{hash}}](https://github.com/Truong167/FoodBlog_FE_V2/commit/{{hash}}))
{{/each}}
{{/each}}
{{/if}}

{{> footer}}
`,
          headerPartial: `## {{version}} ({{date}})

`,
          // Sử dụng footerPartial để thêm ghi chú của bạn vào cuối.
          footerPartial: `
Please refer to the [CHANGELOG.md](https://github.com/Truong167/FoodBlog_FE_V2/blob/v{{version}}/CHANGELOG.md) for full details on this release.
{{#if prerelease}}
### 🧪 Prerelease v{{version}}
**This is a pre-release version and may contain bugs.**
{{else}}
### ✨ Release v{{version}}
{{/if}}
`,
        },
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
        // Giữ nguyên message này. ${nextRelease.notes} sẽ được điền từ generateNotes.
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    [
      "@semantic-release/github",
      {
        // QUAN TRỌNG: Bỏ releaseNotes tùy chỉnh ở đây!
        // Vì giờ chúng ta dùng generateNotes để tạo nội dung.
        // semantic-release sẽ tự động chuyển nội dung từ generateNotes sang GitHub.
        // releaseNotes: getReleaseNotes, // BỎ DÒNG NÀY ĐI!
      },
    ],
  ],
};
