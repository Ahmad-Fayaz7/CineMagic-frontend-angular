export interface mapCoordinates {
  latitude: number;
  longitude: number;
}

export interface mapCoordinatesWithMessage extends mapCoordinates {
  message: string;
}
