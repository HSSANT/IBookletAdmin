import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-choose-file',
  templateUrl: 'choose-file.html',
})
export class ChooseFilePage {
  title: string = "Selecione um arquivo";
  fileName: string = "";
  file: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    if (this.navParams.get("title")) {
      this.title = this.navParams.get("title");
    }
  }

  ionViewDidLoad() {
    let fileInput = <HTMLInputElement>document.getElementById("selectFile");
    if (fileInput) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files[0]) {
          // let reader = new FileReader();
          // reader.onload = (event) => {
          //   this.vendor.logo = (<any>event.target).result;
          //   this.logoName = btnSelectImage.files[0].name;
          // }
          // reader.readAsDataURL(btnSelectImage.files[0]);
          this.file = fileInput.files[0];
          this.fileName = fileInput.files[0].name;
        }
      })
    }
    if (this.navParams.get("accept") && fileInput) {
      fileInput.setAttribute("accept", this.navParams.get("accept"));
    }
  }

  done() {
    this.viewCtrl.dismiss({ file: this.file });
  }

}
