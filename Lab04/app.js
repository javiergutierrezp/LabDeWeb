//CVYR
const credentials = require('./credentials.js')
const request = require('request')


const geocode = function(ciudad) {

	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + ciudad + '.json?type=place&limit=1&access_token=' + credentials.MAPBOX_TOKEN

	request({ url, json : true }, function(error, response){
		
    if (error){
      console.log(error)
    }
    else{
      const cords = response.body.features

        if (cords.response == 'False'){
          callback(cords.Error, undefined)
        }
        else {
          const infoCiudad = {
              lat: cords[0].center[1],
              long: cords[0].center[0]
          }
          retorna(infoCiudad.lat, infoCiudad.long)
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
          console.log(dataClima.estara + ' Actualmente estamos a ' + dataClima.temp + ' C. Hay ' + dataClima.prob + '% de probabilidades de lluvia.')
        } 
    }
  })
}


geocode('Uyuni')
