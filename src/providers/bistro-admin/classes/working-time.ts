export class WorkingTime {
    weekDay: number;
    openingTime: string;
    closingTime: string;
    constructor(weekDay: number, openingTime: string, closingTime: string) {
        this.weekDay = weekDay;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
    }
}