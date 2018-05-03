import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import 'firebase/firestore';

import { FirebaseQuery, FirebaseOrder } from '../interface/firebase';
import { Observable } from 'rxjs/Observable';
import { FIREBASE_PATH } from '../app-constant';
import { Map } from '../classes/map';
import { Component } from '@angular/core/src/metadata/directives';
import { UIComponent } from '../classes/ui-component';
import { ProgressControllerProvider } from '../progress-controller/progress-controller';
import { Staff } from '../classes/staff';
import { Food, FoodType } from '../classes/food';
import { FoodCategory } from '../classes/food-category';
import { Table } from '../classes/table';
import { Restaurant } from '../classes/restaurant';

@Injectable()
export class FirebaseServiceProvider {
  db: firebase.firestore.Firestore;
  isUseFakeData = true;
  isTestingPhase = false;
  todayString: string;
  defaultPass: string = "123456";
  constructor(private progressController: ProgressControllerProvider) {
    //main project
    // firebase.initializeApp({
    //   apiKey: "AIzaSyDMEZoEtmor-T166lP9bGCR9FxqQP4eGik",
    //   authDomain: "bistrodancerapp.firebaseapp.com",
    //   databaseURL: "https://bistrodancerapp.firebaseio.com",
    //   projectId: "bistrodancerapp",
    //   storageBucket: "bistrodancerapp.appspot.com",
    //   messagingSenderId: "773087969883"
    // });
    // backup project
    firebase.initializeApp({
      // apiKey: "AIzaSyADH7xZZdoVLadnk4GOux5I5OjDcclrc7c",
      // authDomain: "bistro-backup-e5bc1.firebaseapp.com",
      // databaseURL: "https://bistro-backup-e5bc1.firebaseio.com",
      // projectId: "bistro-backup-e5bc1",
      // storageBucket: "bistro-backup-e5bc1.appspot.com",
      // messagingSenderId: "160393617494"
      apiKey: "AIzaSyCsvPaNQN36cZvnOc4sODuI0F_UESlnWDE",
      authDomain: "ibooklet-b9ff0.firebaseapp.com",
      databaseURL: "https://ibooklet-b9ff0.firebaseio.com",
      projectId: "ibooklet-b9ff0",
      storageBucket: "ibooklet-b9ff0.appspot.com",
      messagingSenderId: "1048756582772"
    });
    this.db = firebase.firestore();
  }

  addDocument(collection: string, value: any, documentId?: string): Promise<any> {
    this.progressController.add();
    if (documentId) {
      value["firebase_id"] = documentId;
      value["id"] = documentId;
      return this.db.collection(collection).doc(documentId).set(value).then(success => {
        this.progressController.subtract();
      }, error => {
        this.progressController.subtract();
      })
    } else {
      let newRef = this.db.collection(collection).doc();
      value["firebase_id"] = newRef.id;
      value["id"] = newRef.id;
      return newRef.set(value).then(success => {
        this.progressController.subtract();
      }, error => {
        this.progressController.subtract();
      })
    }

  }

  getDocument(path: string): Promise<any> {
    this.progressController.add();
    return new Promise((resolve, reject) => {
      this.db.doc(path).get().then(success => {
        if (success.exists) {
          let result = success.data();
          resolve(result);
        } else {
          reject("Bản ghi không tồn tại");
        }
        this.progressController.subtract();
      }, error => {
        this.progressController.subtract();
        reject(error);
      })
    })
  }

  updateDocument(path: string, data: any): Promise<any> {
    this.progressController.add();
    return new Promise((resolve, reject) => {
      this.db.doc(path).update(data).then(success => {
        resolve();
        this.progressController.subtract();
      }, error => {
        this.progressController.subtract();
        reject();
      })
    })
  }

  deleteDocument(path: string): Promise<any> {
    this.progressController.add();
    console.log("delete document", path);
    return new Promise((resolve, reject) => {
      this.db.doc(path).delete().then(success => {
        resolve();
        this.progressController.subtract();
      }, error => {
        this.progressController.subtract();
        reject();
      })
    })
  }

  getCollection(path: string, queries?: Array<FirebaseQuery>, orders?: Array<FirebaseOrder>, limit?: number): Promise<any> {
    this.progressController.add();
    return new Promise((resolve, reject) => {
      let ref = this.db.collection(path) as firebase.firestore.Query;
      if (queries) {
        queries.forEach(query => {
          ref = ref.where(query.field, query.operator, query.value);
        });
      }
      if (orders) {
        orders.forEach(order => {
          ref = ref.orderBy(order.field, order.direction);
        });
      }
      if (limit) {
        ref = ref.limit(limit);
      }
      ref.get().then(querySnapshot => {
        let result = [];
        querySnapshot.forEach(doc => {
          let element = doc.data();
          element.firebase_id = doc.id;
          result.push(element);
        })
        this.progressController.subtract();
        resolve(result);
      }, error => {
        this.progressController.subtract();
        reject(error);
      })
    })
  }

  fetchCollection(path: string, queries?: Array<FirebaseQuery>, orders?: Array<FirebaseOrder>, limit?: number): Observable<any> {
    return Observable.create(observer => {
      //Chú ý rằng trong query chỉ áp dụng range filter cho 1 field (<, >, <=, >=)
      //Nếu query có range filter thì orderBy đầu tiên phải order theo field của range filter đó
      let ref = this.db.collection(path) as firebase.firestore.Query;
      if (queries) {
        queries.forEach(query => {
          ref = ref.where(query.field, query.operator, query.value);
        });
      }
      if (orders) {
        orders.forEach(order => {
          ref = ref.orderBy(order.field, order.direction);
        });
      }
      if (limit) {
        ref = ref.limit(limit);
      }
      ref.onSnapshot(observer);
    });
  }

  fetchAllMapInRestaurant(restId: string): Observable<any> {
    return this.fetchCollection(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.MAP);
  }

  addMapToRestaurant(restId: string, map: Map) {
    return this.addDocument(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.MAP, {
      title: map.title,
      floor_id: map.floorId,
      width: map.realWidth,
      height: map.realHeight
    })
  }

  deleteMap(restId: string, mapId: string) {
    return this.deleteDocument(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.MAP + "/" + mapId);
  }

  updateMap(restId: string, mapId: string, value: any) {
    return this.updateDocument(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.MAP + "/" + mapId, value);
  }

  getMapById(restId: string, mapId: string) {
    return this.getDocument(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.MAP + "/" + mapId);
  }

  getAllComponentInMap(restId: string, mapId: string) {
    return this.getCollection(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.MAP + "/" + mapId + "/" + FIREBASE_PATH.COMPONENT);
  }

  deleteComponentInMap(restId: string, mapId: string, componentId: string) {
    return this.deleteDocument(FIREBASE_PATH.RESTAURANT + "/" + restId + "/"
      + FIREBASE_PATH.MAP + "/" + mapId + "/" + FIREBASE_PATH.COMPONENT + "/" + componentId);
  }

  addComponentToMap(restId: string, mapId: string, component: UIComponent) {
    return this.addDocument(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.MAP + "/" + mapId + "/" + FIREBASE_PATH.COMPONENT, {
      class_list: component.classList,
      height: component.height,
      inner_html: component.innerHtml,
      rotate: component.rotate,
      title: component.title,
      type: component.type,
      width: component.width,
      x: component.x,
      y: component.y,
      z_index: component.zIndex,
      table: component["table"] ? component["table"] : ""
    })
  }

  getAllAreaInRestaurant(restId: string) {
    return this.getCollection(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.AREA);
  }

  getAllTableInRestaurant(restId: string) {
    return this.getCollection(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.TABLE);
  }

  getAllRestaurantInVendor(vendorId: string): Promise<any> {
    return this.getCollection(FIREBASE_PATH.RESTAURANT);
  }

  getAllMapInRestaurant(restId: string): Promise<any> {
    return this.getCollection(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.MAP);
  }

  fetchAllStaffInRestaurant(restId: string): Observable<any> {
    return this.fetchCollection(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.STAFF);
  }

  getStaffByEmail(restId: string, email: string) {
    return this.getCollection(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.STAFF, [{ field: "email", value: email, operator: "==" }]);
  }

  addStaffToRestaurant(restId: string, staff: Staff) {
    return this.addDocument(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.STAFF, {
      birthday: staff.birthDay,
      email: staff.email,
      name: staff.name,
      phone: staff.phone,
      staff_role: staff.staffRole,
      staff_type: staff.staffType,
      user_name: staff.userName,
      address: staff.address,
      addition_information: staff.additionInformation,
      id_card: staff.idCard
    })
  }

  // "rest_id": 1,
  // "Vendor_id ": 1,
  // "restaurant_name": "Common long-nosed armadillo",
  // "restaurant_email": "tvasyanin0@nifty.com",
  // "city": "Mengcheng Chengguanzhen",
  // "image": "68.65.195.45/4",
  // "status": false,
  // "lat": 94,
  // "lng": 81
  addRestaurant(restaurant: Restaurant) {
    return this.addDocument(FIREBASE_PATH.RESTAURANT , {
      address: restaurant.address,
      firebaseId: restaurant.firebaseId,
      firebaseReference: restaurant.firebaseReference,
      geoPoint: restaurant.geoPoint,
      hotline: restaurant.hotline,
      id: restaurant.id,
      logo: restaurant.logo,
      name: restaurant.name,
      state: restaurant.state,
      timeClose: restaurant.timeClose,
      timeOpen: restaurant.timeOpen,
      vendorId: restaurant.vendorId,
      vendorLogo: restaurant.vendorLogo,
      vendorName: restaurant.vendorName
    })
  }

  // this.address = data.address;
  // this.firebaseId = data.firebase_id;
  // this.firebaseReference = data.firebase_reference;
  // this.geoPoint = data.geopoint;
  // this.hotline = data.hotline;
  // this.id = data.id;
  // this.logo = data.logo;
  // this.name = data.name;
  // this.state = +data.state;
  // this.timeClose = data.time_close;
  // this.timeOpen = data.time_open;
  // this.vendorId = data.vendor_id;
  // this.vendorLogo = data.vendor_logo;
  // this.vendorName = data.vendor_name;

  createUserWithEmailAndPassword(email) {
    return firebase.auth().createUserWithEmailAndPassword(email, this.defaultPass);
  }

  getStaffById(restId: string, staffId: string) {
    return this.getDocument(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.STAFF + "/" + staffId);
  }

  updateStaff(restId: string, staffId: string, value: any) {
    return this.updateDocument(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.STAFF + "/" + staffId, value);
  }

  deleteStaff(restId: string, staffId: string) {
    return this.deleteDocument(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.STAFF + "/" + staffId);
  }

  fetchFoodInRestaurant(restId: string) {
    return this.fetchCollection(FIREBASE_PATH.PRODUCT + "/" + restId + "/" + FIREBASE_PATH.FOOD);
  }

  getAllFoodCategories(restId: string) {
    return this.getCollection(FIREBASE_PATH.PRODUCT + "/" + restId + "/" + FIREBASE_PATH.FOOD_CATEGORY);
  }

  addFoodToRestaurant(restId: string, food: Food) {
    return this.addDocument(FIREBASE_PATH.PRODUCT + "/" + restId + "/" + FIREBASE_PATH.FOOD, {
      album_id: food.albumId,
      category: food.category,
      currency: food.currency,
      description: food.description,
      en_name: food.enName,
      firebase_id: food.firebaseId,
      firebase_reference: food.firebaseReference,
      image: food.image,
      name: food.name,
      options: food.options,
      paper: food.paper,
      price: food.price,
      sales: food.sales,
      size: food.size,
      state: food.state,
      type: food.type,
      unit: food.unit,
      time_create: food.timeCreate,
      code: food.code
    })
  }

  getFoodById(restId: string, foodId: string) {
    return this.getDocument(FIREBASE_PATH.PRODUCT + "/" + restId + "/" + FIREBASE_PATH.FOOD + "/" + foodId);
  }

  updateFood(restId: string, foodId: string, value: any) {
    return this.updateDocument(FIREBASE_PATH.PRODUCT + "/" + restId + "/" + FIREBASE_PATH.FOOD + "/" + foodId, value);
  }

  deleteFood(restId: string, foodId: string) {
    return this.deleteDocument(FIREBASE_PATH.PRODUCT + "/" + restId + "/" + FIREBASE_PATH.FOOD + "/" + foodId);
  }

  addFoodCategoryToRestaurant(restId: string, category: FoodCategory) {
    return this.addDocument(FIREBASE_PATH.PRODUCT + "/" + restId + "/" + FIREBASE_PATH.FOOD_CATEGORY, {
      code: category.code,
      name: category.name,
      en_name: category.enName,
      firebase_id: category.firebaseId,
      firebase_reference: category.firebaseReference
    })
  }

  addFoodTypeToRestaurant(restId: string, type: FoodType) {
    return this.addDocument(FIREBASE_PATH.PRODUCT + "/" + restId + "/" + FIREBASE_PATH.FOOD_TYPE, {
      code: type.code,
      name: type.name,
      en_name: type.enName,
      firebase_id: type.firebaseId,
      firebase_reference: type.firebaseReference
    })
  }

  getAllFoodTypeInRestaurant(restId: string) {
    return this.getCollection(FIREBASE_PATH.PRODUCT + "/" + restId + "/" + FIREBASE_PATH.FOOD_TYPE);
  }

  fetchAllTableInRestaurant(restId: string) {
    return this.fetchCollection(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.TABLE);
  }

  addTableToRestaurant(restId: string, table: Table) {
    return this.addDocument(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.TABLE, {
      area_id: table.areaId,
      area_name: table.areaName,
      capacity: table.capacity,
      name: table.name,
      state: table.state,
      type: table.type
    })
  }

  deleteTable(restId: string, tableId: string) {
    return this.deleteDocument(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.TABLE + "/" + tableId);
  }

  getTable(restId: string, tableId: string) {
    return this.getDocument(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.TABLE + "/" + tableId);
  }

  updateTable(restId: string, tableId: string, value: any) {
    return this.updateDocument(FIREBASE_PATH.RESTAURANT + "/" + restId + "/" + FIREBASE_PATH.TABLE + "/" + tableId, value);
  }
}
