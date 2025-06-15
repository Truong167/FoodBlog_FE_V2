// .releaserc.js
module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        parserOpts: {
          headerPattern:
            /^(feat|fix|docs|style|refactor|perf|test|chore)(?:\/([^:]+))?\s*:\s*(.*)$/,
          headerCorrespondence: ["type", "scope", "subject"],
          noteKeywords: ["BREAKING CHANGE"],
          revertPattern:
            /^(?:Revert|revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
          revertCorrespondence: ["header", "hash"],
        },
        releaseRules: [
          { type: "feat", release: "minor" },
          { type: "fix", release: "patch" },
          { type: "docs", release: "patch" },
          { type: "style", release: "patch" },
          { type: "refactor", release: "patch" },
          { type: "perf", release: "patch" },
          { type: "test", release: "patch" },
          { type: "chore", release: "patch" },
          { breaking: true, release: "major" },
        ],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "angular",
        parserOpts: {
          headerPattern:
            /^(feat|fix|docs|style|refactor|perf|test|chore)(?:\/([^:]+))?\s*:\s*(.*)$/,
          headerCorrespondence: ["type", "scope", "subject"],
        },
        writerOpts: {
          transform: (commit, context) => {
            const issues = [];

            commit.notes.forEach((note) => {
              note.title = "BREAKING CHANGES";
            });

            if (commit.type === "feat") {
              commit.type = "Features";
            } else if (commit.type === "fix") {
              commit.type = "Bug Fixes";
            } else if (commit.type === "docs") {
              commit.type = "Documentation";
            } else if (commit.type === "style") {
              commit.type = "Styles";
            } else if (commit.type === "refactor") {
              commit.type = "Code Refactoring";
            } else if (commit.type === "perf") {
              commit.type = "Performance Improvements";
            } else if (commit.type === "test") {
              commit.type = "Tests";
            } else if (commit.type === "chore") {
              commit.type = "Chores";
            } else {
              return;
            }

            if (commit.scope === "*") {
              commit.scope = "";
            }

            if (typeof commit.hash === "string") {
              commit.shortHash = commit.hash.substring(0, 7);
            }

            if (typeof commit.subject === "string") {
              let url = context.repository
                ? `${context.host}/${context.owner}/${context.repository}`
                : context.repoUrl;
              if (url) {
                url = `${url}/issues/`;
                // Issue URLs.
                commit.subject = commit.subject.replace(
                  /#([0-9]+)/g,
                  (_, issue) => {
                    issues.push(issue);
                    return `[#${issue}](${url}${issue})`;
                  }
                );
              }
              if (context.host) {
                // User URLs.
                commit.subject = commit.subject.replace(
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
            commit.references = commit.references.filter((reference) => {
              if (issues.indexOf(reference.issue) === -1) {
                return true;
              }
              return false;
            });

            return commit;
          },
          groupBy: "type",
          commitGroupsSort: "title",
          commitsSort: ["scope", "subject"],
          noteGroupsSort: "title",
          notesSort: "text",
        },
      },
    ],
    "@semantic-release/changelog",
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json", "package-lock.json"],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
    "@semantic-release/github",
  ],
};
