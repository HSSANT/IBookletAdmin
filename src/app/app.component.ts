import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppControllerProvider } from '../providers/bistro-admin/app-controller/app-controller';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = "BaDashboardPage";
  // rootPage: any = "RestaurantMapMakerPage";
  menuItems = [];
  startUpPage = ["BaLoadingPage", "BaLoginPage", "BaRegisterPage"];
 
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private appController: AppControllerProvider,
    private menuCtrl: MenuController,
    private app: App) {
    this.appController.onMenuItemChange((data) => {
      this.menuItems = data;
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }

  ngAfterViewInit() {
    this.menuItems = this.appController.getMenuItems();
    this.app.getActiveNav().viewWillEnter.subscribe(event => { 
      this.appController.setActivePage(event.id);
    })
  }

  gotoMenu(item) {
    this.appController.setRootPage(item.page);
    this.menuCtrl.close();
  }
}

