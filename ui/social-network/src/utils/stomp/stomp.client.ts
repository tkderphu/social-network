// src/stompClient.ts
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { TokenUtils } from '../../common';
import { USER_CHAT_TOPIC, USER_ESTABLISHED_CHAT_TOPIC } from './stomp.topic';



 let stompClient: Client | null = null;
export function connectStomp(): void {
     stompClient = new Client({
        brokerURL: 'ws://localhost:8080/chat/ws',
        reconnectDelay: 5000,
        onConnect: () => {
            console.log("connectd websocket")
            subscribe(USER_CHAT_TOPIC(TokenUtils.authLogin.userId), (message: Message) => {
                const payload = JSON.parse(message.body)
                console.log(payload)
            })
            subscribe(USER_ESTABLISHED_CHAT_TOPIC(TokenUtils.authLogin.userId), (message: Message) => {
                const payload = JSON.parse(message.body)
                console.log("estalished payload: ", payload)
            })
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

export function sendMessage(payload: any, destination: string): void {
    console.log("stomp: ", stompClient)
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: destination,
            body: JSON.stringify(payload),
        });
    }
}

export function disconnectStomp(): void {
    if (stompClient) {
        stompClient.deactivate();
    }
}
