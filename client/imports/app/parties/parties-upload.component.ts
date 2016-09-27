import {Component, OnInit} from '@angular/core';

import template from './parties-upload.component.html';

import { upload } from '../../../../both/methods/images.methods';
import {Subject, Subscription, Observable} from "rxjs";
import {MeteorObservable, ObservableCursor} from "meteor-rxjs";
import {Thumb} from "../../../../both/models/image.model";
import {Thumbs} from "../../../../both/collections/images.collection";

@Component({
  selector: 'parties-upload',
  template
})
export class PartiesUploadComponent implements OnInit {
  fileIsOver: boolean = false;
  uploading: boolean = false;
  files: Subject<string[]> = new Subject<string[]>();
  thumbsSubscription: Subscription;
  thumbs: ObservableCursor<Thumb>;

  constructor() {}

  ngOnInit() {
    this.files.subscribe((filesArray) => {
      MeteorObservable.autorun().zone().subscribe(() => {
        if (this.thumbsSubscription) {
          this.thumbsSubscription.unsubscribe();
          this.thumbsSubscription = undefined;
        }

        this.thumbsSubscription = MeteorObservable.subscribe("thumbs", filesArray).zone().subscribe(() => {
          this.thumbs = Thumbs.find({
            originalStore: 'images',
            originalId: {
              $in: filesArray
            }
          });
        });
      });
    });
  }

  fileOver(fileIsOver: boolean): void {
    this.fileIsOver = fileIsOver;
  }

  onFileDrop(file: File): void {
    this.uploading = true;

    upload(file)
      .then(() => {
        this.uploading = false;
      })
      .catch((error) => {
        this.uploading = false;
        console.log(`Something went wrong!`, error);
      });
  }
}