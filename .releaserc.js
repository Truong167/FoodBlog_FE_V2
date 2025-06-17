// .releaserc.js - Giải pháp cuối cùng: CHANGELOG.md đầy đủ, GitHub Release Body là link

const parserOpts = {
  headerPattern:
    /^(feat|fix|build|chore|ci|docs|perf|refactor|revert|style|test)\/([\w-]+):\s(.+)$/,
  headerCorrespondence: ["type", "scope", "subject"],
  noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING-CHANGE"],
  issuePrefixes: ["#"],
};

// Hàm tùy chỉnh để tạo nội dung cho GitHub Release Body
// Hàm này sẽ ĐƯỢC GỌI bởi plugin @semantic-release/github.
const getGitHubReleaseBody = async (
  { nextRelease: { version, gitTag } },
  context
) => {
  // --- DEBUGGING CHO HÀM NÀY ---
  console.error("--- DEBUG: getGitHubReleaseBody STARTED ---");
  console.error("nextRelease.version:", version);
  console.error("nextRelease.gitTag:", gitTag);
  console.error(
    "Context for getGitHubReleaseBody:",
    JSON.stringify(context, null, 2)
  );

  const [owner, repo] = (
    process.env.GITHUB_REPOSITORY ||
    context.repository ||
    "Truong167/FoodBlog_FE_V2"
  ) // Fallback nếu không lấy được repo từ env/context
    .split("/");
  console.error("Determined Owner:", owner, "Repo:", repo);

  // Tạo URL đến CHANGELOG.md trên GitHub
  const changelogUrl = `https://github.com/${owner}/${repo}/blob/${gitTag}/CHANGELOG.md`;
  console.error("Generated CHANGELOG URL for Release Body:", changelogUrl);

  let releaseBody = `Please refer to the [CHANGELOG.md](${changelogUrl}) for full details on this release.`;

  if (gitTag.includes("-beta") || gitTag.includes("-dev")) {
    releaseBody =
      `### 🧪 Prerelease v${version}\n\n` +
      releaseBody +
      "\n\n**This is a pre-release version and may contain bugs.**";
  } else {
    releaseBody = `### ✨ Release v${version}\n\n` + releaseBody;
  }
  console.error("Final GitHub Release Body:", releaseBody);
  console.error("--- DEBUG: getGitHubReleaseBody ENDED ---");

  return releaseBody;
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
        // *** ĐÂY LÀ ĐIỂM QUAN TRỌNG: KHÔNG ĐỊNH NGHĨA `writerOpts` hay `footerPartial` ở đây.
        // Điều này sẽ khiến plugin này tạo ra CHANGELOG.md ĐẦY ĐỦ VỚI DANH SÁCH COMMIT
        // theo định dạng của preset.
        preset: "conventionalcommits", // SỬ DỤNG PRESET ĐỂ CÓ CHANGELOG ĐẦY ĐỦ
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
        // QUAN TRỌNG: KHÔNG sử dụng ${nextRelease.notes} ở đây.
        // Vì nextRelease.notes sẽ chứa nội dung CHANGELOG đầy đủ.
        // Git commit message chỉ nên ngắn gọn.
        message: "chore(release): ${nextRelease.version} [skip ci]",
      },
    ],
    [
      "@semantic-release/github",
      {
        // *** ĐÂY LÀ ĐIỂM QUAN TRỌNG: Sử dụng hàm tùy chỉnh cho GitHub Release Body ***

        releaseBodyTemplate: getGitHubReleaseBody,

      },
    ],
  ],
};
