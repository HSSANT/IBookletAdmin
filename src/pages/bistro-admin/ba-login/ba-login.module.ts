import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaLoginPage } from './ba-login';
import { ComponentsModule } from '../../../components/ba-components/components.module';
@NgModule({
  declarations: [
    BaLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(BaLoginPage),
    ComponentsModule
  ],
})
export class BaLoginPageModule { }
