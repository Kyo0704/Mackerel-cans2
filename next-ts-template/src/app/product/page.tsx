import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export default async function Product() {
    const Product = await prisma.product.findMany();
    return (
        <main className="bg-white px-4 py-16">
            <h1 className="text-3xl bg-lime-500 font-bold text-center mb-8">商品情報一覧</h1>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Product.map((product) => (
                    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
                    <div className="flex-shrink-0">
                        <img className="h-48 w-full object-cover" src="" alt={product.pname} />
                    </div>
                    <div className="flex-1 p-4">
                        <h3 className="font-semibold text-gray-900 text-lg">{product.pname}</h3>
                        <p className="text-gray-600">￥:{product.price}円</p>
                        <p className="text-gray-500">産地:{product.production_area}</p>
                        <p className="text-gray-400">容量:{product.volume}</p>
                    </div>
                    <div className="p-4">
                        <a href="#" className="text-base font-semibold text-lime-600 hover:text-lime-500">
                        詳細を見る
                        </a>
                    </div>
                    </div>
                ))}
                </div>
            </div>
           <div className="text-3xl bg-lime-500 font-bold text-center mb-8">© 2023 商品名一覧. All rights reserved.</div>
        </main>
    );
};

//export default Product;