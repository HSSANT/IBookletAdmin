import { Component, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Platform, LoadingController } from 'ionic-angular';
import * as interact from "interactjs";
import { UIComponent } from '../../../providers/bistro-admin/classes/ui-component';
import { IComponentType } from "../../../providers/bistro-admin/interface/i-component-type";
import { Map } from "../../../providers/bistro-admin/classes/map";
import { ComponentType, MapConstrant, FunctionButtonName } from "../../../providers/bistro-admin/app-constant";
import { Utils } from "../../../providers/app-utils";
import { AppControllerProvider } from "../../../providers/bistro-admin/app-controller/app-controller";
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage({
  segment: "restaurant-map-maker/:restId/:restName/:mapId"
})
@Component({
  selector: 'page-restaurant-map-maker',
  templateUrl: 'restaurant-map-maker.html',
})
export class RestaurantMapMakerPage {
  showEditor = true;
  isElementIn = false;
  mapZone: HTMLElement;
  componentTypes: Array<IComponentType> = [];

  selectedMap: Map;
  selectedComponent: UIComponent;
  defaultWidth = 50;
  defaultHeight = 50;
  restId = "";
  restName = "";
  floorId = 1;
  longSize = 1;
  shortSize = 1;

  constructor(public navCtrl: NavController, public domSanitizer: DomSanitizer,
    public navParams: NavParams, public alertCtrl: AlertController, private platform: Platform,
    public modalCtrl: ModalController, public changeDetectorRef: ChangeDetectorRef,
    public toastCtrl: ToastController, public appController: AppControllerProvider,
    public loadingCtrl: LoadingController) {

    this.selectedMap = new Map();
    if (this.navParams.get("restId")) {
      this.restId = this.navParams.get("restId")
    }
    if (this.navParams.get("restName")) {
      this.restName = this.navParams.get("restName")
    }
    this.componentTypes = [
      ComponentType.AREA,
      ComponentType.TABLE,
      ComponentType.DOOR,
      ComponentType.WC,
      ComponentType.KITCHEN,
      ComponentType.BAR,
      ComponentType.RECEPTIONIST,
      ComponentType.STAIR,
      ComponentType.RESTRICT
    ]
  }

  resizeMap() {
    if (this.platform.width() <= 768) {
      this.showEditor = false;
    } else {
      this.showEditor = true;
      //Wait a tick for view rendered
      setTimeout(() => {
        this.mapZone = document.getElementById("map-zone");
        if (this.mapZone) {
          this.mapZone.style.maxWidth = null;
          this.mapZone.style.maxHeight = null;
          //wait another tick
          setTimeout(() => {
            let width = this.mapZone.offsetWidth;
            let height = this.mapZone.offsetHeight;
            this.longSize = this.selectedMap.realWidth;
            this.shortSize = this.selectedMap.realHeight;
            if (this.selectedMap.realWidth < this.selectedMap.realHeight) {
              this.longSize = this.selectedMap.realHeight;
              this.shortSize = this.selectedMap.realWidth;
            }

            let ratio = this.longSize / this.shortSize;
            this.mapZone.style.height = width / ratio + "px";
            this.mapZone.style.maxHeight = width / ratio + "px";
            if (this.selectedMap.currentWidth && this.selectedMap.currentHeight) {
              let ratioWidth = width / this.selectedMap.currentWidth;
              let ratioHeight = (width / ratio) / this.selectedMap.currentHeight;

              this.selectedMap.components.forEach(component => {
                component.width *= ratioWidth;
                component.height *= ratioHeight;
                component.x *= ratioWidth;
                component.y *= ratioHeight;
              });
            }

            console.log("resize", this.selectedMap.currentWidth, this.selectedMap.currentHeight, width, height);

            this.selectedMap.setWidth(width);
            this.selectedMap.setHeight(width / ratio);
          }, 10)
        }
      }, 10)
    }
  }

  ionViewDidEnter() {
    this.mapZone = document.getElementById("map-zone");
    this.platform.resize.subscribe(() => {
      this.resizeMap();
    });
    if (this.navParams.get("mapId")) {
      let mapId = this.navParams.get("mapId");
      console.log("get map by id", this.restId, mapId);
      this.appController.getMapById(this.restId, mapId).then(map => {
        this.selectedMap = map;
        this.appController.getAllComponentInMap(this.restId, this.selectedMap.id, this.selectedMap.componentFactory).then(data => {
          this.selectedMap.components = data;
          if (!(this.selectedMap.realWidth && this.selectedMap.realHeight)) {
            this.showSizeAlert();
          } else {
            this.resizeMap();
          }
        }, error => {
          console.log("error getMapById", error);
        });

      }, error => {
        console.log("load map error");
      });
    } else {
      this.appController.setRootPage("BaRestaurantPage");
    }
    interact('.component-type')
      .draggable({
        // enable inertial throwing
        inertia: false,
        // keep the element within the area of it's parent
        restrict: {
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: (event) => {
          let target = event.target;

          //Add class to target
          target.classList.add('dragging');

          // keep the dragged position in the data-x/data-y attributes
          let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
          let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

          // translate the element
          target.style.webkitTransform =
            target.style.transform =
            'translate(' + x + 'px, ' + y + 'px) rotateZ(-3deg)';

          // update the posiion attributes
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
          this.changeDetectorRef.detectChanges();
        },

        // call this function on every dragend event
        onend: (event) => {
          let target = event.target;
          target.style.webkitTransform =
            target.style.transform = null;
          // target.setAttribute('data-x', 0);
          // target.setAttribute('data-y', 0);
          target.classList.remove("dragging");
          this.changeDetectorRef.detectChanges();
        },
        onstart: (event) => {
          let target = event.target;
          target.setAttribute('data-x', 0);
          target.setAttribute('data-y', 0);
        }
      })

    interact('#map-zone')
      // .on('doubletap', function (event) {
      //   event.currentTarget.classList.toggle('larger-map');
      //   console.log("double tab", event);
      //   event.preventDefault();
      // })
      .dropzone({
        // only accept elements matching this CSS selector
        accept: '.component-type',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.75,

        // listen for drop related events:
        ondropactivate: (event) => {
          event.target.classList.add("dragging");
          this.changeDetectorRef.detectChanges();
        },
        ondragenter: (event) => {
          let dropzoneElement = event.target;
          this.isElementIn = true;
          dropzoneElement.classList.add('dragg-entered');
          this.changeDetectorRef.detectChanges();
        },
        ondragleave: (event) => {
          let dropzoneElement = event.target;
          dropzoneElement.classList.remove('dragg-entered');
          this.isElementIn = false;
          this.changeDetectorRef.detectChanges();
        },
        ondrop: (event) => {
          let targetElement = event.target;
          let relateElement = event.relatedTarget;
          let x = relateElement.offsetLeft + parseFloat(relateElement.getAttribute('data-x')) - targetElement.offsetLeft;
          let y = relateElement.offsetTop + parseFloat(relateElement.getAttribute('data-y')) - targetElement.offsetTop;
          if (x < 0) x = 0;
          if (y < 0) y = 0;
          console.log("ondrop", event, relateElement.getAttribute('data-x'), relateElement.getAttribute('data-y'));
          let type = event.relatedTarget.getAttribute("component");

          this.selectedMap.addComponent(type, null, x, y);

          event.target.classList.remove('dragg-entered');
          this.changeDetectorRef.detectChanges();
        },

        ondropdeactivate: (event) => {
          event.target.classList.remove("dragging");
          this.changeDetectorRef.detectChanges();
        }
      })

    interact('.map-symbol')
      .draggable({
        // enable inertial throwing
        inertia: false,
        // keep the element within the area of it's parent
        restrict: {
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          restriction: "parent"
        },
        onmove: (event) => {
          let target = event.target;
          let index = target.getAttribute('index');
          if (index && this.selectedMap.components[index]) {
            let component = this.selectedMap.components[index];
            this.addElementToArray("dragging", component.classList);
            component.x += event.dx;
            component.y += event.dy;
            this.mapZone.classList.add("dragging");
          }
          this.changeDetectorRef.detectChanges();
        },
        onend: (event) => {
          let target = event.target;
          let index = target.getAttribute('index');
          if (index && this.selectedMap.components[index]) {
            let component = this.selectedMap.components[index];
            this.removeElementFromArray("dragging", component.classList);
            this.mapZone.classList.remove("dragging");
          }
          this.changeDetectorRef.detectChanges();
        }
      })
      .resizable({
        restrict: {
          endOnly: false,
          restriction: "parent"
        },
        edges: { left: true, right: true, bottom: true, top: true }
      })
      .on('resizemove', (event) => {
        console.log("resizemove", event);
        let target = event.target;
        let index = target.getAttribute('index');
        if (index && this.selectedMap.components[index]) {
          let component = this.selectedMap.components[index];
          this.addElementToArray("dragging", component.classList);
          component.x += event["deltaRect"].left;
          component.y += event["deltaRect"].top;
          component.width = event["rect"].width;
          component.height = event["rect"].height;
          this.mapZone.classList.add("dragging");
        }
        this.changeDetectorRef.detectChanges();
      })
      .on('resizeend', (event) => {
        let target = event.target;
        let index = target.getAttribute('index');
        if (index && this.selectedMap.components[index]) {
          let component = this.selectedMap.components[index];
          this.removeElementFromArray("dragging", component.classList);
          this.mapZone.classList.remove("dragging");
        }
        this.changeDetectorRef.detectChanges();
      });
  }

  showSizeAlert() {
    console.log("showSizeAlert", this.selectedMap);

    let alert = this.alertCtrl.create({
      message: "Informe o tamanho atual do estabelecimento",
      inputs: [
        {
          type: "number",
          placeholder: "Largura",
          value: this.selectedMap.realWidth ? this.selectedMap.realWidth + "" : ""
        },
        {
          type: "number",
          placeholder: "Altura",
          value: this.selectedMap.realHeight ? this.selectedMap.realHeight + "" : ""
        }
      ],
      buttons: [
        {
          text: "OK",
          handler: (data) => {
            if (data[0] > 0 && data[1] > 0) {
              console.log(data);
              this.selectedMap.realWidth = +data[0];
              this.selectedMap.realHeight = +data[1];
              this.resizeMap();
            } else {
              let toast = this.toastCtrl.create({
                message: "As dimensões precisam ser maiores do que 0",
                duration: 3000
              })
              toast.present();
              this.showSizeAlert();
            }
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  addElementToArray(element: string, array: Array<string>) {
    let index = array.indexOf(element);
    if (index == -1) {
      array.push(element);
    }
  }

  removeElementFromArray(element: string, array: Array<string>) {
    let index = array.indexOf(element);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  chooseTable() {
    let modal = this.modalCtrl.create("BaChooseTablePage", { table: this.selectedComponent["table"] });
    modal.present();
    modal.onDidDismiss(data => {
      if (data && data.table) {
        this.selectedComponent["table"] = {
          id: data.table.id,
          name: data.table.name
        }
        console.log("selected component", this.selectedComponent);
      }
    })
  }

  selectComponent(component: UIComponent) {
    console.log("select component", component);
    this.selectedComponent = component;
  }

  rotate() {
    this.selectedComponent.doRotate();
  }

  upIndex() {
    this.selectedComponent.upIndex();
  }
  downIndex() {
    this.selectedComponent.downIndex();
  }
  delete() {
    let alert = this.alertCtrl.create({
      message: "Tem certeza que deseja deletar o elemento " + (this.selectedComponent.title || this.selectedComponent.type.name),
      buttons: [{
        text: "Cancelar",
        role: "cancel"
      }, {
        text: "OK",
        handler: () => {
          let index = this.selectedMap.components.findIndex(elm => {
            return elm.id == this.selectedComponent.id;
          });
          if (index > -1) {
            this.selectedMap.components.splice(index, 1);
            this.selectedComponent = null;
          }
        }
      }]
    })
    alert.present();
  }

  edit() {
    let alert = this.alertCtrl.create({
      title: "Editar",
      inputs: [
        {
          type: "text",
          label: "Título",
          placeholder: "Título",
          value: this.selectedComponent["table"] ? this.selectedComponent["table"]["name"] : this.selectedComponent.title
        },
        {
          type: "text",
          label: "Altura",
          placeholder: "Altura",
          value: this.selectedComponent.zIndex + ""
        },
      ],
      buttons: [{
        text: "Cancelar",
        role: "cancel"
      }, {
        text: "OK",
        handler: (event) => {
          let index = this.selectedMap.components.findIndex(elm => {
            return elm.id == this.selectedComponent.id;
          });
          if (index > -1 && event) {
            this.selectedComponent.title = event[0];
            this.selectedComponent.zIndex = event[1];
          }
        }
      }]
    })
    alert.present();
  }

  copy() {
    let alert = this.alertCtrl.create({
      title: "Copiar " + (this.selectedComponent.title ? this.selectedComponent.title : this.selectedComponent.type.name),
      inputs: [{
        name: "quantily",
        placeholder: "Quantidade (1)",
        type: "number",
        value: ""
      }],
      buttons: [{
        text: "Cancelar",
        role: "cancel"
      }, {
        text: "OK",
        handler: (data) => {
          if (data) {
            let quantity = +data["quantily"];
            let name = data["name"];

            if (!Utils.isNumeric(quantity)) {
              quantity = 0;
            }
            if (quantity < 0) quantity = 0;
            if (quantity > 20) quantity = 20;
            this.addMulticomponent(quantity, this.selectedComponent.type.type, (this.selectedComponent.title ? this.selectedComponent.title : undefined),
              this.selectedComponent.width, this.selectedComponent.height);

          }
        }
      }]
    });
    alert.present();
  }

  addButtonClick(type) {
    let alert = this.alertCtrl.create({
      title: " Adicionar Nova  " + type.name,
      inputs: [{
        name: "quantily",
        placeholder: "Quantidade (1)",
        type: "number",
        value: ""
      },
      {
        name: "name",
        placeholder: "Título (" + type.name + ")",
        value: ""
      },
      {
        name: "width",
        placeholder: "Largura (" + this.defaultWidth + ")",
        type: "number",
        value: ""
      },
      {
        name: "height",
        placeholder: "Altura (" + this.defaultHeight + ")",
        type: "number",
        value: ""
      }],
      buttons: [{
        text: "Cancelar",
        role: "cancel"
      }, {
        text: "OK",
        handler: (data) => {
          if (data) {
            let quantity = +data["quantily"];
            let name = data["name"];
            let width = data["width"];
            let height = data["height"];
            quantity = this.validateNumber(quantity, 1, 1, 20);
            width = this.validateNumber(width, this.defaultWidth, 5, 200);
            height = this.validateNumber(height, this.defaultHeight, 5, 200);
            if (!name) {
              name = undefined;
            }
            this.addMulticomponent(quantity, type.type, name, width, height);
          }
        }
      }]
    });
    alert.present();
  }

  addMulticomponent(quantity: number, type: string, title?: string, width?: number, height?: number) {
    let x = 0;
    let y = 0;
    let j = 0;
    let delta = 5;
    for (let i = 0; i < quantity; i++) {
      if ((x + j * delta + this.defaultWidth) > this.mapZone.clientWidth) {
        x += delta;
        j = 0;
      }
      if ((y + j * delta + this.defaultHeight) > this.mapZone.clientHeight) {
        y += delta;
        j = 0;
      }
      this.selectedMap.addComponent(type, title, x + j * delta, y + j * delta, width, height);
      j++;
    }
  }

  validateNumber(input: any, defaultValue: number, min: number, max: number) {
    if (!input || !Utils.isNumeric(+input)) {
      input = defaultValue;
    }
    if (input < min) input = min;
    if (input > max) input = max;
    return input;
  }

  functionButtonClick(button: string) {
    console.log("button", button);
    if (button == FunctionButtonName.BUTTON_REMOVE) {
      let alert = this.alertCtrl.create({
        message: "Tem certeza que deseja sair e perder as alterações feitas?",
        buttons: [{
          text: "Cancelar",
          role: "cancel"
        }, {
          text: "OK",
          handler: () => {
            this.appController.setRootPage("BaFloorMapPage", { restId: this.restId, restName: this.restName })
          }
        }]
      })
      alert.present();
    }
    if (button == FunctionButtonName.BUTTON_CHECK) {
      this.appController.updateMap(this.restId, this.selectedMap.id, {
        width: this.selectedMap.realWidth,
        height: this.selectedMap.realHeight,
        current_width: this.selectedMap.currentWidth,
        current_height: this.selectedMap.currentHeight
      })
      let loading = this.loadingCtrl.create({
        content: "Aguarde",
        dismissOnPageChange: true
      });
      loading.present();
      this.appController.addMapComponent(this.restId, this.selectedMap).then(() => {
        loading.dismiss();
        this.appController.setRootPage("BaFloorMapPage", { restId: this.restId, restName: this.restName });
      }, error => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: "Ocorreu um erro tente novamente mais tarde!",
          duration: 4000
        })
        toast.present();
      });
    }
    if (button == FunctionButtonName.BUTTON_EDIT) {
      this.showSizeAlert();
    }
  }


}
