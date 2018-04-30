export class ResourceLoader {
    protected mDivLoader: HTMLElement;

    constructor() { }

    protected initDivLoader() {
        if (this.mDivLoader) return;
        this.mDivLoader = document.getElementById("mDivLoader");
        if (!this.mDivLoader) {
            this.mDivLoader = document.createElement("div");
            this.mDivLoader.id = "mDivLoader";
            this.mDivLoader.style.display = "none";
            this.mDivLoader.style.position = "absolute";
            this.mDivLoader.style.zIndex = "-1";
        }
    }

    public getDivLoader() {
        return this.mDivLoader;
    }

    public load(args: Array<string>) {
        let promises = [];
        for (let src of args) {
            if (src.length > 0) {
                if (src.endsWith("js")) {
                    promises.push(this.loadJS(src));
                } else if (src.endsWith("png") || src.endsWith("jpg") || src.endsWith("png") || src.endsWith("gif")) {
                    promises.push(this.loadImage(src));
                } else if (src.endsWith("mp3")) {
                    promises.push(this.loadAudio(src));
                } else {
                    console.log("Loader, cannot find loader for resource file : " + src);
                }
            }
        }
        return Promise.all(promises);
    }

    public loadImage(src: string) {
        return new Promise((resolve, reject) => {
            this.initDivLoader();

            let imgElement = new Image();
            imgElement.src = src;
            this.mDivLoader.appendChild(imgElement);
            imgElement.onload = () => {
                imgElement.remove();
                resolve();
            };
            imgElement.onerror = () => {
                console.log("Loader, cannot load image : " + src);
                imgElement.remove();
                reject();
            };

        });
    }

    public loadJS(src: string) {
        this.initDivLoader();
        return new Promise((resolve, reject) => {
            let scriptElement = <HTMLScriptElement>document.createElement("script");
            scriptElement.src = src;
            this.mDivLoader.appendChild(scriptElement);

            scriptElement.onload = () => {
                scriptElement.remove();
                resolve();
            };
            scriptElement.onerror = () => {
                console.log("Loader, cannot load script file : " + src);
                scriptElement.remove();
                reject();
            }
        });
    }

    public loadAudio(src) {
        this.initDivLoader();
        return new Promise((resolve, reject) => {
            let audioElement = <HTMLAudioElement>document.createElement("audio");
            audioElement.src = src;
            this.mDivLoader.appendChild(audioElement);

            audioElement.onload = () => {
                audioElement.remove();
                resolve();
            };
            audioElement.onerror = () => {
                console.log("Loader, cannot load audio file : " + src);
                audioElement.remove();
                reject();
            }
        });
    }
}