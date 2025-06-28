const parserOpts = {
  headerPattern:
    /^(feat|fix|build|chore|ci|docs|perf|refactor|revert|style|test)\/([\w-]+):\s(.+)$/,
  headerCorrespondence: ["type", "scope", "subject"],
  noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING-CHANGE"],
  issuePrefixes: ["#"],
};

const writerOpts = {
  transform: (commit, context) => {
    console.log("🔍 Processing commit:", commit);
    console.log("🔗 Repository context:", context.repository);

    const issues = [];

    if (commit.merge) {
      console.log("📝 Found merge commit:", commit.merge);
      const prMatch = commit.merge.match(/Merge pull request #(\d+)/);
      if (prMatch) {
        console.log("✅ Extracted PR from merge:", prMatch[1]);
        issues.push(prMatch[1]);
      } else {
        console.log("❌ No PR found in merge commit");
      }
    }

    // Also check for PR references in commit body or footer
    if (commit.references && commit.references.length > 0) {
      console.log("📋 Found commit references:", commit.references);
      commit.references.forEach((reference) => {
        if (reference.issue && !issues.includes(reference.issue)) {
          console.log("✅ Added PR reference:", reference.issue);
          issues.push(reference.issue);
        }
      });
    } else {
      console.log("📋 No commit references found");
    }

    let entry = `* ${commit.subject}`;

    // Add commit hash link
    if (commit.hash) {
      const shortHash = commit.hash.substring(0, 7);
      entry += ` ([${shortHash}](${context.repository}/commit/${commit.hash}))`;
      console.log(`🔗 Added commit hash link: ${shortHash}`);
    }

    // Add PR links
    if (issues.length > 0) {
      const prLinks = issues
        .map((issue) => `[#${issue}](${context.repository}/pull/${issue})`)
        .join(", ");
      entry += ` (${prLinks})`;
      console.log(`🔗 Added PR links: ${prLinks}`);
    } else {
      console.log("❌ No PR links to add");
    }

    console.log("📄 Final entry:", entry);
    console.log("---");

    return entry;
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
