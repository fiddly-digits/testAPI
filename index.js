const express = require('express');
const app = express();
const fsProm = require('fs').promises;

// * Endpoint de home
app.get('/', (req, res) => {
  res.send('Endpoint de Home, si funciona la api');
});

/*
 * Arquitectura rest
 * recurso/identificar
 * method -> Get
 * ruta -> /koders
 */

app.get('/koders', async (req, res) => {
  const db = await fsProm.readFile('./koders.json', 'utf8');
  const dbParsed = JSON.parse(db); // * Parseamos el JSON
  res.json(dbParsed); //* Regresamos un header de content-type -> application/json
});

/*
 * Parametros
 * Query Params -> ?modulo=Backend
 * path params(identificador) -> :pathParam
 * /route/:pathParam
 */

app.get('/koders/:name', async (req, res) => {
  const db = await fsProm.readFile('./koders.json', 'utf8');
  const dbParsed = JSON.parse(db);
  const { name } = req.params;
  const selectedKoder = dbParsed.koders.reduce((accum, current) => {
    if (current.name.toLowerCase() === name.toLowerCase()) {
      accum = { ...current };
    }
    return accum;
  }, {});
  res.json(selectedKoder);
});

app.listen(8080, () => {
  console.log('Server on');
});
