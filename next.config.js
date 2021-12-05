const path = require('path');
const { i18n } = require('./next-i18next.config');
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n,
  trailingSlash: true,
  images: {
    domains: ['cdn.pixabay.com', 's3.amazonaws.com'],
  },
  env: {
    SERVER_API: `http://localhost:3000`,
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
