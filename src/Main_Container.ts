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
	private _secondHandContainer:Container;
	private _secondHand:Sprite;
	private _minuteHandContainer:Container;
	private _minuteHand:Sprite;
	private _hourHandContainer:Container;
	private _hourHand:Sprite;




	constructor() {
		super();
		this.initImages();
	}

	private initImages():void {
        const loader:Loader = new Loader();
		loader.add("background", "background.jpg");
		loader.add("dial", "dial.png");
		loader.add("gearWheel", "gear_wheel.png");
		loader.add("seconds", "seconds.png");
		loader.add("minutes", "minutes.png");
		loader.add("hours", "hours.png");
		
		loader.on("complete", ()=> {
			this.initBackground();
			this.initAnalogClock();
			this.initHands();
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

	private initHands():void {
		this._secondHandContainer = new Container;
		this.addChild(this._secondHandContainer);
		this._secondHandContainer.x = this._centerX;
		this._secondHandContainer.y = this._centerY;
		this._secondHand = Sprite.from("seconds");
		this._secondHandContainer.addChild(this._secondHand);
		this._secondHand.x -= this._secondHand.width/2;
		this._secondHand.y -= this._secondHand.height;

		this._minuteHandContainer = new Container;
		this.addChild(this._minuteHandContainer);
		this._minuteHandContainer.x = this._centerX;
		this._minuteHandContainer.y = this._centerY;
		this._minuteHand = Sprite.from("minutes");
		this._minuteHandContainer.addChild(this._minuteHand);
		this._minuteHand.x -= this._minuteHand.width/2;
		this._minuteHand.y -= this._minuteHand.height;

		this._hourHandContainer = new Container;
		this.addChild(this._hourHandContainer);
		this._hourHandContainer.x = this._centerX;
		this._hourHandContainer.y = this._centerY;
		this._hourHand = Sprite.from("hours");
		this._hourHandContainer.addChild(this._hourHand);
		this._hourHand.x -= this._hourHand.width/2;
		this._hourHand.y -= this._hourHand.height;
	}
}