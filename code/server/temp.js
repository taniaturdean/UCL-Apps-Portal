import * as DB from "./databaseFunctions.js";
import { verifyJWT } from "./routes/auth.js";
import { verifyJWTAdmin } from "./routes/admin.js";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import { config } from "dotenv";
import { configPath } from "./envFilePath.js";

// Set path to .env file to load them into process.env
config({
  path: configPath,
});

async function print() {
  const adminEmail = process.env.ADMIN_EMAIL;
  console.log(adminEmail);
  const jwt = sign({ email: adminEmail }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60, // 60 mins
  });

  verify(jwt, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
    } else {
      const email = decoded.email;
      console.log(decoded);
    }
  });

  // create mock req, res and next objects
  //     const req = {
  //       cookies: { jwt: jwt },
  //     };
  //     const res = {
  //       json: function (obj) {
  //         res.data = obj;
  //       },
  //     };
  //     const next = function () {};

  //     console.log(req);
  //     verifyJWTAdmin(req, res, next);

  //   console.log(res.data);
}

print();
