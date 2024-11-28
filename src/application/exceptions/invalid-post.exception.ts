export class InvalidPostException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPostException';
  }
}
