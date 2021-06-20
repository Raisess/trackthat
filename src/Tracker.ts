import IConnector, { Tracks } from "./connectors/IConnector";

export default class Tracker {
  constructor(
    private readonly code: string,
    private readonly connector: IConnector,
  ) {}

  public async track(): Promise<Tracks> {
    return await this.connector.track(this.code);
  }
}
