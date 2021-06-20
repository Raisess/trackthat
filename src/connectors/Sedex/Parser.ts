import { IParser, Tracks, Track } from "../IConnector";

export default class SedexConnectorParser implements IParser {
  public parse(html: HTMLElement): Tracks {
    return this.parseData(this.parseHTML(html));
  }

  private parseHTML(html: HTMLElement): Array<string[]> {
    const statusLines: HTMLCollection = html.children!;
    const temp: Array<string> = (
      Array.from(statusLines) as Array<HTMLElement>
    ).map((statusLine: HTMLElement): string =>
      statusLine.textContent!.replace(/\t/g, ""),
    );

    const relevantData: Array<string[]> = temp
      .filter((v: string): boolean => v !== "")
      .map(
        (v: string): Array<string> =>
          v.split(/\n/).filter((v: string): boolean => v !== ""),
      );

    return relevantData.slice(1);
  }

  private parseData(data: Array<string[]>): Tracks {
    return data.map((itens: Array<string>): Track => {
      const parsedData: Track = {
        status: this.parseItem(itens[0]),
        time: this.parseItem(itens[1]),
      };

      if (itens.length > 3) {
        Object.assign(parsedData, {
          origin: this.parseItem(itens[2]),
          destiny: this.parseItem(itens[3]),
        });
      } else {
        Object.assign(parsedData, { location: this.parseItem(itens[2]) });
      }

      return parsedData;
    });
  }

  private parseItem(item: string): string {
    return item.split(": ").slice(1).join(": ");
  }
}
