import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

async function main() {
  // ここにクエリを書いていく
  const user = await prisma.user.create({
    data: {
      name: "Alice",
    },
  });
  console.log(user); // { id: 1, name: 'Alice' }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    // データベースとのコネクションを切る
    await prisma.$disconnect();
  });
