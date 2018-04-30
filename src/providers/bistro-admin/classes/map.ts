import { UIComponent } from "./ui-component";
import { ComponentFactory } from "../factories/component-factory/component-factory";
export class Map {
    components: Array<UIComponent> = [];
    public componentFactory: ComponentFactory;
    currentHeight: number;
    currentWidth: number;
    firebaseId = "";
    floorId = "";
    realHeight: number;
    realWidth: number;
    id = "";
    title = "";
    numberOfElement: any;

    constructor() {
        this.reset();
    }

    reset() {
        this.components = [];
        this.componentFactory = new ComponentFactory();
        this.currentHeight = 0;
        this.currentWidth = 0;
        this.firebaseId = "";
        this.floorId = "";
        this.realHeight = 0;
        this.realWidth = 0;
        this.id = "";
        this.title = "";
        this.numberOfElement = {};
    }

    mappingFirebaseData(data) {
        if (data) {
            this.currentHeight = +data.current_height;
            this.currentWidth = +data.current_width;
            this.firebaseId = data.firebase_id;
            this.floorId = data.floor_id;
            this.realHeight = +data.height;
            this.realWidth = +data.width;
            this.id = data.id;
            this.title = data.title;
        }
    }

    addComponent(type: string, title?: string, x?: number, y?: number, width?: number, height?: number) {
        
        if (this.numberOfElement[type]) {
            this.numberOfElement[type] += 1;
        } else {
            this.numberOfElement[type] = 1;
        }
        let component = this.componentFactory.getComponent(this.numberOfElement[type], type, title, x, y, width, height);
        if (title === null || title === undefined) {
            component.title = component.type.name + " " + this.numberOfElement[type];
        }

        this.components.push(component);
    }

    setWidth(width: number) {
        this.currentWidth = width;
    }

    setHeight(height: number) {
        this.currentHeight = height;
    }

    getWidth() {
        return this.currentWidth;
    }

    getHeight() {
        return this.currentHeight;
    }
}