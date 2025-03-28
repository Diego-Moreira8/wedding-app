const { hashPassword } = require("./src/config/bcrypt");
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

    const name = await askQuestion("Digite o nome: ");
    const phone = await askQuestion("Digite o telefone: ");

    const newUser = await prisma.user.create({
      data: {
        name,
        phone: await hashPassword(phone),
      },
    });

    console.log("\n✅ Usuário adicionado com sucesso:", newUser);
  } catch (error) {
    console.error("\n❌ Erro ao adicionar entrada:", error);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

main();
