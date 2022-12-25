require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout");

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT;

    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & Server Running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
