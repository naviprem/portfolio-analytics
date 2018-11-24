const PROXY_CONFIG = [
  {
    context: [
      "/portfolio/iextrading",
      "/iextrading"
    ],
    target: "http://localhost:3000",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
