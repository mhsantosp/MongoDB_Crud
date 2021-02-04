const { Router } = require("express");
const { ObjectId } = require("mongodb");
const router = Router();
const connection = require("../db");

const mongodb = require('mongodb');
// const {ObjectId} = require('mongodb');

router.get("/", async (req, res) => {
  const db = await connection();
  await db
    .collection("alumnos")
    .find()
    .toArray(function (err, alumnos) {
      res.json(alumnos);
    });
});

router.post("/", async (req, res) => {
  const db = await connection();
  const { nombres, apellidos, edad } = req.body;

  db.collection("alumnos").insertOne(
    {
      nombres,
      apellidos,
      edad,
    },
    function (err, info) {
      res.json(info.ops[0]);
    }
  );
});

router.put("/:id", async (req, res) => {
  const db = await connection();
  const { nombres, apellidos, edad } = req.body;
  const id = req.params.id;

  db.collection("alumnos").findOneAndUpdate(
    { "_id": ObjectId(id) },
    { $set: { nombres: nombres, apellidos: apellidos, edad: edad }},
    // { returnNewDocument: true },
    function () {
      res.json("Alumno actualizado");
    }
  );
});

router.delete("/:id", async (req, res) => {
  const db = await connection();
  const id = req.params.id;

  db.collection("alumnos").deleteOne(
    { "_id": ObjectId(id) },
    function () {
      res.json("Alumno eliminado");
    }
  );
});

module.exports = router;
