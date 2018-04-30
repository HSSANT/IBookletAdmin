import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';
@Component({
  selector: 'ba-header',
  templateUrl: 'ba-header.html'
})
export class BaHeaderComponent {
  showSearchBar = true;
  placeholder = "Mày đang giấu cái gì đó?";
  searchKeyword = "";
  searchBarTransitionDuratuon = 700;
  timeout: any;
  @ViewChild("searchButton") searchButton: ElementRef;
  @ViewChild("searchInput") searchInput: ElementRef;
  @ViewChild("searchBar") searchBar: ElementRef;
  @ViewChild("headerMain") headerMain: ElementRef;

  showOverlay = "";
  overlayClick = false;
  constructor(private appController: AppControllerProvider) {
  }

  ngAfterViewInit() {
    if (this.searchButton && this.searchInput) {
      this.searchButton.nativeElement.addEventListener('click', () => {
        this.toggleSearch();
      })
      this.searchInput.nativeElement.addEventListener('blur', () => {
        // this.toggleSearch();
      })
    }
    document.addEventListener("click", () => {
      if (!this.overlayClick) {
        this.showOverlay = "";
      } 
      this.overlayClick = false;
    })
  }

  toggleSearch() {
    this.searchInput.nativeElement.classList.toggle('active');
    this.searchButton.nativeElement.classList.toggle('active');
    this.searchBar.nativeElement.classList.toggle('active');
    this.headerMain.nativeElement.classList.toggle('active');
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (this.searchInput.nativeElement.classList.contains('active')) {
        this.searchInput.nativeElement.focus();
      }
    }, this.searchBarTransitionDuratuon);
  }

  toggleActive(overlay: string) {
    if (!this.overlayClick) {
      this.overlayClick = true;
      if (this.showOverlay == overlay) {
        this.showOverlay = "";
      } else {
        this.showOverlay = overlay;
      }
    }
  }

  logOut() {
    this.appController.setRootPage("BaLoginPage");
  }

  onOverlayClick() {
    this.overlayClick = true; 
  }

  search() {
    console.log("Hey i'm searching");
  }

}
