const branch = process.env.GITHUB_REF_NAME || "";

const isDev = branch === "dev";
const isStaging = branch === "staging";
const isMain = branch === "main";

const plugins = [
  [
    "@semantic-release/commit-analyzer",
    {
      releaseRules: [
        /* ... như cũ */
      ],
    },
  ],
  [
    "@semantic-release/release-notes-generator",
    {
      /* ... như cũ */
    },
  ],
];

// Only add changelog + git commit if branch is dev
if (isDev) {
  plugins.push(
    ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        message: "chore(release): ${nextRelease.version} [skip ci]",
      },
    ]
  );
}

// Only add GitHub release on staging/main
if (isStaging || isMain) {
  plugins.push([
    "@semantic-release/github",
    {
      releaseBodyTemplate:
        "Please refer to the [CHANGELOG.md](https://github.com/oven-bz/liberty-be/blob/${nextRelease.gitTag}/CHANGELOG.md)",
      successComment: false,
      failComment: false,
    },
  ]);
}

module.exports = {
  debug: true,
  branches: [
    { name: "dev", prerelease: "dev" },
    { name: "staging", prerelease: "rc" },
    "main",
  ],
  plugins,
};
