import { Role } from './role';
import { Mappingable } from '../interface/mappingable';
import { STAFF_ROLE_NAME, STAFF_TYPE_NAME } from '../app-constant';

export class Staff implements Mappingable {
    accountState: number;
    avatar: string;
    birthDay: Date;
    email: string;
    firebaseId: string;
    firebaseReference: string;
    id: string;
    identify: string;
    name: string;
    phone: string;
    staffRole: Array<number>;
    staffType: number;
    userName: string;
    address: string;
    additionInformation: string;
    idCard: string;
    //filed only in client
    staffRoleName: string;
    staffTypeName: string;
    constructor() {
        this.reset();
    }

    reset() {
        this.accountState = 0;
        this.avatar = "";
        this.birthDay = null;
        this.email = "";
        this.firebaseId = "";
        this.firebaseReference = "";
        this.id = "";
        this.identify = "";
        this.name = "";
        this.phone = "";
        this.staffRole = [];
        this.staffType = 0;
        this.userName = "";
        this.address = "";
        this.additionInformation = "";
        this.staffRoleName = "";
        this.staffTypeName = "";
        this.idCard = "";
    }

    mappingFirebaseData(data) {
        if (data) {
            this.accountState = data.account_state;
            this.avatar = data.avatar;
            this.birthDay = data.birthday;
            this.email = data.email;
            this.firebaseId = data.firebase_id;
            this.firebaseReference = data.firebase_reference;
            this.id = data.id;
            this.identify = data.identify;
            this.name = data.name;
            this.phone = data.phone;
            this.staffRole = data.staff_role;
            this.staffType = data.staff_type;
            this.userName = data.user_name;
            this.address = data.address;
            this.additionInformation = data.addition_information;
            this.idCard = data.id_card;
            this.staffRoleName = STAFF_ROLE_NAME[data.staff_role];
            this.staffTypeName = STAFF_TYPE_NAME[data.staff_type];
        }
    }

    mappingExcelData(data) {
        this.name = data.B ? data.B : "";
        this.birthDay = data.D ? new Date(data.D) : new Date();
        this.phone = data.E ? data.E : "";
        this.email = data.F ? data.F : "";
        this.address = data.G ? data.G : "";
        this.additionInformation = data.H ? data.H : "";
        this.idCard = data.I ? data.I : "";
    }
}