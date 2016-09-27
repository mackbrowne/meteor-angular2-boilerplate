import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import {Thumb, Image} from "../models/image.model";
import { UploadFS } from 'meteor/jalik:ufs';

export const Images = new MongoObservable.Collection<Image>('images');
export const Thumbs = new MongoObservable.Collection<Thumb>('thumbs');

export const ThumbsStore = new UploadFS.store.GridFS({
  collection: Thumbs.collection,
  name: 'thumbs'
});

export const ImagesStore = new UploadFS.store.GridFS({
  collection: Images.collection,
  name: 'images',
  filter: new UploadFS.Filter({
    contentTypes: ['image/*']
  }),
  copyTo: [
    ThumbsStore
  ]
});

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