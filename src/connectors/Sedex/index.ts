import fetch from "node-fetch";
import { JSDOM } from "jsdom";

import IConnector, { Tracks } from "../IConnector";
import SedexConnectorParser from "./Parser";
import CantFetchException from "../../exceptions/CantFetchException";

export default class SedexConnector extends SedexConnectorParser implements IConnector {
  public readonly name: string = "Sedex";

  public async track(code: string): Promise<Tracks> {
    return await this.fetchSedexApiToGetLocation(code);
  }

  private async fetchSedexApiToGetLocation(code: string): Promise<Tracks> {
    const response: any = await fetch(
      `https://rastreadorcorreios.com.br/?rastreio=${code}`,
    );

    if (response.status !== 200) {
      throw new CantFetchException(this.name);
    }

    const html: string = await response.text();
    const jsdom: JSDOM = new JSDOM(html);
    const dom: HTMLDocument = jsdom.window.document;

    return super.parse(
      dom.querySelector(".singlepost")!,
    );
  }
}
