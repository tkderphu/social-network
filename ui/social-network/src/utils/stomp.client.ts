// src/stompClient.ts
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { TokenUtils } from '../common';

let stompClient: Client | null = null;
const topic: any = {
    "self": `/topic/user/${TokenUtils.authLogin.userId}`
}
export function connectStomp(): void {
    const stompClient = new Client({
        brokerURL: 'ws://localhost:8080/chat/ws',
        reconnectDelay: 5000,
        onConnect: () => {
            console.log("connected websocket")
        },
        onStompError: () => {
            console.log('err connected')
        },
        onWebSocketError: (err: any) => {
            console.log("error with websocket", err)
        }
    });

    stompClient.activate()
}

export function subscribe(topic: string, callback: any) {
    stompClient?.subscribe(topic, (message: Message) => {
        console.log("payload: ", message)
    })
}

export function sendMessage(message: { content: string; sender: string }): void {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: '/app/send-message',
            body: JSON.stringify(message),
        });
    }
}

export function disconnectStomp(): void {
    if (stompClient) {
        stompClient.deactivate();
    }
}
