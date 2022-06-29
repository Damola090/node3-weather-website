const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath);


//setup static Directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title : 'weather App',
        name: 'Balogun Tunde Damola'
    });


})


app.get('/about', (req, res)=> {
    res.render('about', {

        title : 'About Me',
        name : 'Balogun Tunde'

    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        latitude : -75.6454,
        longitude : 36.3562,
        weather : 'sunny',
        title : 'help',
        name : 'Balogun Tunde'
    })

})

// help page error
app.get('/help/*', (req, res) => {
    res.render('error', {
        title : 'Error',
        error : 'help article not found',
        name : 'created by Balogun Tunde Damola'
    })

})

// // all pages error
// app.get('*', (req, res) => {
//     res.render('error', {
//         title : 'Error',
//         error :'page not found',
//         name : 'Created by Balogun Tunde Damola'
//     })
// })



app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error : 'you need to provide an Address Please correct'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return  res.send({
                error : 'Unable to Find Location, Please Try Again' 
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error : ' PLEASE SOMETHING WENT WRONG '
                })
            }
            res.send({
                 address : req.query.address,
                 forecast : forecastData,
                 location

        
             })

        })

     })
    
   
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        res.send({
            error : 'you need to provide a search keyword'
        })
    }
    console.log(req.query.search)
    res.send({
        products : [ ]
    })

})

app.listen(port, () => {
    console.log('server is up and running on port' `${port}`);
})

