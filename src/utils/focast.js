const request = require('request')

//Old access_key: 89221294417af8c51e6271eacfd15f05

const focast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=63254a3bcc87409d9df35a1505ac82e9&query='+ latitude + ',' + longitude
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to Weather Service', undefined)
        // } else if (body.error) {
        } else if (body.error) {
            callback('Unable to find the Location', undefined)
        } else {
            //const {weather_descriptions: wsum, temperature: temp, humidity: humi} = body.current
            const wsum = body.current.weather_descriptions[0]
            const temp = body.current.temperature
            const humi = body.current.humidity
            const feel = body.current.feelslike
            callback(undefined, wsum + '. Temperature: ' + temp + ' C degree' + ' and Humidity is : ' + humi + '%. It feels like ' + feel + ' C degree !')
        }
    })
}

module.exports = focast