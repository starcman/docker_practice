import express from "express";
import Redis from "ioredis";
import mongoose from "mongoose";

const envs = {
  redis: {
    host: process.env.REDIS_HOST,
    port: 6379,
  },
  mongo: {
    host: process.env.MONGO_HOST,
    port: 27017,
  },
  port: 3000,
};

const redis = new Redis(envs.redis.port, envs.redis.host);

const DbEndPoint = `mongodb://${envs.mongo.host}:27017/goals`;

mongoose.connect(DbEndPoint).catch((err) => console.log("Error ", err));

const Goal = mongoose.model("Goal", { name: String });

const State = mongoose.model("State", {
  name: { type: String, unique: true },
  capitalName: String,
});

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/goals/", async (req, res) => {
  const dbRes = await Goal.find({});

  res.json({ data: dbRes });
});

app.post("/goals/", async (req, res) => {
  const dbRes = await Goal.create({ name: req.body.name });
  res.json({ data: dbRes });
});

app.get("/state", async (req, res) => {
  const dbRes = await State.find({});

  res.json({ data: dbRes });
});

app.get("/state/:stateName", async (req, res) => {
  const stateName = req.params.stateName?.toLowerCase();
  let status = "success";

  // 1. try from redis
  const redisResponse = await redis.get(stateName);

  if (!redisResponse) {
    // 2. if cache is miss then check db
    const dbRes = await State.findOne({ name: stateName });

    if (!dbRes) {
      // if missing in db throw err
      status = "failure";
    } else {
      // if it's there set the cache
      const red = await redis.set(stateName, dbRes.capitalName);
      status = "success";
    }

    res.json({ status, data: dbRes });
  } else {
    res.json({ status, data: { capitalName: redisResponse } });
  }
});

app.post("/state", async (req, res) => {
  const stateName = req.body.stateName?.toLowerCase();
  const capitalName = req.body.capitalName?.toLowerCase();
  let status = "success";

  const existsInDb = await State.findOne({ name: stateName });

  if (existsInDb) {
    res.json({ status: "failure", data: null, message: "Exists in Db" });
  }

  const dbRes = await State.create({ name: stateName, capitalName });

  const redisRes = await redis.set(stateName, capitalName);

  res.json({ status, data: dbRes });
});

const port = envs.port;

app.listen(port, () => {
  console.log(`Db End Point ${DbEndPoint} & redis host ${envs.redis.host}`);
  console.log(`app is listening at http://localhost:${port}`);
});
