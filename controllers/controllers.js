const bcrypt = require("bcrypt");
const adminModel = require("../model/adminModel");
const postModel = require("../model/postModel");
const jwt = require("jsonwebtoken");
const { log } = require("console");
const secretKey = "dhami_06";

const login = (req, res) => {
  res.render("login");
};

const register = (req, res) => {
  res.render("register");
};

const defaultRoute = async (req, res) => {
  const logIn = req.cookies;

  if (logIn.jwt) {
    try {
      res.render("index");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/login");
  }
};

const creatUser = async (req, res) => {
  const { name, email, password, conf_password } = req.body;
  const admin_data = await adminModel.findOne({ email });
  let saltRounds = 10;
  let enPass = await bcrypt.hash(password, saltRounds);

  //   console.log("admin_data_email....", admin_data);

  if (password === conf_password && admin_data === null) {
    try {
      const user = new adminModel({
        name,
        email,
        password: enPass,
      });
      await user.save();

      const token = jwt.sign({ userId: user._id }, secretKey);
      res.cookie("jwt", token, { httpOnly: true });

      res.redirect("/login");
    } catch (err) {
      console.log("Error:", err);
      res.redirect("/register");
    }
  } else {
    res.redirect("/register");
  }
};

const userLogin = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const user = await adminModel.findOne({ email: userEmail });

    if (!user) {
      console.log("User not found. Create account...");
      res.redirect("/register");
    } else {
      const match = await bcrypt.compare(userPassword, user.password);

      if (match) {
        console.log("Login successful");
        const token = jwt.sign({ userId: user._id }, secretKey);
        res.cookie("jwt", token, { httpOnly: true });
        res.redirect("/");
      } else {
        console.log("Incorrect password");
        res.redirect("/login");
      }
    }
  } catch (err) {
    console.log("Error:", err);
    res.redirect("/login");
  }
};

const createPost = (req, res) => {
    console.log(req.body);
  const { title, body, createdBy, active, latitude, longitude } = req.body;
  const token = req.cookies.jwt;
  const decoded = jwt.verify(token, secretKey);

  const post = new postModel({
    admin: decoded.userId,
    title,
    body,
    createdBy,
    active,
    latitude,
    longitude,
  });
  post.save();

  res.redirect("/");
};

const viewpost = async (req, res) => {
  const token = req.cookies.jwt;
  const decoded = jwt.verify(token, secretKey);

  const post = await postModel.find();
  const posts = post.filter((p) => p.admin == decoded.userId);
  res.json({ data: posts });
};

const updatepost =async (req, res) => {
    const id = req.params.id;
    const post =await postModel.findById(id);
    console.log('post', post);
    res.render('edit', {post})
};

const updatePost =async (req, res) => {
    const {id, tital, body, createdBy, active, latitude, longitude,} = req.body

    const post = await postModel.findByIdAndUpdate(id, {
        tital, body, createdBy, active, latitude, longitude
    })
    res.redirect('/');

}

const deletepost =async (req, res) => {
    const id = req.params.id;
    const post =await postModel.findByIdAndDelete(id);
    res.json({data: post, ms: 'Delet Succesfull...'})

}
module.exports = {
  defaultRoute,
  creatUser,
  userLogin,
  login,
  register,
  createPost,
  viewpost,
  updatepost,
  updatePost,
  deletepost
};
