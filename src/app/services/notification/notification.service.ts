import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private fcm: FCM) { }

  subscribeToTopic(topic) {
    console.log('subscribing to ', topic);
    this.fcm.subscribeToTopic(topic);
  }
}
