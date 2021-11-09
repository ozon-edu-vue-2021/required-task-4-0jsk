module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/_colors.scss";`,
        sassOptions: {
          includePaths: ["@/assets"],
        },
      },
    },
  },
};
