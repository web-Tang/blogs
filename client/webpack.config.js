const path = require("path");

const config = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
module.exports = config;
