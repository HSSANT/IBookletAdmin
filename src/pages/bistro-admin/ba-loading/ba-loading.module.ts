import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaLoadingPage } from './ba-loading';

@NgModule({
  declarations: [
    BaLoadingPage,
  ],
  imports: [
    IonicPageModule.forChild(BaLoadingPage),
  ],
})
export class BaLoadingPageModule {}
