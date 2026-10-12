const nextConfig = {
  output: 'export',
  trailingSlash: true,
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
