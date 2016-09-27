import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

export const Images = new MongoObservable.Collection('images');
export const Thumbs = new MongoObservable.Collection('thumbs');

function loggedIn(userId) {
  return !!userId;
}

Thumbs.collection.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});

Images.collection.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});