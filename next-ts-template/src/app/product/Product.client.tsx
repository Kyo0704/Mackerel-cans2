'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductType } from '../../type';


export default function Product() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [showDiscounted, setShowDiscounted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/product`);
      const data = await response.json();
      setAllProducts(data);
      setProducts(data);
    };

    fetchData();
  }, []);

  const toggleDiscounted = () => {
    if (showDiscounted) {
      setProducts(allProducts);
    } else {
      const discountedProducts = allProducts.filter(
        (product: ProductType) => product.discounts && product.discounts.length > 0
      );
      setProducts(discountedProducts);
    }
    setShowDiscounted(!showDiscounted);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleDiscounted}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
        >
          {showDiscounted ? 'すべての商品を表示' : '値引き商品のみを表示'}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.pid} className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
            <div className="flex-shrink-0">
              <img
                className="h-48 w-full object-cover"
                src={`https://sabakan-backet.s3.ap-southeast-2.amazonaws.com/test/${product.image}`}
                alt={product.pname}
              />
            </div>
            <div className="flex-1 p-4">
              <h3 className="font-semibold text-gray-900 text-lg">{product.pname}</h3>
              <p className="text-gray-600">￥:{product.price}円</p>
              <p className="text-gray-500">産地:{product.production_area}</p>
              <p className="text-gray-400">容量:{product.volume}</p>
            </div>
            <div className="p-4">
                <a className="text-base font-semibold text-lime-600 hover:text-lime-500">
                  詳細を見る
                </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
