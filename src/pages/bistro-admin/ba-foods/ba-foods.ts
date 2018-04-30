import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Food, FoodType } from '../../../providers/bistro-admin/classes/food';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';
import { FunctionButtonName } from '../../../providers/bistro-admin/app-constant';
import * as XLSX from 'xlsx';
import { FoodCategory } from '../../../providers/bistro-admin/classes/food-category';
@IonicPage()
@Component({
  selector: 'page-ba-foods',
  templateUrl: 'ba-foods.html',
})
export class BaFoodsPage {
  restId: string = "bistro";
  foods: Array<Food> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.appController.fetchFoodInRestaurant(this.restId).subscribe(data => {
      this.appController.mappingFirebaseFetchedData(this.foods, data, Food);
    })
  }

  functionButtonClick(button) {
    if (button == FunctionButtonName.BUTTON_ADD) {
      this.appController.pushPage("BaAddFoodPage", { "restId": this.restId });
    }
    if (button == FunctionButtonName.BUTTON_IMPORT) {
      let modal = this.modalCtrl.create("ChooseFilePage", {
        title: "Selecione um arquivo excel para importar os dados",
        accept: ".xls,.xlsx"
      });
      modal.present();
      modal.onDidDismiss((data) => {
        if (data && data.file) {
          this.appController
          var rABS = true;
          let reader = new FileReader();
          reader.onload = (event) => {
            var data = (<any>event).target.result;
            if (!rABS) data = new Uint8Array(data);
            var workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });
            let firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            let jsonData = XLSX.utils.sheet_to_json(firstSheet);
            let types = [];
            let categories = [];
            for (let i = 9; i < jsonData.length; i++) {
              let row = jsonData[i];
              if (row["MS-9000"]) {
                let food = new Food();

                //Mapping direct data
                food.mappingExcelData(row);

                //Mapping type
                let type = row["MS-9000"].toLowerCase()
                let typeIndex = types.indexOf(type);
                if (typeIndex == -1) {
                  types.push(type);
                  typeIndex = types.length - 1;
                }
                food.type = typeIndex + "";

                //Mapping category
                let category = row["__EMPTY_7"].toLowerCase()
                let categoryIndex = categories.indexOf(category);
                if (categoryIndex == -1) {
                  categories.push(category);
                  categoryIndex = categories.length - 1;
                }
                food.category = categoryIndex + "";

                //Add food to db
                this.appController.addFoodToRestaurant(this.restId, food);
              }
            }

            //Add types
            console.log("start add type", types);
            for (let i = 0; i < types.length; i++) {
              let type = new FoodType();
              type.code = i + "";
              type.name = types[i];
              type.name = type.name.charAt(0).toUpperCase() + type.name.slice(1);
              this.appController.addFoodType(this.restId, type).then(success => {
                console.log("add food type success", type);
              }, error => {
                console.log("add food type error", error, type);
              });
            }

            //Add categories
            console.log("start add categories", categories);
            for (let i = 0; i < categories.length; i++) {
              let category = new FoodCategory();
              category.code = i + "";
              category.name = categories[i];
              category.name = category.name.charAt(0).toUpperCase() + category.name.slice(1);
              this.appController.addFoodCategory(this.restId, category).then(success => {
                console.log("add food category success", category);
              }, error => {
                console.log("add food category error", error, category);
              });
            }
          }
          if (rABS) reader.readAsBinaryString(data.file);
          else reader.readAsArrayBuffer(data.file);
        }
      })
    }
  }

  gotoFoodDetail(food) {
    this.appController.pushPage("BaFoodDetailPage", {
      foodId: food.id
    })
  }

  delete(food) {
    let alert = this.alertCtrl.create({
      message: "Você tem certeza que deseja apagar essa promoção? Não poderá ser desfeito!",
      buttons: [{
        text: "Hủy",
        role: "cancel"
      }, {
        text: "Xóa",
        handler: () => {
          this.appController.deleteFood(this.restId, food.id).then(success => {
            this.appController.showToast("Apagado com Sucesso");
          }, error => {
            this.appController.showToast("Ocorreu um erro tente novamente mais tarde");
          });
        }
      }]
    });
    alert.present();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }
}
