module.exports = {
  // BẮT BUỘC: Định nghĩa mảng plugins rỗng để ngăn chặn các plugin mặc định
  plugins: [],
  debug: true,
  branches: [
    {
      name: "main",
      // Plugins dành riêng cho nhánh main
      plugins: [
        [
          "@semantic-release/commit-analyzer",
          {
            // Inline parserOpts
            parserOpts: {
              headerPattern: /^(\w+)(?:\/.*)?:\s(.*)/,
              headerCorrespondence: ["type", "scope", "subject"],
              noteKeywords: [
                "BREAKING CHANGE",
                "BREAKING CHANGES",
                "BREAKING-CHANGE",
              ],
              issuePrefixes: ["#"],
            },
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
            // Inline parserOpts và writerOpts
            parserOpts: {
              headerPattern: /^(\w+)(?:\/.*)?:\s(.*)/,
              headerCorrespondence: ["type", "scope", "subject"],
              noteKeywords: [
                "BREAKING CHANGE",
                "BREAKING CHANGES",
                "BREAKING-CHANGE",
              ],
              issuePrefixes: ["#"],
            },
            writerOpts: {
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
            },
          },
        ],
        ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],
        ["@semantic-release/npm"],
        ["@semantic-release/github", { assets: ["CHANGELOG.md"] }],
        [
          "@semantic-release/git",
          {
            assets: ["CHANGELOG.md", "package.json"],
            message: "chore(release): ${nextRelease.version} [skip ci]",
          },
        ],
      ],
    },
    {
      name: "staging",
      prerelease: "beta",
      // Plugins dành riêng cho nhánh staging
      plugins: [
        [
          "@semantic-release/commit-analyzer",
          {
            // Inline parserOpts
            parserOpts: {
              headerPattern: /^(\w+)(?:\/.*)?:\s(.*)/,
              headerCorrespondence: ["type", "scope", "subject"],
              noteKeywords: [
                "BREAKING CHANGE",
                "BREAKING CHANGES",
                "BREAKING-CHANGE",
              ],
              issuePrefixes: ["#"],
            },
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
            // Inline parserOpts và writerOpts
            parserOpts: {
              headerPattern: /^(\w+)(?:\/.*)?:\s(.*)/,
              headerCorrespondence: ["type", "scope", "subject"],
              noteKeywords: [
                "BREAKING CHANGE",
                "BREAKING CHANGES",
                "BREAKING-CHANGE",
              ],
              issuePrefixes: ["#"],
            },
            writerOpts: {
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
            },
          },
        ],
        ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],
        ["@semantic-release/github", { assets: ["CHANGELOG.md"] }],
        [
          "@semantic-release/git",
          {
            assets: ["CHANGELOG.md", "package.json"],
            message: "chore(release): ${nextRelease.version} [skip ci]",
          },
        ],
      ],
    },
    {
      name: "dev",
      prerelease: "canary",
      // Plugins dành riêng cho nhánh dev
      plugins: [
        [
          "@semantic-release/commit-analyzer",
          {
            // Inline parserOpts
            parserOpts: {
              headerPattern: /^(\w+)(?:\/.*)?:\s(.*)/,
              headerCorrespondence: ["type", "scope", "subject"],
              noteKeywords: [
                "BREAKING CHANGE",
                "BREAKING CHANGES",
                "BREAKING-CHANGE",
              ],
              issuePrefixes: ["#"],
            },
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
            // Inline parserOpts và writerOpts
            parserOpts: {
              headerPattern: /^(\w+)(?:\/.*)?:\s(.*)/,
              headerCorrespondence: ["type", "scope", "subject"],
              noteKeywords: [
                "BREAKING CHANGE",
                "BREAKING CHANGES",
                "BREAKING-CHANGE",
              ],
              issuePrefixes: ["#"],
            },
            writerOpts: {
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
            },
          },
        ],
        ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],
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
    },
  ],
};
