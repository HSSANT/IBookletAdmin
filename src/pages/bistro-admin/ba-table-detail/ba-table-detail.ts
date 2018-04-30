import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Table } from '../../../providers/bistro-admin/classes/table';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';
import { TABLE_STATE, FunctionButtonName } from '../../../providers/bistro-admin/app-constant'; 

@IonicPage({ segment: 'ba-table-detail/:tableId/:restId/:restName' })
@Component({
  selector: 'page-ba-table-detail',
  templateUrl: 'ba-table-detail.html',
})
export class BaTableDetailPage {

  table: Table;
  floors = [];
  tableId = "";
  restId = "bistro";
  restName = "";
  tableStates = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider) {
    this.table = new Table();
    this.table.capacity = 2;

    if (this.navParams.get("tableId")) {
      this.tableId = this.navParams.get("tableId");
    }

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaAddTablePage');
    this.loadArea();
    this.loadTable();
  }

  loadTable() {
    this.appController.getTable(this.restId, this.tableId).then(table => {
      this.table = table;
    });
  }

  loadArea() {
    this.appController.getAllAreaInRestaurant(this.restId).then(data => {
      this.floors = data;
    })
  }

  functionButtonClick(button) {
    console.log(button);
    if (button == FunctionButtonName.BUTTON_CHECK) {
      this.appController.updateTable(this.restId, this.tableId, {
        area_id: this.table.areaId,
        area_name: this.table.areaName,
        capacity: this.table.capacity,
        name: this.table.name,
        state: this.table.state,
        type: this.table.type
      }).then(success => {
        this.appController.showToast("Alterações salvas com sucesso!");
      }, error => {
        this.appController.showToast("Ocorreu um erro tente novamente mais tarde");
      })
    } 

    if (button == FunctionButtonName.BUTTON_REMOVE) {
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
