const express = require("express");
const app = express.Router();


var estado = "nada"
var pos = "arriba"

app.get('/estado', (req, res) => {
  console.log("estado: " + estado)
  if (estado == "subir"){
    res.send('0\n')
  } else if (estado == "bajar") {
    res.send('1\n')
  } else {
    res.send('nada')
  }
  reset()
})

app.post('/subir', (req, res) => {
  if (pos == "arriba"){
    res.status(400).send("no se puede subir")
    return
  }
    console.log("subir")
    estado = "subir"
    pos = "arriba"
    res.status(200).send("subiendo")
})

app.post('/bajar', (req, res) => {
    if (pos == "abajo"){
        res.status(400).send("no se puede bajar")
        return
    }
    console.log("bajar")
    estado = "bajar"
    pos = "abajo"
    res.status(200).send("bajando")
})


const reset = () => setTimeout(() => {
  estado = "nada"
}, 10)

module.exports = app;
