import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirebaseStoragePage } from './firebase-storage';

@NgModule({
  declarations: [
    FirebaseStoragePage,
  ],
  imports: [
    IonicPageModule.forChild(FirebaseStoragePage),
  ],
})
export class FirebaseStoragePageModule {}
