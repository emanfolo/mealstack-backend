### Mealstack - Backend

### Link to front-end 

https://github.com/ConorButler/mealstack-frontend

### User Stories

```

As a User
So that I can stay on track for my health goals
I want to enter my daily calories and macros and see meal plans that fit these requirements

As a User
So that I can conveniently get more information
I want to see the nutrition details and recipe instructions

As a User
So that I don't have to calculate it myself
I want to see a shopping list of all the ingredients

As a User
So that I can keep track of what I have bought
I want to tick the ingredients on the shopping list

As a User
So that I can remember all of my meal plans
I want to save a plan and see it on my profile

```

### Database set up

```
Set up a test database locally

Create .env.test file at root directory and insert the below into the file replacing the variables in curly brackets {}

DATABASE_URL="postgresql://{USERNAME}:{PASSWORD}@localhost:5432/{DBNAME}"

Repeat the process by setting up a dev database and creating a .env.development file and inserting the DB URL.


Scripts:

Update Development DB
npm run migrate:postgres-dev

Update Test DB
npm run migrate:postgres-test


### API Documentation

``` 
Greeting page

GET

https://mealstack-backend.herokuapp.com/

```

```
View all recipes

GET

https://mealstack-backend.herokuapp.com/recipes

```

```
Viewing specific recipe

GET 

https://mealstack-backend.herokuapp.com/recipes/:id

```

```
View all plans

GET

https://mealstack-backend.herokuapp.com/plans

```

```
Viewing specific plan

GET 

https://mealstack-backend.herokuapp.com/plans/:id

```

```
Creating a new mealplan 

POST

https://mealstack-backend.herokuapp.com/plans/new

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

```
Changing name of plan

POST

https://mealstack-backend.herokuapp.com/plans/edit

params {
  name: string, 
  id: string
}

```

