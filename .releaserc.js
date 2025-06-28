const parserOpts = {
  // headerPattern:
  //   /^(feat|fix|build|chore|ci|docs|perf|refactor|revert|style|test)\/([\w-]+):\s(.+)$/,
  // headerCorrespondence: ["type", "scope", "subject"],
  // noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING-CHANGE"],
  // issuePrefixes: ["#"],

  headerPattern:
    /^Merge pull request #(\d+) from (.+)\/(feat|fix|chore|docs|style|refactor|perf|test|build|ci)\/(.*)$/,
  // Map các nhóm bắt được từ regex vào các trường của commit object
  headerCorrespondence: [
    "issue",
    "authorBranchPrefix",
    "type",
    "scope",
    "subject",
  ],
  // Bỏ qua tất cả các commit không khớp với headerPattern trên (tức là không phải merge PR hoặc không đúng format nhánh)
  // Điều này giúp loại bỏ các commit trực tiếp (direct commits)
  onHeaderCorrespondence: (commit) => {
    console.log("🔍 Analyzing commit header:", commit);
    if (!commit.type) {
      return null; // Nếu không tìm thấy 'type' từ tên nhánh, bỏ qua commit này
    }
    return commit;
  },
};

const writerOpts = {
  transform: (commit, context) => {
    console.log("🔍 Processing commit:", commit);
    console.log("🔗 Repository context:", context.repository);

    // const issues = [];

    // if (commit.merge) {
    //   console.log("📝 Found merge commit:", commit.merge);
    //   const prMatch = commit.merge.match(/Merge pull request #(\d+)/);
    //   if (prMatch) {
    //     console.log("✅ Extracted PR from merge:", prMatch[1]);
    //     issues.push(prMatch[1]);
    //   } else {
    //     console.log("❌ No PR found in merge commit");
    //   }
    // }

    // if (commit.references && commit.references.length > 0) {
    //   console.log("📋 Found commit references:", commit.references);
    //   commit.references.forEach((reference) => {
    //     if (reference.issue && !issues.includes(reference.issue)) {
    //       console.log("✅ Added PR reference:", reference.issue);
    //       issues.push(reference.issue);
    //     }
    //   });
    // } else {
    //   console.log("📋 No commit references found");
    // }

    // let entry = `* ${commit.subject}`;

    // // Add commit hash link
    // if (commit.hash) {
    //   const shortHash = commit.hash.substring(0, 7);
    //   entry += ` ([${shortHash}](${context.repository}/commit/${commit.hash}))`;
    //   console.log(`🔗 Added commit hash link: ${shortHash}`);
    // }

    // // Add PR links
    // if (issues.length > 0) {
    //   const prLinks = issues
    //     .map((issue) => `[#${issue}](${context.repository}/pull/${issue})`)
    //     .join(", ");
    //   entry += ` (${prLinks})`;
    //   console.log(`🔗 Added PR links: ${prLinks}`);
    // } else {
    //   console.log("❌ No PR links to add");
    // }

    // console.log("📄 Final entry:", entry);
    // console.log("---");

    // return entry;

    if (!commit.type) {
      return; // Bỏ qua nếu commit không có type hợp lệ (ví dụ: các commit không phải merge PR)
    }

    // Lấy thông tin PR từ references
    const prReference = commit.references.find((ref) => ref.prefix === "#");
    const prNumber = prReference ? prReference.issue : null;

    // Lấy 7 ký tự đầu của hash commit để làm short hash
    const commitHashShort = commit.hash.substring(0, 7);

    // Xây dựng link commit và link PR
    const commitLink = `([${commitHashShort}](/commit/${commit.hash}))`;
    const prLink = prNumber ? `([#${prNumber}](/pull/${prNumber}))` : "";

    // Tạo tiêu đề cho Changelog dựa trên type (feat/fix)
    // Bạn có thể tùy chỉnh các tiêu đề này

    // Sử dụng message ban đầu của merge commit hoặc phần subject đã được parse
    // commit.subject ban đầu là "Merge pull request #115 from Truong167/fix/test"
    // Nếu bạn muốn lấy phần 'Fix/test' từ body: commit.body
    const displayMessage = commit.subject || commit.message;

    // Format dòng changelog mong muốn
    // Ví dụ: * Merge pull request #115 from Truong167/fix/test ([b5cfa4e](commit-link)) ([#115](pr-link))
    console.log(`log ne * ${displayMessage} ${commitLink} ${prLink}`);
    return `* ${displayMessage} ${commitLink} ${prLink}`;
  },
  groupBy: "type",
  commitGroupsSort: "title",
  commitsSort: ["scope", "subject"],
  noteGroupsSort: "title",
};

module.exports = {
  debug: true,
  branches: [
    "main",
    {
      name: "dev",
      prerelease: "canary",
    },
    {
      name: "feat/dev",
      prerelease: "beta",
    },
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        parserOpts,
        releaseRules: [
          { type: "feat", scope: "*", release: "minor" },
          { type: "fix", scope: "*", release: "patch" },
          { type: "perf", scope: "*", release: "patch" },
          { type: "refactor", scope: "*", release: "patch" },
          { type: "docs", scope: "*", release: "patch" },
          { type: "revert", scope: "*", release: "patch" },
          { type: "build", scope: "*", release: "patch" },
          { type: "ci", scope: "*", release: "patch" },
          { breaking: true, release: "major" },
        ],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        parserOpts,
        writerOpts,
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
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
        releaseBodyTemplate:
          "Please refer to the [CHANGELOG.md](https://github.com/oven-bz/liberty-be/blob/${nextRelease.gitTag}/CHANGELOG.md) for full details on this release.",
        successComment: false,
        failComment: false,
      },
    ],
  ],
};
