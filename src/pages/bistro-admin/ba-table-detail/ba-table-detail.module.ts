import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaTableDetailPage } from './ba-table-detail';
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    BaTableDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BaTableDetailPage),
    ComponentsModule
  ],
})
export class BaTableDetailPageModule {}
