import { Schema, type } from '@colyseus/schema';
import { PlayerSchema } from './player';

export class RoomSchema extends Schema {
  @type(PlayerSchema) player0 = new PlayerSchema();
  @type(PlayerSchema) player1 = new PlayerSchema();
  @type(PlayerSchema) player2 = new PlayerSchema();
}
