-- CreateTable
CREATE TABLE "PlansOnUsers" (
    "userId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,

    CONSTRAINT "PlansOnUsers_pkey" PRIMARY KEY ("userId","planId")
);

-- AddForeignKey
ALTER TABLE "PlansOnUsers" ADD CONSTRAINT "PlansOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlansOnUsers" ADD CONSTRAINT "PlansOnUsers_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
