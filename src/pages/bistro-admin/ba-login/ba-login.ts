import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';
@IonicPage()
@Component({
  selector: 'page-ba-login',
  templateUrl: 'ba-login.html',
})
export class BaLoginPage {
  phone = "";
  password = "";
  retypePass = "";
  loginForm: FormGroup;
  isSubmitted = false;
  phoneErrorMessage = "";
  passwordErrorMessage = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private appController: AppControllerProvider) {
    this.loginForm = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.maxLength(20), Validators.minLength(8), Validators.required, Validators.pattern(/^\d+$/)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.valid) { 
      this.appController.setRootPage("BaDashboardPage");
    } else {
      this.checkForm();
    }
  }

  checkForm() {
    let phoneError = this.loginForm.controls.phone.errors;
    if (phoneError) {
      if (phoneError.hasOwnProperty('required')) {
        this.phoneErrorMessage = "por favor informe o número de telefone";
      } else {
        this.phoneErrorMessage = "telefone inválido";
      }
    }
    let passwordError = this.loginForm.controls.password.errors;
    if (passwordError) {
      if (passwordError.hasOwnProperty('required')) {
        this.passwordErrorMessage = "informe a senha";
      } else {
        this.passwordErrorMessage = "a senha precisa ter pelo menos 6 caracteres";
      }
    }
  }

  gotoRegister() {
    this.navCtrl.setRoot("BaRegisterPage");
    if (this.navCtrl.length() > 1) {
      this.navCtrl.remove(1, this.navCtrl.length() - 1);
    }
  }

}
