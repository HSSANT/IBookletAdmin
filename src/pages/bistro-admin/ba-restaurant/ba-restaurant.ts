import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from "../../../providers/bistro-admin/app-controller/app-controller";
import { Restaurant } from '../../../providers/bistro-admin/classes/restaurant';
import { FunctionButtonName } from '../../../providers/bistro-admin/app-constant';


@IonicPage()
@Component({
  selector: 'page-ba-restaurant',
  templateUrl: 'ba-restaurant.html',
})
export class BaRestaurantPage {
  restaurants: Array<Restaurant> = [];
  vendorId = "";
  isDataLoadedSucessfully = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider) {
  }

  ionViewDidLoad() {
    this.appController.getAllRestaurantInVendor(this.vendorId).then(data => {
      this.restaurants = data;
      this.isDataLoadedSucessfully = true;
    }, error => {

    })
  }

  functionButtonClick(button) {
    if (button == FunctionButtonName.BUTTON_ADD) {
      this.appController.pushPage("BaAddRestaurantPage");
    }
  }

  delete(restaurant: Restaurant) {
    let index = this.restaurants.findIndex(elm => {
      return elm.id == restaurant.id;
    })
    if (index > -1) {
      this.restaurants.splice(index, 1);
    }
  }

  gotoRestaurantDetail(restaurantId: number) {
    this.appController.pushPage("BaRestaurantDetailPage", { id: restaurantId });
  }

  gotoMap(restaurant: Restaurant) {
    this.appController.pushPage("BaFloorMapPage", { restId: restaurant.id, restName: restaurant.name });
  }

  gotoTable(restaurant: Restaurant) {
    this.appController.pushPage("BaTablesPage", { restId: restaurant.id, restName: restaurant.name });
  }
}
