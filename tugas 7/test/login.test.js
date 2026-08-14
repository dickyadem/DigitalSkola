const { describe } = require("mocha");
const assert = require("assert");
const { expect } = require("chai");

let token;

describe("Test Login", function () {
    it("Valid Login", async function () {
        const response = await fetch(
            "https://belajar-bareng.onrender.com/api/login",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    username: "admin",
                    password: "admin",
                }),
            }
        );

        expect(response.status).to.equal(200);

        const data = await response.json();
        expect(data.message).to.eql("Login successful");

        token = data.token;
    });

    it("Get User", async function () {
        const response = await fetch(
            "https://belajar-bareng.onrender.com/api/users",
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
            }
        );

        expect(response.status).to.equal(200);

        const data = await response.json();
    });
});
