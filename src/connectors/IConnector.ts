export default interface IConnector {
  readonly name: string;

  track(code: string): Promise<Tracks>;
}

export interface IParser {
  parse(html: HTMLElement): Tracks;
}

export type Track = {
  status: string;
  time: string;
  location?: string;
  origin?: string;
  destiny?: string;
};

export type Tracks = Array<Track>;
