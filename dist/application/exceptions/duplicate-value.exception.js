'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DuplicateValueException = void 0;
class DuplicateValueException extends Error {
  constructor(message) {
    super(message);
    this.name = 'DuplicateValueException';
  }
}
exports.DuplicateValueException = DuplicateValueException;
