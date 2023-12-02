/*
  GET Requests
*/
// Students
app.get("/api/students", async (request, response) => {
  try {
    (query = "SELECT * FROM Students"),
      (result = await database.request().query(query));
    response.json(result.recordset);
  } catch (error) {
    response.status(404).json({ error: error.message });
  }
  response.end();
});
app.post("/api/students", async (request, response) => {
  try {
    const { email, passwd } = request.params;
    query = `
    SELECT studentEmail, studentPasswd
    FROM Students
    WHERE studentEmail = @email
    AND studentPasswd = @passwd`;
    result = await database
      .request()
      .input("email", sql.NVarChar(255), email)
      .input("passwd", sql.NVarChar(255), passwd)
      .query(query);
    response.json(result.recordset);
  } catch (error) {
    response
      .status(404)
      .json({ message: "User not found", error: error.message });
  }
});
// Courses List
app.get("/api/courses", async (request, response) => {
  try {
    (query = "SELECT * FROM Courses"),
      (result = await database.request().query(query));
    response.json(result.recordset);
  } catch (error) {
    response.status(404).json({ error: error.message });
  }
});
// Administrators List
app.get("/api/administrators", async (request, response) => {
  try {
    (query = "SELECT * FROM Administrators"),
      (result = await database.request().query(query));
    response.json(result.recordset);
  } catch (error) {
    response.status(404).json({ error: error.message });
  }
});
// "Courses Enrolled" List
app.get("/api/courses-enrolled", async (request, response) => {
  try {
    (query = "SELECT * FROM CoursesEnrolled"),
      (result = await database.request().query(query));
    response.json(result.recordset);
  } catch (error) {
    response.status(404).json({ error: error.message });
  }
});
