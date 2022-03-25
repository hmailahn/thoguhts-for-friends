const { Schema, model, Types } = require('mongoose')

const ThoughtsSchema = new Schema(
    {

    }
);

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;