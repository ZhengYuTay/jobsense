module.exports = {
  plugins: {
    "postcss-cssnext": {
      features: {
        customProperties: {
          warnings: false
        }
      },
      browsers: [
        ">1%",
        "last 4 versions",
        "Firefox ESR",
        "not ie < 9" // React doesn't support IE8 anyway
      ],
      flexbox: "no-2009"
    },
    "postcss-import": {
      path: ["src"]
    }
  }
};
