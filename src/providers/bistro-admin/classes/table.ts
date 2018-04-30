import { Mappingable } from "../interface/mappingable";

export class Table implements Mappingable {
    areaId: string;
    areaName: string;
    capacity: number;
    firebaseId: string;
    firebaseReference: string;
    id: string;
    name: string;
    state: number;
    type: number;

    constructor() {
        this.reset();
    }

    reset() {
        this.areaId = "";
        this.areaName = "";
        this.capacity = 0;
        this.firebaseId = "";
        this.firebaseReference = "";
        this.id = "";
        this.name = "";
        this.state = 0;
        this.type = 0;
    }

    mappingFirebaseData(data) {
        if (data) {
            this.areaId = data.area_id;
            this.areaName = data.area_name;
            this.capacity = +data.capacity;
            this.firebaseId = data.firebaseId;
            this.firebaseReference = data.firebase_reference;
            this.id = data.id;
            this.name = data.name;
            this.state = +data.state;
            this.type = +data.type;
        }
    }

    mappingExcelData(data) {
        this.name = data.B ? data.B : "";
        this.capacity = data.C ? +data.C : data.C; 
    }
}