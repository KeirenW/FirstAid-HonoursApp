import { Injectable } from '@angular/core';
import { LatLng } from '@ionic-native/google-maps';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  currentLocation: ICurrentLocation = {
    lat: 0,
    lng: 0,
    timestamp: 0
  };

  constructor() {
  }

  startTracking() {
    console.log('StartTracking() called');
    navigator.geolocation.watchPosition(curPos => {
      this.currentLocation.lat = curPos.coords.latitude;
      this.currentLocation.lng = curPos.coords.longitude;
      this.currentLocation.timestamp = curPos.timestamp;
      console.log(this.currentLocation);
    }, error => console.log(error.code, ': ', error.message));
  }

  getCurrentLocation() {
    return this.currentLocation;
  }
}

interface ICurrentLocation {
  lat: number;
  lng: number;
  timestamp: number;
}
