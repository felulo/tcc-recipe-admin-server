/**
 * Created by felipe.lopes on 10/07/2015.
 */
var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
  Name: String,
  Recipes: [{
    Name: String,
    Ingredients: [{
      Quantity: Number,
      Name: String,
      Unit: String,
      Optional: Boolean
    }],
    Prepare: String
  }],
  Time: String,
  Yield: [{
    Count: Number,
    Unit: String
  }]
});

module.exports = mongoose.model('Recipe', RecipeSchema);

