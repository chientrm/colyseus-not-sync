import { PlayerSchema } from '../schemas/player';
export declare class PlayerController {
    prevState: PlayerSchema;
    state: PlayerSchema;
    callback?: (state: PlayerSchema, prevState: PlayerSchema) => void;
    constructor(state: PlayerSchema);
    tick(dt: number): void;
    invokeCallback(): void;
    setCallback(callback: (state: PlayerSchema, prevState: PlayerSchema) => void): void;
    reconcile(playerState: PlayerSchema): void;
}
