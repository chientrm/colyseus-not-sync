import { Schema, type } from '@colyseus/schema';
import { MAP_WIDTH } from '../constants';

export class PlayerSchema extends Schema {
	@type('number') x = Math.random() * MAP_WIDTH;
	@type('string') sessionId?: string;
}
