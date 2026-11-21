
const { test } = require("@playwright/test");

const { LoginPage } = require("../pages/LoginPage");
const { BoardPage } = require("../pages/BoardPage");

const testCases = require("../data/testCases.json");

for (const scenario of testCases) {

  test(`Test Case ${scenario.id}: ${scenario.task}`, async ({ page }) => {

    const loginPage = new LoginPage(page);
    const boardPage = new BoardPage(page);

    // Step 1: Login
    await loginPage.navigate();
    await loginPage.login("admin", "password123");

    // Step 2: Navigate to the project
    await boardPage.openProject(scenario.project);

    // Step 3: Verify task, column, and tags
    await boardPage.verifyTaskDetails(
      scenario.task,
      scenario.column,
      scenario.tags
    );

  });

}
