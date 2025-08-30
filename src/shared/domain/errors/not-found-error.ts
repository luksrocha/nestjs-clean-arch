export class NotFoundError extends Error {
   constructor(public message: string) {
      super('Entity Validation Error');
      this.name = 'NotFoundError';
   }
}
