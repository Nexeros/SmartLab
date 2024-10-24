const { Login, ChangeParam} = require('./login.js');
console.log("test");
(async () => {
    const connection = await Login();
    const devices = await connection.getDevices();
    //const device = await connection.getDevice('1001700086');
    //console.log(device.params);
    //console.log(devices);
    const result = await ChangeParam(connection, '1001700086', 'switch', 'on');
    console.log(result);
})();
