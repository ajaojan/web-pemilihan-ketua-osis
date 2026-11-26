// --- 1. Inisialisasi Data dari LocalStorage ---
let dataSuara = JSON.parse(localStorage.getItem('osis_suara')) || {
    1: 0,
    2: 0,
    3: 0
};

// --- 2. Ambil Elemen DOM ---
const totalSuaraEl = document.getElementById('total-suara');
const tombolReset = document.getElementById('btn-reset');
const statusText = document.getElementById('status-text');

// Ubah teks status agar sesuai mode latihan/bebas
statusText.innerHTML = `Status: <strong style="color: #38bdf8;">Mode Simulasi Bebas (Tombol Tidak Dikunci)</strong>`;

// --- 3. Fungsi Utama saat Halaman Dimuat ---
function updateTampilan() {
    // Hitung total semua suara
    const total = dataSuara[1] + dataSuara[2] + dataSuara[3];
    totalSuaraEl.textContent = total;

    // Update grafik persentase & tabel rekap untuk masing-masing paslon (1, 2, 3)
    for (let i = 1; i <= 3; i++) {
        const suara = dataSuara[i];
        const persentase = total === 0 ? 0 : ((suara / total) * 100).toFixed(1);

        // Update Grafik Batang
        document.getElementById(`teks-persen-${i}`).textContent = `${persentase}% (${suara} suara)`;
        document.getElementById(`bar-${i}`).style.width = `${persentase}%`;

        // Update Tabel Rekapitulasi
        document.getElementById(`tabel-suara-${i}`).textContent = suara;
        document.getElementById(`tabel-persen-${i}`).textContent = `${persentase}%`;
    }
}

// --- 4. Fungsi Saat Tombol Vote Diklik (Tanpa Lock / Kunci) ---
function pilihKandidat(nomorPaslon) {
    // Tambah suara kandidat secara langsung tanpa pengecekan status sudah memilih
    dataSuara[nomorPaslon] += 1;

    // Simpan perubahan ke localStorage
    localStorage.setItem('osis_suara', JSON.stringify(dataSuara));

    // Perbarui UI secara real-time
    updateTampilan();
}

// --- 5. Fungsi Reset Simulasi ---
tombolReset.addEventListener('click', () => {
    const konfirmasiReset = confirm('Reset semua data perolehan suara?');
    if (konfirmasiReset) {
        localStorage.removeItem('osis_suara');
        dataSuara = { 1: 0, 2: 0, 3: 0 };
        updateTampilan();
    }
});

// Jalankan fungsi pertama kali saat web dibuka
updateTampilan();