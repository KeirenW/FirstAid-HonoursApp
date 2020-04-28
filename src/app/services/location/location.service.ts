import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  currentLocation: BehaviorSubject<any>;

  constructor(private geoLocation: Geolocation) {
    this.currentLocation = new BehaviorSubject({lat: null, lng: null});
    this.geoLocation.getCurrentPosition().then(pos => {
      this.currentLocation.next({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
      console.log('Forced location check :', this.currentLocation.value);
    }).catch(err => {
      console.log('Error getting location: ', err);
    });
  }

  startTracking() {
    const watch = this.geoLocation.watchPosition();
    console.log('Started location tracking');
    // Everytime location is updated this fires.
    watch.subscribe(data => {
      console.log('TEST');
      if (data.coords.latitude != null || data.coords.longitude != null) {
        this.currentLocation.next(
          {
            lat: data.coords.latitude,
            lng: data.coords.longitude
          }
        );
      }
      console.log('Location :: SERVICE :: ', this.currentLocation.value);
    });
  }

  getCurrentLocation(): Observable<any> {
    return this.currentLocation.asObservable();
  }

  forceLocationUpdate() {
    this.geoLocation.getCurrentPosition();
  }
}
