module.exports = {
  devServer: {
    open: true,
    port: "8888",
    clientLogLevel: "warning",
    disableHostCheck: true,
    compress: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    historyApiFallback: true,
    overlay: { warnings: false, errors: true }
  }
};
