import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Restaurant } from '../../../providers/bistro-admin/classes/restaurant';
import { AssetsUrl } from '../../../providers/bistro-admin/app-constant';


@IonicPage()
@Component({
  selector: 'page-ba-add-restaurant',
  templateUrl: 'ba-add-restaurant.html',
})
export class BaAddRestaurantPage {
  restaurant: Restaurant;
  defaultLogo: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.restaurant = new Restaurant();
    this.defaultLogo = AssetsUrl.DEFAULT_LOGO;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaAddRestaurantPage');
  }

}
