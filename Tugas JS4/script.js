// ===================== CLASS PELANGGAN =====================
class Pelanggan {
  constructor(nama, nomorTelepon, kendaraanDisewa) {
    this.id = Date.now();                   // ID unik berdasarkan waktu
    this.nama = nama;
    this.nomorTelepon = nomorTelepon;
    this.kendaraanDisewa = kendaraanDisewa;
    this.tanggalPinjam = new Date().toLocaleString();
    this.tanggalKembali = null;
    this.status = "Sedang Disewa";          // Status default
  }

  // Method untuk mengembalikan kendaraan
  kembalikan() {
    this.tanggalKembali = new Date().toLocaleString();
    this.status = "Dikembalikan";
  }
}

// ===================== STATE APLIKASI =====================
let aktif = [];   // List penyewa yang sedang aktif
let riwayat = []; // List riwayat penyewaan

// ===================== DOM ELEMENTS =====================
const form = document.getElementById("rentalForm");
const tabelAktifBody = document.querySelector("#tabelAktif tbody");
const tabelRiwayatBody = document.querySelector("#tabelRiwayat tbody");

// ===================== FUNGSI LOAD & SIMPAN DATA =====================
// Ambil data dari localStorage saat halaman dibuka
function loadState() {
  aktif = JSON.parse(localStorage.getItem("sewa_aktif") || "[]");
  riwayat = JSON.parse(localStorage.getItem("sewa_riwayat") || "[]");

  // Pastikan data tetap menjadi instance Pelanggan
  aktif = aktif.map(p => Object.assign(new Pelanggan(), p));
  riwayat = riwayat.map(p => Object.assign(new Pelanggan(), p));
}

// Simpan data ke localStorage
function saveState() {
  localStorage.setItem("sewa_aktif", JSON.stringify(aktif));
  localStorage.setItem("sewa_riwayat", JSON.stringify(riwayat));
}

// ===================== RENDER TABEL PENYEWA AKTIF =====================
function renderAktif() {
  tabelAktifBody.innerHTML = ""; // Bersihkan tabel
  aktif.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeText(p.nama)}</td>
      <td>${escapeText(p.nomorTelepon)}</td>
      <td>${escapeText(p.kendaraanDisewa)}</td>
      <td style="color:green;font-weight:bold">${p.status}</td>
      <td></td>
    `;

    // Tombol kembalikan
    const aksiCell = tr.querySelector("td:last-child");
    const btnKembali = document.createElement("button");
    btnKembali.textContent = "Kembalikan";

    btnKembali.onclick = () => {
      const idx = aktif.findIndex(x => x.id === p.id);
      if (idx !== -1) {
        aktif[idx].kembalikan();     // Ubah status jadi "Dikembalikan"
        riwayat.push(aktif[idx]);    // Pindahkan ke riwayat
        aktif.splice(idx, 1);        // Hapus dari daftar aktif
        saveState();
        renderAktif();
        renderRiwayat();
      }
    };

    aksiCell.appendChild(btnKembali);
    tabelAktifBody.appendChild(tr);
  });
}

// ===================== RENDER TABEL RIWAYAT =====================
function renderRiwayat() {
  tabelRiwayatBody.innerHTML = ""; // Bersihkan tabel
  riwayat.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeText(p.nama)}</td>
      <td>${escapeText(p.nomorTelepon)}</td>
      <td>${escapeText(p.kendaraanDisewa)}</td>
      <td>${escapeText(p.tanggalPinjam || "")}</td>
      <td>${escapeText(p.tanggalKembali || "")}</td>
      <td style="color:red;font-weight:bold">${p.status}</td>
      <td></td>
    `;

    // Tombol hapus riwayat
    const aksiCell = tr.querySelector("td:last-child");
    const btnHapus = document.createElement("button");
    btnHapus.textContent = "Hapus";

    btnHapus.onclick = () => {
      if (confirm("Yakin ingin menghapus riwayat ini?")) {
        riwayat = riwayat.filter(x => x.id !== p.id);
        saveState();
        renderRiwayat();
      }
    };

    aksiCell.appendChild(btnHapus);
    tabelRiwayatBody.appendChild(tr);
  });
}

// ===================== VALIDASI INPUT =====================
function escapeText(s) {
  if (!s) return "";
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  }[c]));
}

function validasiInput(nama, tel, kendaraan) {
  if (!nama.trim() || !tel.trim() || !kendaraan) return false;
  if (tel.trim().length < 6) return false;
  return true;
}

// ===================== EVENT FORM =====================
form.addEventListener("submit", e => {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const tel = document.getElementById("telepon").value.trim();
  const kendaraan = document.getElementById("kendaraan").value;

  if (!validasiInput(nama, tel, kendaraan)) {
    alert("Periksa input: semua harus diisi dan nomor telepon minimal 6 digit.");
    return;
  }

  // Tambahkan pelanggan baru
  const p = new Pelanggan(nama, tel, kendaraan);
  aktif.push(p);
  saveState();
  renderAktif();
  form.reset();
});

// ===================== INISIALISASI HALAMAN =====================
loadState();
renderAktif();
renderRiwayat();
