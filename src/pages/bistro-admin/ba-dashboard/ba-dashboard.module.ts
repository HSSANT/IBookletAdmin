import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaDashboardPage } from './ba-dashboard';
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    BaDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(BaDashboardPage),
    ComponentsModule
  ],
})
export class BaDashboardPageModule { }
