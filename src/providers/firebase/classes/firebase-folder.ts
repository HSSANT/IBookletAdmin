import { FirebaseObject } from "./firebase-object";

export class FirebaseFolder extends FirebaseObject {
    folder_name: string;
    folder_path: string;

    constructor() {
        super();
        this.folder_name = "";
        this.folder_path = "";
        this.firebase_id = "";
        this.firebase_reference = "";
    }
}