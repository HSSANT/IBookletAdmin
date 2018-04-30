import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaChooseTablePage } from './ba-choose-table';

@NgModule({
  declarations: [
    BaChooseTablePage,
  ],
  imports: [
    IonicPageModule.forChild(BaChooseTablePage),
  ],
})
export class BaChooseTablePageModule {}
