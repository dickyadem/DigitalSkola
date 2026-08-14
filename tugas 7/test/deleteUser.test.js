const { expect } = require("chai");

const BASE_URL = "https://belajar-bareng.onrender.com/api";
let token;
let userId;
const uniqueUsername = `ade_${Date.now()}`;

describe("Delete User API Automation", function () {
  this.timeout(10000);

  before(async function () {
    const loginResponse = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "admin",
        password: "admin",
      }),
    });

    const loginData = await loginResponse.json();
    token = loginData.token;

    const addResponse = await fetch(`${BASE_URL}/add-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: uniqueUsername,
        age: 11,
      }),
    });

    const addData = await addResponse.json();
    userId = addData.userId;
  });

  it("DELETE /delete-user/:id - should delete user successfully", async function () {
    const response = await fetch(`${BASE_URL}/delete-user/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data).to.have.property("message", "User deleted successfully!");
  });
});
