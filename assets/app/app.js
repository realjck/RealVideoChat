const RVC = {};

// load-env.js
fetch('.env')
    .then(response => response.text())
    .then(data => {
        const envVariables = data.split('\n');
        envVariables.forEach(variable => {
            const [name, value] = variable.split('=');
            if (name && value) {
                RVC[name.trim()] = value.trim();
            }
        });
        LaunchApp();
    })
    .catch(error => console.error('Error loading .env file:', error));

function LaunchApp() {
    
    const apiKey = RVC.API_KEY;
    console.log("heres api", apiKey);
    const ably = new Ably.Realtime.Promise(apiKey);
    
    const ablyRealtimePromiseExample = async () => {
      // Connect to Ably
      await ably.connection.once("connected");
      document.getElementById("status").innerHTML = "Connected to Ably!";
    
      // get the channel to subscribe to
      const channel = ably.channels.get("one channel among others");
    
      /* 
        Subscribe to a channel. 
        The promise resolves when the channel is attached 
        (and resolves synchronously if the channel is already attached).
      */
      await channel.subscribe("didjiridoo", (message) => {
        document.getElementById("message").innerHTML = message.data;
      });
    
      // Publish a message
      await channel.publish("didjiridoo",
      ["this is an array",
      "this can be also an object",
      42]);
    };

    ablyRealtimePromiseExample();
}
