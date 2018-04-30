import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Staff } from '../../../providers/bistro-admin/classes/staff';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';
import { STAFF_ROLE_NAME, STAFF_TYPE_NAME, FunctionButtonName, STAFF_ROLE_FULL } from '../../../providers/bistro-admin/app-constant';
import { Utils } from '../../../providers/app-utils';


@IonicPage({ segment: 'staff-detail/:staffId' })
@Component({
  selector: 'page-ba-staff-detail',
  templateUrl: 'ba-staff-detail.html',
})
export class BaStaffDetailPage {
  staff: Staff;
  restId = "bistro";
  staffId = "";
  roleData = [];
  typeData = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider) {
    this.staff = new Staff();
    for (const key in STAFF_ROLE_FULL) {
      if (STAFF_ROLE_FULL.hasOwnProperty(key)) {
        const element = STAFF_ROLE_FULL[key];
        this.roleData.push({
          id: element.id,
          name: element.name
        })
      }
    }
    for (const key in STAFF_TYPE_NAME) {
      if (STAFF_TYPE_NAME.hasOwnProperty(key)) {
        const element = STAFF_TYPE_NAME[key];
        this.typeData.push({
          id: key,
          name: element
        })
      }
    }
  }

  ionViewDidLoad() {
    if (this.navParams.get("staffId")) {
      this.staffId = this.navParams.get("staffId");
      this.appController.getStaffById(this.restId, this.staffId).then(staff => {
        this.staff = staff;
        console.log(this.staff);
      }, error => {
        console.log("Get staff error", error);
      })
    }
  }

  functionButtonClick(button) {
    if (button == FunctionButtonName.BUTTON_CHECK) {
      if(this.staff.email){
        this.appController.createUserWithEmailAndPassword(this.staff.email).then(data => {
          console.log("create user success", data);
        }, error => {
          console.log("create user error", error);
        }).catch(error => {
          console.log("create user catch error", error);
        })
      }
      
      this.appController.updateStaff(this.restId, this.staffId, {
        name: this.staff.name,
        phone: this.staff.phone,
        birthday: this.staff.birthDay,
        id_card: this.staff.idCard,
        address: this.staff.address,
        addition_information: this.staff.additionInformation,
        staff_role: this.staff.staffRole,
        staff_type: this.staff.staffType,
        email: this.staff.email
      }).then((success) => {
        this.appController.showToast("Chỉnh sửa nhân viên thành công");
      }, error => {
        this.appController.showToast("Chỉnh sửa nhân viên thất bại, vui lòng thử lại sau");
      })
    } else {
      this.gotoListStaffPage();
    }
  }

  gotoListStaffPage() {
    this.appController.setRootPage("BaStaffPage", {
      restId: this.restId
    })
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
    if (result.length == 0) return "Chọn chức vụ";
    return result.join(', ');
  }

  selectRole(role) {
    let index = this.staff.staffRole.indexOf(role);
    if (index > -1) {
      this.staff.staffRole.splice(index, 1);
    }else{
      this.staff.staffRole.push(role);
    }
    console.log(this.staff.staffRole);
  }



}
