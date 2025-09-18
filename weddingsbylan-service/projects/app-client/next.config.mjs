import headerMenues from './src/asstes/headerMenues.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  redirects: async () => {
    // Generate dynamic redirects based on headerMenues
    const routes = headerMenues.map((menu) => {
      return {
        source: '/vn' + menu.Hrefs.en + '/' + ':path*',
        destination: '/vn' + menu.Hrefs.vn + '/' + ':path*', // Assuming you want to redirect to the English version
        permanent: true // Set to true if you want a 308 redirect
      }
    })
    const routeEns = headerMenues.map((menu) => {
      return {
        source: '/en' + menu.Hrefs.vn + '/' + ':path*',
        destination: '/en' + menu.Hrefs.en + '/' + ':path*', // Assuming you want to redirect to the English version
        permanent: true // Set to true if you want a 308 redirect
      }
    })
    return [...routes, ...routeEns]
  },
  async rewrites() {
    // Generate dynamic routes based on headerMenues
    const routes = headerMenues.map((menu) => {
      return {
        source: '/vn' + menu.Hrefs.vn + '/' + ':path*',
        destination: '/vn' + menu.Hrefs.en + '/' + ':path*' // Assuming you want to redirect to the English version
      }
    })
    return [
      {
        source: '/api/:path*',
        //TODO:
        // destination: 'https://security-service-dev.onrender.com/api/:path*', // Forward requests to NestJS server
        // destination: 'https://server-five-rho-78.vercel.app/api/:path*', // Forward requests to NestJS server
        destination: `${process.env.API_URL}:path*` // Forward requests to NestJS server
        // destination: 'http://45.124.94.184/api/:path*', // Forward requests to NestJS server
      },
      {
        source: '/admin/:path*',
        destination: '/admin/:path*'
      },
      ...routes // Include the dynamic routes
    ]
  }
}

export default nextConfig
