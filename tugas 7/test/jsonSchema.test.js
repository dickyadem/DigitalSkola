const { describe, it } = require("mocha");
const { expect } = require("chai");
const Ajv = require("ajv");

const BASE_URL = "https://belajar-bareng.onrender.com/api";
const ajv = new Ajv({ allErrors: true });

let token;

describe("Full API Automation & Schema Test", function () {
  this.timeout(10000);

  it("POST /login - Should return token & match JSON Schema", async function () {
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

    const responseData = await response.json();

    expect(response.status).to.equal(200);
    expect(responseData).to.have.property("token");

    const loginSchema = {
      type: "object",
      properties: {
        message: { type: "string" },
        token: { type: "string" },
      },
      required: ["message", "token"],
    };

    const validate = ajv.compile(loginSchema);
    const isValid = validate(responseData);
    const errorMessage = validate.errors
      ? JSON.stringify(validate.errors, null, 2)
      : null;

    expect(isValid, errorMessage).to.be.true;

    token = responseData.token;
  });

  it("GET /users - Should return user list & match JSON Schema", async function () {
    expect(token, "Token is missing! Login failed first.").to.be.a("string");

    const response = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    expect(response.status).to.equal(200);

    const usersSchema = {
      type: "object",
      properties: {
        status: { type: "number" },
        users: {
          type: "array",
          items: {
            type: "object",
            properties: {
              userId: { type: "string" },
              username: { type: "string" },
              age: { type: "number" },
              protected: { type: "boolean" },
            },
            required: ["userId", "username", "age"],
          },
        },
      },
      required: ["status", "users"],
    };

    const validate = ajv.compile(usersSchema);
    const isValid = validate(responseData);
    const errorMessage = validate.errors
      ? JSON.stringify(validate.errors, null, 2)
      : null;

    expect(isValid, errorMessage).to.be.true;
  });
});
