module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["transform-remove-console"],
      },
    },
    plugins: [
      [
        "module-resolver",
        {
          root: "././",
          extensions: ["./.ios.js", ".android.js", ".js", ".json"],
          alias: {
            "@Navigation": "./Sources/Navigation",
            "@Screens": "./Sources/Screens",
            "@App": "./Sources/App",
            "@Animated": "./Sources/Common/Animated",
            "@Common": "./Sources/Common",
            "@Assets": "./Sources/Assets",
            "@Components": "./Sources/Components",
            "@Store": "./Sources/Store",
            "@Services": "./Sources/Services",
            "@Types": "./Sources/Types",
            "@Utils": "./Sources/Utils",
            "@Config": "./Sources/Config",
            "@Themes": "./Sources/Themes",
          },
        },
      ],
    ],
  };
};
