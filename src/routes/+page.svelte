<script lang="ts">
	import type { RoomSchema } from '@chientrm/colyseus-not-sync-game';
	import { Client, Room } from 'colyseus.js';
	import { onDestroy, onMount } from 'svelte';

	let myRoom: Room<RoomSchema>;

	let x0: number;
	let x1: number;
	let x2: number;

	onMount(async () => {
		const client = new Client('http://localhost:2567');
		myRoom = await client.joinOrCreate('my_room');
		myRoom.state.player0.onChange(() => (x0 = myRoom.state.player0.x));
		myRoom.state.player0.onChange(() => (x1 = myRoom.state.player1.x));
		myRoom.state.player0.onChange(() => (x2 = myRoom.state.player2.x));
	});

	onDestroy(() => myRoom?.leave());
</script>

<h1>Colyseus not sync reproduction</h1>
<div>X0: {x0}</div>
<div>X1: {x1}</div>
<div>X2: {x2}</div>
