import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

Modal.setAppElement('#root'); // Avoid screen reader warnings

const ViewItems = () => {
    const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get("https://itemlist-9a1t.onrender.com/api/items")
      .then(res =>{ setItems(res.data)
       setLoading(false)
  })
      .catch(err =>{ console.error("Error fetching items:", err)
        setLoading(false) });
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="p-6 h-[200vh]">
      <h1 className="text-3xl font-bold mb-4">All Items</h1>
    {
        loading ? (<p>Loading ...</p>) :
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded shadow hover:shadow-lg cursor-pointer transition"
            onClick={() => openModal(item)}
          >
            <img
              src={item.cover}
              alt={item.name}
               
              className="h-60 w-full object-cover rounded mb-3"
            />
            <h2 className="text-lg font-semibold text-center">{item.name}</h2>
          </div>
        ))}
      </div>
    }
    
   

      {selectedItem && (
       <Modal
  isOpen={modalOpen}
  onRequestClose={closeModal}
  contentLabel="Item Details"
  className="bg-white p-6 rounded shadow-lg overflow-y-auto max-h-[90vh] w-full max-w-2xl mx-auto mt-20"
overlayClassName="fixed inset-0 backdrop-blur-sm bg-black/60 flex justify-center items-start z-50"
>
  <h2 className="text-2xl font-bold mb-2">{selectedItem.name}</h2>
  <p className="text-sm text-gray-600 mb-2"><span className="font-semibold">Type</span>: {selectedItem.type}</p>
  <p className="mb-4 text-gray-700">
    <span className="font-semibold text-[18px]">description :</span> <br/>
    {selectedItem.description}</p>

  <Carousel showThumbs={false}>
    <div>
      <img
        src={selectedItem.cover}
        alt="Cover"
       
        className="max-h-[400px] w-full object-contain"
      />
    </div>
    {selectedItem.images.map((img, i) => (
      <div key={i}>
        <img
          src={img}
          alt={`Additional ${i}`}
      
          className="max-h-[400px] w-full object-contain"
        />
      </div>
    ))}
  </Carousel>

  <button
    className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
    onClick={() => alert("Enquiry submitted!")}
  >
    Enquire
  </button>

  <button
    className="mt-3 ml-3 text-gray-500 hover:text-black underline"
    onClick={closeModal}
  >
    Close
  </button>
</Modal>
      )}
    </div>
  );
};

export default ViewItems;
