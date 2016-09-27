import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import {Thumb, Image} from "../models/image.model";
import { UploadFS } from 'meteor/jalik:ufs';

export const Images = new MongoObservable.Collection<Image>('images');
export const Thumbs = new MongoObservable.Collection<Thumb>('thumbs');

export const ThumbsStore = new UploadFS.store.GridFS({
  collection: Thumbs.collection,
  name: 'thumbs',
  transformWrite(from, to, fileId, file) {
    // Resize to 32x32
    const gm = require('gm');

    gm(from, file.name)
      .resize(32, 32)
      .gravity('Center')
      .extent(32, 32)
      .quality(75)
      .stream()
      .pipe(to);
  }
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