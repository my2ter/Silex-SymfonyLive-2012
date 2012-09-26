Todo.View.TodoList = (function($) {

    return Backbone.View.extend({
        el: $('#main'),

        events: {
            'click #todo-list .delete': 'deleteTodo',
            'click #todo-list .finish': 'finishTodo'
        },

        initialize: function() {
            this.collection = new Todo.Collection.Todo;
        },

        render: function() {
            $(this.el).html(Twig.render(Todo.Template.TodoList, {
                todos: this.collection.sort().toJSON()
            }));
        },

        deleteTodo: function(e) {
            e.preventDefault();

            if (confirm('Are you sure you want to delete this todo from the list?')) {
                var row = this.$(e.currentTarget).parents('tr:first');
                this.collection.get(row.data('id')).destroy();
                row.remove();
            }
        },

        finishTodo: function(e) {
            e.preventDefault();
            var row = this.$(e.currentTarget).parents('tr:first');
            var todo = this.collection.get(row.data('id'));
            todo.set('is_finished', true);
            todo.save();

            this.render();
        }
    });

})(jQuery);
