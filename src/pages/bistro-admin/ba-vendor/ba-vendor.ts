import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../../providers/bistro-admin/classes/user';
import { Vendor } from '../../../providers/bistro-admin/classes/vendor';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';
import { AssetsUrl } from '../../../providers/bistro-admin/app-constant';

declare var ClassicEditor: any;

@IonicPage()
@Component({
  selector: 'page-ba-vendor',
  templateUrl: 'ba-vendor.html',
})

export class BaVendorPage {

  user: User;
  vendor: Vendor;
  selectedProvince: number = 2;

  defaultLogo: string = "";
  logoName: string = "Nenhuma imagem selecionada";
  constructor(public navCtrl: NavController, public navParams: NavParams, private appController: AppControllerProvider) {
    this.defaultLogo = AssetsUrl.DEFAULT_LOGO;
  }

  ionViewDidLoad() {
    this.user = this.appController.getUser();
    this.vendor = this.appController.getVendor();
    if (this.vendor.logo) {
      let lastIndex = this.vendor.logo.lastIndexOf("/");
      if (lastIndex > -1) {
        this.logoName = this.vendor.logo.substring(lastIndex + 1, this.vendor.logo.length);
      } else {
        this.logoName = "";
      }
    }
  }

  ionViewDidEnter() {
    let btnSelectImage = <HTMLInputElement>document.getElementById('selectImageBtn');

    if (btnSelectImage) {
      btnSelectImage.addEventListener('change', () => {
        if (btnSelectImage.files && btnSelectImage.files[0]) {
          let reader = new FileReader();
          reader.onload = (event) => {
            this.vendor.logo = (<any>event.target).result;
            this.logoName = btnSelectImage.files[0].name;
          }
          reader.readAsDataURL(btnSelectImage.files[0]);
        }
      })
    }

    let vendorDesc = document.getElementById("vendor-desc");
    ClassicEditor
      .create(vendorDesc)
      .catch(error => {
        console.error(error);
      });
  }

  removeLogo() {
    if (this.vendor)
      this.vendor.logo = "";
    this.logoName = "Nenhuma imagem selecionada";
  }

  functionButtonClick(button) { 
    this.appController.setRootPage("BaDashboardPage");
  }
}
