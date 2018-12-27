exports.register = function (server, options, next) {
  server.route([
    {
      method: 'GET',
      path: '/static/{param*}',
      handler: {
        directory: {
          path: 'client/static'
        }
      }
    },
    {
      method: 'GET',
      path: '/{path*}',
      handler: {
        file: 'client/index.html'
      }
    },
      {
          method: 'GET',
          path: '/css/{param*}',
          handler: {
              directory: {
                  path: 'client/css'
              }
          }
      },
      {
          method: 'GET',
          path: '/images/{param*}',
          handler: {
              directory: {
                  path: 'client/images'
              }
          }
      },
      {
          method: 'GET',
          path: '/fonts/{param*}',
          handler: {
              directory: {
                  path: 'client/fonts'
              }
          }
      }
  ]);

  next()
};

exports.register.attributes = {
  name: 'base'
};
