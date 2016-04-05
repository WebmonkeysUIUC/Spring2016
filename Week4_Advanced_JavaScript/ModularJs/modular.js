// Object Literal
// Using Object Literal instead of vars

// var myModule = {
// 	name: 'Will',
// 	age: 34,
// 	sayName: function() {
// 		alert('Will');
// 	},
// 	setName: function(newName) {
// 		this.name = newName;
// 	}
// };


// Use a self wrapped function, so you don't have any global vars!!!
(function() {

	var people = {
		people: ['Will', 'Laura'],
		template: $('#people-template').html(),
		init: function() {
			this.cacheDom();
			this.bindEvents();
			this.render();
			this.store();
			// this.getStore();
		},
		cacheDom: function() { // Cache DOM elements. More efficient
		// The $var are just named so we know they are jQuery vars
			this.$el = $('#peopleModule');
			this.$button = this.$el.find('button');
			this.$input = this.$el.find('input');
			this.$ul = this.$el.find('ul');
			this.template = this.$el.find('#people-template').html();
		},
		bindEvents: function() {
			this.$button.on('click', this.addPerson.bind(this));
			/* Here is a catch of the keyword this:
				When a eventlistener is called, the keyword this immediately changes to the event you call on.
				So in this case, this no longer refers to the module as we want it to in function addPerson.
				To make it work, we need add .bind(this) when calling addPerson so that the this still refers to the module inside addPerson function.
				!!!
			*/
			// this.$ul.delegate('i.del', 'click', this.deletePerson.bind(this));
			this.$ul.on('click', 'i.del', this.deletePerson.bind(this));
			// !After jQuery 1.7, .on(event, selector, func) is chosen over the .delegate(selector, event, func).
		},

		render: function() {
			this.unStore();
			var data = {
				people: this.people
			};
			this.$ul.html(Mustache.render(this.template, data));
		},
		store: function() {
			localStorage["people"] = JSON.stringify(this.people);
		},
		unStore: function() {
			this.people = JSON.parse(localStorage["people"]);
		},
		addPerson: function() {
			if (this.$input.val() === "") return;
			this.people.push(this.$input.val());
			this.store();
			this.render();
			this.$input.val(''); // Clear input box after adding
		},
		deletePerson: function(event) {
			var $remove = $(event.target).closest('li');
			var i = this.$ul.find('li').index($remove);

			this.people.splice(i,1);
			this.store();
			this.render();
		}
	};

	people.init();

})()