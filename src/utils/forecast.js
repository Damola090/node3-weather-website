const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?key=value&access_key=57950a93d49504581fbd8355b1223722&query=${latitude},${longitude}&units=f`

    request({ url, json : true }, (error, { body }) => {
        if (error){
            callback('Error due to Network problem', undefined)
        }else if(body.error) {
            callback('Invalid input, please try again', undefined)
        }else {
            callback(undefined,`${body.current.weather_descriptions[0]}. it is currently ${body.current.temperature} and it feels like ${body.current.feelslike} degrees out`)
        }

    })
}

module.exports = forecast