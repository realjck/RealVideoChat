/**
 * AblyConnector
 * for ably.io
 */

let _ably, _channel

const AblyConnector = {};
/**
 * Connect to Ably and to the specified channel
 * __Use the 'then' method to retrieve the result id, as shown below:"
 * ex.: AblyConnector.connect('xxx', 'xxx').then((id) => app_id = id);__
 * @param {string} channel 
 * @param {string} apiKey 
 * @param {function} callback 
 * @returns Ably realtime connection id (string)
 */
AblyConnector.connect = async (apiKey, channel) => {
    _ably = new Ably.Realtime.Promise(apiKey);
    await _ably.connection.once('connected');
    _channel = _ably.channels.get(channel);
    return _ably.connection.id;
}

/**
 * Create an Event that do something with the recieved data object
 * __ex.: Ablyconnector.addListener('xxx', ((data) => {app_data = data}));__
 * @param {string} eventName 
 * @param {function} fn 
 */
AblyConnector.addListener = (eventName, fn) => {
    try {
        _channel.subscribe(eventName, (message) => {
            if (message.connectionId != _ably.connection.id) {
                fn(message.data);
            }
        });
    } catch (e) {
        console.log("IOERROR: SUBSCRIBE to '"+eventName+"'");
    }
}

/**
 * Publish an object message to an Event
 * __ex.: Ablyconnector.say('xxx', data);__
 * @param {string} eventName 
 * @param {object} object 
*/
AblyConnector.say = (eventName, object) => {
    try {
        _channel.publish(eventName, object);
    } catch (e) {
        console.log("IOERROR: SAY to '"+eventName+"'", object);
    }
}

export {AblyConnector};