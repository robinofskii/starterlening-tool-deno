export type OsmElement = {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags: { [key: string]: string };
  info: {
    version: number;
    timestamp: number;
    changeset: number;
    uid: number;
    user: string;
  };
};
