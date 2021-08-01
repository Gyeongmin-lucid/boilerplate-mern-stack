
const json = require('body-parser/lib/types/json');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Product} = require('../models/Product');


//=================================
//             Product
//=================================

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname )
  }
})

var upload = multer({ storage: storage }).single("file")

router.post("/image", (req, res) => {
  // save the image from frontend
  upload(req, res, err => {
    if (err) {
      console.log(err)
      return res.json({ success: false, err})
    }
    return res.json({ 
      success: true, 
      filePath: res.req.file.path,
      fileName : res.req.file.filename })
  })
})

router.post("/", (req, res) => {
  // put client info to DB
  const product = new Product(req.body)
  product.save( (err) => {
    if(err) {
      return res.status(400).json({
      success: false,
      err})
    }
    console.log("success request")
    return res.status(200).json({
      success: true
    })
  })
})

router.post("/products", (req, res) => {
  // get all DB data and send to client
  Product.find()
    .populate("writer")
    .exec((err, productInfo) => {
      if(err) {
        return res.status(400).json({
          success: false, 
          err 
        })
      } else {
        return res.status(200).json({
          success: true,
          productInfo
        })
      }
    })
})

module.exports = router;