import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseFilePage } from './choose-file';

@NgModule({
  declarations: [
    ChooseFilePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseFilePage),
  ],
})
export class ChooseFilePageModule {}
