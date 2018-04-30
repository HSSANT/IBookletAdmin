import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaRegisterPage } from './ba-register';
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    BaRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(BaRegisterPage),
    ComponentsModule
  ],
})
export class BaRegisterPageModule {}
