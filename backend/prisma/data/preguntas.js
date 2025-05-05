const preguntasIdiomas = require('./preguntas_idiomas');
const preguntasMatematicas = require('./preguntas_matematicas');
const preguntasBiologia = require('./preguntas_biologia');
const preguntasMusica = require('./preguntas_musica');
const preguntasGeografia = require('./preguntas_geografia');
const preguntasLengua = require('./preguntas_lengua');

//Array combinado con todas las preguntas de los archivos individuales
module.exports = [
    ...preguntasIdiomas,
    ...preguntasMatematicas,
    ...preguntasBiologia,
    ...preguntasMusica,
    ...preguntasGeografia,
    ...preguntasLengua,
];
