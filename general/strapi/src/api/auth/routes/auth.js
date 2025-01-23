module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/auth/:provider/callback',
      handler: 'github.callback',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
