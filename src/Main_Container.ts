import Container = PIXI.Container;
import { Loader, Sprite } from "pixi.js";

export default class Main_Container extends Container {
	public static readonly WIDTH:number = 3000;
	public static readonly HEIGHT:number = 2000;
	private _centerX:number = Main_Container.WIDTH/2;
	private _centerY:number = Main_Container.HEIGHT/2;
	private _background:Sprite;
	private _dial:Sprite;
	private _gearWheelContainer:Container;
	private _gearWheel:Sprite;
	private _gearWheelContainer2:Container;
	private _gearWheel2:Sprite;

	constructor() {
		super();
		this.initImages();
	}

	private initImages():void {
        const loader:Loader = new Loader();
		loader.add("background", "background.jpg");
		loader.add("dial", "dial.png");
		loader.add("gearWheel", "gear_wheel.png");
		
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
		this._gearWheelContainer = new Container;
		this.addChild(this._gearWheelContainer);
		this._gearWheelContainer.x = this._centerX - 300;
		this._gearWheelContainer.y = this._centerY - 50;
		this._gearWheel = Sprite.from("gearWheel");
		this._gearWheelContainer.addChild(this._gearWheel);
		this._gearWheel.x -= this._gearWheel.width/2;
		this._gearWheel.y -= this._gearWheel.height/2;

		this._gearWheelContainer2 = new Container;
		this.addChild(this._gearWheelContainer2);
		this._gearWheelContainer2.x = this._centerX + 300;
		this._gearWheelContainer2.y = this._centerY - 50;
		this._gearWheel2 = Sprite.from("gearWheel");
		this._gearWheelContainer2.addChild(this._gearWheel2);
		this._gearWheel2.x -= this._gearWheel2.width/2;
		this._gearWheel2.y -= this._gearWheel2.height/2;

		this._dial = Sprite.from("dial");
		this.addChild(this._dial);
		this._dial.x = this._centerX - this._dial.width/2;
		this._dial.y = this._centerY - this._dial.height/2;
	}
}