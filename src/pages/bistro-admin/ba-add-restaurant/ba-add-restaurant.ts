import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Restaurant } from '../../../providers/bistro-admin/classes/restaurant';
import { AssetsUrl, FunctionButtonName } from '../../../providers/bistro-admin/app-constant';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';


@IonicPage()
@Component({
  selector: 'page-ba-add-restaurant',
  templateUrl: 'ba-add-restaurant.html',
})
export class BaAddRestaurantPage {
  [x: string]: any;
  restaurant: Restaurant;
  defaultLogo: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appController:AppControllerProvider) {
    this.restaurant = new Restaurant();
    this.defaultLogo = AssetsUrl.DEFAULT_LOGO;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaAddRestaurantPage');
  }
  
  functionButtonClick(button) {
    if (button == FunctionButtonName.BUTTON_CHECK) {      
      this.appController.addRestaurant( this.restaurant).then(success => {
        this.appController.showToast("restaurant adiciona com sucesso");
        this.gotoListFoodPage();
      }, error => {
        this.appController.showToast("Falha ao adicionar promoção por favor tente novamente mais tarde");
        console.log("add Food error", error);
      })
    } else {
      this.gotoListFoodPage();
    }
  }
  

}
