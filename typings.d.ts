declare module '*.html' {
  const template: string;
  export default template;
}

declare module 'meteor/tmeasday:publish-counts' {
  import { Mongo } from 'meteor/mongo';
  
  interface CountsObject {
    get(publicationName: string): number;
    publish(context: any, publicationName: string, cursor: Mongo.Cursor, options: any): number;
  }

  export const Counts: CountsObject;
}
