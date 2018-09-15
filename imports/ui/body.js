import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 
import { Tasks } from '../api/tasks.js';
 
import './task.js';
import './body.html';
 
Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('tasks');
  });
   
  Template.body.helpers({
    tasks() {
      const instance = Template.instance();
      if (instance.state.get('hideCompleted')) {
        // If hide completed is checked, filter tasks
        return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
      }
      // Otherwise, return all of the tasks
      return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
});
 
Template.body.events({
  'click .formsubmit'() {
      // Prevent default browser form submit
      event.preventDefault();
   
      // Get value from form element
      const firstname = newtask.firstname.value;
      const surname = newtask.surname.value;
      const gender = newtask.gender.value;
      const dob = newtask.dob.value;
      const eit = [firstname, surname, gender, dob];
 
    // Insert a task into the collection
    Meteor.call('tasks.insert', eit);
 
    // Clear form
    newtask.firstname.value = '';
    newtask.surname.value = '';
    newtask.gender.value = null;
    newtask.dob.value = null;

  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.newtask.checked);
  },
});