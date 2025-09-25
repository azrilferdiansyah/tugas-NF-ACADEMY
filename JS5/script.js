// Data produk awal (minimal 5)
let produkList = [
  { id: 1, nama: "Laptop", harga: 12000000 },
  { id: 2, nama: "Smartphone", harga: 5000000 },
  { id: 3, nama: "Tablet", harga: 7000000 },
  { id: 4, nama: "Monitor", harga: 3000000 },
  { id: 5, nama: "Keyboard", harga: 500000 }
];

// Event Handler
const eventHandler = {
  tambah: document.getElementById("btnTambah")
};

// Menambahkan produk (dengan Spread Operator)
function tambahProduk(id, nama, harga) {
  produkList = [...produkList, { id, nama, harga }];
  tampilkanProduk();
}

// Menghapus produk (dengan Rest Parameter)
function hapusProduk(...id) {
  produkList = produkList.filter(p => !id.includes(p.id));
  tampilkanProduk();
}

// Menampilkan produk (dengan Destructuring)
function tampilkanProduk() {
  const container = document.getElementById("produkList");
  container.innerHTML = "";

  produkList.forEach(({ id, nama, harga }) => {
    const card = document.createElement("div");
    card.className = "produk-card";
    card.innerHTML = `
      <span><b>${nama}</b> - Rp ${harga.toLocaleString()}</span>
      <button class="delete-btn" onclick="hapusProduk(${id})">Hapus</button>
    `;
    container.appendChild(card);
  });
}

// Event Listener untuk tombol tambah
eventHandler.tambah.addEventListener("click", () => {
  const nama = document.getElementById("nama").value;
  const harga = parseInt(document.getElementById("harga").value);

  if (nama && harga) {
    const idBaru = produkList.length ? produkList[produkList.length - 1].id + 1 : 1;
    tambahProduk(idBaru, nama, harga);
    document.getElementById("nama").value = "";
    document.getElementById("harga").value = "";
  } else {
    alert("Isi nama dan harga produk!");
  }
});

// Tampilkan produk awal
tampilkanProduk();
