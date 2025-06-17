// .releaserc.js

const parserOpts = {
  // Đảm bảo regex này khớp với định dạng của bạn một cách chính xác
  headerPattern:
    /^(feat|fix|build|chore|ci|docs|perf|refactor|revert|style|test)\/([\w-]+):\s(.+)$/,
  headerCorrespondence: ["type", "scope", "subject"],
  noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING-CHANGE"],
  issuePrefixes: ["#"],
};

// ====================================================================
// Hàm getReleaseNotes tùy chỉnh của bạn
// Bây giờ nó nhận cả 'context' để lấy owner/repo một cách đáng tin cậy
// ====================================================================
const getReleaseNotes = async (
  { nextRelease: { version, gitTag } },
  context
) => {
  // Lấy owner và repo từ context hoặc từ biến môi trường GITHUB_REPOSITORY
  // GITHUB_REPOSITORY có định dạng "owner/repo"
  const [owner, repo] = (
    context.repository ||
    process.env.GITHUB_REPOSITORY ||
    "Truong167/FoodBlog_FE_V2"
  ).split("/");

  const changelogUrl = `https://github.com/${owner}/${repo}/blob/${gitTag}/CHANGELOG.md`;

  let releaseBody = `Please refer to the [CHANGELOG.md](${changelogUrl}) for full details on this release.`;

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

// ====================================================================
// Cấu hình chính của semantic-release
// Đảm bảo cấu hình branches bao gồm cả main và feat/dev (nếu bạn muốn prerelease)
// ====================================================================
module.exports = {
  branches: [
    "main", // Nhánh chính cho các release production
    {
      name: "feat/dev", // Tên nhánh Git của bạn cho môi trường dev/staging
      prerelease: "dev", // Tên kênh prerelease hợp lệ theo SemVer (ví dụ: v1.0.0-dev.1)
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
        npmPublish: false, // Giữ false nếu bạn không publish package lên npm registry
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    [
      "@semantic-release/github",
      {
        releaseNotes: getReleaseNotes, // Gắn hàm tùy chỉnh vào đây
      },
    ],
  ],
};
