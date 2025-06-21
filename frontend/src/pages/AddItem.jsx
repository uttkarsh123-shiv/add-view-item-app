import React, { useState, useRef } from 'react';
import axios from 'axios';

const AddItem = () => {
const coverRef = useRef(null);
const imagesRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    cover: null,
    images: []
  });

  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'cover') {
      setFormData({...formData, cover: e.target.files[0]});
    } else if (e.target.name === 'images') {
      setFormData({...formData, images: e.target.files});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('type', formData.type);
    data.append('description', formData.description);
    data.append('cover', formData.cover);
    for (let i = 0; i < formData.images.length; i++) {
      data.append('images', formData.images[i]);
    }

    try {
      const res = await axios.post('https://itemlist-9a1t.onrender.com/api/items', data);
      if (res.status === 201) {
        setSuccessMsg('Item successfully added!');
        setFormData({
          name: '',
          type: '',
          description: '',
          cover: null,
          images: []
        });
          if (coverRef.current) coverRef.current.value = '';
  if (imagesRef.current) imagesRef.current.value = '';
      }
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Add New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        
        <div>
          <label className="block mb-1 font-medium">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="Shirt">Shirt</option>
            <option value="Pants">Pants</option>
            <option value="Shoes">Shoes</option>
            <option value="Sports Gear">Sports Gear</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Description:</label>
          <textarea
            name="description"
            placeholder="Item Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Cover Image:</label>
          <input
            type="file"
            name="cover"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 w-full rounded"
            required
            ref={coverRef}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Additional Images:</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="border p-2 w-full rounded"
            required
            ref={imagesRef}
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Submit
        </button>
      </form>

      {successMsg && <p className="mt-4 text-green-600">{successMsg}</p>}
    </div>
  );
};

export default AddItem;
