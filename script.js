// Data contoh untuk simulasi akademik. Tidak terhubung ke server/database resmi.
const demoDocuments = {
  "DEMO-2026-001": {
    type: "icv",
    typeLabel: "ICV — Sertifikat Vaksinasi",
    name: "Contoh Dokumen Vaksinasi",
    status: "DATA SIMULASI",
    issuer: "Unit Layanan Contoh",
    date: "09 November 2026"
  },
  "DEMO-2026-002": {
    type: "phqc",
    typeLabel: "PHQC — Izin Kesehatan Pelabuhan",
    name: "Contoh Dokumen Kesehatan Pelabuhan",
    status: "DATA SIMULASI",
    issuer: "Unit Layanan Contoh",
    date: "08 November 2026"
  },
  "DEMO-2026-003": {
    type: "health_book",
    typeLabel: "Buku Kesehatan Kapal",
    name: "Contoh Buku Kesehatan Kapal",
    status: "DATA SIMULASI",
    issuer: "Unit Layanan Contoh",
    date: "07 November 2026"
  }
};

const form = document.getElementById("verificationForm");
const typeInput = document.getElementById("jenis_dokumen");
const numberInput = document.getElementById("no_dokumen");
const resultBox = document.getElementById("result-block");
const searchBtn = document.getElementById("searchBtn");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const type = typeInput.value;
  const number = numberInput.value.trim().toUpperCase();

  if (!type || !number) {
    showError("Silakan pilih jenis dokumen dan masukkan nomor dokumen contoh.");
    return;
  }

  searchBtn.disabled = true;
  searchBtn.textContent = "Memeriksa...";

  // Jeda singkat agar proses pencarian terasa seperti aplikasi.
  window.setTimeout(function () {
    const record = demoDocuments[number];

    if (!record || record.type !== type) {
      showError("Data contoh tidak ditemukan. Periksa jenis dokumen atau gunakan nomor DEMO-2026-001, DEMO-2026-002, atau DEMO-2026-003.");
    } else {
      resultBox.hidden = false;
      resultBox.className = "result-block";
      resultBox.innerHTML = `
        <h3>Hasil Pencarian Simulasi</h3>
        <p><span class="result-status">${record.status}</span></p>
        <div class="result-row"><span>Nomor Dokumen</span><strong>${number}</strong></div>
        <div class="result-row"><span>Jenis Dokumen</span><strong>${record.typeLabel}</strong></div>
        <div class="result-row"><span>Nama Dokumen</span><strong>${record.name}</strong></div>
        <div class="result-row"><span>Penerbit Contoh</span><strong>${record.issuer}</strong></div>
        <div class="result-row"><span>Tanggal Data</span><strong>${record.date}</strong></div>
        <p class="small-note">Catatan: hasil ini hanya data contoh untuk demonstrasi akademik, bukan verifikasi keaslian dokumen.</p>
      `;
    }

    searchBtn.disabled = false;
    searchBtn.innerHTML = 'Cari Dokumen <span>→</span>';
  }, 450);
});

function showError(message) {
  resultBox.hidden = false;
  resultBox.className = "result-block error";
  resultBox.innerHTML = `<h3>Data Tidak Ditemukan</h3><p>${message}</p>`;
  searchBtn.disabled = false;
  searchBtn.innerHTML = 'Cari Dokumen <span>→</span>';
}

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", function () {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});
