import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaAddTablePage } from './ba-add-table';
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    BaAddTablePage,
  ],
  imports: [
    IonicPageModule.forChild(BaAddTablePage),
    ComponentsModule
  ],
})
export class BaAddTablePageModule { }
