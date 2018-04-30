import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AppControllerProvider } from "../../../providers/bistro-admin/app-controller/app-controller";
import { Restaurant } from "../../../providers/bistro-admin/classes/restaurant";
import { Floor } from "../../../providers/bistro-admin/classes/floor";
import { FunctionButtonName } from "../../../providers/bistro-admin/app-constant";
import { FirebaseServiceProvider } from '../../../providers/bistro-admin/firebase-service/firebase-service';

@IonicPage({ segment: 'ba-restaurant-map/:id' })
@Component({
  selector: 'page-ba-restaurant-map',
  templateUrl: 'ba-restaurant-map.html',
})
export class BaRestaurantMapPage {
  restaurantName: string = "";
  restaurantId: string = "";
  isLoadDataSuccessfully = false;
  restaurants: Array<Restaurant> = [];
  selectedRestaurant: Restaurant; 
  maxLength = 15;
  floors: Array<Floor> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appController: AppControllerProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidEnter() {      

    if (this.navParams.get("id")) {
      let restaurantId = this.navParams.get("id");
      this.appController.getRestauranById(restaurantId).then(restaurant => {
        let index = this.restaurants.findIndex(elm => {
          return elm.id == restaurantId;
        })
        if (index > -1) {
          this.selectedRestaurant = this.restaurants[index];
        } else {
          this.selectedRestaurant = this.restaurants[0];
        }

        this.loadFloor();
      });
    } else {
      this.appController.setRootPage("BaRestaurantPage");
    }
  }

  loadFloor() {
    // this.appController.getFloorsInRestaurant(this.selectedRestaurant.id).then(data => {
    //   this.floors = data;
    // }, error => {
    // });
  }


  selectRestaurant(restaurant: Restaurant) {
    this.selectedRestaurant = restaurant;
    this.loadFloor();
  }

  addFloor() {
    let alert = this.alertCtrl.create({
      title: "Adicionar Andar",
      inputs: [{
        placeholder: "Título",
        type: "text",
        name: "name"
      }],
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "OK",
          handler: (data) => {
            if (data && data.name) {
              // let floor = new Floor(1, this.selectedRestaurant.id, data.name);
              // this.floors.push(floor);
              // this.selectedRestaurant.floors.push(floor);
            }
          }
        }
      ]
    });
    alert.present();
  }

  functionButtonClick(button: string) {
    if (button == FunctionButtonName.BUTTON_ADD) {
      this.addFloor();
    }
  }

  delete(floor: Floor) {
    let alert = this.alertCtrl.create({
      message: "Tem certeza que deseja apagar: " + floor.name,
      buttons: [{
        text: "Cancelar",
        role: "cancel"
      },
      {
        text: "OK",
        handler: () => {
          let index = this.floors.findIndex(elm => {
            return elm.id == floor.id;
          })
          if (index > -1) {
            this.appController.deleteFloor(floor.id).then(res => {
              if (res) this.floors.splice(index, 1);
            })
          }
        }
      }
      ]
    })
    alert.present();
  }

  editFloor(floor: Floor) {
    let alert = this.alertCtrl.create({
      title: "Editar Andar",
      inputs: [{
        type: "text",
        placeholder: "Título",
        name: "name",
        value: floor.name
      }],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        }, {
          text: "OK",
          handler: (data) => {
            if (data && data.name) {
              this.appController.editFloor(floor.id, data.name).then(res => {
                floor.name = data.name
              })
            }
          }
        }
      ]
    });
    alert.present();
  }

  gotoMap(floor: Floor) {
    this.appController.pushPage("BaFloorMapPage", {
      floorId: floor.id, restId: this.selectedRestaurant.id
    })
  }
}
