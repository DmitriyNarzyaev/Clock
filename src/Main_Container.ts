import Container = PIXI.Container;
import { Loader, Sprite } from "pixi.js";

export default class Main_Container extends Container {
	public static readonly WIDTH:number = 3000;
	public static readonly HEIGHT:number = 1500;
	private _background:Sprite;
	private _dial:Sprite;

	constructor() {
		super();
		this.initImages();
	}

	private initImages():void {
        const loader:Loader = new Loader();
		loader.add("background", "background.jpg");
		loader.add("dial", "dial.png");
		
		loader.on("complete", ()=> {
			this.initBackground();
			this.initAnalogClock();
		});
		loader.load();
	}

	private initBackground():void {
		this._background = Sprite.from("background");
		this._background.tint = 0xaaaaaa;
		this.addChild(this._background);
	}

	private initAnalogClock():void {
		this._dial = Sprite.from("dial");
		this.addChild(this._dial);
		this._dial.x = Main_Container.WIDTH/2 - this._dial.width/2;
		this._dial.y = Main_Container.HEIGHT/2 - this._dial.height/2;
	}
}