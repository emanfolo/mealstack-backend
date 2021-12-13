<div align="center" >

# Mealstack backend

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

![](https://img.shields.io/github/last-commit/emanfolo/mealstack-backend)
![](https://img.shields.io/github/languages/count/emanfolo/mealstack-backend)
![](https://img.shields.io/github/languages/code-size/emanfolo/mealstack-backend)

# [Live API](https://mealstack-backend.herokuapp.com/) &nbsp;&middot;&nbsp; [Live Site](https://mealstack.netlify.app/)

## The backend component of our Makers Academy final project, completed over 11 days

## [Frontend Repository](https://github.com/ConorButler/mealstack-frontend)

## [Video Presentation](https://youtu.be/B76vAgGgh4I)

### Made by:

### Emmanuel [@emanfolo](https://github.com/emanfolo) &nbsp;&middot;&nbsp; Conor [@ConorButler](https://github.com/conorbutler) &nbsp;&middot;&nbsp; Doug [@dpkerins](https://github.com/dpkerins)

</div>

#

# Example Response - viewing a specific plan:

```json
{
  "id": 13,
  "createdAt": "2021-12-04T19:09:27.635Z",
  "updatedAt": "2021-12-04T19:09:27.637Z",
  "calories": 1879,
  "protein": 33,
  "carbs": 371,
  "fat": 27,
  "name": "Sushi sushi sushi",
  "recipes": [
    {
      "planId": 13,
      "recipeId": 526,
      "recipe": {
        "id": 526,
        "createdAt": "2021-12-02T16:36:34.458Z",
        "updatedAt": "2021-12-02T16:36:34.459Z",
        "label": "Sushi Rice",
        "image_url": "https://www.edamam.com/web-img/841/8411dc19577befc055d796a5c350002b.jpeg",
        "url": "https://www.foodnetwork.com/recipes/tyler-florence/sushi-rice-recipe-1937414",
        "yield": 4,
        "dairyFree": true,
        "glutenFree": true,
        "peanutFree": true,
        "porkFree": true,
        "kosher": true,
        "vegan": true,
        "vegetarian": true,
        "tags": "Vegan,Vegetarian,Dairy-Free,Gluten-Free,Peanut-Free,Pork-Free,Kosher,japanese,lunch/dinner,main course",
        "ingredients": "147g rice,15g rice wine vinegar,13g sugar,2g salt",
        "totalTime": 0,
        "cuisineType": "japanese",
        "mealType": "lunch/dinner",
        "dishType": "main course",
        "calories": 578,
        "fat": 1,
        "carbs": 129,
        "protein": 10
      }
    },
    {
      "planId": 13,
      "recipeId": 529,
      "recipe": {
        "id": 529,
        "createdAt": "2021-12-02T16:36:34.458Z",
        "updatedAt": "2021-12-02T16:36:34.459Z",
        "label": "Basic Sushi Rice",
        "image_url": "https://www.edamam.com/web-img/f66/f66ac65130ac985fad8db90b1cbc261c.jpg",
        "url": "http://www.foodrepublic.com/2011/10/28/basic-sushi-rice-recipe",
        "yield": 4,
        "dairyFree": true,
        "glutenFree": true,
        "peanutFree": true,
        "porkFree": true,
        "kosher": true,
        "vegan": true,
        "vegetarian": true,
        "tags": "Vegan,Vegetarian,Dairy-Free,Gluten-Free,Peanut-Free,Pork-Free,Kosher,japanese,lunch/dinner,main course",
        "ingredients": "147g rice,20g rice vinegar,10g sugar,2g salt",
        "totalTime": 0,
        "cuisineType": "japanese",
        "mealType": "lunch/dinner",
        "dishType": "main course",
        "calories": 566,
        "fat": 1,
        "carbs": 125,
        "protein": 10
      }
    },
    {
      "planId": 13,
      "recipeId": 305,
      "recipe": {
        "id": 305,
        "createdAt": "2021-12-02T16:26:47.131Z",
        "updatedAt": "2021-12-02T16:26:47.132Z",
        "label": "Sushi Rice Salad",
        "image_url": "https://www.edamam.com/web-img/17e/17ec8f27c19516fb56a55ac4522964a6.jpg",
        "url": "https://food52.com/recipes/35595-sushi-rice-salad",
        "yield": 4,
        "dairyFree": true,
        "glutenFree": false,
        "peanutFree": true,
        "porkFree": true,
        "kosher": true,
        "vegan": true,
        "vegetarian": true,
        "tags": "Vegan,Vegetarian,Dairy-Free,Peanut-Free,Pork-Free,Kosher,japanese,lunch/dinner,salad,main course",
        "ingredients": "11g canola oil,6g soy sauce,4g rice wine vinegar,3g sesame seeds,2g sugar,1g ginger,1g wasabi,143g brown rice,26g cucumber,63g avocado,2g nori,1g scallion",
        "totalTime": 0,
        "cuisineType": "japanese",
        "mealType": "lunch/dinner",
        "dishType": "salad",
        "calories": 735,
        "fat": 25,
        "carbs": 117,
        "protein": 13
      }
    }
  ]
}
```

# Features:

- ### Creating plans with recipes automatically calculates the total macros of that plan.
- ### Recipes can be reused in an infinite number of plans.
- ### PlansOnUsers allows users to save plans and have them tied to their account.
- ### Authentication using Passport.js, allowing users to sign in with GitHub Oauth.
- ### GitHub user info (e.g. profile picture) is updated on each sign in and stored in our database.
- ### Sessions are stored in a table in the database and set to expire after 1 month.

###

# Endpoints

### Recipes

Viewing all recipes

```
GET https://mealstack-backend.herokuapp.com/recipes

```

Viewing a specific recipe

```
GET https://mealstack-backend.herokuapp.com/recipes/:id

```

### Plans

View all plans

```
GET https://mealstack-backend.herokuapp.com/plans

```

Viewing specific plan

```

GET https://mealstack-backend.herokuapp.com/plans/:id

```

Creating a new plan

```

POST https://mealstack-backend.herokuapp.com/plans/new

params {
calories: string,
protein: string,
carbs: string,
fat: string,
breakfast_id: string,
lunch_id: string,
dinner_id: string,
snack_id: string,
name: string
}

```

### Authentication

Log in via GitHub OAuth

```
GET https://mealstack-backend.herokuapp.com/auth/github
```

Getting the current user

```
GET https://mealstack-backend.herokuapp.com/user
```

Logging out

```
POST https://mealstack-backend.herokuapp.com/logout
```

### Users

Viewing all saved plans

```
GET https://mealstack-backend.herokuapp.com/user/:id/plans
```

Saving a plan

```
POST https://mealstack-backend.herokuapp.com/user/plans/:planid
```

Deleting a plan from saved plans

```
DELETE https://mealstack-backend.herokuapp.com/user/plans/:planid
```
