// my-next-app\app\components\ProductList.tsx
import { useState } from 'react';
import Image from 'next/image';
import { ClipLoader } from 'react-spinners';

const ProductList = ({ products, onProductClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleClick = (product) => {
    onProductClick(product);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const displayedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
        {displayedProducts.map(product => (
          <div
            key={product._id.$oid}
            className="border p-4 rounded shadow hover:shadow-lg transition"
            onClick={() => handleClick(product)}
          >
            <div className="relative w-full h-64">
              <ProgressiveImage src={product.image} alt={product.name} />
            </div>
            <h2 className="text-xl font-bold mt-4">{product.name}</h2>
            <p className="text-gray-600">{product.brand}</p>
            <p className="text-lg font-semibold">{product.price} zł</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {renderPageNumbers().map((number, index) => (
          <button
            key={index}
            onClick={() => number !== '...' && setCurrentPage(number)}
            className={`px-4 py-2 border mx-1 ${number === currentPage ? 'bg-gray-300' : ''}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

const ProgressiveImage = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center">
          <ClipLoader color="#000" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className={`rounded transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
        onLoadingComplete={() => setLoading(false)}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      />
    </div>
  );
};

const shimmer = (w, h) => `
  <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export default ProductList;
