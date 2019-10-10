//CVYR
const credentials = require('./credentials.js')
const request = require('request')

const temp = require('./lab.js')

const geocode = function(ciudad) {

	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + ciudad + '.json?type=place&limit=1&access_token=' + credentials.MAPBOX_TOKEN

	request({ url, json : true }, function(error, response){
		
    if (error){
      console.log(error)
    }
    else{
      const data = response.body.features

        if (data.response == 'False'){
          callback(data.Error, undefined)
        }
        else {
          const infoCiudad = {
              lat: data[0].center[1],
              long: data[0].center[0]
          }
          temp.retorna(infoCiudad.lat, infoCiudad.long)
        }
    }
	})

}

const retorna = function(lat, longitud){
  const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + lat + ',' + longitud + '?lang=es&units=si'

  request({ url, json : true }, function(error, response){
    if (error) {
      console.log(error)
    }
    else {
      const data = response.body

        if (data.response == 'False'){
          callback(data.Error, undefined)
        }
        else {
          const dataClima = {
            estara : data.hourly.summary,
              temp: data.currently.temperature,
              prob: data.currently.precipProbability
          }
          console.log(dataClima.estara + ' Actualmente estamos a ' + dataClima.temp + ' C. Hay ' + dataClima.prob + '% de probabilidades de lluvia.')
        } 
    }
  })
}


geocode('Monterrey')
