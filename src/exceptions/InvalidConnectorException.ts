export default class InvalidConnectorException extends Error {
  constructor() {
    super();

    this.message = "Invalid connector!";
  }
}
