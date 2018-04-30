import { Injectable } from '@angular/core';
import { Restaurant } from "../classes/restaurant";
import { Floor } from "../classes/floor";
import { Vendor } from "../classes/vendor";
import { User } from "../classes/user";
import { Province } from '../classes/province';
import { LatLng } from '../classes/latlng';
import { ProvinceControllerProvider } from "../province-controller/province-controller";
import { ComponentFactory } from "../factories/component-factory/component-factory";
import { UIComponent } from "../classes/ui-component";
import { Map } from "../classes/map";

import { Subject } from 'rxjs/Subject';

@Injectable()
export class RestaurantControllerProvider {
  restaurants: Array<Restaurant> = [];
  private restaurantSubject = new Subject<Array<Restaurant>>();
  private componentFactory = new ComponentFactory();
  public dataChange = this.restaurantSubject.asObservable();

  constructor(private provinceCtrl: ProvinceControllerProvider) {
  }

  updateData(data, vendor?: Vendor, user?: User) {
    this.resetData();
    // if (data && data.length) {
    //   for (let restaurant of data) {
    //     let temUser = user ? user : new User("");
    //     let temVendor = vendor ? vendor : new Vendor(restaurant["vendor_id"], temUser, "");
    //     let temRestaurant = new Restaurant(restaurant["rest_id"]
    //       , temVendor, restaurant["restaurant_name"], restaurant["restaurant_email"],
    //       "", "", this.provinceCtrl.getProvinceByName(restaurant["city"]), "",
    //       new LatLng(restaurant["lat"], restaurant["lng"]));
    //     this.restaurants.push(temRestaurant);
    //   }
    //   this.broadcastChange(this.restaurants);
    // }
  }

  broadcastChange(data) {
    this.restaurantSubject.next(data); 
  }

  resetData() {
    this.restaurants = [];
  }

  getAllRestaurant(): Array<Restaurant> {
    return this.restaurants;
  }

  getRestaurantFromData(data): Restaurant {
    if (!data) return null;
    // let restaurant = new Restaurant(data["rest_id"], data["vendor_id"], data["restaurant_name"], data["restaurant_email"],
    //   data["description"], data["restaurant_address_1"], data["city"], data["phone"], new LatLng(data["lat"], data["lng"]),
    //   data["offer_delivery"], data["offer_collection"], data["delivery_time"], data["options"], data["image"],
    //   data["banners"], data["tables"], data["workinghours"]);
    // return restaurant;
  }

  getFloorFromData(data): Floor {
    if (!data) return null;
    let floor = new Floor(data["id"], data["restId"], data["name"]);
    return floor;
  }

  getMapFromData(data): Map {
    if (!data) return null;
    
    let components: Array<UIComponent> = [];
    if (data["components"]) {
      data["components"].forEach(element => {
        let component = this.componentFactory.getComponent(element["id"], element["type"]["type"], element["title"],
          element["x"], element["y"], element["width"], element["height"], element["zIndex"], element["rotate"]);
        components.push(component);
      });
    }
    // return new Map(data["id"], data["floorId"], data["title"], components, data["numberOfElement"], data["currentWidth"], data["currentWidth"]);
  }

}
