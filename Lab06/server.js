const express = require('express')
const weather = require('./app.js')

const app = express()

const port = process.env.PORT || 3000



app.get('/weather', function(req, res) {
	if ( !req.query.search ) {
    res.send({
      error: 'Debes de pasar la ciudad como parametro'
    })
  }
  console.log(req.query.search)

  weather.geocode( req.query.search, function(error, response) {

  	if ( error ){
  		return res.send({
  			error: error
  		})
  	}

  	if ( response.lat ){

  		weather.retorna(response.lat, response.long, function(error, response) {

  			if ( error ) {
          		return res.send({
            		error: error
          		})

        	}
        	else {
        		response.send({
        			estara: response.estara,
        			temp: response.temp,
        			prob: response.prob
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
  console.log('Up and running!')
})