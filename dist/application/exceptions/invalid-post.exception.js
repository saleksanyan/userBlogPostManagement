'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.InvalidPostException = void 0;
class InvalidPostException extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidPostException';
  }
}
exports.InvalidPostException = InvalidPostException;
