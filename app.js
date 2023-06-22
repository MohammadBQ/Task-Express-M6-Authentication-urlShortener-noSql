const connectDb = require("./database");
const express = require("express");
const app = express();
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
const notFound = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const passport = require("passport");
const { localUserStrategy } = require("./middlewares/passport");

connectDb();
app.use(express.json());
app.use(passport.initialize());
passport.use("local-username", localUserStrategy);


app.use("/urls", urlRoutes);
app.use(userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("The application is running on localhost:8000");
});