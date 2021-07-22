const withPlugins = require('next-compose-plugins');
// Treat .mdx files as pages: https://mdxjs.com/getting-started/next
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});
// Webpack Bundle Analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins([
  [
    withMDX,
    {
      pageExtensions: ['js', 'jsx', 'mdx'],
    },
  ],
  withBundleAnalyzer,
]);
