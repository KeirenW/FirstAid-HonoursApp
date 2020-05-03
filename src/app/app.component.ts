import { Component } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NotificationService } from './services/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private notif: NotificationService,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.fcm.getToken().then(token => {
      console.log('FCM TOKEN :: ', token);
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      console.log('FCM TOKEN REFRESHED :: ', token);
    });

    this.notif.subscribeToTopic('test');

    this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
        this.router.navigateByUrl('app/tabs/event');
      }
    });
  }
}
