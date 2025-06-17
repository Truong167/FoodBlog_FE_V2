// .releaserc.js (Cách 2: Cấu hình của bạn với getReleaseNotes và không có writerOpts,
//                nhưng sẽ debug sâu hơn)

const parserOpts = {
  headerPattern:
    /^(feat|fix|build|chore|ci|docs|perf|refactor|revert|style|test)\/([\w-]+):\s(.+)$/,
  headerCorrespondence: ["type", "scope", "subject"],
  noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING-CHANGE"],
  issuePrefixes: ["#"],
};

const getReleaseNotes = async (
  { nextRelease: { version, gitTag } },
  context
) => {
  // --- THÊM CÁC DÒNG DEBUG NÀY ĐỂ XÁC ĐỊNH VẤN ĐỀ ---
  console.log("--- DEBUGGING GET_RELEASE_NOTES ---");
  console.log("Context passed to getReleaseNotes:", context);
  console.log("nextRelease.version:", version);
  console.log("nextRelease.gitTag:", gitTag);

  const [owner, repo] = (
    context.repository ||
    process.env.GITHUB_REPOSITORY ||
    "Truong167/FoodBlog_FE_V2"
  ).split("/");
  console.log("Owner:", owner, "Repo:", repo);

  const changelogUrl = `https://github.com/${owner}/${repo}/blob/${gitTag}/CHANGELOG.md`;
  console.log("Generated CHANGELOG URL:", changelogUrl);

  let releaseBody = `Please refer to the [CHANGELOG.md](${changelogUrl}) for full details on this release.`;

  if (gitTag.includes("-beta") || gitTag.includes("-dev")) {
    releaseBody =
      `### 🧪 Prerelease v${version}\n\n` +
      releaseBody +
      "\n\n**This is a pre-release version and may contain bugs.**";
  } else {
    releaseBody = `### ✨ Release v${version}\n\n` + releaseBody;
  }
  console.log("Final Release Body:", releaseBody);
  console.log("--- END DEBUGGING GET_RELEASE_NOTES ---");
  // --- KẾT THÚC CÁC DÒNG DEBUG ---

  return releaseBody;
};

module.exports = {
  // Thêm debug level tổng thể cho semantic-release
  // Điều này sẽ tăng số lượng log và có thể cung cấp thêm thông tin
  // debug: true, // Bạn có thể bỏ comment dòng này để tăng log debug

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
        // writerOpts không được truyền vào đây, do đó sẽ dùng mặc định
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
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
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
