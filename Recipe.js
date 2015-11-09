/**
 * Created by felipe.lopes on 10/07/2015.
 */
var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema;

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
  host: 'localhost',
  port: 9200
});

module.exports = mongoose.model('Recipe', RecipeSchema);
