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
  isName = /^[A-Z][a-zA-z]+$/;

// Sign In student or admin
userSignIn = async (email, passwd) => {
  //Query for student or admin that exists
  const task = `
        SELECT studentEmail, studentPasswd
        FROM Students
        WHERE studentEmail = @email
        AND studentPasswd = @passwd
        UNION
        SELECT adminID, adminEmail
        FROM Administrators
        WHERE adminEmail = @email
        AND adminPasswd = @passwd`;

  try {
    // Connect to database
    const pool = await sql.connect(config),
      result = await pool
        .request()
        .input("email", sql.NVarChar(255), email)
        .input("passwd", sql.NVarChar(255), passwd)
        .query(task);
    return result.recordsets;
  } catch (error) {
    console.log(error);
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
        throw Error("INVALID email");
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
            const errName =
              "Name must start with big letter, followed by big & small letters";
            switch (isName.test(namef)) {
              case false:
                throw Error(errName);
              default:
                /*
                Validate name last
                */
                switch (isName.test(namel)) {
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
                      check2 = `
                      SELECT studentPasswd
                      FROM Students
                      WHERE studentPasswd = @passwd`,
                      query = `
                      INSERT INTO Students
                      (studentEmail, studentPasswd, studentNameFirst, studentNameLast)
                      VALUES
                      (@email, @passwd, @namef, @namel)`;

                    if (true) {
                      // Connect to db
                      const pool = await sql.connect(config);

                      // Check if email exists
                      const result1 = (
                        await pool
                          .request()
                          // user-defined variables
                          .input("email", sql.NVarChar(255), email)
                          .query(check1)
                      ).recordset[0];
                      /*
                      If email not exists, check if passwd exists
                      */
                      if (result1) {
                        throw Error("Email exists");
                      } else {
                        const result2 = (
                          await pool
                            .request()
                            // user-defined variables
                            .input("passwd", sql.NVarChar(255), passwd)
                            .query(check2)
                        ).recordset[0];
                        /*
                        If passwd not exists, do insert
                        https://www.npmjs.com/package/mssql#asyncawait
                        https://www.npmjs.com/package/mssql#stored-procedures
                        */
                        if (result2) {
                          throw Error("Password exists");
                        } else {
                          return (
                            await pool
                              .request()
                              .input("email", sql.NVarChar(255), email)
                              .input("passwd", sql.NVarChar(255), hash)
                              .input("nf", sql.NVarChar(255), namef)
                              .input("nl", sql.NVarChar(255), namel)
                              .input("mode", sql.NVarChar(5), "stdnt")
                              .execute("SignUp")
                          ).rowsAffected;
                        }
                      }
                    }
                }
            }
        }
    }
  }
};

module.exports = { userSignIn, userSignUp };
