import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Table } from '../../../providers/bistro-admin/classes/table';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';
import { TABLE_STATE, FunctionButtonName } from '../../../providers/bistro-admin/app-constant';


@IonicPage({ segment: 'ba-add-table/:restId' })
@Component({
  selector: 'page-ba-add-table',
  templateUrl: 'ba-add-table.html',
})
export class BaAddTablePage {
  table: Table;
  floors = [];
  restId = "bistro";
  restName = "";
  tableStates = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider) {
    this.table = new Table();
    this.table.capacity = 2;

    if (this.navParams.get("restId")) {
      this.restId = this.navParams.get("restId");
    }
    if (this.navParams.get("restName")) {
      this.restName = this.navParams.get("restName");
    }
    for (const key in TABLE_STATE) {
      if (TABLE_STATE.hasOwnProperty(key)) {
        const element = TABLE_STATE[key];
        this.tableStates.push(element);
      }
    }
    if (this.tableStates.length > 0) {
      this.table.state = this.tableStates[0].id;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaAddTablePage');
    this.loadArea();

  }

  loadArea() {
    this.appController.getAllAreaInRestaurant(this.restId).then(data => {
      this.floors = data;
      if (this.floors.length > 0) {
        this.table.areaId = this.floors[0].id;
        this.table.areaName = this.floors[0].name;
      }
    })
  }

  functionButtonClick(button) {
    if (button == FunctionButtonName.BUTTON_CHECK) {
      this.appController.addTableToRestaurant(this.restId, this.table).then(success => {
        this.appController.showToast("Thêm bàn thành công");
        this.gotoListTable();
      })
    } else {
      this.gotoListTable();
    }
  }

  gotoListTable() {
    this.appController.setRootPage("BaTablesPage", {
      restId: this.restId,
      restName: this.restName
    })
  }

  areaChange(event) {
    let index = this.floors.findIndex(elm => {
      return elm.id == event;
    })
    if (index > -1) {
      this.table.areaName = this.floors[index].name;
    }
  }

}
