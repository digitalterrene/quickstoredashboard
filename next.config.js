/** @type {import('next').NextConfig} */
const nextConfig = {
  // Handling redirects to ensure the breadcrumps work correctly
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      // Wildcard path matching
      {
        source: "/:user_id/suppliers",
        destination: "/:user_id/data/suppliers",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
