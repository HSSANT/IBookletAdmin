import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FunctionButtonName } from '../../../providers/bistro-admin/app-constant';
@Component({
  selector: 'ba-buttons-function',
  templateUrl: 'ba-buttons-function.html'
})
export class BaButtonsFunctionComponent {
  @Input()
  showButton: any = {
    buttonEdit: false,
    buttonRemove: false,
    buttonCheck: false
  };
  buttonName: any = {}
  @Output()
  buttonClick = new EventEmitter<string>();

  constructor() {
    this.buttonName = FunctionButtonName;
  }

  click(button: string) {
    this.buttonClick.emit(button);
  }
}
