const PROXY_CONFIG = [
  {
    context: [
      "/api/user"
    ],
    target:  "http://localhost:8089",
    secure: false,
    changeOrigin: true,
    logLevel: "info"
  }
]
module.exports = PROXY_CONFIG;
