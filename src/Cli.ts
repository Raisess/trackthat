import IConnector, { Tracks } from "./connectors/IConnector";

import Tracker from "./Tracker";
import SedexConnector from "./connectors/Sedex";

export default class Cli {
  private readonly args: Array<string> = process.argv.slice(2);
  private readonly connector: string = this.args[0];
  private readonly code: string = this.args[1];

  public async execute(): Promise<void> {
    console.log(
      `[${this.connector} - ${this.code}]: ${new Date().toLocaleString()}`,
    );
    console.log(await this.fetchConnector());
    console.log("Created by Raisess");
  }

  private async fetchConnector(): Promise<Tracks> {
    const connectors: Array<IConnector> = [new SedexConnector()];

    const connector: IConnector | undefined = connectors.find(
      (c: IConnector) => c.name.toLowerCase() === this.connector.toLowerCase(),
    );

    if (!connector) {
      throw new Error("Invalid connector!");
    }

    const tracker: Tracker = new Tracker(this.code, connector!);

    return tracker.track();
  }
}
