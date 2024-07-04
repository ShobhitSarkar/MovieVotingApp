import { Server } from 'socket.io';
import store from './store';

export default function startServer() {
    const io = new Server(8080);

    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    });

    return io;
}