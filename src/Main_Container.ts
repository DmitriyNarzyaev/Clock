import Container = PIXI.Container;
import { Graphics } from "pixi.js";

export default class Main_Container extends Container {
	public static readonly WIDTH:number = 3000;
	public static readonly HEIGHT:number = 1500;

	constructor() {
		super();

		this.background();
	}

	private background():void {
		let background: Graphics = new Graphics;
		background.beginFill(0x00ff48);
		background.drawRect(0, 0, Main_Container.WIDTH, Main_Container.HEIGHT);
		this.addChild(background);
	}
}