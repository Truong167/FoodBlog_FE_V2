const parserOpts = {
  headerPattern: /^(\w+)(?:\/.*)?:\s(.*)/,
  headerCorrespondence: ["type", "scope", "subject"],
  noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING-CHANGE"],
  issuePrefixes: ["#"],
};

const writerOpts1 = {
  transform: (commit, context) => {
    const log = (...args) => {
      process.stderr.write(
        args
          .map((arg) =>
            typeof arg === "string" ? arg : JSON.stringify(arg, null, 2)
          )
          .join(" ") + "\n"
      );
    };

    log("🔍 Processing commit:", commit);
    log("🔗 Repository context:", context.repository);

    const issues = [];

    if (commit.merge) {
      log("📝 Found merge commit:", commit.merge);
      const prMatch = commit.merge.match(/Merge pull request #(\d+)/);
      if (prMatch) {
        log("✅ Extracted PR from merge:", prMatch[1]);
        issues.push(prMatch[1]);
      } else {
        log("❌ No PR found in merge commit");
      }
    }

    if (commit.references && commit.references.length > 0) {
      log("📋 Found commit references:", commit.references);
      commit.references.forEach((reference) => {
        if (reference.issue && !issues.includes(reference.issue)) {
          log("✅ Added PR reference:", reference.issue);
          issues.push(reference.issue);
        }
      });
    } else {
      log("📋 No commit references found");
    }

    let entry = `* ${commit.subject}`;

    if (commit.hash) {
      const shortHash = commit.hash.substring(0, 7);
      entry += ` ([${shortHash}](${context.repository}/commit/${commit.hash}))`;
      log(`🔗 Added commit hash link: ${shortHash}`);
    }

    if (issues.length > 0) {
      const prLinks = issues
        .map((issue) => `[#${issue}](${context.repository}/pull/${issue})`)
        .join(", ");
      entry += ` (${prLinks})`;
      log(`🔗 Added PR links: ${prLinks}`);
    } else {
      log("❌ No PR links to add");
    }

    log("📄 Final entry:", entry);
    log("---");

    return entry;
  },
  groupBy: "type",
  commitGroupsSort: "title",
  commitsSort: ["scope", "subject"],
  noteGroupsSort: "title",
};

const writerOpts = {
  transform: (commit, context) => {
    const mutableCommit = Object.assign({}, commit);

    // Check if subject exists before calling match()
    if (mutableCommit.subject) {
      const prMatch = mutableCommit.subject.match(
        /Merge pull request #(\d+) from/
      );
      if (prMatch) {
        mutableCommit.type = "pr";
        mutableCommit.prNumber = prMatch[1];
        mutableCommit.subject = mutableCommit.subject.replace(
          /Merge pull request #\d+ from .*/,
          ""
        );
      }
    }

    if (mutableCommit.type === "pr") {
      mutableCommit.scope = `PR-${mutableCommit.prNumber}`;
      return `* **PR #${mutableCommit.prNumber}:** ${
        mutableCommit.subject
      } ([${mutableCommit.hash.substring(0, 7)}](${context.repository}/commit/${
        mutableCommit.hash
      }))\n`;
    }

    return mutableCommit;
  },
  groupBy: "prNumber",
  commitGroupsSort: "title",
  commitsSort: ["prNumber"],
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
