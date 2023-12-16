/*
  REFERENCE(s)
  https://stackoverflow.com/a/46756178
  https://stackoverflow.com/questions/73228391/nodejs-mssql-with-params-on-request-input-why-is-it-still-giving-requesterror
  https://stackoverflow.com/questions/56437263/typeerror-the-config-server-property-is-required-and-must-be-of-type-string
  https://www.npmjs.com/package/mssql#transaction
  https://www.npmjs.com/package/bcrypt#sync
*/

// Const Variables
const bcrypt = require("bcrypt"),
  validator = require("validator"),
  config = require("../../database/dbconfig"),
  sql = require("mssql"),
  { echo, print } = require("../../../global/Print"),
  MODE = {
    STDNT: "stdnt",
    ADMIN: "admin",
  },
  //Regex
  isName = /^[A-Z][a-zA-Z]+$/,
  // Bcrypt
  saltRounds = 10,
  salt = bcrypt.genSaltSync(saltRounds),
  /*
  Email Exists Checker
  */
  chkEmailExists = async (pool, email) => {
    /*
      Check if email exists at all
      
      FOR MSSQL SERVER:      
      if var.recordset or var.recordsets is empty
      it's null, so email not exists

      NOTE:
      If a const sql pool is delcared here and closed in this function,
      the pool inside the function calling this will close the sql
      connection too, thus accept pool as a parameter
      and NEVER CLOSE IT HERE
    */
    // Queries
    const chk1 = `
    SELECT Email
    FROM Students
    WHERE Email = @email`,
      chk2 = `
      SELECT Email
      FROM Administrators
      WHERE Email = @email`;

    //Check in student db
    let type = MODE.STDNT,
      emailDB = (
        await pool
          .request()
          .input("email", sql.NVarChar(255), email)
          .query(chk1)
      ).recordset[0];
    // Search email in admin db
    if (!emailDB) {
      emailDB = (
        await pool
          .request()
          .input("email", sql.NVarChar(255), email)
          .query(chk2)
      ).recordset[0];
      if (emailDB) {
        type = MODE.ADMIN;
      }
    }
    // Return boolean result
    if (emailDB) {
      return {
        type,
        res: true,
      };
    } else {
      return {
        type,
        res: false,
      };
    }
  };
/*
  Log-in
  */
userLogin = async (email, passwd) => {
  // Reject operation when either fields are empty
  if (!(email && passwd)) {
    throw Error("All fields must be filled");
  }
  /*
        Queries
        Job #1 for email
        Job #2 for passwords
       */
  const chk1 = `
        SELECT Passwd
        FROM Students
        WHERE Email = @email`,
    chk2 = `
    SELECT Passwd
    FROM Administrators
    WHERE Email = @email`;
  /*
    Check if email exists
    Otherwise, no login
  */
  // Connect to db
  const pool = await sql.connect(config),
    obj = await chkEmailExists(pool, email),
    result = obj.res,
    type = obj.type;
  if (!result) {
    pool.close();
    throw Error("No account with this email found");
  }
  /*
    Check if password is correct
    https://www.npmjs.com/package/bcrypt#to-check-a-password
  */
  let passwdDB = "";
  switch (type) {
    case MODE.STDNT:
      passwdDB = (
        await pool
          .request()
          .input("email", sql.NVarChar(255), email)
          .query(chk1)
      ).recordset[0].Passwd;
      break;
    case MODE.ADMIN:
      passwdDB = (
        await pool
          .request()
          .input("email", sql.NVarChar(255), email)
          .query(chk2)
      ).recordset[0].Passwd;
      break;
  }
  switch (await bcrypt.compare(passwd, passwdDB)) {
    case false:
      pool.close();
      throw Error("Incorrect password");
    case true:
      pool.close();
      echo(`Authenticated ${type} of email "${email}"`);
  }
  //Return user type: student or admin
  return type;
};

/*
  Sign Up student or admin
*/
userSignup = async (email, passwd, namef, namel, type) => {
  // Check if parameters are empty or valid
  if (!(email && passwd && namef && namel)) {
    throw Error("All fields must be filled");
  }
  // Validate email
  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }
  // Validate password
  if (!validator.isStrongPassword(passwd)) {
    throw Error("Password not strong enough");
  }
  // Validate names
  if (!(isName.test(namef) && isName.test(namel))) {
    throw Error("Name must start in capital letter");
  }
  /*
    Check if email exists
    Otherwise, create account
  */
  // Connect to db
  const pool = await sql.connect(config),
    result = (await chkEmailExists(pool, email)).res;

  if (result) {
    pool.close();
    throw Error("Email already in use");
  }
  //bcrypt stuffs to obscure password
  const hash = bcrypt.hashSync(passwd, salt);
  // Insert to right db
  switch (type) {
    case MODE.STDNT:
      // Invoke anonymous function
      await (async () => {
        await pool
          .request()
          .input("email", sql.NVarChar(255), email)
          .input("passwd", sql.NVarChar(255), hash)
          .input("nf", sql.NVarChar(255), namef)
          .input("nl", sql.NVarChar(255), namel)
          .input("mode", sql.NVarChar(5), MODE.STDNT)
          .execute("SignUp");
        pool.close();
      })();
      break;
    case MODE.ADMIN:
      // Invoke anonymous function
      (async () => {
        await pool
          .request()
          .input("email", sql.NVarChar(255), email)
          .input("passwd", sql.NVarChar(255), hash)
          .input("nf", sql.NVarChar(255), namef)
          .input("nl", sql.NVarChar(255), namel)
          .input("mode", sql.NVarChar(5), MODE.ADMIN)
          .execute("SignUp");
        pool.close();
      })();
      break;
  }
  echo(`Authenticated ${type} of email "${email}"`);
};

//Find user id using email
getUserID = async (email) => {
  // Query for email
  const chk1 = `
    SELECT ID
    FROM Students
    WHERE Email = @email`,
    chk2 = `
      SELECT ID
      FROM Administrators
      WHERE Email = @email`;

  // Check in student db
  let id = (await sql.connect(config).then(pool => {
    return pool.request().input("email", sql.NVarChar(255), email).query(chk1)
  })).recordset[0];

  if (!id) {
    // Check in admin db
    id = (await sql.connect(config).then(pool => {
      return pool.request().input("email", sql.NVarChar(255), email).query(chk2)
    })).recordset[0];
    // Halt query
    if (!id) {
      throw Error("No account with that email found");
    }
  }
  return id.ID;
};

//Get Current Student's term
getStdntTerm = async (id) => {
  // Query for email
  const qry = `
    SELECT Term
    FROM Students
    WHERE ID = @ID`,
    // Connect to db
    pool = await sql.connect(config);

  // Check in student db
  const term = (await pool.request().input("id", sql.Int, id).query(qry))
    .recordset[0];

  if (!term) {
    pool.close();
    throw Error("Term missing");
  }
  pool.close();
  return term.Term;
};

module.exports = { userLogin, userSignup, getUserID, getStdntTerm };
