import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaStaffDetailPage } from './ba-staff-detail';
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    BaStaffDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BaStaffDetailPage),
    ComponentsModule
  ],
})
export class BaStaffDetailPageModule {}
