import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LatLng } from '@ionic-native/google-maps';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  currentLocation = {
    lat: null,
    lng: null
  };

  constructor(private geoLocation: Geolocation) {
  }

  startTracking() {
    let watch = this.geoLocation.watchPosition();
    watch.subscribe((data) => {
      this.currentLocation.lat = data.coords.latitude;
      this.currentLocation.lng = data.coords.longitude;
      console.log(this.currentLocation);
    });
  }

  getCurrentLocation() {
    return this.currentLocation;
  }
}
