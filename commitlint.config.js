module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      issuePrefixes: ['AG-'],
    },
  },
  rules: {
    'subject-case': [0],
  }
};