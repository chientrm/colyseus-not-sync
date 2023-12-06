import { RoomSchema } from '../schemas/room';
import { PlayerController } from './player';
export declare class RoomController {
    players: PlayerController[];
    constructor(state: RoomSchema);
    tick(dt: number): void;
}
