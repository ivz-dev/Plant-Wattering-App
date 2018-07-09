import { Client, Message } from "react-native-paho-mqtt";
export const MQTT_ENDPOINT = 'wss://m23.cloudmqtt.com:32000/';
export const MQTT_USER = 'mcinsnfb';
export const MQTT_PASSWORD = 'EX9goxMhxYzZ';


export const websocketClientConnect = (topic) => {
    const myStorage = {
        setItem: (key, item) => {
            myStorage[key] = item;
        },
        getItem: (key) => myStorage[key],
        removeItem: (key) => {
            delete myStorage[key];
        },
    };
    const client = new Client({ uri: MQTT_ENDPOINT, clientId: String(Math.random()), storage: myStorage });

    return new Promise((resolve, reject) => {
        return client.connect({userName: MQTT_USER, password: MQTT_PASSWORD, useSSL: true,})
            .then(() => {
                client.subscribe(topic);
                return resolve(client);
            })
            .catch(e => reject(e));
    });
};

export const websocketCallbacks = (client, messageReceivedCallback) => {
    client.on('connectionLost', (responseObject) => {
        if (responseObject.errorCode !== 0) {
            console.log(responseObject.errorMessage);
        }
    });
    client.on('messageReceived', (message) => {
        messageReceivedCallback(message);
    });
};

export const sendMessage = (client) => {
    const message = new Message('37');
    message.destinationName = 'wattering';
    client.send(message);
};