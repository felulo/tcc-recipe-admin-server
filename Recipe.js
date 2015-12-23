/**
 * Created by felipe.lopes on 10/07/2015.
 */
var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema;

var es = require('elasticsearch');
var url;

url = process.env.SEARCHBOX_URL || 'http://paas:2709e4e93fcce5bd1226a508fb18cad4@fili-us-east-1.searchly.com';

var esClient = new es.Client({
  host: url
});

var RecipeSchema = new mongoose.Schema({
  name: String,
  recipes: [{
    name: String,
    ingredients: [{
      quantity: Number,
      name: String,
      unit: String,
      optional: Boolean,
      obs: String
    }],
    prepare: [Schema.Types.Mixed]
  }],
  time: {
    hrs: Number,
    min: Number,
    sec: Number
  },
  yield: {
    count: Number,
    unit: String
  },
  images: [Schema.Types.Mixed]
});

RecipeSchema.plugin(mongoosastic, {
  esClient: esClient
});

module.exports = mongoose.model('Recipe', RecipeSchema);
