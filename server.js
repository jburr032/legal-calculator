const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("API Running"));

// Define routes
app.use("/uk/", require("./routes/landing"));
app.use("/uk/cpr", require("./routes/cprcalculator"));
app.use("/uk/court-order", require("./routes/courtorder"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
