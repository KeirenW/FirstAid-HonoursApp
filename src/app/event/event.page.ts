import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FirebaseService } from '../services/firebase/firebase.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { GoogleMaps, GoogleMapsAnimation, GoogleMapsEvent } from '@ionic-native/google-maps';

@Component({
  selector: 'app-event',
  templateUrl: 'event.page.html',
  styleUrls: ['event.page.scss']
})
export class EventPage implements OnInit {
  public user: User;
  public event: any;
  public acceptedResponse: boolean;
  public eventLocation: any;
  public mapReady: boolean;

  constructor(private auth: AuthService, private firestore: FirebaseService, private ffns: AngularFireFunctions) {
    this.user = {
      assignedEvent: {
        uuid: '',
        timestamp: ''
      }
    };
    this.acceptedResponse = null;
    this.event = null;
    this.mapReady = false;
  }

  ngOnInit() {
    this.firestore.getAssignedEventStatus(this.auth.getCurrentUser()).subscribe(user => {
      this.user = user;
      console.log('User assigned event: ', this.user.assignedEvent.uuid);
      if (this.user.assignedEvent.uuid !== null) {
        this.firestore.getAssignedEvent(this.user.assignedEvent.uuid).subscribe(event => {
          this.event = event;
          if (this.event.Responder.length > 1) {
            this.acceptedResponse = true;
            const callable = this.ffns.httpsCallable('getLocation');
            callable({
              key: 'AIzaSyAdm8c2SnqvQGLUjsZCtCDKFNF4rorHeJM',
              location: this.event.Location
            }).subscribe(res => {
              this.eventLocation = JSON.parse(res);
              this.eventLocation = this.eventLocation.results[0].geometry.location;
              const mapOptions = {
                camera: {
                  target: {
                    lat: this.eventLocation.lat,
                    lng: this.eventLocation.lng
                  },
                  zoom: 16
                }
              };
              const map =  GoogleMaps.create('map_canvas', mapOptions);
              const locationMarker = map.addMarkerSync({
                animation: GoogleMapsAnimation.DROP,
                position: {
                  lat: this.eventLocation.lat,
                  lng: this.eventLocation.lng
                }
              });
              map.one(GoogleMapsEvent.MAP_READY).then(this.onMapReady.bind(this));
            });
          }
          console.log('Assigned event: ', this.event);
        });
      }
    });
  }

  onMapReady() {
    this.mapReady = true;
  }

  respondToRequest(answer) {
    if (answer) {
      // Accepted
      console.log('Accepted!');
      this.acceptedResponse = answer;
      this.firestore.acceptEventAssignment(this.event.UUID, this.auth.getCurrentUser());
    } else {
      // Rejected
      console.log('Rejected!');
      this.firestore.rejectEventAssignment(this.event.UUID, this.auth.getCurrentUser());
    }
  }

  signOut() {
    this.auth.cleanThenSignOut();
  }
}

interface User {
  firstName?: string;
  surname?: string;
  active?: boolean;
  email?: string;
  assignedEvent?: {
    uuid: string;
    timestamp: string
  };
  uuid?: string;
  lastLat?: string;
  lastLng?: string;
}
