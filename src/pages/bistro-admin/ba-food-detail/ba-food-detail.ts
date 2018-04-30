import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';
import { Food, FoodType } from '../../../providers/bistro-admin/classes/food';
import { AssetsUrl, FunctionButtonName, FOOD_STATE } from '../../../providers/bistro-admin/app-constant';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { FoodCategory } from '../../../providers/bistro-admin/classes/food-category';

declare var ClassicEditor: any;
@IonicPage({ segment: 'food-detail/:foodId' })
@Component({
  selector: 'page-ba-food-detail',
  templateUrl: 'ba-food-detail.html',
})
export class BaFoodDetailPage {
  restId = "bistro";
  foodId: string = "";
  food: Food;
  defaultLogo: string;
  categories: Array<FoodCategory> = [];
  types: Array<FoodType> = [];
  foodStates = [];
  isLoadedData = false;

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
    if (this.navParams.get("foodId")) {
      this.foodId = this.navParams.get("foodId");
    }
    this.food = new Food();
    this.defaultLogo = AssetsUrl.DEFAULT_LOGO;
    for (const key in FOOD_STATE) {
      if (FOOD_STATE.hasOwnProperty(key)) {
        this.foodStates.push(FOOD_STATE[key]);
      }
    }

  }

  ionViewDidEnter() {
    this.appController.getFoodById(this.restId, this.foodId).then(data => {
      if (data) {
        this.food = data;
        this.isLoadedData = true;
        console.log("food", this.food);
        //Ckeditor
        setTimeout(() => {
          if (this.articleDesc) {
            ClassicEditor
              .create(this.articleDesc.nativeElement)
              .then(editor => {
                this.descriptionEditor = editor;
              })
              .catch(error => {
                console.error(error);
              });
          }
        }, 100)

      }
    }, error => {
      console.log("get food error", error);
    }).catch(error => {
      console.log("get food error", error);
    })

    this.appController.getAllFoodCategory(this.restId).then(data => {
      if (data) {
        this.categories = data;
        console.log(this.categories);
      }
    }, error => {
      console.log("get FoodCategory error", error);
    })

    this.appController.getAllFoodTypeInRestaurant(this.restId).then(data => {
      if (data) this.types = data;
    }, error => {
      console.log("get food type error", error);
    })
  }

  removeLogo() {
    this.food.image = "";
  }

  chooseImage() {
    console.log("choose image");
    let modal = this.modalCtrl.create("FirebaseStoragePage", {
      title: "Escolha uma foto para a promoção"
    });
    modal.present();
    modal.onDidDismiss(data => {
      if (data && data.image) {
        this.food.image = data.image.url;
      }
    })
  }

  functionButtonClick(button) {
    this.food.description = this.descriptionEditor.getData();
    if (button == FunctionButtonName.BUTTON_CHECK) {
      if (this.isLoadedData) {
        this.appController.updateFood(this.restId, this.foodId, {
          image: this.food.image,
          name: this.food.name,
          en_name: this.food.enName,
          description: this.food.description,
          category: this.food.category,
          price: this.food.price,
          unit: this.food.unit,
          state: this.food.state,
          type: this.food.type,
          code: this.food.code
        }).then(success => {
          this.appController.showToast("Promoção alterada");
        }, error => {
          this.appController.showToast("Ocorreu um erro tente novamente mais tarde");
        })
      }
    } else {
      this.gotoListFoodPage();
    }
  }

  gotoListFoodPage() {
    this.appController.setRootPage("BaFoodsPage");
  }

}
