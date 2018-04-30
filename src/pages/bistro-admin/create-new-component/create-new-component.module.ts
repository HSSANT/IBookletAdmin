import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateNewComponentPage } from './create-new-component';
import { ComponentsModule } from '../../../components/ba-components/components.module';

@NgModule({
  declarations: [
    CreateNewComponentPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateNewComponentPage),
    ComponentsModule
  ],
})
export class CreateNewComponentPageModule { }
