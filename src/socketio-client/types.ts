export interface ConnectedClient {
    playerId: string,
    position: LocationData
}

export interface ConnectionHandlerMessage {
    newConnectionId: string,
    connectionList: ConnectedClient[]
}

export interface LocationData {
    playerId?:string,
    x: number,
    y: number
}