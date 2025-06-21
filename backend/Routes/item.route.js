const express = require('express');
const router = express.Router();
const multer = require('multer');

const { addItem, getItems } = require('../Controller/item.controller');

const {storage} = require("../Config/cloudinary")

const upload = multer({ storage: storage });

router.post('/', upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'images', maxCount: 5 }
]) ,addItem);

router.get('/', getItems);

module.exports = router;