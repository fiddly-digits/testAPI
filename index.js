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
/*
app.get('/koders', async (req, res) => {
  const db = await fsProm.readFile('./koders.json', 'utf8');
  const dbParsed = JSON.parse(db); // * Parseamos el JSON
  res.json(dbParsed.koders); //* Regresamos un header de content-type -> application/json
});
*/

/*
 * Parametros
 * Query Params -> ?modulo=Backend
 * path params(identificador) -> :pathParam
 * /route/:pathParam
 */

// ! Path Param
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

// ! Query Params

app.get('/koders', async (req, res) => {
  const db = await fsProm.readFile('./koders.json', 'utf8');
  const dbParsed = JSON.parse(db); // * Parseamos el JSON
  const { module } = req.query;
  const selectedKoder = dbParsed.koders.reduce((accum, current) => {
    if (current.module.toLowerCase() === module.toLowerCase()) {
      accum = { ...current };
    }
    return accum;
  }, {});
  res.json(selectedKoder); //* Regresamos un header de content-type -> application/json
});

/**
 * Ejercicio
 * 2 endpoints -
 * 1.er Donde me filtren por age los mentores
 * 2.do Donde obtengamos un mentor en especifico con su nombre
 */

// ! Mentors Query Param

app.get('/mentors', async (req, res) => {
  const db = await fsProm.readFile('./koders.json', 'utf8');
  const dbParsed = JSON.parse(db);
  const { age, module } = req.query;
  const selectedMentor = dbParsed.mentors.reduce((accum, current) => {
    let isAgeCoincident = current.age === age;
    let isModuleCoincident =
      current.module.toLowerCase() === module.toLowerCase();
    if (isAgeCoincident && isModuleCoincident) {
      accum = { ...current };
    }
    return accum;
  }, {});
  selectedMentor ? res.json(selectedMentor) : res.json(dbParsed.mentors);
});

// ! Mentors Path Param

app.get('/mentors/:name', async (req, res) => {
  const db = await fsProm.readFile('./koders.json', 'utf8');
  const dbParsed = JSON.parse(db);
  const { name } = req.params;
  const selectedMentor = dbParsed.mentors.reduce((accum, current) => {
    if (current.name.toLowerCase() === name.toLowerCase()) {
      accum = { ...current };
    }
    return accum;
  }, {});
  res.json(selectedMentor);
});

app.listen(8080, () => {
  console.log('Server on');
});
