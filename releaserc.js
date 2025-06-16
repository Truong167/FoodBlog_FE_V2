module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        parserOpts: {
          headerPattern: /^(\w+)(?:\/(\w+))?: (.+)$/,
          headerCorrespondence: ["type", "scope", "subject"],
        },
        releaseRules: [
          { type: "feat", scope: "*", release: "minor" },
          { type: "feat", release: "minor" },
          { type: "fix", scope: "*", release: "patch" },
          { type: "fix", release: "patch" },
          { type: "perf", scope: "*", release: "patch" },
          { type: "perf", release: "patch" },
          { type: "refactor", scope: "*", release: "patch" },
          { type: "refactor", release: "patch" },
          { type: "docs", release: false },
          { type: "chore", release: false },
          { type: "test", release: false },
          { type: "style", release: false },
        ],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        parserOpts: {
          headerPattern: /^(\w+)(?:\/(\w+))?: (.+)$/,
          headerCorrespondence: ["type", "scope", "subject"],
        },
      },
    ],
    ["@semantic-release/changelog"],
    ["@semantic-release/npm"],
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
        message:
          "chore(release): ${nextRelease.version}\n\n${nextRelease.notes}",
      },
    ],
    ["@semantic-release/github"],
  ],
};
