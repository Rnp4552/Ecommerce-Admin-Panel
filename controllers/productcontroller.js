//add products

const ProductModel = require("../models/Products");

const addproducts = async(req,res) => {
    const productdata = new ProductModel({
        product_id : req.body.id,
        name : req.body.name,
        price : req.body.price,
        image : req.body.image
    });

    const getproductid  = await ProductModel.findOne({product_id : product_id});

    if(getproductid){
        res.status(400).json({
            msg : "This is Product already exist Please add another product"
        })
    }
    else{
        await productdata.save();

        res.status(200).json({
            msg : "Products is added successfully!!"
        })
    }
};

// update product

const updateProduct = async(req,res) => {
    const getproductid = req.params.id;

    const getproduct = await ProductModel.findOne({product_id: getproductid});

    if(!getproduct){
     res.status(400).json({
        msg : "During update error is occuring!!!"
     })   
    }
    else{
        res.render("UpdateProduct", {data : getproduct});
    }

};

//Edited product

const editproduct = async(req,res) => {
    const getid = req.params.id;

    let image = '';
    if(req.file){
        new_image = req.file.filename;

        try{
            fs.unlinkSync('./uploads/'+ req.body.image)
        }
        catch(e){
            new_image = req.body.image
        }
    }

    ProductModel.findByIdAndUpdate(id, {
        product_id : req.body.id,
        name : req.body.name,
        price : req.body.price,
        image : req.body.image
    },(err,result) => {
        if(err){
            res.status(404).json({
                msg : "Erorr is occuring!!"
            })
        }
        else{
            res.status(200).json({
                msg : "Updated successfully!!"
            })
        }
    })
}

//Delete product

const DeleteProduct = async(req,res) => {
    const getproductid = req.params.id;

    const DeleteProductdta = await ProductModel.findOne(getproductid);
    
    if(DeleteProductdta){
        res.status(400).json({
            msg : "Product data is not found!!"
        })
    }
    else{
        res.status(200).json({
            msg : "Product data is deleted successfully!!"
        });
    };
};

module.exports = [addproducts,updateProduct,DeleteProduct,editproduct];