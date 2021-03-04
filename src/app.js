import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import routes from "./routes";

class App {
  constructor() {
    this.server = express();

    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());

    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "public"))
    );

    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  listen(port) {
    this.server.listen(port);
  }
}

// Aqui você separou a parte de rota, middlewares e da classe, facilitando

export const app = new App();
