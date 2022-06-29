
const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=address&access_token=pk.eyJ1IjoiZGFtb2xhMDkwIiwiYSI6ImNsNHFtZ3l1ajBxNWIzbm52NXpqeXdyODIifQ.-jUs6aHu9TRQMcqlE_WVuA&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('something went wrrong with the network', undefined);
        }else if (body.features.length === 0) {
            callback('wrong input please try again', undefined)
        }else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].text

            })
        }
    })

}

module.exports = geocode