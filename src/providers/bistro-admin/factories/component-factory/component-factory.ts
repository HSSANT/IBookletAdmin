
import { UIComponent, Area, Bar, Door, Kitchen, Receptionist, Stair, Table, WC, Restrict } from "../../classes/ui-component";
import { ComponentType } from "../../app-constant";

export class ComponentFactory {
    public getComponent(id: number, componentType: string, title?: string, x?: number, y?: number, width?: number, height?: number, zIndex?: number, rotate?: number): UIComponent {

        if (componentType) {
            switch (componentType.toLocaleLowerCase()) {
                case ComponentType.AREA.type: return new Area(id, title, x, y, width, height, zIndex, rotate);
                case ComponentType.BAR.type: return new Bar(id, title, x, y, width, height, zIndex, rotate);
                case ComponentType.DOOR.type: return new Door(id, title, x, y, width, height, zIndex, rotate);
                case ComponentType.KITCHEN.type: return new Kitchen(id, title, x, y, width, height, zIndex, rotate);
                case ComponentType.RECEPTIONIST.type: return new Receptionist(id, title, x, y, width, height, zIndex, rotate);
                case ComponentType.STAIR.type: return new Stair(id, title, x, y, width, height, zIndex, rotate);
                case ComponentType.TABLE.type: return new Table(id, title, x, y, width, height, zIndex, rotate);
                case ComponentType.WC.type: return new WC(id, title, x, y, width, height, zIndex, rotate);
                case ComponentType.RESTRICT.type: return new Restrict(id, title, x, y, width, height, zIndex, rotate);
            }
        }
        return new Area(id, title, x, y, width, height, zIndex, rotate);;
    }
}