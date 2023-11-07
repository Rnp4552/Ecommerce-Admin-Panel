const categories = require("../models/categories");
const fs = require("fs");
// add category

const addcategory = async(req,res) => {
    const category = new categories({
        category_id : req.body.number,
        name : req.body.name
    });

    const checksamectgry = await categories.findOne({name : category});

    if(checksamectgry){
        res.status(400).json({
            msg : "This is category is already exist please add another category"
        })
    }
    else{
        await categories.save();
        res.send("category added successfully!!!")
    }

};

//update category

const updatecategory = async(req,res) => {

    const getcategoryid = req.params.id;

    const getdata = await categories.findOne({category_id : getcategoryid});

    if(!getdata){
        res.status(400).json({
            msg : "During update error is occuring"
        })
    }
    else{
        res.render("updatecategory", {data : getdata})
    }
    
};

//edited category
const editcategory = async(req,res) => {
    const getid = req.params.id;


    categories.findByIdAndUpdate(id, {
        category_id : req.body.id,
        name : req.body.name,
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

//Delete category

const deletecategory = async(req,res) => {
    const getcategoryid = req.params.id;
    
    const deletecategorydata = await categories.findByIdAndDelete(getcategoryid);

    if(deletecategorydata){
        res.status(200).json({
            msg : "Deleted successfully!!"
        })
    }
    else{
        res.status(400).json({
            msg : "This is category is not exist"
        })
    }
};

module.exports = [addcategory,updatecategory,deletecategory,editcategory];
