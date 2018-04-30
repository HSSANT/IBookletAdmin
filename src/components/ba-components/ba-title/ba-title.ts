import { Component, Input } from '@angular/core';

@Component({
  selector: 'ba-title',
  templateUrl: 'ba-title.html'
})
export class BaTitleComponent {
  @Input()
  title: string = "";
  @Input()
  showTitle = true;
  constructor() { 
  }
  ngAfterViewInit() {
    if (this.title) {
      document.title = this.title;
    } else {
      document.title = "Admin";
    }
  }

}
