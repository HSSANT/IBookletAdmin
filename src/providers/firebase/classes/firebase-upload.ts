import { FirebaseObject } from "./firebase-object";

export class FirebaseUpload extends FirebaseObject {
    /**File to upload */
    file: File;
    /**Tên của file cần upload, bao gồm cả extension của file */
    name: string;
    /**Link tải từ firebase storage */
    url: string;
    /**Tiến trình upload : 0-100 */
    progress: number;

    constructor(file: File) {
        super();
        this.file = file;
        this.progress = 0;
        this.name = file.name;
    }
}