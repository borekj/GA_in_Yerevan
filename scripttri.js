const options = {
    key: 'TKdGoO8qmp0zQLsVhnQDiSkR6u8eByep', // REPLACE WITH YOUR KEY !!!

    // Changing Windy parameters at start-up time
    // (recommended for faster start-up)
    lat: 50.4,
    lon: 14.3,
    zoom: 5,

    timestamp: Date.now(),

    hourFormat: '24h',

    // ...etc
};
windyInit(options, windyAPI => {
    const { store } = windyAPI;
    // broadcast is main Windy's event emmiter that
    // let you know what is happening inside

    // Change overlays programatically


    store.set('overlay', 'temp')

    
});
