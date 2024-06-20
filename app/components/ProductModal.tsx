// my-next-app\app\components\ProductModal.tsx
import React from 'react';
import Image from 'next/image';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-auto max-w-4xl max-h-full overflow-y-auto relative">
        <button
          onClick={onClose}
          className="text-black absolute top-4 right-4 text-2xl font-bold"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
          <div className="md:ml-4 mt-4 md:mt-0 flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-gray-900 mt-2">{product.description}</p>
            <p className="text-xl font-semibold mt-4 text-gray-900">{product.price} zł</p>
            <p className="text-gray-900 mt-2">{product.brand}</p>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default ProductModal;
