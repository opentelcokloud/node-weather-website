const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoib3BlbnRlbGNva2xvdWQiLCJhIjoiY2t0MTZ4dHlvMDdsYTJvbW0xODQyd2RodCJ9.cO3TgdJfJAI25N49owjyOg'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            //const {center, place_name} = body.features[0]
            // const center = response.body.features[0].center
            // const place_name = response.body.features[0].place_name
            callback(undefined, {
                //latitude: center[1],
                //longitude: center[0],
                //location: place_name
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })            
        }
    })
}

module.exports = geocode