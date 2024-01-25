const crypto = require("crypto");

function generateSessionSecret() {
  return crypto.randomBytes(32).toString("hex");
}

const sessionSecret = generateSessionSecret();
console.log("SESSION_SECRET=" + sessionSecret);
