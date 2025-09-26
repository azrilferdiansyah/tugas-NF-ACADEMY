import { index, store, destroy } from "./controller.mjs";

const main = () => {
  console.log("=== Menambahkan Data Baru ===");
  store({ nama: "Pengguna Baru Anton", umur: 30, alamat: "Jl. Anggrek 1", email: "Anton1@mail.com" });
  store({ nama: "Pengguna Baru Toni", umur: 31, alamat: "Jl. Mawar 2", email: "Toni2@mail.com" });

  console.log("\n=== Data Setelah Penambahan ===");
  index();

  console.log("\n=== Hapus Data Pertama ===");
  destroy(0);

  console.log("\n=== Data Setelah Hapus ===");
  index();
};

main();
