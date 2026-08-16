import { io } from "socket.io-client";

const socketOrigin = (import.meta.env.VITE_BACKEND_URL || window.location.origin).replace(/\/+$/, '')

export const socket = io(socketOrigin, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 10000,
  timeout: 12000,
});
