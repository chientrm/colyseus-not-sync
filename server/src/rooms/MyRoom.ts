import { RoomController, RoomSchema, SERVER_TIMESTEP } from '@chientrm/colyseus-not-sync-game';
import { Client } from '@colyseus/core';
import { Room } from 'colyseus';

export class MyRoom extends Room<RoomSchema> {
	maxClients = 3;

	onCreate(options: any) {
		this.setState(new RoomSchema());
		let elapsedTime = 0;
		const room = new RoomController(this.state);
		this.setSimulationInterval((deltaTime) => {
			elapsedTime += deltaTime;
			while (elapsedTime >= SERVER_TIMESTEP) {
				elapsedTime -= SERVER_TIMESTEP;
				room.tick(SERVER_TIMESTEP);
			}
		});
	}

	onJoin(client: Client, options: any) {
		console.log(client.sessionId, 'joined!');
	}

	onLeave(client: Client, consented: boolean) {
		console.log(client.sessionId, 'left!');
	}

	onDispose() {
		console.log('room', this.roomId, 'disposing...');
	}
}
