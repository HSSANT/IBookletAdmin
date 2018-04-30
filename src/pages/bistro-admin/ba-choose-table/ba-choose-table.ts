import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';

export class Floor {
  id: string;
  name: string;
}

export class Table {
  id: string;
  areaId: string;
  areaName: string;
  capacity: number;
  name: string;
  type: number;
}

@IonicPage()
@Component({
  selector: 'page-ba-choose-table',
  templateUrl: 'ba-choose-table.html',
})
export class BaChooseTablePage {
  floors: Array<Floor> = [];
  tables: Array<Table> = [];
  showTables: Array<Table> = [];
  restId = "bistro";
  selectedFloorId: string = "";
  selectedTableId = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appController: AppControllerProvider,
    private viewCtrl: ViewController) {
    this.selectedTableId = navParams.get("table") ? navParams.get("table").id : "";
    console.log("selected table id", this.selectedTableId, this.navParams.get("table"));
  }

  ionViewDidLoad() {
    this.appController.getAllAreaInRestaurant(this.restId).then(data => {
      this.floors = data;
      if (this.floors.length > 0) {
        this.selectedFloorId = this.floors[0].id;
        this.changeFloor();
      }
    })
    this.appController.getAllTableInRestaurant(this.restId).then(data => {
      this.tables = data;
      this.changeFloor();
    })
  }

  changeFloor() {
    console.log(this.tables, this.selectedFloorId);
    this.showTables = this.tables.filter(table => {
      return table.areaId == this.selectedFloorId;
    })
  }

  chooseTable(table) {
    this.selectedTableId = table.id;
    this.viewCtrl.dismiss({ table: table })
  }

}
