-- CreateTable
CREATE TABLE "Database" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Survey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "databaseId" INTEGER NOT NULL,
    CONSTRAINT "Survey_databaseId_fkey" FOREIGN KEY ("databaseId") REFERENCES "Database" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Database_value_key" ON "Database"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Database_label_key" ON "Database"("label");

-- CreateIndex
CREATE INDEX "Survey_databaseId_idx" ON "Survey"("databaseId");

