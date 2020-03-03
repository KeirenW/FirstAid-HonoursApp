import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, MarkerOptions, LatLng } from '@ionic-native/google-maps';
import { LocationService } from '../services/location/location.service';

@Component({
  selector: 'app-location',
  templateUrl: 'location.page.html',
  styleUrls: ['location.page.scss']
})
export class LocationPage {
  map: GoogleMap;
  markerOptions: MarkerOptions;
  currentLocation: LatLng;

  constructor(private platform: Platform, public location: LocationService) {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas');
    // TODO current location, that inbuilt feature with watch
    // navigator.geolocation.getCurrentPosition(location => this.LatLong = location);
    // navigator.geolocation.watchPosition(liveLocation => this.LatLong = liveLocation)
    //  watchPosition can have PositionOptions param w/ timeout (units unsure)

    // Django, bootstrap, users page => CRUD, Update lowest priority atm 'started' 2/3/2020

    this.map.one(GoogleMapsEvent.MAP_READY).then(this.onMapReady.bind(this));
  }

  onMapReady() {
    console.log('map is ready!');
  }
}
