import { Mappingable } from "../interface/mappingable";

export class FoodCategory implements Mappingable {
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
            this.firebaseReference = data.firebase_reference;
            this.firebaseId = data.firebase_id;
        }
    }
}