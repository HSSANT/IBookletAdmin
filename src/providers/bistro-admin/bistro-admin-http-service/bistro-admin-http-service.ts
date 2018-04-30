import { Injectable } from '@angular/core';
import { HttpService, ParamBuilder } from '../../http-service';
import { ToastController, Toast } from 'ionic-angular';
import { AssetsUrl, FakeAPIUrl, APIUrl, ResponseCode, ParamsKey } from '../app-constant';
import 'rxjs/Rx';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class BistroHttpServiceProvider {
  serviceUrl = "http://125.212.192.94:8080/bistro_app/ws";
  toast: Toast = null;
  isUseFakeData = true;
  constructor(private httpService: HttpService, private toastCtrl: ToastController) {
  }

  requestGet(url: string, param: string) {
    return this.httpService.requestGet(url, param).catch(error => {
      console.log("Error in http request GET " + url, error.status);
      // if (error.status == 0) {
      //   if (!this.toast) {
      //     this.toast = this.toastCtrl.create({
      //       message: "No internet connection!",
      //       position: "top"
      //     })
      //     this.toast.present();
      //     setTimeout(() => {
      //       if (this.toast)
      //         this.toast.dismiss();
      //       this.toast = null;
      //     }, 2000)
      //   }
      // }
    });
  }

  requestPost(url: string, param: string) {
    return this.httpService.requestPost(url, param).catch(error => {
      console.log("Error in http request POST " + url, error.status);
      // if (error.status == 0) {
      //   if (!this.toast) {
      //     this.toast = this.toastCtrl.create({
      //       message: "No internet connection!",
      //       position: "top"
      //     })
      //     this.toast.present();
      //     setTimeout(() => {
      //       if (this.toast)
      //         this.toast.dismiss();
      //       this.toast = null;
      //     }, 2000)
      //   }
      // }
    });;
  }

  //Lấy danh sách các tỉnh trong cả nước
  getProvince() {
    if (this.isUseFakeData) return this.requestGet(AssetsUrl.BASE_URL + FakeAPIUrl.PROVINCE, "");
    return this.requestGet(this.serviceUrl + APIUrl.PROVINCE, "");
  }

  //Khach hang dang ky su dung
  postCustomerRegister(firstName: string, lastName: string, email: string, phone: string, password: string) {
    return this.requestPost(this.serviceUrl + APIUrl.CUSTOMER_REGISTER, ParamBuilder.builder()
      .add(ParamsKey.FIRST_NAME, firstName)
      .add(ParamsKey.LAST_NAME, lastName)
      .addIgnoreNull(ParamsKey.EMAIL, email)
      .addIgnoreNull(ParamsKey.PHONE, "")
      .add(ParamsKey.PASSWORD, password)
      .add(ParamsKey.SIGN, Md5.hashStr(email ? email : phone + APIUrl.CLIENT_KEY))
      .build()
    )
  }

  //Khach hang dang nhap bang tai khoan
  postCustomerLoginByAccount(account: string, password: string) {
    return this.requestPost(this.serviceUrl + APIUrl.CUSTOMER_LOGIN_BY_ACCOUNT, ParamBuilder.builder()
      .add(ParamsKey.ACCOUNT, account)
      .add(ParamsKey.PASSWORD, password)
      .add(ParamsKey.SIGN, Md5.hashStr(account + password + APIUrl.CLIENT_KEY))
      .build()
    )
  }

  //Khach hang dang nhap bang openId
  postCustomerLoginByOpenId(openId: string, email: string, firstName: string, lastName: string) {
    return this.requestPost(this.serviceUrl + APIUrl.CUSTOMER_LOGGIN_BY_OPENID, ParamBuilder.builder()
      .add(ParamsKey.OPENID, openId)
      .add(ParamsKey.EMAIL, email)
      .add(ParamsKey.FIRST_NAME, firstName)
      .add(ParamsKey.LAST_NAME, lastName)
      .add(ParamsKey.SIGN, Md5.hashStr(openId + APIUrl.CLIENT_KEY))
      .build()
    )
  }

  //Quan tri vien dang nhap vao he thong
  postUserLogin(userName: string, password: string) {
    return this.requestPost(this.serviceUrl + APIUrl.USER_LOGIN, ParamBuilder.builder()
      .add(ParamsKey.USER_NAME, userName)
      .add(ParamsKey.PASSWORD, password)
      .add(ParamsKey.SIGN, Md5.hashStr(userName + password + APIUrl.CLIENT_KEY))
      .build()
    )
  }

  //Lay danh sach nhan vien
  getStaffList(vendorId: number, restId?: number) {
    return this.requestGet(this.serviceUrl + APIUrl.STAFF_LIST, ParamBuilder.builder()
      .add(ParamsKey.VENDOR_ID, vendorId)
      .addIgnoreNull(ParamsKey.REST_ID, restId)
      .build());
  }

  //Lay danh sach nha hang
  getRestaurantByVendor(vendorId: number, city?: string, keyword?: string) {
    if (this.isUseFakeData) return this.requestGet(AssetsUrl.BASE_URL + FakeAPIUrl.RESTAURANT_LIVE_QUERY, "");
    return this.requestGet(this.serviceUrl + APIUrl.RESTAURANT_LIVE_QUERY, ParamBuilder.builder()
      .add(ParamsKey.VENDOR_ID, vendorId)
      .addIgnoreNull(ParamsKey.CITY, city)
      .addIgnoreNull(ParamsKey.KEYWORD, keyword)
      .build())
  }

  //Lay cac nha hang theo toa do
  getRestaurantByLocation(lat: number, lng: number, range: number) {
    return this.requestGet(this.serviceUrl + APIUrl.RESTAURANT_LIST_LOCATON, ParamBuilder.builder()
      .add(ParamsKey.LAT, lat)
      .add(ParamsKey.LNG, lng)
      .add(ParamsKey.RANGE, range)
      .build());
  }

  //Lay id nha hang theo accesspoint
  getRestaurantByAccesspoint(accesspointMac: string) {
    return this.requestGet(this.serviceUrl + APIUrl.RESTAURANT_ACCESSPOINT_RESTID, ParamBuilder.builder()
      .add(ParamsKey.ACCESSPOINT, accesspointMac)
      .add(ParamsKey.SIGN, Md5.hashStr(accesspointMac + APIUrl.CLIENT_KEY))
      .build())
  }

  // Lay thong tin chi tiet cua nha hang
  getRestaurantDetail(restId: number) {
    if (this.isUseFakeData) {
      return new Promise((resolve, reject) => {
        this.requestGet(AssetsUrl.BASE_URL + FakeAPIUrl.RESTAURANT_DETAIL, "").then(data => {
          console.log("xxx", data);
          if (data && data.content) {
            let restaurants = data.content;
            let index = restaurants.findIndex(elm => {
              return elm.rest_id == restId;
            })
            if (index > -1) {
              let restaurant = restaurants[index];
              resolve({
                "result": 1,
                "content": restaurant
              })
            } else {
              resolve(null);
            }
          } else { 
            reject();
          }
        });
      })
    }
    return this.requestGet(this.serviceUrl + APIUrl.RESTAURANT_DETAIL, ParamBuilder.builder()
      .add(ParamsKey.REST_ID, restId)
      .add(ParamsKey.SIGN, Md5.hashStr(restId + APIUrl.CLIENT_KEY))
      .build())
  }

  //Lay thong tin cac tang cua nha hang
  getFloorInRestaurant(restId: number) {
    if (this.isUseFakeData) {
      return new Promise((resolve, reject) => {
        this.requestGet(AssetsUrl.BASE_URL + FakeAPIUrl.FLOOR, "").then(data => {
          if (data && data.content) {
            let floors = data.content;
            let results = floors.filter(elm => {
              return elm.restId == restId;
            })
            resolve({
              "result": 1,
              "content": results
            });
          } else {
            reject();
          }
        });
      })
    }
    return this.requestGet(this.serviceUrl + APIUrl.RESTAURANT_DETAIL, ParamBuilder.builder()
      .add(ParamsKey.REST_ID, restId)
      .add(ParamsKey.SIGN, Md5.hashStr(restId + APIUrl.CLIENT_KEY))
      .build())
  }

  //Lay thong tin ban do cua 1 tang
  getMapInFloor(floorId: number) {
    if (this.isUseFakeData) {
      return new Promise((resolve, reject) => {
        this.requestGet(AssetsUrl.BASE_URL + FakeAPIUrl.Map, "").then(data => {
          if (data && data.content) {
            let maps = data.content;
            let results = maps.filter(elm => {
              return (elm.floorId == floorId || elm.floorId == 1);
            })
            resolve({
              "result": 1,
              "content": results
            });
          } else {
            reject();
          }
        });
      })
    }
    return this.requestGet(this.serviceUrl + APIUrl.RESTAURANT_DETAIL, ParamBuilder.builder()
      .add(ParamsKey.REST_ID, floorId)
      .add(ParamsKey.SIGN, Md5.hashStr(floorId + APIUrl.CLIENT_KEY))
      .build())
  }

  //Lay thong tin ban do cua 1 tang
  getMapById(mapId: number): Promise<any> {
    if (this.isUseFakeData) {
      return new Promise((resolve, reject) => {
        this.requestGet(AssetsUrl.BASE_URL + FakeAPIUrl.Map, "").then(data => {
          if (data && data.content) {
            let maps = data.content;
            let index = maps.findIndex(elm => {
              return elm.id == mapId;
            })
            if (index > -1) {
              resolve({
                "result": 1,
                "content": maps[index]
              });
            }
          } else {
            reject();
          }
        });
      })
    }
    // return this.requestGet(this.serviceUrl + APIUrl.RESTAURANT_DETAIL, ParamBuilder.builder()
    //   .add(ParamsKey.REST_ID, restId)
    //   .add(ParamsKey.SIGN, Md5.hashStr(restId + APIUrl.CLIENT_KEY))
    //   .build())
  }

  //Lay danh sach, danh muc do an cua nha hang
  getMenuCategory(restId: number) {
    return this.requestGet(this.serviceUrl + APIUrl.MENU_CATEGORY, ParamBuilder.builder()
      .add(ParamsKey.REST_ID, restId)
      .add(ParamsKey.SIGN, Md5.hashStr(restId + APIUrl.CLIENT_KEY))
      .build());
  }

  //Lay danh sach mon an trong thuc don cua nha hang
  getMenuList(restId: number, categoryId: number, isFood: number, keyword: string) {
    return this.requestGet(this.serviceUrl + APIUrl.MENU_LIST_QUERY, ParamBuilder.builder()
      .add(ParamsKey.REST_ID, restId)
      .add(ParamsKey.CATEGORY_ID, categoryId)
      .add(ParamsKey.IS_FOOD, isFood)
      .add(ParamsKey.KEYWORD, keyword)
      .add(ParamsKey.SIGN, Md5.hashStr(restId + APIUrl.CLIENT_KEY))
      .build());
  }

  //Lay danh sach coupon gian gia dang ap dung cho nha hang
  getCouponList(restId: number) {
    return this.requestGet(this.serviceUrl + APIUrl.COUPON_LIST, ParamBuilder.builder()
      .add(ParamsKey.REST_ID, restId)
      .add(ParamsKey.SIGN, Md5.hashStr(restId + APIUrl.CLIENT_KEY))
      .build());
  }

  //Lay danh sach vendor
  getVendorList(provinceId: number, keyword: string) {
    return this.requestGet(this.serviceUrl + APIUrl.VENDOR_LIST, ParamBuilder.builder()
      .add(ParamsKey.PROVINCE_ID, provinceId)
      .add(ParamsKey.KEYWORD, keyword)
      .build());
  }

  //Lay chi tiet thong tin cua vendor
  getVendorDetail(vendorId: number) {
    return this.requestGet(this.serviceUrl + APIUrl.VENDOR_DETAIL, ParamBuilder.builder()
      .add(ParamsKey.VENDOR_ID, vendorId)
      .add(ParamsKey.SIGN, Md5.hashStr(vendorId + APIUrl.CLIENT_KEY))
      .build());
  }
}
