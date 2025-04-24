import { useEffect, useRef } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type UseStompProps = {
  url: string;
  topic: string;
  onMessage: (message: IMessage) => void;
};

export const useStomp = ({ url, topic, onMessage }: UseStompProps) => {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS(url);
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log("[STOMP]:", str),
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(topic, onMessage);
        console.log("🟢 Connected and subscribed to", topic);
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"]);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [url, topic]);
};
