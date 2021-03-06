const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const focast = require('./utils/focast')

const app = express()

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
        title: 'What can I do to help you',
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



// Home page when user browse the app's endpoint at "/"

// app.get('', (req, res) => {
//     res.send ({
//         name: 'Andrew',
//         age: 27,
//         kids: [{
//             name: 'Peter',
//             age: 10
//         }, {
//             name: 'Kate',
//             age: 5
//         }],
//         profession: 'engineer'
//     })
// })

// Help page 

// app.get('/help', (req, res) => {
//     res.send ('<h1>This is help page</h1>')
// })

// // About page

// app.get('/about', (req, res) => {
//     res.send('<h2>This is about page</h2>')
// })

// Weather Page with Query information processed

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must type in an Adress'
        })
    }



    res.send({
        address: req.query.address,
        forcast: 'Sunny all day',
        location: '123.456, 789.000'
    })    
})



// Test Query String (or the parameters in the req () function)
// or the text that you add after your url link: eg: /products?search=chair

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'Your must provide a search term'
        })
    }

    console.log(req.query.search)
    console.log(req.query.rating)
    console.log(req.query.property)
    res.send({
        products: []
    })
})

// app.get('/help/*', (req, res) => {
//     res.send('Help article not found')
// })

// app.get('*', (req, res) => {
//     res.send('My 404 Page')
// })


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

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})