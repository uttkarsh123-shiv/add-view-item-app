const Item = require('../Model/item.model');

const addItem = async (req, res) => {
  try {
    const { name, type, description } = req.body;
    const coverFile = req.files.cover?.[0];        
    const imagesFiles = req.files.images || [];     

    if (!name || !type || !description || !coverFile || imagesFiles.length === 0) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newItem = new Item({
      name,
      type,
      description,
      cover: coverFile.path,                       
      images: imagesFiles.map(file => file.path),   
    });

    const savedItem = await newItem.save();

    res.status(201).json({
      message: 'Item added successfully',
      item: savedItem,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addItem,
  getItems,
};
