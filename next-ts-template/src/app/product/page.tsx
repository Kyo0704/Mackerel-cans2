import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export default async function Product() {
    const Product = await prisma.product.findMany();
    return (
        <main>
             <h1>商品情報一覧</h1>
             <ul>
                {Product.map((product) => (
                    <div>
                    <li key={product.pid}>{product.pname}</li>
                    <li key={product.pid}>{product.price}</li>
                    <li key={product.pid}>{product.expiry_date?.toDateString()}</li>
                    </div>
                ))}
             </ul>
        </main>
       
    );
};

// export default Product;