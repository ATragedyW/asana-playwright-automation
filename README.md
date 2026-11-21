The created project "Asana Playwright Automation" is the loop technical automation using JavaScript end to end test suite that is built with Playwright for the Asana-like demo application.

The suite uses JSON test scenarios and Page Objects to minimize duplicate code. 
Each scenario logs in, opens the required project board, and verifies a task's associated column and tag.

Prerequisites:
1) Node.js and npm installed
2) Network access to the demo application

Installation:
From the project root
1) npm install
2) npx playwright install

Run Tests:
1) npx playwright test tests/asana.spec.js --headed --workers=3
