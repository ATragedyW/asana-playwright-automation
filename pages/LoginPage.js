
class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(
      "https://create-asana-like-pr-39y5.bolt.host/"
    );
  }

  async login(username, password) {
    await this.page.getByRole("textbox").first().fill(username);

    await this.page.locator('input[type="password"]').fill(password);

    await this.page.getByRole("button", {
      name: /log in|login|sign in/i
    }).click();
  }
}

module.exports = { LoginPage };
