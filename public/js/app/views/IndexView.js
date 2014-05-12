// IndexView.js
define(["jquery", "backbone", "text!templates/Index.html"],
  function($, Backbone, template){
    var IndexView = Backbone.View.extend({
      el: '[data-role="main"]',
      initialize: function() {
        this.render();
      },
      events: {
      },
      render: function() {
        this.template = _.template(template, {});
        this.$el.html(this.template);
        return this;
      }
    });
    return IndexView;
  }
);
