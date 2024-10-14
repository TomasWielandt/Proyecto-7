export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Cambia el puerto si es necesario
        // target: 'https://proyecto-7.onrender.com',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};
