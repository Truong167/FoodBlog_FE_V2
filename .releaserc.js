// .releaserc.js - Giải pháp để đảm bảo getReleaseNotes được dùng và CHANGELOG.md vẫn được cập nhật

const parserOpts = {
  headerPattern:
    /^(feat|fix|build|chore|ci|docs|perf|refactor|revert|style|test)\/([\w-]+):\s(.+)$/,
  headerCorrespondence: ["type", "scope", "subject"],
  noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING-CHANGE"],
  issuePrefixes: ["#"],
};

// Hàm getReleaseNotes của bạn - Vẫn giữ nguyên để nó tạo nội dung tùy chỉnh
const getReleaseNotes = async (
  { nextRelease: { version, gitTag } },
  context
) => {
  // --- Giữ các dòng DEBUG này để đảm bảo nó được gọi lần sau ---
  console.error("--- DEBUG: getReleaseNotes STARTED ---");
  console.error("Context object:", JSON.stringify(context, null, 2));
  console.error("nextRelease.version:", version);
  console.error("nextRelease.gitTag:", gitTag);

  const [owner, repo] = (
    process.env.GITHUB_REPOSITORY || // Ưu tiên biến môi trường
    context.repository ||
    "Truong167/FoodBlog_FE_V2"
  ).split("/");
  console.error("Determined Owner:", owner, "Repo:", repo);

  const changelogUrl = `https://github.com/${owner}/${repo}/blob/${gitTag}/CHANGELOG.md`;
  console.error("Generated CHANGELOG URL:", changelogUrl);

  let releaseBody = `Please refer to the [CHANGELOG.md](${changelogUrl}) for full details on this release.`;

  if (gitTag.includes("-beta") || gitTag.includes("-dev")) {
    releaseBody =
      `### 🧪 Prerelease v${version}\n\n` +
      releaseBody +
      "\n\n**This is a pre-release version and may contain bugs.**";
  } else {
    releaseBody = `### ✨ Release v${version}\n\n` + releaseBody;
  }
  console.error("Final Release Body (from getReleaseNotes):", releaseBody);
  console.error("--- DEBUG: getReleaseNotes ENDED ---");

  return releaseBody;
};

module.exports = {
  debug: true, // GIỮ ĐỂ TIẾP TỤC DEBUG
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
    // --- KHÔI PHỤC @semantic-release/release-notes-generator nhưng VÔ HIỆU HÓA output của nó ---
    [
      "@semantic-release/release-notes-generator",
      {
        parserOpts,
        // *** ĐÂY LÀ ĐIỂM QUAN TRỌNG: writerOpts này sẽ khiến nó không tạo nội dung
        // cho release notes, buộc @semantic-release/github phải dùng releaseNotes tùy chỉnh ***
        writerOpts: {
          // Bỏ qua tất cả commit để không tạo nội dung cho release notes
          transform: (commit, context) => {
            return; // Đơn giản là không trả về gì, khiến commit bị bỏ qua
          },
          // Hoặc bạn có thể để các tùy chọn nhóm và sắp xếp mặc định nếu cần
        },
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
        // Quan trọng: Để CHANGELOG.md được cập nhật, bạn có thể cần thêm một preset ở đây
        // vì writerOpts ở trên đã loại bỏ tất cả các commit.
        // Ví dụ: preset: 'conventionalcommits',
        // Nếu không có preset, changelog có thể chỉ là một file rỗng hoặc không cập nhật.
        // Nếu bạn muốn CHANGELOG.md có nội dung đầy đủ (không phải chỉ link),
        // bạn cần khôi phục writerOpts đầy đủ cho release-notes-generator.
        // NHƯNG nếu mục tiêu là CHỈ GitHub Release Body tùy chỉnh, và CHANGELOG.md chỉ để đó,
        // thì cấu hình hiện tại có thể ổn.
      },
    ],

    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        // Loại bỏ ${nextRelease.notes} vì nó sẽ trống rỗng.
        message: "chore(release): ${nextRelease.version} [skip ci]",
      },
    ],
    [
      "@semantic-release/github",
      {
        releaseNotes: getReleaseNotes, // Hàm tùy chỉnh của bạn
      },
    ],
  ],
};
