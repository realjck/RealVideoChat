import asyncio
import websockets
from websockets import WebSocketServerProtocol
from typing import Set

clients: Set[WebSocketServerProtocol] = set()


async def handle_clients(websocket: WebSocketServerProtocol, path: str):
    # Register client
    clients.add(websocket)
    try:
        # Receive client's name
        name = await websocket.recv()
        welcome = f"Welcome {name}. Good to see you :)"
        await websocket.send(welcome)

        msg = f"{name} has recently joined us"
        await broadcast(msg)

        async for message in websocket:
            await broadcast(message, name + ": ")

    except websockets.ConnectionClosed as e:
        print(f"Client {websocket.remote_address} disconnected: {e}")

    finally:
        # Unregister client
        clients.remove(websocket)
        msg = "Someone has left the chat"
        await broadcast(msg)


async def broadcast(message: str, prefix: str = ""):
    to_remove = set()
    for client in clients:
        try:
            await client.send(prefix + message)
        except websockets.ConnectionClosed:
            to_remove.add(client)
    clients.difference_update(to_remove)


async def main():
    async with websockets.serve(handle_clients, "localhost", 8080):
        print("Server listening on port 8080...")
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
