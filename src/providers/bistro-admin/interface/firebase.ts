
import * as firebase from "firebase";
export interface FirebaseQuery{
    field: string;
    operator: firebase.firestore.WhereFilterOp;
    value: string;
}
export interface FirebaseOrder{
    field: string;
    direction: firebase.firestore.OrderByDirection;
}