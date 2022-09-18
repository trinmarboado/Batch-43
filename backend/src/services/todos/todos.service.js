// Initializes the `todos` service on path `/todos`
const { Todos } = require('./todos.class');
const createModel = require('../../models/todos.model');
const hooks = require('./todos.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/todos', new Todos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('todos');

  service.publish('created', () => { // publish created event
    return [
      app.channel('anonymous')
    ];
  });

  service.publish(() => { // publish all events to all anonymous users
    return [
      app.channel('anonymous')
    ];
  });

  service.hooks(hooks);
};
