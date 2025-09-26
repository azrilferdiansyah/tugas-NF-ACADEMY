import users from "./data.mjs";

const index = () => {
  console.log("=== Daftar Pengguna ===");
  const hasil = users.map((user, i) =>
    `${i + 1}. ${user.nama} | ${user.umur} th | ${user.alamat} | ${user.email}`
  );

  hasil.forEach(line => console.log(line));
  return hasil; // kembalikan untuk testing jika perlu
};

const store = (user) => {
  if (!user || !user.nama || !user.email || !user.alamat || !user.umur) {
    console.log("❌ Gagal menambahkan pengguna: data tidak lengkap");
    return false;
  }
  users.push(user);
  console.log(`✅ Pengguna "${user.nama}" berhasil ditambahkan`);
  return true;
};

const destroy = (indexUser) => {
  if (indexUser >= 0 && indexUser < users.length) {
    const removed = users.splice(indexUser, 1)[0];
    console.log(`🗑️ Menghapus data:🗑️ ${removed.nama}`);
    return removed;
  } else {
    console.log("❌ Index tidak ditemukan!");
    return null;
  }
};

export { index, store, destroy };
