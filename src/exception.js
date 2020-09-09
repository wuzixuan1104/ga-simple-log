function NotFoundException({ from, message }) {
  this.from = from;
  this.message = message;
  this.name = "NotFoundException";
}

NotFoundException.prototype.toString = () => `${this.name} : "${this.message}"`;

export { NotFoundException };
