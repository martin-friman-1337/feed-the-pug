'use client';

import { io, Socket } from "socket.io-client";

export const socket: Socket = io("localhost:3002"); // set this in env