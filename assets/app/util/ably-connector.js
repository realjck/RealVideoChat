/**
 * AblyConnector
 * for ably.io
 */

let _ably, _channel
const AblyConnector = {};

/**
 * Connect to Ably and to the specified channel, then callback
 * @param {string} channel 
 * @param {string} apiKey 
 * @param {function} callback 
 */
AblyConnector.connect = async (apiKey, channel, callback) => {
    _ably = new Ably.Realtime.Promise(apiKey);
    await _ably.connection.once();
    _channel = _ably.channels.get(channel);
    callback();
}

/**
 * Create an Event that do something with the recieved data object
 * @param {string} eventName 
 * @param {function} fn 
 */
AblyConnector.addListener = (eventName, fn) => {
    _channel.subscribe(eventName, (message) => {
        if (message.connectionId != _ably.connection.id) {
            fn(message.object);
        }
    });
}

/**
 * Publish an object message to an Event
 * @param {string} eventName 
 * @param {object} object 
 */
AblyConnector.say = (eventName, object) => {
    _channel.publish(eventName, object);
}

export {AblyConnector};