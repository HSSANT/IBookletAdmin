import { LatLng } from "./latlng";
import { Vendor } from "./vendor";
import { Province } from "./province";
import { Banner } from "./banner";
import { Table } from "./table";
import { WorkingTime } from "./working-time";
import { Floor } from "./floor";

export class Restaurant {
    address: string;
    firebaseId: string;
    firebaseReference: string;
    geoPoint: string;
    hotline: string;
    id: string;
    logo: string;
    name: string;
    state: number;
    timeClose: string;
    timeOpen: string;
    vendorId: string;
    vendorLogo: string;
    vendorName: string;

    constructor() {
        this.reset();
    }

    reset() {
        this.address = "";
        this.firebaseId = "";
        this.firebaseReference = "";
        this.geoPoint = "";
        this.hotline = "";
        this.id = "";
        this.logo = "";
        this.name = "";
        this.state = 0;
        this.timeClose = "";
        this.timeOpen = "";
        this.vendorId = "";
        this.vendorLogo = "";
        this.vendorName = "";
    }

    mappingFirebaseData(data) {
        if (data) {
            this.address = data.address;
            this.firebaseId = data.firebase_id;
            this.firebaseReference = data.firebase_reference;
            this.geoPoint = data.geopoint;
            this.hotline = data.hotline;
            this.id = data.id;
            this.logo = data.logo;
            this.name = data.name;
            this.state = +data.state;
            this.timeClose = data.time_close;
            this.timeOpen = data.time_open;
            this.vendorId = data.vendor_id;
            this.vendorLogo = data.vendor_logo;
            this.vendorName = data.vendor_name;
        }
    }
}