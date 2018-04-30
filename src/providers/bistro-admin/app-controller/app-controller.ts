import { Injectable } from '@angular/core';

import { Vendor } from '../classes/vendor';
import { User } from '../classes/user';
import { Province } from '../classes/province';

import { BistroHttpServiceProvider } from '../bistro-admin-http-service/bistro-admin-http-service';
import { ResourceLoader } from '../../resource-loader/resource-loader';
import { RestaurantControllerProvider } from '../restaurant-controller/restaurant-controller';
import { ProvinceControllerProvider } from '../province-controller/province-controller';
import { Restaurant } from '../classes/restaurant';

import { Config } from '../classes/config';
import { AssetsUrl, FIREBASE_CONST } from '../app-constant';

import { Toast, ToastController, App } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Floor } from '../classes/floor';
import { Map } from '../classes/map';
import { FirebaseServiceProvider } from '../firebase-service/firebase-service';
import { Observable } from 'rxjs/Observable';
import { ComponentFactory } from '../factories/component-factory/component-factory';
import { UIComponent } from '../classes/ui-component';
import { Mappingable } from '../interface/mappingable';
import { Staff } from '../classes/staff';
import { FoodCategory } from '../classes/food-category';
import { Food, FoodType } from '../classes/food';
import { Table } from '../classes/table';
@Injectable()
export class AppControllerProvider {

  private toast: Toast;
  private resourceLoader: ResourceLoader;
  private config: Config;
  private menuItemChangeHandler: any;
  private menuItems = [];

  private vendor: Vendor;
  private user: User;

  constructor(
    private toastCtrl: ToastController,
    private app: App,
    private httpService: BistroHttpServiceProvider,
    private restaurantController: RestaurantControllerProvider,
    private provinceController: ProvinceControllerProvider,
    private firebaseService: FirebaseServiceProvider) {
    this.resourceLoader = new ResourceLoader();
    this.config = new Config();
    this.loadConfig().then(() => {
      this.menuItems = this.config.getData(["menu-items"]);
      if (this.menuItemChangeHandler) {
        this.menuItemChangeHandler(this.menuItems);
      }
      this.loadProvince();
      this.loadUser();
    });
  }

  showToast(message: string, duration?: number, position?: string) {
    if (this.toast) {
      this.toast.dismiss();
    }
    this.toast = this.toastCtrl.create({
      message: message,
      duration: duration ? duration : 3000,
      position: position ? position : "bottom"
    });
    this.toast.present();
    this.toast.onDidDismiss(() => {
      this.toast = null;
    })
  }
  hideToast() {
    if (this.toast) {
      this.toast.dismiss();
    }
  }


  loadConfig() {
    return new Promise((resolve, reject) => {
      if (this.config.hasData()) {
        resolve();
      } else {
        this.httpService.requestGet(AssetsUrl.CONFIG, "").then(
          data => {
            this.config.onResponseConfig(data);
            resolve();
          }
        );
      }
    });
  }

  getAppConfig() {
    return this.config;
  }

  getMenuItems() {
    return this.menuItems;
  }

  onMenuItemChange(handler) {
    this.menuItemChangeHandler = handler;
  }

  setRootPage(page: any, param?: any) {
    if (page && page != "") {
      let activeIndex = this.menuItems.findIndex(elm => {
        return elm.active;
      })
      if (activeIndex > -1) {
        if (this.menuItems[activeIndex].page == page) {
          return;
        } else {
          this.menuItems[activeIndex].active = false;
        }
      }
      this.app.getActiveNav().setRoot(page, param);
      for (let item of this.menuItems) {
        if (item.page == page) item.active = true;
      }

    }
  }

  pushPage(page: any, param?: any) {
    if (page && page != "") {
      this.app.getActiveNav().push(page, param);
      for (let item of this.menuItems) {
        item.active = false;
        if (item.page == page) item.active = true;
      }
    }
  }

  setActivePage(page: any) {
    if (page && page != "") {
      let activeIndex = this.menuItems.findIndex(elm => {
        return elm.active;
      })
      if (activeIndex > -1) {
        if (this.menuItems[activeIndex].page == page || this.menuItems[activeIndex].link == page) {
          return;
        } else {
          this.menuItems[activeIndex].active = false;
        }
      }
      for (let item of this.menuItems) {
        if (item.page == page || item.link == page) {
          item.active = true;
        }
      }
    }
  }

  mappingFirebaseFetchedData<T extends Mappingable>(array: Array<T>, data: any, type: (new () => T)) {
    data.docChanges.forEach(change => {
      let elementData = change.doc.data();
      if (change.type == FIREBASE_CONST.DOCUMENT_CHANGE_TYPE.ADD) {
        let element = new type();
        element.mappingFirebaseData(elementData);
        array.push(element);
      }
      if (change.type == FIREBASE_CONST.DOCUMENT_CHANGE_TYPE.MODIFY) {
        let index = array.findIndex(elm => {
          return elm.id == elementData.id;
        })
        if (index > -1) {
          array[index].mappingFirebaseData(elementData);
        }
      }
      if (change.type == FIREBASE_CONST.DOCUMENT_CHANGE_TYPE.REMOVE) {
        let index = array.findIndex(elm => {
          return elm.id == elementData.id;
        })
        if (index > -1) {
          array.splice(index, 1);
        }
      }
    });
  }

  loadUser() {
    this.user = new User("B-Gate", "bgate@gmail.com", "0969696969", "69 Trần Duy Hưng, Cầu Giấy, Hà Nội", "123456");
    this.loadVendor();
  }

  getUser() {
    return this.user;
  }

  loadVendor() {
    this.vendor = new Vendor(1, this.user, "Dancer", "Dancer là chuỗi thương hiệu nhà hàng, quán cà phê sang trọng, đẳng cấp. Đến với Dancer bạn sẽ được trải nghiệm chất lượng phục vụ chuyên nghiệp cùng sản phẩm dịch vụ tuyệt vời.",
      "assets/bistro-admin/images/logo.png", "abc@example.com", "0969696969", "Khu dân cư số 10, Phan Đình Phùng, Tp. Thái Nguyên, Thái Nguyên");
    this.loadRestaurant();
  }

  getVendor() {
    return this.vendor;
  }

  loadRestaurant(city?: Province, keyword?: string) {
    this.httpService.getRestaurantByVendor(this.vendor.id, city ? city.id + '' : null, keyword ? keyword : null).then(data => {
      if (data && data.content)
        this.restaurantController.updateData(data.content, this.vendor, this.user);
    })
  }

  getRestauranById(id: number): Promise<Restaurant> {
    return new Promise((resolve, reject) => {
      this.httpService.getRestaurantDetail(id).then(data => {
        if (data && data.content) {
          resolve(this.restaurantController.getRestaurantFromData(data.content))
        }
        else {
          reject();
        }
      })
    })
  }

  getRestauranController() {
    return this.restaurantController;
  }


  getMapInFloor(floorId: number): Promise<Array<Map>> {
    return new Promise((resolve, reject) => {
      this.httpService.getMapInFloor(floorId).then(data => {
        let maps: Array<Map> = [];
        if (data && data.content) {
          data.content.forEach(element => {
            let map = this.restaurantController.getMapFromData(element);
            maps.push(map);
          });
          resolve(maps);
        }
        else {
          reject();
        }
      })
    })
  }

  deleteFloor(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    })
  }

  editFloor(id: number, name: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    })
  }

  loadProvince() {
    this.httpService.getProvince().then(data => {
      if (data && data.content)
        this.provinceController.updateData(data.content);
    })
  }

  getProvincecontroller() {
    return this.provinceController;
  }

  getAllMapInRestaurant(restId: string): Promise<Array<Map>> {
    return new Promise((resolve, reject) => {
      this.firebaseService.getAllMapInRestaurant(restId).then(data => {
        let result = [];
        if (data) {
          data.forEach(element => {
            let map = new Map();
            map.mappingFirebaseData(element);
            result.push(map);
          });
          resolve(result);
        }
      }, error => {
        reject(error);
      })
    })
  }

  fetchMapInRestaurant(restId: string): Observable<any> {
    return this.firebaseService.fetchAllMapInRestaurant(restId);
  }

  addMapToRestaurant(restId: string, map: Map) {
    return this.firebaseService.addMapToRestaurant(restId, map);
  }

  deleteMaps(restId, mapId: string) {
    return this.firebaseService.deleteMap(restId, mapId);
  }

  updateMap(restId, mapId: string, value: any) {
    return this.firebaseService.updateMap(restId, mapId, value);
  }

  getMapById(restId: string, mapId: string): Promise<Map> {
    return new Promise((resolve, reject) => {
      this.firebaseService.getMapById(restId, mapId).then(data => {
        if (data) {
          let map = new Map();
          map.mappingFirebaseData(data);
          resolve(map);
        } else {
          reject();
        }
      }, error => {
        reject(error);
      })
    })
  }

  addMapComponent(restId: string, map: Map): Promise<any> {
    return new Promise((resolve, reject) => {
      //First delete all exits data in map components
      this.firebaseService.getAllComponentInMap(restId, map.id).then(data => {
        if (data && data.length > 0) {
          let deleteProcess = [];
          data.forEach(componentData => {
            deleteProcess.push(this.firebaseService.deleteComponentInMap(restId, map.id, componentData.id));
          });
          Promise.all(deleteProcess).then(() => {
            //Add new components
            let addProcess = [];
            map.components.forEach(component => {
              addProcess.push(this.firebaseService.addComponentToMap(restId, map.id, component));
            });
            Promise.all(addProcess).then(() => {
              resolve();
            }, error => {
              reject(error);
            });
          })
        } else {
          //Add new components
          let addProcess = [];
          map.components.forEach(component => {
            addProcess.push(this.firebaseService.addComponentToMap(restId, map.id, component));
          });
          Promise.all(addProcess).then(() => {
            resolve();
          }, error => {
            reject(error);
          });
        }
      })
    })

  }

  getAllAreaInRestaurant(restId: string): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.firebaseService.getAllAreaInRestaurant(restId).then(data => {
        if (data && data.length > 0) {
          let areas = [];
          data.forEach(areaData => {
            areas.push({ id: areaData.id, name: areaData.name })
          });
          resolve(areas);
        } else {
          resolve([]);
        }
      }, error => {
        reject(error);
      })
    })
  }
  getAllTableInRestaurant(restId: string): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.firebaseService.getAllTableInRestaurant(restId).then(data => {
        if (data && data.length > 0) {
          let tables = [];
          data.forEach(tableData => {
            let table = {
              id: tableData.id,
              name: tableData.name,
              areaId: tableData.area_id,
              areaName: tableData.area_name,
              capacity: tableData.capacity,
              type: tableData.type
            }
            tables.push(table);
          });
          resolve(tables);
        } else {
          resolve([]);
        }
      }, error => {
        reject(error);
      })
    })
  }

  getAllComponentInMap(restId: string, mapId: string, componentFactory: ComponentFactory): Promise<Array<UIComponent>> {
    return new Promise((resolve, reject) => {
      this.firebaseService.getAllComponentInMap(restId, mapId).then(data => {
        if (data && data.length > 0) {
          let components = [];
          data.forEach(componentData => {
            let component = componentFactory.getComponent(componentData.id, componentData.type.type, componentData.title,
              componentData.x, componentData.y, componentData.width, componentData.height,
              componentData.z_index, componentData.rotate);
            component["table"] = componentData.table;
            components.push(component);
          });
          resolve(components);
        } else {
          resolve([]);
        }
      }, error => {
        reject(error);
      })
    })
  }

  getAllRestaurantInVendor(vendorId: string): Promise<Array<Restaurant>> {
    return new Promise((resolve, reject) => {
      this.firebaseService.getAllRestaurantInVendor(vendorId).then(data => {
        let result = [];
        if (data) {
          data.forEach(element => {
            let restaurant = new Restaurant();
            restaurant.mappingFirebaseData(element);
            result.push(restaurant);
          });
        }
        resolve(result);
      }, error => {
        reject(error);
      });
    })
  }

  fetchStaffInRestaurant(restId: string): Observable<any> {
    return this.firebaseService.fetchAllStaffInRestaurant(restId);
  }

  getStaffByEmail(restId: string, email: string): Promise<Array<Staff>> {
    return new Promise((resolve, reject) => {
      this.firebaseService.getStaffByEmail(restId, email).then(data => {
        let result = [];
        if (data) {
          data.forEach(element => {
            let staff = new Staff();
            staff.mappingFirebaseData(element);
            result.push(staff);
          });
          resolve(result);
        }
      }, error => {
        reject(error);
      })
    })
  }

  addStaffToRestaurant(restId: string, staff: Staff) {
    return this.firebaseService.addStaffToRestaurant(restId, staff);
  }

  createUserWithEmailAndPassword(email: string) {
    return this.firebaseService.createUserWithEmailAndPassword(email);
  }

  getStaffById(restId: string, staffId: string): Promise<Staff> {
    return new Promise((resolve, reject) => {
      this.firebaseService.getStaffById(restId, staffId).then(data => {
        if (data) {
          let staff = new Staff();
          staff.mappingFirebaseData(data);
          resolve(staff);
        } else {
          reject();
        }
      }, error => {
        reject(error);
      })
    })
  }

  updateStaff(restId: string, staffId: string, value: any) {
    return this.firebaseService.updateStaff(restId, staffId, value);
  }

  deleteStaff(restId: string, staffId: string) {
    return this.firebaseService.deleteStaff(restId, staffId);
  }

  fetchFoodInRestaurant(restId: string) {
    return this.firebaseService.fetchFoodInRestaurant(restId);
  }

  getAllFoodCategory(restId: string): Promise<Array<FoodCategory>> {
    return new Promise((resolve, reject) => {
      this.firebaseService.getAllFoodCategories(restId).then(data => {
        if (data) {
          let result = []
          data.forEach(element => {
            let category = new FoodCategory();
            category.mappingFirebaseData(element);
            result.push(category);
          });
          resolve(result);
        }
        else reject();
      }, error => {
        reject(error);
      })
    })
  }

  addFoodToRestaurant(restId: string, food: Food) {
    return this.firebaseService.addFoodToRestaurant(restId, food);
  }

  getFoodById(restId: string, foodId: string): Promise<Food> {
    return new Promise((resolve, reject) => {
      this.firebaseService.getFoodById(restId, foodId).then(data => {
        if (data) {
          let food = new Food();
          food.mappingFirebaseData(data);
          resolve(food);
        } else {
          reject();
        }
      }, error => {
        reject(error);
      })
    })
  }

  updateFood(restId: string, foodId: string, value: any) {
    return this.firebaseService.updateFood(restId, foodId, value);
  }

  deleteFood(restId: string, foodId: string) {
    return this.firebaseService.deleteFood(restId, foodId);
  }

  addFoodCategory(restId: string, category: FoodCategory) {
    return this.firebaseService.addFoodCategoryToRestaurant(restId, category);
  }

  addFoodType(restId: string, type: FoodType) {
    return this.firebaseService.addFoodTypeToRestaurant(restId, type);
  }

  getAllFoodTypeInRestaurant(restId: string): Promise<Array<FoodType>> {
    return new Promise((resolve, reject) => {
      this.firebaseService.getAllFoodTypeInRestaurant(restId).then(data => {
        if (data) {
          let result = []
          data.forEach(element => {
            let type = new FoodType();
            type.mappingFirebaseData(element);
            result.push(type);
          });
          resolve(result);
        }
        else reject();
      });
    })
  }

  fetchTableInRestaurant(restId: string) {
    return this.firebaseService.fetchAllTableInRestaurant(restId);
  }

  addTableToRestaurant(restId: string, table: Table) {
    return this.firebaseService.addTableToRestaurant(restId, table);
  }

  deleteTable(restId: string, tableId: string) {
    return this.firebaseService.deleteTable(restId, tableId);
  }

  getTable(restId: string, tableId: string): Promise<Table> {
    return new Promise((resolve, reject) => {
      return this.firebaseService.getTable(restId, tableId).then(data => {
        if (data) {
          let table = new Table();
          table.mappingFirebaseData(data);
          resolve(table);
        } else {
          reject();
        }
      }, error => {
        reject(error);
      })
    })
  }

  updateTable(restId: string, tableId: string, value: any) {
    return this.firebaseService.updateTable(restId, tableId, value);
  }
}
