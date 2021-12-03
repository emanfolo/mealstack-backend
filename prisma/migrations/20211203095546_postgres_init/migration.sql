-- CreateTable
CREATE TABLE "RecipesOnPlans" (
    "planId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "RecipesOnPlans_pkey" PRIMARY KEY ("planId","recipeId")
);

-- AddForeignKey
ALTER TABLE "RecipesOnPlans" ADD CONSTRAINT "RecipesOnPlans_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipesOnPlans" ADD CONSTRAINT "RecipesOnPlans_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
