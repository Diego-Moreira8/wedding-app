const prisma = require("./src/prisma/client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) => {
  return new Promise((resolve) =>
    rl.question(query, (answer) => resolve(answer))
  );
};

async function main() {
  try {
    console.log("🚀 Adicionando nova entrada na base de dados...");

    const name = await askQuestion("Digite o nome do presente: ");

    const newGift = await prisma.gift.create({
      data: {
        name,
      },
    });

    console.log("\n✅ Presente adicionado com sucesso:", newGift);
  } catch (error) {
    console.error("\n❌ Erro ao adicionar entrada:", error);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

main();
