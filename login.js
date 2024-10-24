require('dotenv').config();
const ewelink = require('ewelink-api');

// Export the function
module.exports = {
    /**
     * Logs in to the eWeLink API using the credentials from the .env file
     * @returns {Object} The eWeLink API connection object
     */
    async Login() {
        const connection = new ewelink({
            email: process.env.EMAIL,               
            password: process.env.PASSWORD,         
            region: process.env.REGION,             
            APP_ID: process.env.APP_ID,             
            APP_SECRET: process.env.APP_SECRET,    
        });

        const auth = await connection.getCredentials();
        return connection;
    },
    /**
     * Changes a parameter of a device to a specific value
     * @param {Object} connection - The eWeLink API connection object
     * @param {string} deviceId - The ID of the device
     * @param {string} param - The parameter to change
     * @param {string} value - The new value of the parameter
     * @returns {Object} The result of the setDevicePowerState call
     */
    async ChangeParam(connection, deviceId, param, value) {
        try{
            const device = await connection.getDevice(deviceId);
            if(!device || !device.params || !device.params[param]) {
                console.error(`Device ${deviceId} not found`);
                return;
            }
            const result = await connection.setDevicePowerState(deviceId, 'on', {
                params: {
                    [param]: value
                }
            })
            return result;
        } catch (error) {
            console.error(error);
            return;
        }
    }
}