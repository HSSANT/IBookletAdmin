import { Map } from "./map";
export class Floor {
    id: number;
    restId: number;
    name: string;
    maps: Array<Map> = [];
    constructor(id: number, restId: number, title: string) {
        this.id = id;
        this.restId = restId;
        this.name = title;
    }
}