const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

module.exports = {
    downloadImg: async () => {
        try {
            const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`);
            const url = response.data.url;
            const fileName = 'myImage';
            const writer = fs.createWriteStream(`${path.resolve()}/asset/${fileName}.jpg`);

            const responseForImage = await axios({
                url,
                method: 'GET',
                responseType: 'stream'
            });

            responseForImage.data.pipe(writer);

            writer.on('finish', () => {
                console.log(`[+]=> The NASA Picture of the Day has been downloaded as ${fileName}`);
            });

            writer.on('error', (err: any) => {
                console.error(err);
                throw new Error('Something went wrong')
            });
        }
        catch (error) {
            console.error(error);
        }
    }
};