import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import {Thumb, Image} from "../models/image.model";

export const Images = new MongoObservable.Collection<Image>('images');
export const Thumbs = new MongoObservable.Collection<Thumb>('thumbs');

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