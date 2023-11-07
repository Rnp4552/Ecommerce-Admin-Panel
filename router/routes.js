const express = require("express");
const routes = express.Router();
const [adminregister,adminlogin, addcategory, updatecategory, deletecategory, addproducts,
DeleteProduct, updateProduct, editcategory,editproduct] = require("../controllers/adminController");

routes.use(express.json());
routes.use(express.urlencoded({
    extended : true
}));
app.use(express.static(__dirname + '/public'));

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        return cb(null, "./uploads")
    },
    filename : function(req,file,cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
})

const upload = multer({ storage });

router.use(session({
    secret: process.env.SESSSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
router.use(passport.initialize());
router.use(passport.session());

passport.use(new Googlestrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    cb(null,profile);
}));

passport.serializeUser(function(user,cb){
    cb(null,cb);
});

passport.deserializeUser(function(obj, cb){
    cb(null,obj);
});

router.get("/auth/google", passport.authenticate("google",{
    scope : ["profile", "email"]
}));

router.get("/auth/google/user", passport.authenticate("google", {
    failureRedirect : "/login"
}),
async(req,res) => {
    if(req.isAuthenticated()){
        res.render("/dashboard", {userdta : req.user});
    }
});


routes.get("/dashboard", (req,res) => {
    res.render("index")
});

routes.get("/login", (req,res) => {
    res.render("login");
})
routes.get("/register", (req,res) => {
    res.render("register")
});


routes.post("/adminregister", adminregister);
routes.post("/adminlogin", adminlogin);

routes.get("/categories", (req,res) => {
    res.render("categories")
});

routes.post("/add/categories", addcategory);

routes.post("/update/categories/:id",updatecategory );

routes.post("/edit/catrgory/:id", editcategory)

routes.get("/delete/categories/:id", deletecategory );

routes.get("/getallcategories", (req,res) => {
    res.render("index");
});

routes.post("/add/products",upload.single('image'), addproducts);

routes.post("/update/products/:id",upload.single('image'), updateProduct );

routes.post("edit/products/:id", upload.single, editproduct);

routes.get("/delete/products/:id", DeleteProduct );

routes.get("/getallproducts", (req,res) => {
    res.render("index");
});

module.exports =  routes;