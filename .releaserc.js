const parserOpts = {
  headerPattern: /^(\w+)(?:\/.*)?:\s(.*)/,
  headerCorrespondence: ["type", "scope", "subject"],
  noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING-CHANGE"],
  issuePrefixes: ["#"],
};

const writerOpts = {
  transform: (commit, context) => {
    if (
      !commit ||
      !commit.body ||
      !commit.references ||
      commit.references.length === 0
    ) {
      return null;
    }

    const prReference = commit.references.find(
      (ref) => ref && ref.prefix === "#" && ref.issue
    );

    if (!prReference) {
      return null;
    }

    let finalType = "Other";
    let finalSubject = commit.body;
    let scope = "";

    // The body contains the commit message from the original PR
    // (e.g., 'feat/DEL-4: testing something')
    const bodyMatch = commit.body.match(/^(\w+)(?:\/(.*))?:(.*)/);
    console.log({ bodyMatch });
    if (bodyMatch) {
      finalType = bodyMatch[1].trim();
      scope = bodyMatch[2] ? bodyMatch[2] : null;
      finalSubject = bodyMatch[3] ? bodyMatch[3].trim() : "";
    }

    if (finalType === "feat") {
      finalType = "Features";
    } else if (finalType === "fix") {
      finalType = "Bug Fixes";
    } else if (finalType === "perf") {
      finalType = "Performance Improvements";
    } else if (finalType === "revert" || commit.revert) {
      finalType = "Reverts";
    } else if (discard) {
      return undefined;
    } else if (finalType === "docs") {
      finalType = "Documentation";
    } else if (finalType === "refactor") {
      finalType = "Code Refactoring";
    }

    console.log("🔍 Final type and subject:", {
      type: finalType,
      scope,
      shortHash: commit.hash.substring(0, 7),
      subject: finalSubject,
    });

    return {
      type: finalType,
      scope,
      shortHash: commit.hash.substring(0, 7),
      subject: finalSubject,
    };
  },
  groupBy: "type",
  commitGroupsSort: "title",
  commitsSort: ["scope", "subject"],
  noteGroupsSort: "title",
};

const a = {
  transform: (commit, context) => {
    let discard = true;
    const notes = commit.notes.map((note) => {
      discard = false;

      return {
        ...note,
        title: "BREAKING CHANGES",
      };
    });
    let { type } = commit;

    if (commit.type === "feat") {
      type = "Features";
    } else if (commit.type === "fix") {
      type = "Bug Fixes";
    } else if (commit.type === "perf") {
      type = "Performance Improvements";
    } else if (commit.type === "revert" || commit.revert) {
      type = "Reverts";
    } else if (discard) {
      return undefined;
    } else if (commit.type === "docs") {
      type = "Documentation";
    } else if (commit.type === "style") {
      type = "Styles";
    } else if (commit.type === "refactor") {
      type = "Code Refactoring";
    } else if (commit.type === "test") {
      type = "Tests";
    } else if (commit.type === "build") {
      type = "Build System";
    } else if (commit.type === "ci") {
      type = "Continuous Integration";
    }

    const scope = commit.scope === "*" ? "" : commit.scope;
    const shortHash =
      typeof commit.hash === "string"
        ? commit.hash.substring(0, 7)
        : commit.shortHash;
    const issues = [];
    let { subject } = commit;

    if (typeof subject === "string") {
      let url = context.repository
        ? `${context.host}/${context.owner}/${context.repository}`
        : context.repoUrl;

      if (url) {
        url = `${url}/issues/`;
        // Issue URLs.
        subject = subject.replace(/#([0-9]+)/g, (_, issue) => {
          issues.push(issue);
          return `[#${issue}](${url}${issue})`;
        });
      }

      if (context.host) {
        // User URLs.
        subject = subject.replace(
          /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
          (_, username) => {
            if (username.includes("/")) {
              return `@${username}`;
            }

            return `[@${username}](${context.host}/${username})`;
          }
        );
      }
    }

    // remove references that already appear in the subject
    const references = commit.references.filter(
      (reference) => !issues.includes(reference.issue)
    );
    console.log({
      notes,
      type,
      scope,
      shortHash,
      subject,
      references,
    });

    return {
      notes,
      type,
      scope,
      shortHash,
      subject,
      references,
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
    // [
    //   "@semantic-release/github",
    //   {
    //     releaseBodyTemplate:
    //       "Please refer to the [CHANGELOG.md](https://github.com/oven-bz/liberty-be/blob/${nextRelease.gitTag}/CHANGELOG.md) for full details on this release.",
    //     successComment: false,
    //     failComment: false,
    //   },
    // ],
  ],
};
