module.exports = (api) => {
  api.cache.invalidate(() => process.env.NODE_ENV);
  api.assertVersion("^7.2");
  return {
    "presets": [
      "@babel/preset-react",
      "@babel/preset-env"
    ]
  };
}