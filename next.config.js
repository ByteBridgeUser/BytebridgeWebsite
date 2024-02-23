/** @type {import('next').NextConfig} */

module.exports = {

  reactStrictMode: true,
  trailingSlash: true,

    swcMinify: true,
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    compiler: { styledComponents: { ssr: true } },
    crossOrigin: 'anonymous',
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: "**",
        },
      ],
    },
  webpack(config, { isServer }) {
    // Run custom scripts
    if (isServer) {
      require('./scripts/draco');
    }

    // Import `svg` files as React components
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: { not: [/url/] },
      use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
    });

    // Import videos, models, hdrs, and fonts
    config.module.rules.push({
      test: /\.(mp4|hdr|glb|woff|woff2)$/i,
      type: 'asset/resource',
    });

    // Force url import with `?url`
    config.module.rules.push({
      resourceQuery: /url/,
      type: 'asset/resource',
    });

    // Import `.glsl` shaders
    config.module.rules.push({
      test: /\.glsl$/,
      type: 'asset/source',
    });


    return config;
  }
};
