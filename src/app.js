const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const focast = require('./utils/focast')

const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))



// Home Page with Dynamic Content
// (Static content is from index, Dynamic content is referened from (Main) app.js)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Open Telco Kloud'
    })
    // res.send('index')
})

// About page with Dynamic Content
// Static content is still from about.hbs, Dynamic content is referened from app.js using {{}}

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Open Telco Kloud'
    })
})

// Help Page with Dynamic Content
// Static content is still from help.hbs. Dynamic content is referenced from app.js using {{}}

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'What can I do to help you?',
        name: 'Open Telco Kloud'
    })
})

app.get('/author', (req, res) => {
    res.render('author', {
        name: 'Open Telco Kloud',
        age: 42,
        company: 'OTK'
    })
})

app.get('/otk', (req, res) => {
    res.send({
        name: 'Open Telco Kloud',
        Age: 40,
        Company: 'OTK',
        Favorites: ['badminton', 'guitar', 'study']
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must type in an Adress'
        })
    }

    // Destructure the data object and set default value for them
    // This is to avoid "Undefined Error"
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
        //    return console.log(error)
            return res.send(error)
        }
        //const {latitude = 0, longitude = 0, location = ''} = data

        focast(latitude, longitude, (error, forecastData) => {
            if (error) {
                //return console.log(error)
                return res.send(error)
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
            // console.log('Weather Forecast today for: ' + location)
            // console.log(forecastData)
            
        })
    })
      
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Open Telco Kloud',
        errormessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Open Telco Kloud',
        errormessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})