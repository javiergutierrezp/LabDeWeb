//CVYR
const credentials = require('./credentials.js')
const request = require('request')


const geocode = function(ciudad, callback) {

	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + ciudad + '.json?type=place&limit=1&access_token=' + credentials.MAPBOX_TOKEN

	request({ url, json : true }, function(error, response){
    if (error){
      console.log("Connection error")
    }
    else{
      if (response.body.features == undefined){
        console.log("Error with the key, check credentials")
      }
      else {
        const cords = response.body.features
        if (cords.response == 'False'){
          callback(cords.Error, undefined)
        }
        else {
          if (response.body.features[0] != undefined){
            const infoCiudad = {
              lat: cords[0].center[1],
              long: cords[0].center[0]
          }
          callback(undefined, infoCiudad)
          }
          else {
            console.log("Input city not valid")
          }
        }
      } 
    }
	})
}

const retorna = function(lat, longitud, callback){
  const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + lat + ',' + longitud + '?lang=es&units=si'

  request({ url, json : true }, function(error, response){
    if (error) {
      console.log("Connection error")
      //callback('Unable to get the city weather', undefined)
    }
    else {
      if (response.body.currently == undefined){
        console.log("Error with the key, check credentials")
      }
      else {
        const report = response.body

        if (report.response == 'False'){
          callback(report.Error, undefined)
        }
        else {
          const dataClima = {
            estara : report.hourly.summary,
              temp: report.currently.temperature,
              prob: report.currently.precipProbability
          }
          //console.log(dataClima.estara + ' Actualmente estamos a ' + dataClima.temp + ' C. Hay ' + dataClima.prob + '% de probabilidades de lluvia.')
          callback(undefined, dataClima)
        }
      } 
    }
  })
}

/*
geocode('Uyuni', function(error, cords){
  if (error) {
    console.log(error)
  } else {
    if ( cords ) {
        retorna(cords.lat, cords.long, function(error, data){
        console.log(data.estara + ' Actualmente estamos a ' + data.temp + ' C. Hay ' + data.prob + '% de probabilidades de lluvia.')
      })
    } else {
      console.log(cords)
    }
  }
})
*/

const express = require('express')

const app = express()

const port = process.env.PORT || 3000



app.get('/weather', function(req, res) {
  if ( !req.query.search ) {
    res.send({
      error: 'Debes de pasar la ciudad como parametro'
    })
  }

  geocode( req.query.search, function(error, response) {

    if ( error ){
      return res.send({
        error: error
      })
    }

    if ( response.lat ){

      retorna(response.lat, response.long, function(error, response) {

        if ( error ) {
              return res.send({
                error: error
              })

          }
          else {
            res.send({
              ciudad: req.query.search,
              estara: response.estara,
              temp: response.temp,
              output: response.estara + ' Actualmente estamos a ' + response.temp + ' C. Hay ' + response.prob + '% de probabilidades de lluvia.' 
            })
          }

      })
    }
    else {
      res.send(response)
  }
  })
})

app.get('*', function(req, res) {
  res.send({
    error: 'Ruta no valida'
  })
})


app.listen(port, function() {
  console.log('Good news!')
})
