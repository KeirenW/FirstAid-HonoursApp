import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';

@Component({
  selector: 'app-location',
  templateUrl: 'location.page.html',
  styleUrls: ['location.page.scss']
})
export class LocationPage {
  map: GoogleMap;
  LatLong = {};
  constructor(private platform: Platform) {
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
