import {IChatMessageWS} from '@Types';
import {forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';
import isEqual from 'react-fast-compare';

interface Props {
  url: string;
  reconnect?: boolean;
  reconnectTimeout?: number;
  onOpen: () => void;
  onMessage: (data: any) => void;
  onError: (error: any) => void;
  onClose: () => void;
}

export interface WebsocketRef {
  send: (data: IChatMessageWS) => void;
  isConnected: () => boolean;
  isSendable: () => boolean;
  close: () => void;
}

const Websocket = forwardRef((props: Props, ref: any) => {
  const {url, onOpen, onMessage, onError, onClose, reconnectTimeout = 5000, reconnect = true} = props;
  const [connected, setConnected] = useState(false);
  const [ws, setWS] = useState<WebSocket | null>(null);
  let reconnectTimeoutID: any = -1;

  useImperativeHandle(
    ref,
    () => ({
      isConnected: () => {
        return connected;
      },
      isSendable: () => {
        const canSend = ws?.readyState === 1 && connected;
        return canSend;
      },
      send: (data: IChatMessageWS) => {
        ws?.send(JSON.stringify(data));
      },
      close: () => {
        ws?.close();
      },
    }),
    [url],
  );

  const setup = useCallback(() => {
    const ws = new WebSocket(url);
    ws.onopen = () => {
      console.log('**** ws onopen');
      setConnected(true);
      onOpen && onOpen();
    };
    ws.onmessage = event => {
      if (onMessage) {
        try {
          onMessage(JSON.parse(event.data));
        } catch (error) {
          console.log('**** ws parse data error');
        }
      }
    };
    ws.onerror = error => {
      setConnected(false);
      console.log('**** ws onerror', error);
      onError && onError(error);
      ws.close();
    };
    ws.onclose = error => {
      console.log('**** ws onclose', error);
      reconnectTimeoutID = setTimeout(() => {
        setConnected(false);
        reconnect ? setup() : onClose && onClose();
      }, reconnectTimeout);
    };

    setWS(ws);
  }, []);

  useEffect(() => {
    if (connected) {
      console.log('**** skip setup ws');
      return;
    }
    console.log('**** setup ws');
    setup();
    return () => {
      reconnectTimeoutID && clearTimeout(reconnectTimeoutID);
      ws && ws?.close();
    };
  }, [url]);

  return null;
});

export default memo(Websocket, isEqual);
