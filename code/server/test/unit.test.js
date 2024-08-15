import assert from "assert";
import { config } from "dotenv";
import * as DB from "../databaseFunctions.js";
import { verifyJWT } from "../routes/auth.js";
import { verifyJWTAdmin } from "../routes/admin.js";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import should from "should";
import { configPath } from "../envFilePath.js";

// Set path to .env file to load them into process.env
config({
  path: configPath,
});

describe("Database functions", function () {
  // test getting one of the drop downs for the form
  describe("Get sectors", function () {
    it("should return a list of sectors", async function () {
      this.timeout(2000); // set timeout to 5 seconds
      const expected = [
        { sector: "Consumer Discretionary" },
        { sector: "Consumer Staples" },
        { sector: "Energy" },
        { sector: "Financial" },
        { sector: "Healthcare" },
        { sector: "Industrials" },
        { sector: "Information Technology" },
        { sector: "Materials" },
        { sector: "Other" },
        { sector: "Real Estate" },
        { sector: "Telecommunications" },
        { sector: "Utilities" },
      ];
      const actual = await DB.getSectors();
      assert.deepStrictEqual(actual, expected);
    });
  });

  // testing getting one all approved opportunities/past projects/ available tech
  describe("Get opportunities", function () {
    it("should return an object containing all approved opportunities (if any)", async function () {
      this.timeout(3500);
      should(await DB.getAllApprovedOpportunities()).be.a.Object();
    });
  });

  const insert_id = [];

  describe("Inserting, updating and delete a listing", function () {
    let insert_id;

    before(function () {
      insert_id = null; // initialize to null
    });

    it("should insert a listing and return its ID", async function () {
      // insert listing into listings table
      const listingResult = await DB.insertListing(
        "Test title",
        "Past Project"
      );
      should(await listingResult[0]).be.a.Object();

      // get auto-incremented id from result
      const listingID = await listingResult[0]["insertId"];

      // store the id in insert_id
      insert_id = await listingID;

      // return the id
      return insert_id;
    });

    describe("Update approval of listing", function () {
      it("Should approve listing", async function () {
        const UpdateResult = await DB.updateListingApprovalByID(insert_id, 1);
        should(await UpdateResult[0]).be.a.Object();
      });
      it("approved value should be 1", async function () {
        // check value changed
        const checkResult = await DB.pool.query(
          `select approved from listings where listingID = 3;`
        );
        const updatedValue = await checkResult[0][0]["approved"];
        should(updatedValue).be.deepEqual(1);
      });
    });

    describe("Delete listing by ID", function () {
      it("should delete the listing using the stored ID", async function () {
        // delete listing by ID stored in insert_id
        const deleteResult = await DB.deleteListingByID(insert_id);
        should(await deleteResult[0]).be.a.Object();
        DB.pool.end();
      });
    });
  });
});

describe("Verify JWT functions", function () {
  describe("Verify JWT for standard user", function () {
    it("No token, auth should equal false", function () {
      // create mock req, res and next objects
      const req = {};
      const res = {
        json: function (obj) {
          res.data = obj;
        },
      };
      const next = function () {};

      verifyJWT(req, res, next);

      assert.deepStrictEqual(res.data.auth, false);
      assert.deepStrictEqual(res.data.msg, "No token found in header");
    });

    it("Invalid Token, auth should equal false ", function () {
      // create jwt with incorrect client secret
      const testEmail = "testemail@ucl.ac.uk";
      const jwt = sign({ email: testEmail }, "fake_secret", {
        expiresIn: 60 * 60, // 60 mins
      });
      // create mock req, res and next objects
      const req = {
        cookies: { jwt: jwt },
      };
      const res = {
        json: function (obj) {
          res.data = obj;
        },
      };
      const next = function () {};

      verifyJWT(req, res, next);

      // if verification successful, next() is called and no response sent
      assert.deepStrictEqual(res.data.auth, false);
      assert.deepStrictEqual(res.data.msg, "Failed to authenticate");
    });

    it("Valid Token, should be no changes to response ", function () {
      // create jwt
      const testEmail = "testemail@ucl.ac.uk";
      const jwt = sign({ email: testEmail }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60, // 60 mins
      });
      // create mock req, res and next objects
      const req = {
        cookies: { jwt: jwt },
      };
      const res = {
        json: function (obj) {
          res.data = obj;
        },
      };
      const next = function () {};

      verifyJWT(req, res, next);

      // if verification successful, next() is called and no response sent
      assert.deepStrictEqual(res.data, undefined);
    });
  });

  describe("Verify JWT for admin user", function () {
    it("No token, auth should equal false", function () {
      // create mock req, res and next objects
      const req = {};
      const res = {
        json: function (obj) {
          res.data = obj;
        },
      };
      const next = function () {};

      verifyJWTAdmin(req, res, next);

      assert.deepStrictEqual(res.data.auth, false);
      assert.deepStrictEqual(res.data.msg, "No token found in header");
    });

    it("Invalid Token, auth should equal false ", function () {
      // create jwt with incorrect client secret
      const testEmail = "testemail@ucl.ac.uk";
      const jwt = sign({ email: testEmail }, "fake_secret", {
        expiresIn: 60 * 60, // 60 mins
      });
      // create mock req, res and next objects
      const req = {
        cookies: { jwt: jwt },
      };
      const res = {
        json: function (obj) {
          res.data = obj;
        },
      };
      const next = function () {};

      verifyJWTAdmin(req, res, next);

      // if verification successful, next() is called and no response sent
      assert.deepStrictEqual(res.data.auth, false);
      assert.deepStrictEqual(res.data.msg, "Failed to verify JWT");
    });

    it("Valid Token, but payload is NOT admin email: auth should be false ", function () {
      // create jwt
      const testEmail = "testemail.ac.uk";
      const jwt = sign({ email: testEmail }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60, // 60 mins
      });
      // create mock req, res and next objects
      const req = {
        cookies: { jwt: jwt },
      };
      const res = {
        json: function (obj) {
          res.data = obj;
        },
      };
      const next = function () {};

      verifyJWTAdmin(req, res, next);

      // if verification successful, next() is called and no response sent
      assert.deepStrictEqual(res.data.auth, false);
      assert.deepStrictEqual(
        res.data.msg,
        "User account does not have admin permissions"
      );
    });

    it("Valid Token, AND payload is admin email: should be no changes to response ", function () {
      // create jwt
      const adminEmail = process.env.ADMIN_EMAIL;
      const jwt = sign({ email: adminEmail }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60, // 60 mins
      });
      // create mock req, res and next objects
      const req = {
        cookies: { jwt: jwt },
      };
      const res = {
        json: function (obj) {
          res.data = obj;
        },
      };
      const next = function () {};

      verifyJWTAdmin(req, res, next);

      // if verification successful, next() is called and no response sent
      assert.deepStrictEqual(res.data, undefined);
      DB.pool.end();
    });
  });
});
