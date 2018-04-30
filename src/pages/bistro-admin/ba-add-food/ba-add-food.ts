import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';
import { Food, FoodType } from '../../../providers/bistro-admin/classes/food';
import { AssetsUrl, FunctionButtonName, FOOD_STATE } from '../../../providers/bistro-admin/app-constant';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { FoodCategory } from '../../../providers/bistro-admin/classes/food-category';

declare var ClassicEditor: any;
@IonicPage({ segment: 'ba-add-food/:restId' })
@Component({
  selector: 'page-ba-add-food',
  templateUrl: 'ba-add-food.html',
})
export class BaAddFoodPage {
  restId = "bistro";
  food: Food;
  defaultLogo: string;
  categories: Array<FoodCategory> = [];
  types: Array<FoodType> = [];
  foodStates = [];
  descriptionEditor: any;
  @ViewChild("desc") articleDesc: ElementRef;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appController: AppControllerProvider,
    public modalCtrl: ModalController) {
    if (this.navParams.get("restId")) {
      this.restId = this.navParams.get("restId");
    }
    this.food = new Food();
    this.defaultLogo = AssetsUrl.DEFAULT_LOGO;
    for (const key in FOOD_STATE) {
      if (FOOD_STATE.hasOwnProperty(key)) {
        this.foodStates.push(FOOD_STATE[key]);
      }
    }
    this.food.state = FOOD_STATE.AVAILABLE.id;
  }

  ionViewDidEnter() {
    ClassicEditor
      .create(this.articleDesc.nativeElement)
      .then(editor => {
        this.descriptionEditor = editor;
      })
      .catch(error => {
        console.error(error);
      });
    this.appController.getAllFoodCategory(this.restId).then(data => {
      if (data) {
        this.categories = data;
        this.food.category = this.categories[0].code;
      }
    }, error => {
      console.log("get FoodCategory error", error);
    })

    this.appController.getAllFoodTypeInRestaurant(this.restId).then(data=>{
      if(data){
        this.types = data;
        this.food.type = this.types[0].code;
      }
    }, error => {
      console.log("get FoodType error", error);
    })
  }

  removeLogo() {
    this.food.image = "";
  }

  chooseImage() {
    console.log("choose image");
    let modal = this.modalCtrl.create("FirebaseStoragePage", {
      title: "Escolha a foto da promoção"
    });
    modal.present();
    modal.onDidDismiss(data => {
      if (data && data.image) {
        this.food.image = data.image.url;
      }
    })
  }

  functionButtonClick(button) {
    if (button == FunctionButtonName.BUTTON_CHECK) {      
      this.food.description = this.descriptionEditor.getData();
      this.appController.addFoodToRestaurant(this.restId, this.food).then(success => {
        this.appController.showToast("Promoção adiciona com sucesso");
        this.gotoListFoodPage();
      }, error => {
        this.appController.showToast("Falha ao adicionar promoção por favor tente novamente mais tarde");
        console.log("add Food error", error);
      })
    } else {
      this.gotoListFoodPage();
    }
  }

  gotoListFoodPage() {
    this.appController.setRootPage("BaFoodsPage");
  }

}
