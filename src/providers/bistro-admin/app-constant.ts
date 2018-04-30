export class AssetsUrl {
    public static BASE_URL: string = "assets/bistro-admin";
    public static CONFIG: string = "assets/bistro-admin/data/app-config.json";
    public static DEFAULT_LOGO = "assets/bistro-admin/images/no-image-icon.png";
}

export class FakeAPIUrl {
    public static PROVINCE: string = "/data/province.json";
    public static RESTAURANT_LIVE_QUERY: string = "/data/restaurant.json";
    public static RESTAURANT_DETAIL: string = "/data/restaurant-detail.json";
    public static FLOOR: string = "/data/floor.json";
    public static Map: string = "/data/map.json";
}

export class APIUrl {
    public static CLIENT_KEY: string = "Hello, its me";
    public static GEOCODE_URL: string = "http://maps.googleapis.com/maps/api/geocode/json?latlng=$latlng&sensor=true";
    public static PROVINCE: string = "/app/provinces";
    public static CUSTOMER_REGISTER: string = "/customer/register";
    public static CUSTOMER_LOGIN_BY_ACCOUNT: string = "/customer/login/account";
    public static CUSTOMER_LOGGIN_BY_OPENID: string = "/customer/login/openid";
    public static USER_LOGIN: string = "/user/login";
    public static STAFF_LIST: string = "/staff/list";
    public static RESTAURANT_LIVE_QUERY: string = "/restaurant/live/query";
    public static RESTAURANT_LIST_LOCATON: string = "/restaurant/list/locations";
    public static RESTAURANT_ACCESSPOINT_RESTID: string = "/restaurant/accesspoint/rest_id";
    public static RESTAURANT_DETAIL: string = "/restaurant_detail";
    public static MENU_CATEGORY: string = "/menu/categories";
    public static MENU_LIST_QUERY: string = "/menu/list/query";
    public static COUPON_LIST: string = "/coupon/list";
    public static VENDOR_LIST: string = "/vendor/list";
    public static VENDOR_DETAIL: string = "/vendor/detail";
}

export class ParamsKey {
    public static FIRST_NAME: string = "first_name";
    public static LAST_NAME: string = "last_name";
    public static EMAIL: string = "email";
    public static PHONE: string = "phone";
    public static PASSWORD: string = "password";
    public static SIGN: string = "sign";
    public static ACCOUNT: string = "account";
    public static OPENID: string = "openid";
    public static USER_NAME: string = "user_name";
    public static VENDOR_ID: string = "vendor_id";
    public static REST_ID: string = "rest_id";
    public static CITY: string = "city";
    public static KEYWORD: string = "keyword";
    public static LAT: string = "lat";
    public static LNG: string = "lng";
    public static RANGE: string = "range";
    public static ACCESSPOINT: string = "accesspoint";
    public static CATEGORY_ID: string = "category_id";
    public static IS_FOOD: string = "is_food";
    public static PROVINCE_ID: string = "province_id";
}

export class ResponseCode {
    public static ERROR_CODE: number = 0;
    public static SUCCESS_CODE: number = 1;
}

export class FunctionButtonName {
    public static BUTTON_ADD: string = "buttonAdd";
    public static BUTTON_EDIT: string = "buttonEdit";
    public static BUTTON_DELETE: string = "buttonDelete";
    public static BUTTON_REMOVE: string = "buttonRemove";
    public static BUTTON_CHECK: string = "buttonCheck";
    public static BUTTON_IMPORT: string = "buttonImport";
}

import { IComponentType } from "../bistro-admin/interface/i-component-type";
export class ComponentType {
    public static UI_COMPONENT: IComponentType = {
        type: "component",
        name: "Phần tử"
    }
    public static AREA: IComponentType = {
        type: "area",
        name: "Khu vực"
    }
    public static TABLE: IComponentType = {
        type: "table",
        name: "Bàn"
    }
    public static DOOR: IComponentType = {
        type: "door",
        name: "Cửa"
    }
    public static WC: IComponentType = {
        type: "wc",
        name: "Nhà vệ sinh"
    }
    public static KITCHEN: IComponentType = {
        type: "kitchen",
        name: "Bếp"
    }
    public static BAR: IComponentType = {
        type: "bar",
        name: "Quầy bar"
    }
    public static RECEPTIONIST: IComponentType = {
        type: "receptionist",
        name: "Thu ngân"
    }
    public static STAIR: IComponentType = {
        type: "stair",
        name: "Cầu thang"
    }
    public static RESTRICT: IComponentType = {
        type: "restrict",
        name: "Khu vực cấm"
    }
}

export class MapConstrant {
    public static WIDTH: number = 31;
    public static HEIGHT: number = 20;
}

export const FIREBASE_PATH = {
    RESTAURANT: "restaurants",
    MAP: "maps",
    COMPONENT: "components",
    AREA: "areas",
    TABLE: "tables",
    STAFF: "staffs",
    PRODUCT: "products",
    FOOD: "foods",
    FOOD_CATEGORY: "food_categories",
    FOOD_TYPE: "food_types",
}
export const FIREBASE_CONST = {
    DOCUMENT_CHANGE_TYPE: {
        ADD: "added",
        MODIFY: "modified",
        REMOVE: "removed"
    }
}

export const STAFF_ROLE = {
    CHEF: 1,
    BAR: 8,
    WAITER: 2,
    ORDER: 3,
    RECEPTIONIST: 4,
    MANAGER: 5,
    SUPERVISOR: 6,
    SECURITY: 7
}

export const STAFF_ROLE_FULL = {
    CHEF: {
        id: 1,
        name: "Đầu bếp",
        shortName: "bếp"
    },
    BAR: {
        id: 8,
        name: "Nhân viên pha chế",
        shortName: "bar"
    },
    WAITER: {
        id: 2,
        name: "Nhân viên chạy bàn",
        shortName: "waiter"
    },
    ORDER: {
        id: 3,
        name: "Nhân viên ghi order",
        shortName: "bàn"
    },
    RECEPTIONIST: {
        id: 4,
        name: "Thu ngân",
        shortName: "thu ngân"
    },
    MANAGER: {
        id: 5,
        name: "Quản lý",
        shortName: "boss"
    },
    SUPERVISOR: {
        id: 6,
        name: "Quản lý cấp cao",
        shortName: "super boss"
    },
    SECURITY: {
        id: 7,
        name: "Bảo vệ",
        shortName: "bv"
    }
}

export const STAFF_ROLE_NAME = {
    1: "Đầu bếp",
    8: "Bartender",
    2: "Nhân viên chạy bàn",
    3: "Nhân viên ghi order",
    4: "Thu ngân",
    5: "Quản lý",
    6: "Quản lý cấp cao",
    7: "Bảo vệ"
}


export const STAFF_STATE = {
    ACTIVE: 0,
    UNACTIVE: 1,
    BLOCKED: 2
}

export const STAFF_TYPE = {
    PARTIME: 0,
    FULLTIME: 1,
    ONETIME: 2
}

export const STAFF_TYPE_NAME = {
    0: "Full time",
    1: "Partime time",
    2: "Thời vụ"
}

export const FOOD_STATE = {
    NOT_YET: {
        id: 0,
        value: "Chưa kinh doanh"
    },
    AVAILABLE: {
        id: 1,
        value: "Sẵn sàng phục vụ"
    },
    OUT_OF_STOCK: {
        id: 2,
        value: "Hết hàng"
    },
    OUT_OF_BUSINESS: {
        id: 3,
        value: "Ngừng kinh doanh"
    }
}


export const TABLE_STATE = {
    /**Bàn trống */
    NO_ORDER: {
        id: 0,
        name: "Trống"
    },
    /**Bàn trống nhưng có người đặt trước */
    BOOKED: {
        id: 1,
        name: "Đã đặt trước"
    },
    /**Đang phục vụ */
    HAS_ORDER: {
        id: 2,
        name: "Đang phục vụ"
    },
}


