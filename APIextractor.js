const data = require('./recipes');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const formatIngredients = (ingredientObjectArray, yield) => {
  let ingredientArray = ingredientObjectArray.map((ingredient) => {
    let singleServing = Math.floor((ingredient.weight / yield) * 100) / 100;
    return `${singleServing}g ${ingredient.food}`;
  });

  return ingredientArray.join(',');
};

const formatTags = (tagsArray, cuisineType, mealType, dishType) => {
  let tags = [
    'Dairy-Free',
    'Gluten-Free',
    'Peanut-Free',
    'Pork-Free',
    'Kosher',
    'Vegan',
    'Vegetarian',
  ];

  let filteredTags = tagsArray.filter((tag) => tags.includes(tag));

  let mealTags = [cuisineType, mealType, dishType];

  let combinedTags = filteredTags;

  mealTags.forEach((tag) => {
    if (tag.length > 0) {
      combinedTags.push(tag);
    }
  });

  return combinedTags.join(',');
};

const apiExtractor = (data) => {
  let objectArray = [];
  data.hits.forEach((object) => {
    let recipeObject = object.recipe;

    const {
      label,
      image,
      url,
      yield,
      healthLabels,
      ingredients,
      totalTime,
      cuisineType,
      mealType,
      dishType,
      totalNutrients,
    } = recipeObject;

    let newObject = {
      label,
      image_url: image,
      url,
      yield,
      dairyFree: healthLabels.includes('Dairy-Free'),
      glutenFree: healthLabels.includes('Gluten-Free'),
      peanutFree: healthLabels.includes('Peanut-Free'),
      porkFree: healthLabels.includes('Pork-Free'),
      kosher: healthLabels.includes('Kosher'),
      vegan: healthLabels.includes('Vegan'),
      vegetarian: healthLabels.includes('Vegetarian'),
      tags: formatTags(healthLabels, cuisineType, mealType, dishType),
      ingredients: formatIngredients(ingredients, yield),
      totalTime,
      cuisineType: cuisineType[0] ? cuisineType[0] : null,
      mealType: mealType[0] ? mealType[0] : null,
      dishType: dishType[0] ? dishType[0] : null,
      calories: Math.round(totalNutrients['ENERC_KCAL'].quantity / yield),
      fat: Math.round(totalNutrients['FAT'].quantity / yield),
      carbs: Math.round(totalNutrients['CHOCDF'].quantity / yield),
      protein: Math.round(totalNutrients['PROCNT'].quantity / yield),
    };

    objectArray.push(newObject);
  });

  return objectArray;
};

let recipeObjects = apiExtractor(data);

async function createRecipes() {
  const Recipes = await prisma.recipe.createMany({
    data: recipeObjects,
    skipDuplicates: true,
  });
  console.log(Recipes);
}

createRecipes();
