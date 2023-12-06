import { Schema } from '@colyseus/schema';
import { PlayerSchema } from './player';
export declare class RoomSchema extends Schema {
    player0: PlayerSchema;
    player1: PlayerSchema;
    player2: PlayerSchema;
}
