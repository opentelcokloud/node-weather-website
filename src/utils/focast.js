const request = require('request')

const focast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=89221294417af8c51e6271eacfd15f05&query='+ latitude + ',' + longitude
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Weather Service', undefined)
        } else if (response.body.error) {
            callback('Unable to find the Location', undefined)
        } else {
            const {weather_descriptions: wsum, temperature: temp, humidity: humi} = response.body.current
            //const wsum = response.body.current.weather_descriptions[0]
            //const temp = response.body.current.temperature
            //const humi = response.body.current.humidity
            callback(undefined, wsum + '. Temperature: ' + temp + ' C degree' + ' and Humidity is : ' + humi + '%')
        }
    })
}

module.exports = focast