import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaTablesPage } from './ba-tables';
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    BaTablesPage,
  ],
  imports: [
    IonicPageModule.forChild(BaTablesPage),
    ComponentsModule
  ],
})
export class BaTablesPageModule {}
