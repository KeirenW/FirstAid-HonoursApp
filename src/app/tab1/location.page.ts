import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapsAnimation, Marker } from '@ionic-native/google-maps';
import { LocationService } from '../services/location/location.service';

@Component({
  selector: 'app-location',
  templateUrl: 'location.page.html',
  styleUrls: ['location.page.scss']
})
export class LocationPage {
  map: GoogleMap;
  currentLocation: ICurrentLocation = {
    lng: 0,
    lat: 0
  };
  marker: Marker;

  constructor(private platform: Platform, public location: LocationService) {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas');

    navigator.geolocation.watchPosition(curPos => {
      this.currentLocation = this.location.currentLocation;
      this.map.addMarker({
        animation: GoogleMapsAnimation.DROP,
        position: this.currentLocation
      });
    }, error => console.log(error.code, ': ', error.message));
    // This is broken.... Make a new marker every time location changes and wrong location???

    this.map.one(GoogleMapsEvent.MAP_READY).then(this.onMapReady.bind(this));
    
  }

  onMapReady() {
    console.log('map is ready!');
    this.location.startTracking();
  }
}

interface ICurrentLocation {
  lat: number;
  lng: number;
}
