import { Mappingable } from "../interface/mappingable";
import { FOOD_STATE } from "../app-constant";

export class Food implements Mappingable {
    albumId: string;
    category: string;
    currency: string;
    description: string;
    enName: string;
    firebaseId: string;
    firebaseReference: string;
    id: string;
    image: string;
    name: string;
    options: Array<any>;
    paper: string;
    price: number;
    sales: Array<any>;
    size: string;
    state: number;
    type: string;
    unit: string;
    timeCreate: Date;
    code: string;
    constructor() {
        this.reset();
    }
    reset() {
        this.albumId = "";
        this.category = "";
        this.currency = "";
        this.description = "";
        this.enName = "";
        this.firebaseId = "";
        this.firebaseReference = "";
        this.id = "";
        this.image = "";
        this.name = "";
        this.options = [];
        this.paper = "";
        this.price = 0;
        this.sales = [];
        this.size = "";
        this.state = 0;
        this.type = "";
        this.unit = "";
        this.timeCreate = new Date();
        this.code = "";
    }

    mappingFirebaseData(data) {
        this.albumId = data.album_id;
        this.category = data.category;
        this.currency = data.currency;
        this.description = data.description;
        this.enName = data.en_name;
        this.firebaseId = data.firebase_id;
        this.firebaseReference = data.firebase_reference;
        this.id = data.id;
        this.image = data.image;
        this.name = data.name;
        this.options = data.options;
        this.paper = data.paper;
        this.price = data.price;
        this.sales = data.sales;
        this.size = data.size;
        this.state = data.state;
        this.type = data.type;
        this.unit = data.unit;
        this.timeCreate = data.time_create;
        this.code = data.code;
    }
    mappingExcelData(data) {
        this.code = data.__EMPTY;
        this.name = data.__EMPTY_1;
        this.unit = data.__EMPTY_2;
        this.price = parseInt(data.__EMPTY_3.split(',').join('').split('.').join(''));
        this.description = data.__EMPTY_6;
        this.state = FOOD_STATE.AVAILABLE.id;
    }
}

export class FoodType implements Mappingable {
    id: string;
    code: string;
    name: string;
    enName: string;
    firebaseId: string;
    firebaseReference: string;
    constructor() {
        this.reset();
    }
    reset() {
        this.id = "";
        this.code = "";
        this.name = "";
        this.enName = "";
        this.firebaseId = "";
        this.firebaseReference = "";
    }
    mappingFirebaseData(data) {
        if (data) {
            this.id = data.id;
            this.code = data.code;
            this.name = data.name;
            this.enName = data.en_name;
            this.firebaseId = data.firebase_id;
            this.firebaseReference = data.firebase_reference;
        }
    }
}