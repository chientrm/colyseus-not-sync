import { MAP_WIDTH, SHIP_VX } from '../constants';
import { PlayerSchema } from '../schemas/player';

export class PlayerController {
	prevState: PlayerSchema;
	state: PlayerSchema;
	callback?: (state: PlayerSchema, prevState: PlayerSchema) => void;
	constructor(state: PlayerSchema) {
		this.state = state;
		this.prevState = state.clone();
	}
	tick(dt: number): void {
		this.state.x = (this.state.x + SHIP_VX * dt) % MAP_WIDTH;
		this.invokeCallback();
	}
	invokeCallback() {
		if (this.callback) this.callback(this.state, this.prevState);
	}
	setCallback(callback: (state: PlayerSchema, prevState: PlayerSchema) => void) {
		this.callback = callback;
	}
	reconcile(playerState: PlayerSchema) {
		this.state = playerState;
		this.invokeCallback();
	}
}
