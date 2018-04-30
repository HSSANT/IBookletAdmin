import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaFoodsPage } from './ba-foods';
import { ComponentsModule } from '../../../components/ba-components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    BaFoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(BaFoodsPage),
    ComponentsModule, PipesModule
  ],
})
export class BaFoodsPageModule { }
