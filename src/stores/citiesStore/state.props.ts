export type City = {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  state: string;
};

export type CityState = {
  cities: City[];
};
