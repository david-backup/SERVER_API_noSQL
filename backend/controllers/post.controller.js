const PostModel = require("../models/post.model");

module.exports.getPosts = async (req, res) => {
  const posts = await PostModel.find();
  res.status(200).json(posts);
};

module.exports.setPosts = async (req, res) => {
  if (!req.body.message) {
    res.status(400).json({ message: "merci d'ajouter un message" })
  }

  const post = await PostModel.create({
    message: req.body.message,
    author: req.body.author
  })
  res.status(200).json(post)
};

module.exports.editPost = async (req, res) => {
  const post = await PostModel.findById(req.params.id)
  if (!post) {
    res.status(400).json({ message: "ce post n'existe pas !" })
  }

  const updatePost = await PostModel.findByIdAndUpdate(
    post,
    req.body,
    { new: true }
  )
  res.status(200).json(updatePost);
};

module.exports.deletePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    res.status(400).json({ message: "ce post n'existe pas !" })
  }

  await post.deleteOne();
  res.status(200).json("message supprimé " + req.params.id)
}
