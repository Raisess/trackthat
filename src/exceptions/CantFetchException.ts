export default class CantFetchException extends Error {
  constructor(connectorName: string) {
    super();

    this.message = `Can't fetch ${connectorName} API!`;
  }
}
