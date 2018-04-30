import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaFloorMapPage } from './ba-floor-map';
import { ComponentsModule } from "../../../components/ba-components/components.module"

@NgModule({
  declarations: [
    BaFloorMapPage,
  ],
  imports: [
    IonicPageModule.forChild(BaFloorMapPage),
    ComponentsModule
  ],
})
export class BaFloorMapPageModule { }
