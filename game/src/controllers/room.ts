import { RoomSchema } from '../schemas/room';
import { PlayerController } from './player';

export class RoomController {
	players: PlayerController[];
	constructor(state: RoomSchema) {
		this.players = [];
		this.players.push(new PlayerController(state.player0));
		this.players.push(new PlayerController(state.player1));
		this.players.push(new PlayerController(state.player2));
	}
	tick(dt: number) {
		this.players.forEach((player) => player.tick(dt));
	}
}
