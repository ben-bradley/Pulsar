// Router.js
define([ 'jquery', 'backbone', 'views/MainView', 'views/IndexView' ],
  function($, Backbone, MainView, IndexView) {
    // fire up the router
    var Router = Backbone.Router.extend({
      initialize: function() {
        Backbone.history.start(); // Tells Backbone to start watching for hashchange events
      },
      // All of your Backbone Routes (add more)
      routes: {
        '': 'index' // When there is no hash on the url, the home method is called
      },
      index: function() {
        new IndexView(); // Instantiates a new view which will render the header text to the page
      }
    });
    // Render the Main view
    new MainView();
    // Returns the Router
    return Router;
  }
);
