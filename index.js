const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
app.use(express.json());
app.use(cors());

const uri =
  "mongodb+srv://learn-with-rahat:eexDc8A4EG76dWOG@cluster0.1xniais.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    /* content collection data */

    const blogCollection = await client
      .db("learn-with-rahat")
      .collection("blog");
    const featuredCourses = await client
      .db("learn-with-rahat")
      .collection("featured-course");
    const recentCourses = await client
      .db("learn-with-rahat")
      .collection("recent-course");
    const contactCollection = await client
      .db("learn-with-rahat")
      .collection("contact");
    const commentsCollection = await client
      .db("learn-with-rahat")
      .collection("comments");

    /* blog page layout content data*/

    app.post("/blog", async (req, res) => {
      const blog = req.body;
      const result = await blogCollection.insertOne(blog);
      res.send(result);
      console.log(result);
    });
    app.get("/blog", async (req, res) => {
      const result = await blogCollection.find({}).toArray();
      res.send(result);
    });
    app.get("/blog/:id", async (req, res) => {
      const result = await blogCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    app.delete("/blog/:id", async (req, res) => {
      const result = await blogCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });
    app.patch("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const blog = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const upDateDoc = {
        $set: {
          title: blog.title,
          content: blog.content,
          summary: blog.summary,
          imgUrl: blog.imgUrl,
          category: blog.category,
        },
      };
      const result = await blogCollection.updateOne(filter, upDateDoc, option);
      res.send(result);
    });

    /* featuredCourses layout content data*/

    app.post("/feature", async (req, res) => {
      const blog = req.body;
      const result = await featuredCourses.insertOne(blog);
      res.send(result);
      console.log(result);
    });
    app.get("/feature", async (req, res) => {
      const result = await featuredCourses.find({}).toArray();
      res.send(result);
    });
    app.get("/feature/:id", async (req, res) => {
      const result = await featuredCourses.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });
    app.delete("/feature/:id", async (req, res) => {
      const result = await featuredCourses.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    /* recentCourses layout content data*/

    app.post("/recent", async (req, res) => {
      const blog = req.body;
      const result = await recentCourses.insertOne(blog);
      res.send(result);
      console.log(result);
    });
    app.get("/recent", async (req, res) => {
      const result = await recentCourses.find({}).toArray();
      res.send(result);
    });
    app.get("/recent/:id", async (req, res) => {
      const result = await recentCourses.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });
    app.delete("/recent/:id", async (req, res) => {
      const result = await recentCourses.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    /* contact layout content data*/

    app.post("/contact", async (req, res) => {
      const blog = req.body;
      const result = await contactCollection.insertOne(blog);
      res.send(result);
      console.log(result);
    });
    app.get("/contact", async (req, res) => {
      const result = await contactCollection.find({}).toArray();
      res.send(result);
    });
    app.get("/contact/:id", async (req, res) => {
      const result = await contactCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    app.delete("/contact/:id", async (req, res) => {
      const result = await contactCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });
    app.patch("/contact/:id", async (req, res) => {
      const id = req.params.id;
      const message = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const upDateDoc = {
        $set: {
          name: message.name,
          email: message.email,
          summary: message.summary,
        },
      };
      const result = await contactCollection.updateOne(
        filter,
        upDateDoc,
        option
      );
      res.send(result);
    });

    /* comments layout content data*/

    app.post("/comment", async (req, res) => {
      const blog = req.body;
      const result = await commentsCollection.insertOne(blog);
      res.send(result);
      console.log(result);
    });
    app.get("/comment", async (req, res) => {
      const result = await commentsCollection.find({}).toArray();
      res.send(result);
    });
    app.get("/comment/:id", async (req, res) => {
      const result = await commentsCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });
    app.delete("/comment/:id", async (req, res) => {
      const result = await commentsCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });
    app.patch("/comment/:id", async (req, res) => {
      const id = req.params.id;
      const message = req.body;
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const upDateDoc = {
        $set: {
          name: message.name,
          email: message.email,
          summary: message.summary,
        },
      };
      const result = await commentsCollection.updateOne(
        filter,
        upDateDoc,
        option
      );
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(`learn with rahat server is available on ${port}`);
});
app.listen(port, () => console.log(`server listening on ${port}`));
