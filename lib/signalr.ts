import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;
let startPromise: Promise<void> | null = null;

export const getSignalRConnection = (url: string) => {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .build();
  }
  return connection;
};

export const ensureConnected = async (url: string) => {
  const conn = getSignalRConnection(url);

  if (conn.state === signalR.HubConnectionState.Disconnected) {
    startPromise = conn.start();
  }

  if (startPromise) {
    await startPromise;
  }

  return conn;
};
