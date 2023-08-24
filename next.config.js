/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'certification-by-unify.s3.amazonaws.com',
      'www.takemefishing.org',
      'picsum.photos',
      'aws-cert-by-unify-assets.s3.amazonaws.com',
      'firebasestorage.googleapis.com',
    ],
  },
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    // load worker files as a urls with `file-loader`
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
            publicPath: '/_next/static/worker',
            outputPath: '/static/worker',
          },
        },
      ],
    })

    return config
  },
}

module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: true,
  },
  ...nextConfig,
};
