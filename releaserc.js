module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        parserOpts: {
          headerPattern: /^(\w+)(?:\/(\w+))?: (.+)$/,
          headerCorrespondence: ["type", "scope", "subject"],
        },
        preset: "conventionalcommits",
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
