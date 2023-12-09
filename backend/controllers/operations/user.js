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
  { echo, print } = require("../../../global/Print"),
  MODE = {
    STDNT: "stdnt",
    ADMIN: "admin",
  },
  //Regex
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
      /*
        Queries
        Job #1 for email
        Job #2 for passwords
       */
      chk1_1 = `
      SELECT studentEmail
      FROM Students
      WHERE studentEmail = @email`,
      chk1_2 = `
      SELECT adminEmail
      FROM Administrators
      WHERE adminEmail = @email`,
      chk2_1 = `
      SELECT studentPasswd
      FROM Students
      WHERE studentEmail = @email`,
      chk2_2 = `
      SELECT adminPasswd
      FROM Administrators
      WHERE studentEmail = @email`;
    // To determine if user is student or admin
    let type = "student";

    // Connect to db
    const pool = await sql.connect(config);
    /*
      Check if email exists at all
      
      FOR MSSQL SERVER:      
      if var.recordset or var.recordsets is empty
      it's null, so email not exists
      */
    //Check in student db
    let emailDB = (
      await pool
        .request()
        // user-defined variables
        .input("email", sql.NVarChar(255), email)
        .query(chk1_1)
    ).recordset[0];

    if (!emailDB) {
      // Check in admin db
      emailDB = (
        await pool
          .request()
          .input("email", sql.NVarChar(255), email)
          .query(chk1_2)
      ).recordset[0];
      //Throw error if email not found
      if (!emailDB) {
        pool.close();
        throw Error("No account with that email found");
      } else {
        // Otherwise, user is admin
        type = "administrator";
      }
    } else {
      // Otherwise, user is student
      type = "student";
    }
    /*
      Check if password matches

      NOTE:
      Use bcrypt.compare() for this
      https://www.npmjs.com/package/bcrypt#to-check-a-password
      */
    let passwdDB = "";
    if (type === "student") {
      passwdDB = (
        await pool
          .request()
          .input("email", sql.NVarChar(255), email)
          .query(chk2_1)
      ).recordset[0].studentPasswd;
    } else if (type === "administrator") {
      passwdDB = (
        await pool
          .request()
          .input("email", sql.NVarChar(255), email)
          .query(chk2_2)
      ).recordset[0].adminPasswd;
    }
    //Check if password is correct
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
  }
};

// Sign Up student or admin
userSignUp = async (email, passwd, namef, namel, type) => {
  // Connect to db
  const pool = await sql.connect(config);
  let done = false;
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
                // queries
                const chk1_1 = `
                  SELECT studentEmail
                  FROM Students
                  WHERE studentEmail = @email`,
                  chk1_2 = `
                  SELECT adminEmail
                  FROM Administrators
                  WHERE adminEmail = @email`;

                /*
                    Check if email exists
                    Otherwise, create account
                  */
                // check in student db
                let emailDB = (
                  await pool
                    .request()
                    // user-defined variables
                    .input("email", sql.NVarChar(255), email)
                    .query(chk1_1)
                ).recordset[0];
                if (emailDB) {
                  pool.close();
                  throw Error("Email already in use");
                } else {
                  // check in admin db
                  emailDB = (
                    await pool
                      .request()
                      .input("email", sql.NVarChar(255), email)
                      .query(chk1_2)
                  ).recordset[0];
                  if (emailDB) {
                    pool.close();
                    throw Error("Email already in use");
                  } else {
                    //bcrypt stuffs to obscure password
                    const saltRounds = 10,
                      salt = bcrypt.genSaltSync(saltRounds),
                      hash = bcrypt.hashSync(passwd, salt);
                    // Insert to right db
                    switch (type) {
                      case "student":
                        // Invoke anonymous function
                        (async () => {
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
                        done = true;
                        break;
                      case "administrator":
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
                  }
                }
            }
        }
    }
  }
  echo(`Authenticated ${type} of email "${email}"`);
};

module.exports = { userSignIn, userSignUp };
