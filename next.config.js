const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/yeartracker',
        destination: 'https://v0-year-tracker-kdtvebvqvje-sriramkj07-sriramkj07s-projects.vercel.app/'
      }
    ]
  }
}

module.exports = nextConfig
