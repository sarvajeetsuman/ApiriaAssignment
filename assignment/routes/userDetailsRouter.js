var express = require('express');
var path = require('path');
var multer = require('multer');  // used for uploading multipart data
var xlstojson = require("xls-to-json-lc"); // used for parsing xls file 
var xlsxtojson = require("xlsx-to-json-lc"); // used for parsing xlsx file
var userDetailsRouter = express.Router();
var methodOverride = require('method-override');
var User = require('../models/usersDetails');

userDetailsRouter.use(methodOverride("_method"));

// database configuration
var UserDetails = require('../models/usersDetails');

// adding config object
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads')
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

// to query the page for user details
userDetailsRouter.get('/',function(req,res){
    User.find({}, function (err, result) {
        if(err){
            res.render('customError');
        }
        else{
            res.render("userDetails",{result:result});
        }
    })
});

// to redirect the page for file upload
userDetailsRouter.get('/uploads/', function(req, res){
    res.render("upload");
});


// for creating the records after file upload
userDetailsRouter.post('/uploads', function(req,res){
    var upload = multer({
		storage: storage,
		fileFilter: function(req, file, callback) {
            var ext = path.extname(file.originalname)
            if (ext !== '.xlsx' && ext !== '.xls') {
                return callback(res.render('customError'), null);
            }
            callback(null, true)
        }
    }).single('userFile');
    upload(req, res, function(err) {
        var ext = path.extname(req.file.path);
        if(ext=='.xls'){
            exceltojson = xlstojson;
        } else{
            exceltojson = xlsxtojson;
        }
        exceltojson({
          input:req.file.path,
          output:null,
          lowerCaseHeaders:true
        }, function(err, result){
            if(err){
              return res.json({error_code:1,err_desc:err, data: null});
            } else{
                result.forEach(function (t) {
                    User.create(t , function (err , createdUser) {
                        if(err){

                        } else{
                            createdUser.save(function(err, save){
                           
                            });
                        }
                    })
                });
                res.redirect("/usersdetails");
            }
        });
        });
});

// to redirect to the page for data editing
userDetailsRouter.get("/:id/edit" , function (req ,res) {
    User.findById(req.params.id , function (err , foundUser) {
        if(err){
            res.render('customError');
        } else{
            res.render("edit" , {user:foundUser});
        }
    });
});

// to save the edited data from edit page
userDetailsRouter.put("/:id" , function (req , res) {
    User.findByIdAndUpdate(req.params.id , {
        $set: req.body
    },function(err, updatedUser){
        if(err){
            res.redirect("/usersdetails");
        } else{
            res.redirect("/usersdetails");
        }
    })
});

// to delete the record
userDetailsRouter.delete("/:id", function(req, res){
    User.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/usersdetails");
        } else {
            res.redirect("/usersdetails");
        }
    });
});
module.exports = userDetailsRouter;