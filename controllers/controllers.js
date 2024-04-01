const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { log } = require("console");
const secretKey = "dhami_06";
const userModel = require("../model/userModel");
const categoryModel = require("../model/categoryModel");
const productModel = require("../model/productModel");

const login = (req, res) => {
  res.render("login");
};

const register = (req, res) => {
  res.render("register");
};

const defaultRoute = async (req, res) => {
  const { jwt } = req.cookies;

  if (jwt) {
    try {
      res.render("navbar");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/login");
  }
};

const createUser = async (req, res) => {
  const { username, email, password, conf_password, role } = req.body;

  let saltRounds = 10;
  let enPass = await bcrypt.hash(password, saltRounds);

  if (password === conf_password) {
    try {
      const user = new userModel({
        username,
        email,
        password: enPass,
        role,
      });
      user.save();

      const token = jwt.sign({ data: user }, secretKey);
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
    const user = await userModel.findOne({ email: userEmail });

    if (!user) {
      console.log("User not found. Create account...");
      res.redirect("/register");
    } else {
      const match = await bcrypt.compare(userPassword, user.password);

      if (match) {
        console.log("Login successful");
        const token = jwt.sign({ data: user }, secretKey);
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

const logOut = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
};

const addCategory = async (req, res) => {
  const { category_name } = req.body;

  const pro = new categoryModel({
    category_name,
  });
  pro.save();
  res.redirect("/categoryList");
};

const addCategory_page = (req, res) => {
  res.render("addCategory");
};
const categoryList = async (req, res) => {
  const list = await categoryModel.find();
  res.render("categoryList", { list });
};

const editCategory = async (req, res) => {
  const { id } = req.params;

  const category = await categoryModel.findById(id);
  res.render("editCategory", { category });
};

const updateCategory = async (req, res) => {
  const { category_name, id } = req.body;

  const updateCategory = await categoryModel.findByIdAndUpdate(id, {
    category_name,
  });

  res.redirect("/categoryList");
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const category = await categoryModel.findByIdAndDelete(id);
  res.redirect("/categoryList");
};

const pruduct_form = async (req, res) => {
  const category = await categoryModel.find();
  res.render("productForm", { category });
};

const addProduct = async (req, res) => {
  const { admin_id, product_name, category, product_description } = req.body;
  const category_obj = await categoryModel.findOne({ category_name: category });

  const token = req.cookies.jwt;
  const decode = jwt.verify(token, secretKey);

  const product = new productModel({
    admin_id: decode.data.id,
    product_name,
    category,
    product_description,
    category_id: category_obj.id,
  });
  product.save();

  res.redirect("/viewProduct");
};


const viewProduct =async (req, res) => {
    const product = await productModel.find()

    const token = req.cookies.jwt;
  const decode = jwt.verify(token, secretKey);

    const products = product.filter((p) => {
      return p.admin_id == decode.data.id
    })
    res.render('myProducts', {products})
}


const editProduct =async (req, res) => {
  const {id} = req.params

  const product =await productModel.findById(id)
  const category = await categoryModel.find();
  res.render('editProduct', {product, category})

}


const updateProduct =async (req, res) => {
  const {id, product_name, category_id, category, product_description } = req.body;
  const category_obj = await categoryModel.findOne({ category_name: category });

  const pro=await productModel.findByIdAndUpdate(id, ({
    product_name, category_id : category_obj.id, category, product_description 
  }))
  
  res.redirect('/viewProduct')

}


const deleteProduct =async (req, res) => {
  const {id} = req.params
    const delete_product =await productModel.findByIdAndDelete(id)
    res.redirect('/viewProduct')
}


const allProducts =async (req, res) => {
  const products = await productModel.find()

  res.render('allProducts', {products})
}


const navbar = (req, res) => {
  res.render('navbar')
}

module.exports = {
  defaultRoute,
  createUser,
  userLogin,
  login,
  register,
  logOut,
  categoryList,
  addCategory,
  addCategory_page,
  editCategory,
  updateCategory,
  deleteCategory,
  pruduct_form,
  addProduct,
  viewProduct,
  editProduct,
  updateProduct,
  deleteProduct,
  allProducts,
  navbar
};
