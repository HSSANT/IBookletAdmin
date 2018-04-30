import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProgressControllerProvider } from '../../../providers/bistro-admin/progress-controller/progress-controller';

@Component({
  selector: 'ba-progress',
  templateUrl: 'ba-progress.html'
})
export class BaProgressComponent {
  numberOfProgress = 0; //Number ò request at a time
  progressTimeOut = 100000; //Timeout for the life of progress. If out of time, it must be go to hell;
  progress = 0; //Progress 0-100
  timePerequest = 3 //(ms) Add or  remove request will add or minus debounceTime
  debounceTime = 3; //each debounceTime(ms) increase progress by percentPerTime;
  percentPerTime = 0.1;
  isShowProgress = false;
  interval: any;
  timeOut: any;
  animating = false;
  private subscription: Subscription;
  constructor(private progressCtrl: ProgressControllerProvider) {
  }

  ngOnInit() {
    this.subscription = this.progressCtrl.loaderState
      .subscribe((event) => {
        switch (event) {
          case "add": this.addProgress(); break;
          case "subtract": this.subtractProgress(); break;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addProgress() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
      this.animating = false;
    }
    this.timeOut = setTimeout(() => {
      //Set time out to destroy progress
      //set number of request to 1
      this.numberOfProgress = 1;
      //subtract to destroy
      this.subtractProgress();
    }, this.progressTimeOut)
    if (this.isShowProgress) {
      this.debounceTime += this.timePerequest;
    }
    this.isShowProgress = true;
    this.numberOfProgress++;
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.progress < 95)
        this.progress += this.percentPerTime;
    }, this.debounceTime);
  }

  subtractProgress() {
    if (this.interval) clearInterval(this.interval);
    this.numberOfProgress--;
    if (this.numberOfProgress <= 0) {
      this.numberOfProgress == 0;
      //all request are done
      this.animating = true;
      this.progress = 100;
      if (this.timeOut) clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.isShowProgress = false;
        this.progress = 0;
        this.animating = false;
      }, 300)
    } else {
      //Speedup progress
      this.debounceTime -= this.timePerequest;
      if (this.debounceTime < this.timePerequest) this.debounceTime = this.timePerequest;
      this.interval = setInterval(() => {
        if (this.progress < 95)
          this.progress += this.percentPerTime;
      }, this.debounceTime)
    }
  }


}
