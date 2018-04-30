import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProgressControllerProvider {
  private loaderSubject = new Subject<string>();
  loaderState = this.loaderSubject.asObservable();

  constructor() {
  }

  add() {
    this.loaderSubject.next("add");
  }
  subtract() {
    this.loaderSubject.next("subtract");
  }
}

