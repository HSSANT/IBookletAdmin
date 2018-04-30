export class Config {

    private appData: Object;

    private version: string = "1.0";


    constructor() {
        this.loadHardConfig();
    }

    private loadHardConfig() {
        this.version = "1.0";
    }
    /**Load config tu file */
    public onResponseConfig(data) {
        if (!data) return;
        this.appData = data;
        if (data.version) this.version = data.version;
    }
    public hasData() {
        return this.appData != null;
    }
    public getConfig(key: string) {
        if (this.appData && this.appData[key]) return this.appData[key];
        return undefined;
    }
    public getAppVersion() {
        return this.version;
    }

    getData(fields: Array<string>, data?: Object) {
        let sourceData = data ? data : this.appData; 
        if (fields.length == 0) return undefined;
        if (fields.length == 1) {
            if (sourceData && sourceData.hasOwnProperty(fields[0])) {
                return sourceData[fields[0]];
            }
            return undefined;
        }
        if (sourceData && sourceData.hasOwnProperty(fields[0])) {
            let newSourceData = sourceData[fields[0]];
            fields.shift();
            return this.getData(fields, newSourceData);
        } else {
            return undefined;
        }
    }

    get(key: string) {
        if (this.appData && this.appData[key]) return this.appData[key];
        return {};
    }

    getAppData() {
        return this.appData;
    }
}