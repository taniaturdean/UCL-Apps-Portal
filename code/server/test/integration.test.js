import chai from "chai";
import chaiHttp from "chai-http";
import { app, listener } from "../server.js";
import * as DB from "../databaseFunctions.js";
import { config } from "dotenv";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import { configPath } from "../envFilePath.js";

// Set path to .env file to load them into process.env
config({
  path: configPath,
});

after((done) => {
  DB.pool.end();
  listener.close(done);
});

chai.use(chaiHttp);
const expect = chai.expect;

describe("Route testing", () => {
  describe("/GET route", () => {
    const adminEmail = "testemail@ucl.ac.uk";
    const jwt = sign({ email: adminEmail }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60, // 60 mins
    });

    it("should return all approved project opportunities", (done) => {
      chai
        .request(app)
        .get("/project-connect/browse")
        .set("Cookie", `jwt=${jwt}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.be.above(0);
          // check if each project opportunity has required properties
          res.body.forEach((project) => {
            expect(project).to.have.property("listingID");
            expect(project).to.have.property("listingTitle");
            expect(project).to.have.property("opportunityType");
            expect(project).to.have.property("sector");
            expect(project).to.have.property("opportunityDescription");
            expect(project).to.have.property("startDate");
            expect(project).to.have.property("salary");
            expect(project).to.have.property("duration");
            expect(project).to.have.property("contactEmail");
          });
          done();
        });
    });
  });

  describe("/POST a past project", () => {
    const adminEmail = "testemail@ucl.ac.uk";
    const jwt = sign({ email: adminEmail }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60, // 60 mins
    });

    let body = {
      title: "test title",
      abstract: "test abstract",
      sector: "Energy",
      productEvolution: "fvfnjdlksnkl",
      publishingJourney: "rehiowngs",
      githubLink: "www.test.com",
      productType: "Firmware",
      imagelink: "www.image.com",
      videoLink: "www.video.com",
      members: [
        {
          firstName: "John",
          lastName: "Doe",
          roleTitle: "Developer",
          roleDesc: "Built the frontend",
          linkedin: "https://www.linkedin.com/in/johndoe/",
        },
        {
          firstName: "Jane",
          lastName: "Doe",
          roleTitle: "Designer",
          roleDesc: "Created the UI",
          linkedin: "",
        },
      ],
    };

    it("should submit a new project form", async () => {
      const res = await chai
        .request(app)
        .post("/past-projects/submit-form")
        .set("Cookie", `jwt=${jwt}`)
        .send(body);

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body)
        .to.have.property("msg")
        .equal("Form successfully posted");
    });

    it("should return 400 error if required fields are missing", async () => {
      const invalidBody = {
        // missing required fields
        sector: "Energy",
        members: [],
      };

      const res = await chai
        .request(app)
        .post("/past-projects/submit-form")
        .set("Cookie", `jwt=${jwt}`)
        .send(invalidBody);

      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body).to.have.property("msg");
    });
  });

  // describe("GET /past-projects/browse/:id", () => {
  //   let listingID;
  //   let jwt;
  //   before(async () => {
  //     const adminEmail = "testemail@ucl.ac.uk";
  //     const jwt = sign({ email: adminEmail }, process.env.JWT_SECRET, {
  //       expiresIn: 60 * 60, // 60 mins
  //     });
  //     // Insert a project into the database
  //     const listingResult = await DB.insertListing(
  //       "Test project",
  //       "Past Project"
  //     );
  //     listingID = listingResult[0].insertId;

  //     await DB.insertPastProject(
  //       listingID,
  //       "Abstract",
  //       "Energy",
  //       "Product Evolution",
  //       "Publishing Journey",
  //       "github.com/test",
  //       "Firmware"
  //     );
  //     await DB.insertMember(
  //       listingID,
  //       "John",
  //       "Doe",
  //       "Developer",
  //       "Description"
  //     );
  //   });

  //   it("should return a specific project with team members", async () => {
  //     const res = await chai
  //       .request(app)
  //       .get(`/past-projects/browse/${listingID}`);
  //     expect(res).to.have.status(200);
  //     expect(res.body).to.be.an("array");
  //     expect(res.body).to.have.lengthOf(2);
  //     expect(res.body[0]).to.have.property("listing_id");
  //     expect(res.body[0]).to.have.property("abstract");
  //     expect(res.body[0]).to.have.property("sector");
  //     expect(res.body[0]).to.have.property("product_evolution");
  //     expect(res.body[0]).to.have.property("publishing_journey");
  //     expect(res.body[0]).to.have.property("github_link");
  //     expect(res.body[0]).to.have.property("product_type");
  //     expect(res.body[1]).to.be.an("array");
  //     expect(res.body[1]).to.have.lengthOf(1);
  //     expect(res.body[1][0]).to.have.property("member_id");
  //     expect(res.body[1][0]).to.have.property("listing_id");
  //     expect(res.body[1][0]).to.have.property("first_name");
  //     expect(res.body[1][0]).to.have.property("last_name");
  //     expect(res.body[1][0]).to.have.property("role_title");
  //     expect(res.body[1][0]).to.have.property("role_desc");
  //     expect(res.body[1][0]).to.not.have.property("linkedin");
  //   });

  //   after(async () => {
  //     // Delete the project from the database
  //     await DB.pool.query(`DELETE FROM listings WHERE id = ${listingID}`);
  //   });
  // });
});
