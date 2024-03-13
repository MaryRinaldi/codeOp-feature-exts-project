var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.post("/", async function (req, res, next) {
  try {
    const body = req.body;
    const {
      firstName,
      gender,
      dob,
      //age,
      pronouns,
      primaryFamily,
      familyAdminGuardian,
    } = body;
    await db(`INSERT INTO children(firstName, gender, pronouns, dob, primaryFamily, familyAdminGuardian)
    VALUES('${firstName}', '${gender}', '${pronouns}', '${dob}', '${primaryFamily}', '${familyAdminGuardian}');`);

    const childRes = await db(
      `SELECT id from children ORDER BY id DESC LIMIT 1;`
    );

    const childId = childRes.data[0].id;

    const familyMembersTable = `family_${primaryFamily}_members`;

    await db(
      `INSERT INTO ${familyMembersTable}(grp, userId) VALUES('child', ${childId});`
    );

    const results = await db(
      `SELECT * FROM children WHERE familyAdminGuardian = '${familyAdminGuardian}';`
    );

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/", async function (req, res, next) {
  try {
    const id = req.query.familyAdminGuardian;

    const results = await db(
      `SELECT * FROM children WHERE familyAdminGuardian = '${id}';`
    );

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;


//UPDATE data
