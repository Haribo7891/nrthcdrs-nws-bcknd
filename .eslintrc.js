module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
    "jasmine": true,
    "mocha": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "rules": {
    "no-console": ["off"],
    "no-var": ["error"],
    "no-multi-spaces": ["error"],
    "no-extra-semi": ["error"],
    "prefer-const": ["error"],
    "semi": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "space-before-blocks": ["error", "always"],
    "arrow-parens": ["error", "always"],
    "template-curly-spacing": ["error", "always"],
    "block-spacing": ["error", "always"],
    "eol-last": ["error", "always"],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "no-multiple-empty-lines": ["error", {
      "max": 2
    }],
    "keyword-spacing": ["error", {
      "before": true,
      "after": true
    }],
    "arrow-spacing": ["error", {
      "before": true,
      "after": true
    }],
    "comma-spacing": ["error", {
      "before": false,
      "after": true
    }],
    "semi-spacing": ["error", {
      "before": false,
      "after": true
    }],
    "key-spacing": ["error", {
      "beforeColon": false,
      "afterColon": true
    }],
    "array-bracket-spacing": ["error", "always", {
      "singleValue": false,
      "objectsInArrays": false,
      "arraysInArrays": false
    }],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "always",
      "asyncArrow": "always"
    }]
  }
};