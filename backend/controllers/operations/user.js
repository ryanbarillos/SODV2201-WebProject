/*
  REFERENCE(s)
  https://stackoverflow.com/a/46756178
  https://stackoverflow.com/questions/73228391/nodejs-mssql-with-params-on-request-input-why-is-it-still-giving-requesterror
  https://stackoverflow.com/questions/56437263/typeerror-the-config-server-property-is-required-and-must-be-of-type-string
  https://www.npmjs.com/package/mssql#transaction
  https://www.npmjs.com/package/bcrypt#sync
*/

const bcrypt = require("bcrypt"),
  validator = require("validator"),
  config = require("../../database/dbconfig"),
  sql = require("mssql"),
  { echo, print } = require("../../../global/Print");
isName = /^[A-Z][a-zA-z]+$/;

//Quick way to console log
// Sign In student or admin
userSignIn = async (email, passwd) => {
  /*
  Check if parameters are empty or valid
  */
  if (!(email && passwd)) {
    throw Error("All fields must be filled");
  } else {
    //bcrypt stuffs to obscure password
    const saltRounds = 10,
      salt = bcrypt.genSaltSync(saltRounds),
      hash = bcrypt.hashSync(passwd, salt),
      // queries
      job1 = `
      SELECT studentEmail
      FROM Students
      WHERE studentEmail = @email`,
      job2 = `
      SELECT studentPasswd
      FROM Students
      WHERE studentEmail = @email`;

    // Connect to db
    const pool = await sql.connect(config);

    // Check if email exists
    const emailDB = (
      await pool
        .request()
        // user-defined variables
        .input("email", sql.NVarChar(255), email)
        .query(job1)
    ).recordset[0];
    /*
      If email exists, check if passwd is correct
      FOR MSSQL SERVER:
      
      if var.recordset or var.recordsets is empty
      it's null, so email not exists
      */
    if (!emailDB) {
      pool.close();
      throw Error("No account with that email found");
    } else {
      const passwdDB = (
        await pool
          .request()
          // user-defined variables
          .input("email", sql.NVarChar(255), email)
          .query(job2)
      ).recordset[0].studentPasswd;
      /*
        https://www.npmjs.com/package/bcrypt#to-check-a-password
      */
      switch (await bcrypt.compare(passwd, passwdDB)) {
        case false:
          pool.close();
          throw Error("Incorrect password");
        case true:
          pool.close();
          echo(`Authenticated student of email "${email}"`);
      }
    }
  }
};

// Sign Up student or admin
userSignUp = async (email, passwd, namef, namel) => {
  /*
  Check if parameters are empty or valid
  */
  if (!(email && passwd && namef && namel)) {
    throw Error("All fields must be filled");
  } else {
    /*
    Validate email
    */
    switch (validator.isEmail(email)) {
      case false:
        throw Error("Invalid Email");
      default:
        /*
        Validate password
        */
        switch (validator.isStrongPassword(passwd)) {
          case false:
            throw Error("Password not strong enough");
          default:
            /*
            Validate name first
            */
            const errName = "Name must start in capital letter";
            switch (isName.test(namef) && isName.test(namel)) {
              case false:
                throw Error(errName);
              default:
                /*
                    BEGIN INSERT
                    BEGIN INSERT
                    BEGIN INSERT
                    */
                //bcrypt stuffs to obscure password
                const saltRounds = 10,
                  salt = bcrypt.genSaltSync(saltRounds),
                  hash = bcrypt.hashSync(passwd, salt),
                  // queries
                  check1 = `
                      SELECT studentEmail
                      FROM Students
                      WHERE studentEmail = @email`,
                  query = `
                      INSERT INTO Students
                      (studentEmail, studentPasswd, studentNameFirst, studentNameLast)
                      VALUES
                      (@email, @passwd, @namef, @namel)`;

                if (true) {
                  // Connect to db
                  const pool = await sql.connect(config);
                  /*
                    Check if email exists
                    Otherwise, create account
                  */
                  const result1 = (
                    await pool
                      .request()
                      // user-defined variables
                      .input("email", sql.NVarChar(255), email)
                      .query(check1)
                  ).recordset[0];
                  if (result1) {
                    pool.close();
                    throw Error("Email already in use");
                  } else {
                    //bcrypt stuffs to obscure password
                    const saltRounds = 10,
                      salt = bcrypt.genSaltSync(saltRounds),
                      hash = bcrypt.hashSync(passwd, salt);
                    // Invoke anonymous function
                    (async () => {
                      await pool
                        .request()
                        .input("email", sql.NVarChar(255), email)
                        .input("passwd", sql.NVarChar(255), hash)
                        .input("nf", sql.NVarChar(255), namef)
                        .input("nl", sql.NVarChar(255), namel)
                        .input("mode", sql.NVarChar(5), "stdnt")
                        .execute("SignUp");
                      /*
                                Close server connection
                                to prevent database penetration
                                to an open access server
                              */
                      pool.close();
                      echo(`Authenticated student of email "${email}"`);
                    })();
                  }
                }
            }
        }
    }
  }
};

module.exports = { userSignIn, userSignUp };
