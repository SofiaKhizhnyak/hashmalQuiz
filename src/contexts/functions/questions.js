const fs = require("fs");
const path = require("path");

exports.handler = async function (event, context) {
  try {
    const questionsFilePath = path.resolve(__dirname, "questions.json");
    const questionsData = fs.readFileSync(questionsFilePath, "utf-8");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: questionsData,
    };
  } catch (error) {
    // If an error occurs, return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
