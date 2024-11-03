-- CreateTable
CREATE TABLE "ActiveDuoCall" (
    "id" SERIAL NOT NULL,
    "socketId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActiveDuoCall_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActiveDuoCall_socketId_key" ON "ActiveDuoCall"("socketId");

-- CreateIndex
CREATE UNIQUE INDEX "ActiveDuoCall_username_key" ON "ActiveDuoCall"("username");

-- AddForeignKey
ALTER TABLE "ActiveDuoCall" ADD CONSTRAINT "ActiveDuoCall_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
