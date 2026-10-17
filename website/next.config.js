/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath: "/research",
  ...(process.env.NEXT_STATIC_EXPORT === "1" ? { output: "export" } : {}),
  webpack(config) {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm";
    config.output.environment = {
      ...config.output.environment,
      asyncFunction: true,
    };
    return config;
  },
};
