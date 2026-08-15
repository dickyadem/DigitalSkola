const { expect } = require("chai");

const BASE_URL = "https://belajar-bareng.onrender.com/api";
let token;

describe("Add User API Automation", function () {
  this.timeout(10000);
  const uniqueUsername = `ade_${Date.now()}`;

  before(async function () {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "admin",
        password: "admin",
      }),
    });

    const data = await response.json();
    token = data.token;
  });

  it("GET /users - should return user list", async function () {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data).to.have.property("users");
  });

  it("POST /add-user - positive case", async function () {
    const response = await fetch(`${BASE_URL}/add-user`, {
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

    const data = await response.json();

    expect(response.status).to.be.oneOf([200, 201]);
    expect(data).to.have.property("message");
    // console.log("Positive case response:", data);
    // console.log("Positive case response status:", response.status);
  });

  it("POST /add-user - negative case", async function () {
    const response = await fetch(`${BASE_URL}/add-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: "",
        age: "abc",
      }),
    });

    const data = await response.json();

    expect(response.status).to.be.oneOf([400, 422]);
    expect(data).to.exist;

    // console.log("Negative case response:", data);
    // console.log("Negative case response status:", response.status);
  });
});
