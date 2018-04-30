import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Staff } from '../../../providers/bistro-admin/classes/staff';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';
import { FunctionButtonName, STAFF_ROLE_FULL } from '../../../providers/bistro-admin/app-constant';
import * as XLSX from 'xlsx';
@IonicPage()
@Component({
  selector: 'page-ba-staff',
  templateUrl: 'ba-staff.html',
})
export class BaStaffPage {
  staffs: Array<Staff> = [];
  restId: string = "bistro";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController) {
    if (this.navParams.get("restId")) {
      this.restId = this.navParams.get("restId");
    }
  }

  ionViewDidLoad() {
    this.appController.fetchStaffInRestaurant(this.restId).subscribe(data => {
      this.appController.mappingFirebaseFetchedData(this.staffs, data, Staff);
      console.log("fecthed staff data", this.staffs);
    })
  }

  functionButtonClick(button) {
    if (button == FunctionButtonName.BUTTON_ADD) {
      this.appController.pushPage("BaAddStaffPage", { restId: this.restId });
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
            let jsonData = XLSX.utils.sheet_to_json(firstSheet, {
              header: "A"
            });

            for (let i = 2; i < jsonData.length; i++) {
              let row = jsonData[i];
              if (row["B"]) {
                let staff = new Staff();

                //Mapping direct data
                staff.mappingExcelData(row);

                //Mapping role
                let rolesCollection: Map<string, any> = new Map();
                for (const key in STAFF_ROLE_FULL) {
                  if (STAFF_ROLE_FULL.hasOwnProperty(key)) {
                    const element = STAFF_ROLE_FULL[key];
                    rolesCollection.set(element.shortName, element.id);
                  }
                }
                let roles = row["C"].toLowerCase().split(',');
                if (roles.length > 0) {
                  roles.forEach(role => {
                    if (rolesCollection.get(role))
                      staff.staffRole.push(rolesCollection.get(role));
                  });
                }
                //Create user
                this.appController.createUserWithEmailAndPassword(staff.email).then(data => {
                  console.log("create user success", data);
                }, error => {
                  console.log("create user error", error);
                }).catch(error => {
                  console.log("create user catch error", error);
                })

                //Add staff to db
                this.appController.addStaffToRestaurant(this.restId, staff);
              }
            }
          }
          if (rABS) reader.readAsBinaryString(data.file);
          else reader.readAsArrayBuffer(data.file);
        }
      })
    }
  }

  gotoStaffDetail(staff) {
    this.appController.pushPage("BaStaffDetailPage", { "staffId": staff.id });
  }
  delete(staff) {
    let alert = this.alertCtrl.create({
      message: "Tem certeza que deseja deletar o funcionário? Não poderá ser desfeito.",
      buttons: [{
        text: "Cancelar",
        role: "cancel"
      }, {
        text: "Apagar",
        handler: () => {
          this.appController.deleteStaff(this.restId, staff.id).then(success => {
            this.appController.showToast("Apagado com sucesso");
          }, error => {
            this.appController.showToast("Ocorreu um erro tente novamente mais tarde");
          }
          );
        }
      }]
    });
    alert.present();
  }

  getStaffRoles(roles: Array<number>) {
    let rolesCollection: Map<number, string> = new Map();
    for (const key in STAFF_ROLE_FULL) {
      if (STAFF_ROLE_FULL.hasOwnProperty(key)) {
        const element = STAFF_ROLE_FULL[key];
        rolesCollection.set(element.id, element.name);
      }
    }
    let result = [];
    if (roles && roles.length > 0) {
      roles.forEach(role => {
        result.push(rolesCollection.get(role));
      });
    }
    return result.join(', ');

  }


}
