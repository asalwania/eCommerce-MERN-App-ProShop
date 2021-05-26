//import required modules and libaries
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import prosuctRoutes from "./routes/productRoutes.js";
import { errorHandler, notFount } from "./middleware/errorMiddleware.js";

// confugring envoirment variables
dotenv.config();

// conneting to Mongodb
connectDB();

// intializing express app
const app = express();

//home route
app.get("/", (req, res) => {
  res.send("Api is running..");
});

// products route
app.use("/api/products", prosuctRoutes);

// error handler middle wares
app.use(notFount);

app.use(errorHandler);


// output to port 5000
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} at http://localhost:${PORT}`
      .yellow.bold
  )
);
