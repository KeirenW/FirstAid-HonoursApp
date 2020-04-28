import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, GoogleMapsAnimation, Marker, LatLng } from '@ionic-native/google-maps';
import { LocationService } from '../services/location/location.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-location',
  templateUrl: 'location.page.html',
  styleUrls: ['location.page.scss']
})
export class LocationPage implements OnInit {
  map: GoogleMap;
  currentLocation: ICurrentLocation = {
    lng: 0,
    lat: 0
  };
  locationMarker: Marker;
  mapOptions: GoogleMapOptions;

  constructor(
    private platform: Platform,
    public location: LocationService,
    public alertController: AlertController,
    private auth: AuthService
  ) {
    // Initially centre map on campus
    this.mapOptions = {
      camera: {
        target: {
          lat: 56.4582,
          lng: -2.9821
        },
        zoom: 12
      }
    };

    this.location.startTracking();
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  ngOnInit(): void {
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', this.mapOptions);
    this.locationMarker = this.map.addMarkerSync({
      animation: GoogleMapsAnimation.DROP,
      position: {
        lat: 0,
        lng: 0
      },
      icon: {
        url: 'assets/location-marker.svg',
        size: {
          width: 20,
          height: 20
        }
      }
    });
    this.map.one(GoogleMapsEvent.MAP_READY).then(this.onMapReady.bind(this));
  }

  onMapReady() {
    console.log('map is ready!');
    this.location.getCurrentLocation().subscribe(res => {
      console.log('LOCATION :: PAGE :: ', res);
      if ( res.lat != null && res.lng != null) {
        this.locationMarker.setPosition(new LatLng(
          res.lat,
          res.lng
        ));
        this.map.moveCamera({
          target: {
            lat: res.lat,
            lng: res.lng
          }
        });
      } else {
        this.alertLocationServicesOff();
      }
    });
  }

  async alertLocationServicesOff() {
    const alert = await this.alertController.create({
      header: 'Unable to get location!',
      message: 'Ensure that location services are enabled in your devices settings.',
      buttons: ['OK']
    });
    await alert.present();
  }

  signOut() {
    this.auth.cleanThenSignOut();
  }
}

interface ICurrentLocation {
  lat: number;
  lng: number;
}
