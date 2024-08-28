import { socket } from "../socketio-client";
import { ConnectionHandlerMessage, LocationData } from "../socketio-client/types";
import { currentlyConnectedClients } from "../stores/players";
export function registerEventListeners (){
    // Handle previous connection data
    socket.on('previousConnectionData', (response: ConnectionHandlerMessage) => {
        const playersThatAreNotUs = response.connectionList.filter(p => p.playerId !== socket.id);
        currentlyConnectedClients.push(...playersThatAreNotUs)
    });
  
    // Handle new player connection
    socket.on('newPlayerConnected', (response: ConnectionHandlerMessage) => {
        if (socket.id !== response.newConnectionId) {
            console.log('New User');
            currentlyConnectedClients.push({
                playerId: response.newConnectionId,
                position: {
                    x: 21,
                    y: 12
                }
            })
        }
    });
  
    // Handle player location updates
    socket.on('playerHasBroadCastedTheirLocation', (locationData: LocationData) => {
      //find relevent player in array of other players (unless it us, we dont care about our own broadcast)
      if(locationData.playerId == socket.id) return; //ignore self.
      //console.log(locationData.playerId, 'broadcasted their coords' , locationData.x, locationData.y, 'my id is', socket.id)
      const player = currentlyConnectedClients.find((p) => p.playerId == locationData.playerId);  
      if(!player) return; //idk, throw an exception here probably? 
        currentlyConnectedClients[currentlyConnectedClients.indexOf(player)].position = locationData;
    });
  
    // Handle player disconnection
    socket.on('playerDisconnected', (response: ConnectionHandlerMessage) => {
         const player = currentlyConnectedClients.find((p) => p.playerId == response.newConnectionId)
            if(!player) return; //idk, throw an exception here probably? 
            currentlyConnectedClients.splice(currentlyConnectedClients.indexOf(player), 1);
        });
    }