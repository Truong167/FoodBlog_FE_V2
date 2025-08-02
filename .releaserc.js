const parserOpts = {
  headerPattern: /^(\w+)(?:\/.*)?:\s(.*)/,
  headerCorrespondence: ["type", "scope", "subject"],
  noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING-CHANGE"],
  issuePrefixes: ["#"],
};

const writerOpts = {
  transform: (commit) => {
    if (!commit?.body || !commit?.references?.length) {
      return null;
    }

    const prReference = commit.references.find(
      (ref) => ref?.prefix === "#" && ref.issue
    );

    if (!prReference) return null;

    const typeMap = {
      feat: "✨ Features",
      fix: "🐛 Bug Fixes",
      perf: "⚡ Performance Improvements",
      revert: "⏪ Reverts",
      docs: "📝 Documentation",
      refactor: "🛠️ Code Refactoring",
      test: "✅ Tests",
      chore: "🔧 Chores",
      build: "🏗️ Build System",
      ci: "🔁 Continuous Integration",
      style: "🎨 Styling",
    };

    let { body, hash } = commit;
    let finalType = "Other";
    let scope = "";
    let subject = body;

    const match = body.match(/^(\w+)(?:\/(.*))?:(.*)/);
    if (match) {
      const [, type, matchedScope, matchedSubject] = match;
      finalType = typeMap[type.trim()] || type.trim();
      scope = matchedScope || "";
      subject = matchedSubject?.trim() || "";
    }

    const shortHash = hash.substring(0, 7);

    return {
      type: finalType,
      scope,
      shortHash,
      subject,
    };
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
