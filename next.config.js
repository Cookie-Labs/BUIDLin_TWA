// rewrites(), redirects() 참고: https://moon-ga.github.io/next.js/5-using-env/

// module.exports = async (phase, { defaultConfig }) => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
      reactStrictMode: true, // react <React.StrictMode>
      swcMinify: true, // like Terser
    };
    return nextConfig;
// };
