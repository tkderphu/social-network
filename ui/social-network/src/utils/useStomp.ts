import { useEffect, useRef } from "react";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import { TokenUtils } from "../common";

// Store singleton clients by path
const stompClientMap = new Map<string, Client>();
const subscribedTopic = new Map<string, boolean>()
type UseStompClientProps = {
  path: "chat/ws" | "notification/ws";
  handles?: {
    topic: string,
    callback: any
  }[]
};


export const useStompClient = ({ path, handles }: UseStompClientProps): Client | null => {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (stompClientMap.has(path)) {
      console.log("exists")
      clientRef.current = stompClientMap.get(path)!;
      return;
    }

    const client = new Client({
      brokerURL: `${import.meta.env.VITE_WEBSOCKET_URL}/${path}`,
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${TokenUtils.authLogin.accessToken}`,
      },
      onConnect: () => {
        console.log(`[STOMP] Connected to ${path}`);
        handles?.forEach(handler => {
          client.subscribe(handler.topic, handler.callback)
        })
      },
      onStompError: (frame) => {
        console.error("[STOMP ERROR]", frame.headers["message"], frame.body);
      },
      onWebSocketError: (err) => {
        console.error("[WebSocket ERROR]", err);
      },
    });

    client.activate();

    stompClientMap.set(path, client);
    clientRef.current = client;
    console.log('vcl connected: ', client)
    return () => {
      console.log("clear")
      // Optional: leave client active for reuse or uncomment to clean up on unmount
      client.deactivate();
      stompClientMap.delete(path);
    };
  }, [path]);

  return clientRef.current;
};
