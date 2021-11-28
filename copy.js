const express = require("express");
const mongoose = require("mongoose");

/*   
1 - connect to mongodb server -- DONE
2 - create a schema for our data
3 - create a model from the schema
*/

// Step 1
const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/test");
};

// Users Mongoose
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: false, default: "Male" },
    age: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema); // users

// Post Mongoose
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    tag_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tag",
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema); // posts collection

// Comment Mongoose => Post and comment are one to many relationship
const commentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", commentSchema); // comments collection

// Tags Mongoose => Post and Tags are in a many to many relationship
const tagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Tag = mongoose.model("tag", tagSchema); // tags collection

const app = express();

app.use(express.json());

/*
  users
  post = /users
  get all = /users
  get one = /users/:id
  update one = /users/:id
  delete one = /users/:id
*/

// USERS CRUD
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.send({ users });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean().exec();

    return res.send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

// ------------ TAGS CRUD -----------------
app.post("/tags", async (req, res) => {
  try {
    const tag = await Tag.create(req.body);

    return res.status(201).send(tag);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/tags", async (req, res) => {
  try {
    const tags = await Tag.find().lean().exec();

    return res.send(tags);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/tags/:id", async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id).lean().exec();

    return res.send(tag);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/tags/:id", async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(200).send(tag);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/tags/:id", async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(tag);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/tags/:id/posts", async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id).lean().exec();
    const posts = await Post.find({ tag_ids: tag._id })
      .populate("tag_ids")
      .lean()
      .exec();

    return res.status(200).send({ posts, tag });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

// ------------ POSTS CRUD -----------------
app.post("/posts", async (req, res) => {
  try {
    const post = await Post.create(req.body);

    return res.status(201).send(post);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({ path: "user_id", select: "first_name" })
      .populate("tag_ids")
      .lean()
      .exec();

    return res.send(posts);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean().exec();

    return res.send(post);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.send(post);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id).lean().exec();

    return res.send(post);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

// ------------ COMMENTS CRUD -----------------
app.post("/comments", async (req, res) => {
  try {
    const comment = await Comment.create(req.body);

    return res.status(201).send(comment);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find().lean().exec();

    return res.send(comments);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).lean().exec();

    return res.send(comment);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.send(comment);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    return res.send(comment);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.listen(2345, async function () {
  await connect();
  console.log("listening on port 2345");
});