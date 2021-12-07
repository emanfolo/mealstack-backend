const { PrismaClient } = require('@prisma/client');
const { objectContainsKey } = require('jest-mock-extended');
const prisma = new PrismaClient();

async function getRecipeData(array) {
  const getRecipes = await prisma.recipe.findMany({
    where: {
      id: { in: array },
    }
  })
  return getRecipes;
}

async function createPlanObject(planName, array) {
  let recipes = await getRecipeData(array);
  
  const getTotalCalories = recipes[0].calories + recipes[1].calories + recipes[2].calories;
  const getTotalFat = recipes[0].fat + recipes[1].fat + recipes[2].fat;
  const getTotalProtein = recipes[0].protein + recipes[1].protein + recipes[2].protein;
  const getTotalCarbs = recipes[0].carbs + recipes[1].carbs + recipes[2].carbs;

 
  let newPlanObject = {
    name: planName,
    calories: getTotalCalories,
    protein: getTotalProtein,
    carbs: getTotalCarbs,
    fat: getTotalFat,
    recipes: {
      create: [
        {
          recipe: {
            connect: {
              id: array[0],
            },
          },
        },
        {
          recipe: {
            connect: {
              id: array[1],
            },
          },
        },
        {
          recipe: {
            connect: {
              id: array[2],
            },
          },
        },
      ],
    },
  }
  return newPlanObject;
}


async function createPlan(planName, array) {
  const createPlan = await prisma.plan.create({
    data: await createPlanObject(planName, array),
    include: { recipes: { include: { recipe: true } } }
  })
  return createPlan;
}

module.exports = { createPlan };