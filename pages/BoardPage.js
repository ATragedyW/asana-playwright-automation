
const { expect } = require("@playwright/test");

class BoardPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to the selected project
  async openProject(projectName) {
    const project = this.page
      .getByText(projectName, { exact: true })
      .first();

    await expect(project).toBeVisible();
    await project.click();
  }

  // Verify the task, its column, and its tags
  async verifyTaskDetails(taskName, columnName, tags) {

    console.log(`\nVerifying task: ${taskName}`);
    console.log(`Expected column: ${columnName}`);
    console.log(`Expected tags: ${tags.join(", ")}`);

  
    // Matches "To Do", "To Do (1)", "To Do (2)", etc.
    const escapedName = columnName.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const columnPattern = new RegExp(
      `^${escapedName}\\s*(?:\\(\\d+\\))?$`,
      "i"
    );

    const columnHeading = this.page
      .getByText(columnPattern)
      .first();

    await expect(columnHeading).toBeVisible();

    console.log(`Column heading found: ${columnName}`);

    // Step 2: Find the task
    const task = this.page.getByText(taskName, {
      exact: true
    });

    await expect(task).toBeVisible();

   
    const column = this.page
      .locator("div")
      .filter({ has: columnHeading })
      .filter({ has: task })
      .last();

    await expect(column).toBeVisible();

   
    const allColumnHeadings =
      /^(To Do|In Progress|Review|Done)\s*(?:\(\d+\))?$/i;

    await expect(
      column.getByText(allColumnHeadings),
      `Task "${taskName}" must be inside "${columnName}"`
    ).toHaveCount(1);

    console.log(`Task verified in: ${columnName}`);

    // Locate the task card
    const taskCard = task.locator("xpath=../..");

    //Verify the required tags
    for (const tag of tags) {
      await expect(
        taskCard.getByText(tag, { exact: true }),
        `Task "${taskName}" should have tag "${tag}"`
      ).toBeVisible();

      console.log(`Tag verified: ${tag}`);
    }

    console.log(`PASSED: ${taskName}\n`);
  }
}

module.exports = { BoardPage };
