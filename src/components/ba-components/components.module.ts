import { NgModule } from '@angular/core';
import { BaHeaderComponent } from './ba-header/ba-header';
import { IonicPageModule } from 'ionic-angular';
import { BaTitleComponent } from './ba-title/ba-title';
import { BaProgressComponent } from './ba-progress/ba-progress';
import { BaButtonsFunctionComponent } from './ba-buttons-function/ba-buttons-function';
@NgModule({
	declarations: [
		BaHeaderComponent,
		BaTitleComponent,
		BaProgressComponent,
		BaButtonsFunctionComponent
	],
	imports: [IonicPageModule],
	exports: [
		BaHeaderComponent,
		BaTitleComponent,
		BaProgressComponent,
		BaButtonsFunctionComponent
	]
})
export class ComponentsModule { }
