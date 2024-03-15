var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.put("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const details = req.body;
    const {
      firstName,
      sex,
      gender,
      dob,
      pronouns,
      primaryFamily,
      familyAdminGuardian,
      importantInfo
    } = details;
    await db(
      `UPDATE users SET firstName = '${firstName}', sex = '${sex}', gender = '${gender}', dob = '${dob}', pronouns = '${pronouns}', primaryFamily = '${primaryFamily}', familyAdminGuardian = '${familyAdminGuardian}', importantInfo = '${importantInfo}' WHERE id = '${id}'`
    );
    const results = await db(`SELECT * FROM users WHERE id = '${id}';`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const body = req.body;
    const {
      firstName,
      gender,
      dob,
      pronouns,
      primaryFamily,
      familyAdminGuardian,
      importantInfo
    } = body;
    await db(`INSERT INTO children(firstName, gender, pronouns, dob, primaryFamily, familyAdminGuardian)
    VALUES('${firstName}', '${gender}', '${pronouns}', '${dob}', '${primaryFamily}', '${familyAdminGuardian}', '${importantInfo}');`);

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



