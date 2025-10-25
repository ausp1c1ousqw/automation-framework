export default {
  default: [
    "--require ./support/bootstrap.js",
    "--require ./features/step_definitions/**/*.js",
    "--publish-quiet",
    "features/**/*.feature",
  ].join(" "),
};
