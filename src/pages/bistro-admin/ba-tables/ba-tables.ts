import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Table } from '../../../providers/bistro-admin/classes/table';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';
import { FunctionButtonName, TABLE_STATE } from '../../../providers/bistro-admin/app-constant';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import * as XLSX from 'xlsx';
import { Utils } from '../../../providers/app-utils';

@IonicPage({ segment: 'ba-tables/:restId/:restName' })
@Component({
  selector: 'page-ba-tables',
  templateUrl: 'ba-tables.html',
})
export class BaTablesPage {
  restId = "";
  restName = "";
  tables: Array<Table> = [];
  floors = [];
  floorCollection: Map<string, string> = new Map();
  tableStateCollection: Map<number, string> = new Map();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appController: AppControllerProvider,
    public alertCtrl: AlertController,
    private modalCtrl: ModalController) {
    if (this.navParams.get("restId")) {
      this.restId = this.navParams.get("restId");
    }
    if (this.navParams.get("restName")) {
      this.restName = this.navParams.get("restName");
    }
    for (const key in TABLE_STATE) {
      if (TABLE_STATE.hasOwnProperty(key)) {
        const element = TABLE_STATE[key];
        this.tableStateCollection.set(element.id, element.name);
      }
    }
  }

  ionViewDidLoad() {
    this.appController.fetchTableInRestaurant(this.restId).subscribe(data => {
      this.appController.mappingFirebaseFetchedData(this.tables, data, Table);
    })
    this.appController.getAllAreaInRestaurant(this.restId).then(data => {
      if (data)
        this.floors = data;
      this.floors.forEach(element => {
        this.floorCollection.set(Utils.bodauTiengViet(element.name.toLowerCase()), element.id);
      });
    })
  }

  functionButtonClick(button) {
    if (button == FunctionButtonName.BUTTON_ADD) {
      this.appController.pushPage("BaAddTablePage", {
        restId: this.restId,
        restName: this.restName
      })
    }

    if (button == FunctionButtonName.BUTTON_IMPORT) {
      let modal = this.modalCtrl.create("ChooseFilePage", {
        title: "Escolha um arquivo excel para importar os dados",
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
            let jsonData = XLSX.utils.sheet_to_json(firstSheet, {
              header: "A"
            });

            for (let i = 2; i < jsonData.length; i++) {
              let row = jsonData[i];
              if (row["B"]) {
                let table = new Table();

                //Mapping direct data
                table.mappingExcelData(row);
                if (this.floors[0]) {
                  table.areaId = this.floors[0].id;
                  table.areaName = this.floors[0].name;
                }
                //Mapping area
                if (row["D"]) {
                  let area = Utils.bodauTiengViet(row["D"].toLowerCase());
                  if (this.floorCollection.get(area)) {
                    table.areaId = this.floorCollection.get(area);
                    table.areaName = row["D"];
                  }
                }
                //Add table to db
                this.appController.addTableToRestaurant(this.restId, table);
              }
            }
          }
          if (rABS) reader.readAsBinaryString(data.file);
          else reader.readAsArrayBuffer(data.file);
        }
      })
    }
  }

  gotoTableDetail(table) {
    this.appController.pushPage("BaTableDetailPage", {
      restId: this.restId,
      restName: this.restName,
      tableId: table.id
    })
  }

  delete(table) {
    let alert = this.alertCtrl.create({
      message: "Tem certeza que deseja apagar? Não poderá ser desfeito.",
      buttons: [{
        text: "Cancelar",
        role: "cancel"
      }, {
        text: " Apagar",
        handler: () => {
          this.appController.deleteTable(this.restId, table.id).then(success => {
            this.appController.showToast("Mesa deletada com sucesso!");
            console.log("success", success);
          })
        }
      }]
    })
    alert.present();
  }

  resetAllTableState() {
    let alert = this.alertCtrl.create({
      message: "Tem certeza que deseja resetar o status de todas as mesas? Não poderá ser desfeito.",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        }, {
          text: "OK",
          handler: () => {
            this.tables.forEach(table => {
              this.appController.updateTable(this.restId, table.id, {
                state: TABLE_STATE.NO_ORDER.id
              });
            })
          }
        }
      ]
    })
    alert.present();
  }

}
