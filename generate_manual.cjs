const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

// Output path
const outputPath = path.join(__dirname, "PANDUAN_PENGGUNAAN_ESTICON.pdf");

// Buat Dokumen PDF A4
const doc = new PDFDocument({
  size: "A4",
  margins: { top: 45, bottom: 45, left: 45, right: 45 },
  bufferPages: true,
  info: {
    Title: "Panduan Penggunaan Resmi Aplikasi ESTICON",
    Author: "Hafifi Mustofa",
    Subject: "User Manual Aplikasi Estimasi Konstruksi & Kurva S",
    Keywords: "ESTICON, RAB, Kurva S, Teknik Sipil, Estimasi Biaya, User Manual",
  },
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Palet Warna Profesional Teknik Sipil
const NAVY = "#0F2847";
const BLUE = "#1D4ED8";
const LIGHT_BLUE = "#EFF6FF";
const SLATE = "#334155";
const MUTED = "#64748B";
const BORDER = "#CBD5E1";
const YELLOW_BG = "#FEF9C3";
const AMBER = "#D97706";
const WHITE = "#FFFFFF";

// Helper: Garis Pembatas
function drawHr(doc, y, color = BORDER, width = 0.5) {
  doc.save();
  doc.strokeColor(color).lineWidth(width).moveTo(45, y).lineTo(550, y).stroke();
  doc.restore();
}

// Helper: Section Title
function drawSectionHeading(doc, number, title) {
  doc.moveDown(0.8);
  const currentY = doc.y;
  
  // Kotak nomor kecil
  doc.rect(45, currentY, 26, 18).fill(NAVY);
  doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(10).text(number, 45, currentY + 4, { width: 26, align: "center" });
  
  // Teks Judul
  doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(13).text(title, 78, currentY + 2);
  doc.moveDown(0.6);
  drawHr(doc, doc.y, BLUE, 1);
  doc.moveDown(0.5);
}

// Helper: Sub-heading
function drawSubHeading(doc, title) {
  doc.moveDown(0.5);
  doc.fillColor(BLUE).font("Helvetica-Bold").fontSize(10.5).text(title);
  doc.moveDown(0.3);
}

// Helper: Kotak Informasi / Highlight Box
function drawInfoBox(doc, title, text, bgColor = LIGHT_BLUE, borderColor = BLUE) {
  const currentY = doc.y;
  doc.font("Helvetica").fontSize(8.5);
  const textHeight = doc.heightOfString(text, { width: 485 });
  const boxHeight = textHeight + (title ? 24 : 14);

  // Background dan Border
  doc.rect(45, currentY, 505, boxHeight).fillAndStroke(bgColor, borderColor);

  let textY = currentY + 6;
  if (title) {
    doc.fillColor(borderColor).font("Helvetica-Bold").fontSize(9).text(title, 55, textY);
    textY += 13;
  }

  doc.fillColor(SLATE).font("Helvetica").fontSize(8.5).text(text, 55, textY, { width: 485, lineGap: 2 });
  doc.y = currentY + boxHeight + 8;
}

// Helper: Bullet Point
function drawBullet(doc, boldLabel, text) {
  const bulletY = doc.y;
  doc.circle(52, bulletY + 5, 2.2).fill(BLUE);
  doc.font("Helvetica-Bold").fontSize(9).fillColor(NAVY).text(boldLabel + ": ", 62, bulletY, { continued: true });
  doc.font("Helvetica").fontSize(9).fillColor(SLATE).text(text, { lineGap: 2 });
  doc.moveDown(0.3);
}

// =========================================================================
// HALAMAN 1: COVER ELEGAN & MODERN
// =========================================================================
// Header Accent Bar
doc.rect(0, 0, 595.28, 16).fill(NAVY);
doc.rect(0, 16, 595.28, 4).fill(BLUE);

// Logo & Banner
doc.moveDown(4);
doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(28).text("ESTICON", { align: "center", characterSpacing: 2 });
doc.moveDown(0.2);
doc.fillColor(BLUE).font("Helvetica-Bold").fontSize(13).text("ESTIMASI KONSTRUKSI & KURVA S (TEKNIK SIPIL)", { align: "center", characterSpacing: 1 });
doc.moveDown(0.4);
doc.fillColor(MUTED).font("Helvetica-Oblique").fontSize(10.5).text("Platform Komputasi Terpadu Perhitungan RAB, Kurva S, dan Output Laporan Resmi", { align: "center" });

doc.moveDown(2);
drawHr(doc, doc.y, BORDER, 1.5);
doc.moveDown(2);

// Kotak Badge
doc.rect(130, doc.y, 335, 42).fillAndStroke(LIGHT_BLUE, BLUE);
doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(13).text("BUKU PANDUAN PENGGUNAAN RESMI", 130, doc.y - 34, { width: 335, align: "center" });
doc.fillColor(BLUE).font("Helvetica").fontSize(9.5).text("(USER MANUAL & PETUNJUK TEKNIS APLIKASI)", 130, doc.y - 18, { width: 335, align: "center" });
doc.moveDown(3);

// Rincian Dokumen
const infoTableY = doc.y + 15;
doc.rect(45, infoTableY, 505, 165).fillAndStroke("#F8FAFC", BORDER);

doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(11).text("INFORMASI DOKUMEN & IDENTITAS APLIKASI", 60, infoTableY + 12);
drawHr(doc, infoTableY + 28, BORDER, 0.5);

const metaData = [
  ["Nama Aplikasi", "ESTICON (Civil Engineering Cost Estimator & S-Curve System)"],
  ["Versi Aplikasi", "Versi 1.0 (Produksi / Rilis Resmi)"],
  ["Akses Online (Live)", "https://hafifimustofa.github.io/ESTICON/"],
  ["Teknologi Inti", "HTML5 Canvas 3D Blueprint, Vite, Chart.js, jsPDF Native Vector, SheetJS"],
  ["Standar Acuan", "SNI AHSP Konstruksi, Format Resmi Laporan Pejambon / DANA PIID-PEL"],
  ["Penyusun / Author", "Hafifi Mustofa (Teknik Sipil / Pengembang Aplikasi)"],
  ["Target Pengguna", "Mahasiswa, Estimator Proyek, Kontraktor, Konsultan Pengawas, Owner/PPK"],
];

let metaY = infoTableY + 36;
metaData.forEach(([key, val]) => {
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(NAVY).text(key, 60, metaY, { width: 140 });
  doc.font("Helvetica").fontSize(8.5).fillColor(SLATE).text(": " + val, 205, metaY, { width: 330 });
  metaY += 17;
});

// Footer Cover
doc.rect(0, 815, 595.28, 27).fill(NAVY);
doc.fillColor(WHITE).font("Helvetica").fontSize(8.5).text("© 2026 ESTICON — Aplikasi Terpadu Estimasi Konstruksi & Kurva S", 45, 824, { align: "center" });

// =========================================================================
// HALAMAN 2: DAFTAR ISI & KATA PENGANTAR
// =========================================================================
doc.addPage();

drawSectionHeading(doc, "00", "KATA PENGANTAR & DAFTAR ISI");

doc.font("Helvetica").fontSize(9).fillColor(SLATE).text(
  "Puji syukur ke hadirat Tuhan Yang Maha Esa atas selesainya pengembangan aplikasi ESTICON. Dokumen ini disusun sebagai panduan teknis operasional resmi yang dirancang agar setiap pengguna—baik akademisi, mahasiswa teknik sipil, maupun praktisi lapangan—dapat memanfaatkan seluruh fitur secara optimal, mulai dari pemodelan isometrik 3D awal hingga pencetakan dokumen laporan resmi proyek.",
  { align: "justify", lineGap: 3 }
);
doc.moveDown(1);

drawInfoBox(doc, "Tujuan Panduan Pengguna", "Memberikan petunjuk langkah demi langkah (step-by-step) pengoperasian sistem, penjelasan parameter input, logika matematis kalkulasi Kurva S dan AHSP, serta tata cara ekspor laporan komparasi Rencana vs Realisasi sesuai standar administrasi proyek pemerintah dan swasta.");

doc.moveDown(0.5);
doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(11).text("STRUKTUR DAFTAR ISI PANDUAN");
drawHr(doc, doc.y + 3, BLUE, 0.8);
doc.moveDown(0.8);

const tocList = [
  ["BAB I", "PENGENALAN & ARSITEKTUR UTAMA ESTICON", "Hal. 3"],
  ["BAB II", "TAMPILAN AWAL (HERO SECTION & VISUALISASI 3D)", "Hal. 4"],
  ["BAB III", "PANDUAN OPERASIONAL 5 TAHAP ESTIMASI (WORKFLOW)", "Hal. 5"],
  ["", "• Tahap 1: Pengaturan Proyek & Dimensi 3D Bangunan", "Hal. 5"],
  ["", "• Tahap 2: Rincian Pekerjaan (Bill of Quantities / BoQ)", "Hal. 6"],
  ["", "• Tahap 3: Master Analisis Harga Satuan Pekerjaan (AHSP)", "Hal. 6"],
  ["", "• Tahap 4: Penjadwalan & Analisis Grafik Kurva S", "Hal. 7"],
  ["", "• Tahap 5: Lembar Laporan Resmi & Komparasi Realisasi", "Hal. 8"],
  ["BAB IV", "PANDUAN EKSPOR DOKUMEN (PDF & EXCEL SPREADSHEET)", "Hal. 9"],
  ["BAB V", "PENGATURAN KOP SURAT, LOGO & TANDA TANGAN 3 PIHAK", "Hal. 10"],
  ["BAB VI", "TANYA JAWAB (FAQ) & TROUBLESHOOTING", "Hal. 10"],
];

tocList.forEach(([code, title, page]) => {
  const isBab = code.startsWith("BAB");
  doc.font(isBab ? "Helvetica-Bold" : "Helvetica").fontSize(isBab ? 9.5 : 8.5)
     .fillColor(isBab ? NAVY : SLATE)
     .text(code, 45, doc.y, { width: 55, continued: true })
     .text(title, { width: 400, continued: true })
     .text(page, { align: "right" });
  doc.moveDown(0.25);
});

// =========================================================================
// HALAMAN 3: BAB I - PENGENALAN & ARSITEKTUR UTAMA
// =========================================================================
doc.addPage();

drawSectionHeading(doc, "01", "PENGENALAN & ARSITEKTUR UTAMA ESTICON");

doc.font("Helvetica").fontSize(9).fillColor(SLATE).text(
  "ESTICON adalah aplikasi web mutakhir berbasis Rekayasa Konstruksi Sipil yang mengintegrasikan tiga pilar utama manajemen proyek: (1) Estimasi Dimensi & Volume Fisik, (2) Analisis Anggaran Biaya (RAB), dan (3) Pengendalian Waktu Pelaksanaan melalui Kurva S Terencana vs Realisasi.",
  { align: "justify", lineGap: 3 }
);
doc.moveDown(0.8);

drawSubHeading(doc, "1.1 Filosofi Desain: 'Estimasi Konstruksi Terencana'");
doc.text(
  "Aplikasi ini dibangun untuk mengatasi kendala klasik pada software estimasi konvensional: perhitungan manual yang rawan kesalahan rumus, visualisasi jadwal yang statis, serta format pelaporan yang kaku. ESTICON menghadirkan antarmuka dinamis dan modern dengan akurasi matematis tinggi yang langsung menghasilkan dokumen resmi siap audit.",
  { align: "justify", lineGap: 2 }
);
doc.moveDown(0.6);

drawSubHeading(doc, "1.2 Fitur Unggulan Utama");
drawBullet(doc, "Animasi 3D Wireframe Isometrik", "Model blueprint interaktif 4 tipe bangunan (Gedung, Rumah, Ruko, Gudang) lengkap dengan 4 dinding penutup, pintu, jendela, dan atap yang merespons input dimensi secara real-time.");
drawBullet(doc, "Alur Kerja 5 Tahap Linier", "Proses estimasi terstruktur yang saling terhubung otomatis dari Tahap 1 hingga Tahap 5 tanpa input ganda.");
drawBullet(doc, "Live Kurva S Rencana & Realisasi", "Grafik S-Curve interaktif dengan kurva rencana (biru), kurva aktual/realisasi (hijau putus-putus), diagram batang mingguan, dan deteksi deviasi keterlambatan/percepatan.");
drawBullet(doc, "Ekspor PDF Resmi Standar Kedinasan", "Format portrait A4 resmi dengan font Times New Roman hitam pekat, tabel komparasi 11 kolom format Pejambon/DANA PIID-PEL, grafik Kurva S resolusi tinggi, dan lembar pengesahan 3 pihak.");
drawBullet(doc, "Ekspor Excel Rumus Aktif", "Spreadsheet (.xlsx) dengan formula Excel aktif (SUM, perkalian volume × harga, persentase bobot) yang siap dimodifikasi lebih lanjut.");

doc.moveDown(0.6);
drawSubHeading(doc, "1.3 Aksesibilitas & Kebutuhan Perangkat");
drawInfoBox(doc, "Bebas Instalasi & Ringan", "ESTICON dapat diakses secara langsung melalui browser web modern (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari) pada komputer desktop, laptop, maupun tablet tanpa perlu mengunduh atau menginstal file instalasi (.exe). Semua data tersimpan aman secara otomatis di browser (Local Storage).");

// =========================================================================
// HALAMAN 4: BAB II - TAMPILAN AWAL (HERO & 3D VIEWER)
// =========================================================================
doc.addPage();

drawSectionHeading(doc, "02", "TAMPILAN AWAL (HERO SECTION & VISUALISASI 3D)");

doc.font("Helvetica").fontSize(9).fillColor(SLATE).text(
  "Saat pertama kali membuka ESTICON di https://hafifimustofa.github.io/ESTICON/, pengguna akan disambut oleh antarmuka modern bernuansa teknik sipil yang responsif dan interaktif.",
  { align: "justify", lineGap: 2.5 }
);
doc.moveDown(0.6);

drawSubHeading(doc, "2.1 Efek Visual Khusus Tampilan Awal");
drawBullet(doc, "Typewriter Animation", "Teks utama pembuka tampil dengan animasi pengetikan per-huruf yang elegan: 'Kalkulasi Presisi.' diikuti oleh slogan 'Estimasi Konstruksi Terencana.' dalam satu baris konsisten.");
drawBullet(doc, "Partikel Geometris Interaktif", "Latar belakang hero dihiasi puluhan partikel titik yang bertransformasi dinamis dari segitiga kaku menjadi persegi, berputar pelan searah jarum jam, dan bergerak merespons posisi kursor mouse secara halus.");
drawBullet(doc, "Mode Tampilan Gelap / Terang (Theme Toggle)", "Tersedia tombol toggle tema di pojok kanan atas untuk beralih antara Mode Terang (Light Mode) dan Mode Gelap (Dark Mode) demi kenyamanan mata pengguna saat bekerja di lapangan maupun di kantor.");

doc.moveDown(0.6);
drawSubHeading(doc, "2.2 Viewer Model 3D Blueprint Isometrik");
doc.text(
  "Pada kartu pratinjau struktur, terdapat canvas rendering 3D wireframe bergaya cetak biru (blueprint) isometrik dengan garis kisi-kisi (grid) lantai dan dinding transparan bercahaya neon.",
  { align: "justify", lineGap: 2 }
);
doc.moveDown(0.4);

drawBullet(doc, "Model Gedung Bertingkat", "Wireframe gedung bertingkat multi-lantai dengan kolom perimeter, balok struktural, plat lantai berulang, serta dinding kaca tirai (curtain wall).");
drawBullet(doc, "Model Rumah Tinggal", "Denah rumah 2 lantai lengkap dengan dinding di keempat sisinya, kusen pintu utama, jendela ventilasi, dan rangka atap perisai/pelana.");
drawBullet(doc, "Model Ruko Komersial", "Struktur ruko dengan pintu lipat / rolling door di lantai dasar, jendela display lantai atas, dan dinding pembatas api (firewall).");
drawBullet(doc, "Model Gudang Industri", "Struktur bentang lebar (portal baja) dengan rangka atap gable truss, dinding panel keliling, dan pintu geser besar (sliding loading door).");

doc.moveDown(0.6);
drawInfoBox(doc, "Cara Interaksi 3D Viewer", "Klik kiri dan tahan tombol mouse pada kanvas 3D lalu geser untuk memutar sudut pandang (orbit view). Gunakan scroll roda mouse untuk memperbesar (zoom in) atau memperkecil (zoom out) model bangunan.");

// =========================================================================
// HALAMAN 5: BAB III - WORKFLOW 5 TAHAP ESTIMASI (TAHAP 1 & 2)
// =========================================================================
doc.addPage();

drawSectionHeading(doc, "03", "ALUR ESTIMASI: TAHAP 1 & TAHAP 2");

doc.font("Helvetica").fontSize(9).fillColor(SLATE).text(
  "Inti dari aplikasi ESTICON adalah alur kerja 5 tahap linier. Setiap tahap memiliki tombol navigasi [Lanjut ke Tahap Berikutnya] dan [Kembali] untuk memastikan integritas data perhitungan.",
  { align: "justify", lineGap: 2.5 }
);
doc.moveDown(0.6);

drawSubHeading(doc, "TAHAP 1: Pengaturan Proyek & Dimensi Bangunan");
doc.text(
  "Tahap awal ini bertujuan menetapkan identitas proyek, pemilihan tipe bangunan, serta parameter fisik utama yang menjadi acuan perhitungan volume otomatis.",
  { align: "justify", lineGap: 2 }
);
doc.moveDown(0.4);

drawBullet(doc, "1. Informasi Proyek", "Isi Nama Proyek (misal: 'Pembangunan Rumah Tinggal 2 Lantai'), Lokasi Kota, dan Provinsi.");
drawBullet(doc, "2. Pemilihan Tipe Struktur", "Pilih salah satu dari 4 opsi: Gedung Bertingkat, Rumah Tinggal, Ruko, atau Gudang. Model 3D akan otomatis berubah sesuai tipe yang dipilih.");
drawBullet(doc, "3. Input Dimensi Bangunan", "Masukkan Panjang Bangunan (m), Lebar Bangunan (m), Jumlah Lantai, dan Tinggi per Lantai (m).");
drawBullet(doc, "4. Kartu Kalkulasi Real-time", "Sistem secara instan menampilkan: Luas Denah per Lantai (m²), Luas Total Bangunan (m²), Keliling Bangunan (m), dan Tinggi Total Struktur (m).");

doc.moveDown(0.8);
drawSubHeading(doc, "TAHAP 2: Rincian Pekerjaan (Bill of Quantities / BoQ)");
doc.text(
  "Tahap kedua adalah penyusunan daftar kuantitas pekerjaan (Bill of Quantities) yang dikelompokkan ke dalam divisi-divisi standar konstruksi.",
  { align: "justify", lineGap: 2 }
);
doc.moveDown(0.4);

drawBullet(doc, "Divisi I: Pekerjaan Persiapan", "Meliputi pembersihan lahan, pengukuran & bowplank, gudang kerja & bedeng pekerja.");
drawBullet(doc, "Divisi II: Pekerjaan Tanah & Pondasi", "Meliputi galian tanah pondasi, urugan pasir, pasangan batu kali, dan pondasi telapak/strauss pile.");
drawBullet(doc, "Divisi III: Pekerjaan Struktur Beton", "Pekerjaan sloof, kolom praktis/struktur, balok, pelat lantai beton bertulang mutu K-250 / K-300 lengkap dengan bekisting dan pembesian.");
drawBullet(doc, "Divisi IV: Pekerjaan Arsitektur & Finishing", "Pasangan dinding bata ringan/hebel, plesteran, acian, lantai keramik/granit, kusen pintu/jendela, dan pengecatan.");
drawBullet(doc, "Divisi V: Pekerjaan Mekanikal, Elektrikal & Plambing (MEP)", "Instalasi titik lampu, saklar, stop kontak, instalasi pipa air bersih dan air kotor.");

doc.moveDown(0.5);
drawInfoBox(doc, "Kustomisasi Item BoQ", "Pengguna dapat mengedit volume, memilih satuan (m, m², m³, kg, unit, titik, pkt), menambahkan pekerjaan baru via tombol [+ Tambah Pekerjaan], atau menghapus item yang tidak diperlukan.");

// =========================================================================
// HALAMAN 6: WORKFLOW ESTIMASI (TAHAP 3 & 4)
// =========================================================================
doc.addPage();

drawSectionHeading(doc, "03", "ALUR ESTIMASI: TAHAP 3 & TAHAP 4");

drawSubHeading(doc, "TAHAP 3: Master Analisis Harga Satuan Pekerjaan (AHSP)");
doc.font("Helvetica").fontSize(9).fillColor(SLATE).text(
  "Tahap ketiga mengelola harga satuan setiap item pekerjaan yang bersumber dari koefisien standar SNI dan harga pasar setempat.",
  { align: "justify", lineGap: 2 }
);
doc.moveDown(0.4);

drawBullet(doc, "Koneksi Otomatis BoQ", "Setiap item pekerjaan di BoQ terhubung langsung ke kunci harga (price key) di database AHSP.");
drawBullet(doc, "Penyesuaian Indeks Daerah (IKK)", "Pengguna dapat memasukkan faktor pengali Indeks Kemahalan Konstruksi (IKK) untuk menyesuaikan disparitas harga antar wilayah/provinsi di Indonesia.");
drawBullet(doc, "Pengeditan Harga Satuan", "Harga per satuan dapat disesuaikan langsung pada tabel dengan mengetikkan nominal baru, dan seluruh total biaya serta bobot pekerjaan akan dikalkulasi ulang secara otomatis.");

doc.moveDown(0.8);
drawSubHeading(doc, "TAHAP 4: Penjadwalan & Analisis Grafik Kurva S");
doc.text(
  "Tahap keempat adalah pusat manajemen waktu pelaksanaan proyek, memetakan distribusi bobot pekerjaan terhadap durasi waktu (mingguan).",
  { align: "justify", lineGap: 2 }
);
doc.moveDown(0.4);

drawBullet(doc, "Penentuan Target Durasi", "Tentukan total durasi proyek dalam satuan minggu (misal: 14 Minggu). Sistem akan membagi rentang waktu dari Minggu ke-0 hingga Minggu ke-N.");
drawBullet(doc, "Perhitungan Bobot Pekerjaan (%)", "Bobot setiap item pekerjaan dihitung otomatis berdasarkan rumus baku sipil: Bobot (%) = (Total Biaya Pekerjaan / Total Biaya Fisik Proyek) × 100%.");
drawBullet(doc, "Distribusi Bobot Mingguan (Normal Curve)", "Sistem menerapkan model distribusi logistik/S-Curve realistis: progres landai di awal (persiapan), curam di fase pertengahan (pekerjaan struktur), dan kembali melandai di akhir (finishing & perapian).");
drawBullet(doc, "Simulasi Progres Realisasi Aktual", "Selain Kurva Rencana, ESTICON menyajikan Kurva Realisasi Aktual untuk membandingkan pencapaian riil di lapangan.");
drawBullet(doc, "Analisis Deviasi Proyek (Varian)", "Sistem menghitung nilai deviasi mingguan: Deviasi = Realisasi (%) - Rencana (%). Deviasi bernilai positif menunjukkan proyek mengalami percepatan (ahead of schedule), sedangkan nilai negatif mengindikasikan keterlambatan (behind schedule).");

doc.moveDown(0.6);
drawInfoBox(doc, "Legenda Visual Grafik Kurva S", "• Garis Biru Solid: Kurva S Kumulatif Rencana (Target 0% s/d 100%)\n• Garis Hijau Putus-putus: Kurva S Kumulatif Realisasi Aktual Proyek\n• Diagram Batang Biru Muda: Bobot Rencana per Pekan (Sumbu Y Kanan)");

// =========================================================================
// HALAMAN 7: WORKFLOW ESTIMASI (TAHAP 5: OUTPUT LAPORAN)
// =========================================================================
doc.addPage();

drawSectionHeading(doc, "03", "ALUR ESTIMASI: TAHAP 5 (LEMBAR OUTPUT RESMI)");

doc.font("Helvetica").fontSize(9).fillColor(SLATE).text(
  "Tahap 5 adalah puncak dari seluruh perhitungan ESTICON: penyajian Lembar Laporan Resmi Proyek yang siap diajukan ke dinas/instansi pemberi tugas, konsultan, maupun manajemen direksi.",
  { align: "justify", lineGap: 2.5 }
);
doc.moveDown(0.6);

drawSubHeading(doc, "5.1 Standar Format Dokumen (Format Pejambon / DANA PIID-PEL)");
doc.text(
  "Format laporan disusun mengacu pada dokumen baku pertanggungjawaban proyek konstruksi (Format Pejambon / DANA PIID-PEL Dinas Pekerjaan Umum), mencakup kop instansi, judul formal, dan tabel komparasi 11 kolom.",
  { align: "justify", lineGap: 2 }
);
doc.moveDown(0.4);

drawSubHeading(doc, "5.2 Rincian 11 Kolom Komparasi Laporan");
drawBullet(doc, "Kolom 1: NO", "Nomor urut pekerjaan.");
drawBullet(doc, "Kolom 2: URAIAN PEKERJAAN", "Nama divisi dan rincian item pekerjaan fisik konstruksi.");
drawBullet(doc, "Kolom 3-6: RENCANA", "Terdiri atas Volume Rencana, Satuan, Harga Satuan Rencana (Rp), dan Total Biaya Rencana (Rp).");
drawBullet(doc, "Kolom 7-10: REALISASI", "Terdiri atas Volume Aktual, Satuan, Harga Satuan Aktual (Rp), dan Total Biaya Aktual (Rp).");
drawBullet(doc, "Kolom 11: SELISIH (RP)", "Nilai selisih antara Rencana dan Realisasi (Rencana - Realisasi) untuk mengidentifikasi efisiensi biaya / penghematan.");

doc.moveDown(0.6);
drawSubHeading(doc, "5.3 Rekapitulasi Biaya & Struktur Anggaran");
drawBullet(doc, "Bagian A: Biaya Fisik Konstruksi", "Subtotal biaya riil material, upah tukang, dan alat di lapangan.");
drawBullet(doc, "Bagian B: Biaya Umum, Overhead & Pajak", "Perhitungan Jasa Kontraktor & Overhead (default 10%) dan Pajak Pertambahan Nilai (PPN 11%) yang tertera jelas.");
drawBullet(doc, "Jumlah Total (Grand Total)", "Total akhir anggaran konstruksi (Subtotal Fisik + Overhead + PPN).");

doc.moveDown(0.6);
drawSubHeading(doc, "5.4 Lembar Pengesahan Tanda Tangan 3 Pihak");
doc.text(
  "Pada bagian akhir laporan, tercantum titimangsa tanggal penyusunan otomatis serta 3 kolom pengesahan resmi:",
  { align: "justify", lineGap: 2 }
);
doc.moveDown(0.4);

drawBullet(doc, "1. Disiapkan Oleh", "Tim Pelaksana Kegiatan Konstruksi (TPKK) / Kontraktor Pelaksana.");
drawBullet(doc, "2. Diperiksa Oleh", "Konsultan Supervisi / Pengawas Lapangan (Site Engineer).");
drawBullet(doc, "3. Disetujui Oleh", "Pemberi Tugas / Kepala Instansi / Pejabat Pembuat Komitmen (PPK).");

// =========================================================================
// HALAMAN 8: BAB IV - PANDUAN EKSPOR DOKUMEN (PDF & EXCEL)
// =========================================================================
doc.addPage();

drawSectionHeading(doc, "04", "PANDUAN EKSPOR DOKUMEN (PDF & EXCEL)");

doc.font("Helvetica").fontSize(9).fillColor(SLATE).text(
  "ESTICON dilengkapi dengan tombol aksi ekspor cepat di bagian atas halaman Tahap 5 untuk menghasilkan berkas digital yang siap dibagikan atau dicetak fisik.",
  { align: "justify", lineGap: 2.5 }
);
doc.moveDown(0.6);

drawSubHeading(doc, "4.1 Ekspor Laporan PDF Resmi ('Unduh Laporan PDF')");
doc.text(
  "Fitur ini menghasilkan file PDF vektor murni beresolusi tinggi dengan spesifikasi dokumen resmi:",
  { align: "justify", lineGap: 2 }
);
doc.moveDown(0.4);

drawBullet(doc, "Orientasi Standar A4 Portrait (Tegak)", "Dokumen berukuran 210 × 297 mm, sangat proporsional untuk penjilidan map hardcopy laporan dinas.");
drawBullet(doc, "Tipografi Vektor Tajam & Warna Hitam Tegas", "Menggunakan font resmi Times New Roman berwarna hitam pekat (#000000) sehingga tulisan dijamin terbaca 100% jelas saat dicetak.");
drawBullet(doc, "Penataan 2 Halaman (Two-Page Master Layout)", "• Halaman 1: Kop Surat Ganda, Judul Proyek, dan Tabel Lengkap 11 Kolom BoQ beserta Rekapitulasi Total.\n• Halaman 2: Grafik Kurva S Resolusi Tinggi (rasio 2:1 proporsional) dan Lembar Pengesahan Tanda Tangan 3 Pihak.");
drawBullet(doc, "Running Footer", "Setiap halaman dilengkapi nomor halaman dinamis: 'Halaman 1 dari 2' dan 'Halaman 2 dari 2'.");

doc.moveDown(0.8);
drawSubHeading(doc, "4.2 Ekspor Spreadsheet Excel Berumus Aktif ('Ekspor Excel (.xlsx)')");
doc.text(
  "File workbook Microsoft Excel (.xlsx) disusun otomatis menggunakan SheetJS dengan multi-sheet profesional:",
  { align: "justify", lineGap: 2 }
);
doc.moveDown(0.4);

drawBullet(doc, "Sheet 1: 'RAB Lengkap'", "Memuat judul, uraian pekerjaan, volume, satuan, harga satuan, dan TOTAL BIAYA dengan formula perkalian Excel aktif (=D8*F8) serta formula SUM total.");
drawBullet(doc, "Sheet 2: 'Analisis Biaya'", "Memuat rekapitulasi Biaya Langsung (Fisik), Biaya Tidak Langsung (Overhead), PPN 11%, dan Grand Total.");
drawBullet(doc, "Sheet 3: 'Jadwal & Bobot'", "Memuat tabel matriks mingguan (Minggu 1 s/d N), alokasi bobot rencana per pekan, dan bobot kumulatif.");

doc.moveDown(0.8);
drawSubHeading(doc, "4.3 Fitur Cetak Langsung ('Cetak Dokumen')");
doc.text(
  "Menyediakan fungsi window.print() dengan CSS @media print yang secara otomatis menyembunyikan navigasi, tombol, dan sidebar, menyisakan lembar dokumen putih bersih siap kirim ke mesin printer fisik.",
  { align: "justify", lineGap: 2 }
);

// =========================================================================
// HALAMAN 9: BAB V - KUSTOMISASI PROFIL INSTANSI & LOGO
// =========================================================================
doc.addPage();

drawSectionHeading(doc, "05", "KUSTOMISASI PROFIL INSTANSI & LOGO");

doc.font("Helvetica").fontSize(9).fillColor(SLATE).text(
  "ESTICON memungkinkan pengguna menyesuaikan identitas kop surat dan pejabat penandatangan agar dokumen yang dihasilkan mencerminkan nama perusahaan atau instansi Anda sendiri.",
  { align: "justify", lineGap: 2.5 }
);
doc.moveDown(0.6);

drawSubHeading(doc, "5.1 Mengatur Kop Surat & Nomor Dokumen");
doc.text(
  "Pada panel profil instansi, pengguna dapat mengubah data berikut secara bebas:",
  { align: "justify", lineGap: 2 }
);
doc.moveDown(0.4);

drawBullet(doc, "Nama Perusahaan / Dinas", "Contoh: PT. ARTHA KONSTRUKSI NUSANTARA atau DINAS PEKERJAAN UMUM DAN PENATAAN RUANG.");
drawBullet(doc, "Sub-judul / Unit Kerja", "Contoh: ESTIMATOR / KONTRAKTOR PELAKSANA atau TIM PENGELOLA KEGIATAN KONSTRUKSI.");
drawBullet(doc, "Alamat & Kontak", "Alamat kantor, nomor telepon, dan email resmi.");
drawBullet(doc, "Nomor Dokumen Proyek", "Format penomoran surat kedinasan (contoh: 048/EST-RAB/AKN/XI/2026).");

doc.moveDown(0.8);
drawSubHeading(doc, "5.2 Mengunggah Logo Perusahaan (Custom Logo)");
doc.text(
  "Pengguna dapat mengunggah file logo instansi (format .PNG atau .JPG):",
  { align: "justify", lineGap: 2 }
);
doc.moveDown(0.4);

drawBullet(doc, "Penyimpanan Lokal (Base64)", "Logo dikonversi menjadi data URL dan disimpan di memori peramban tanpa memerlukan server eksternal.");
drawBullet(doc, "Otomasi Penempatan di Kop PDF", "Logo akan secara otomatis muncul di sisi kanan kop surat PDF dengan rasio proporsional dan tidak menabrak teks nomor dokumen.");

doc.moveDown(0.8);
drawSubHeading(doc, "5.3 Mengatur Nama & Gelar Penandatangan");
doc.text(
  "Tersedia formulir untuk mengisi nama pejabat yang berwenang menandatangani:",
  { align: "justify", lineGap: 2 }
);
doc.moveDown(0.4);

drawBullet(doc, "Pihak 1 (Penyusun)", "Nama Estimator / Ketua Tim Pelaksana.");
drawBullet(doc, "Pihak 2 (Pemeriksa)", "Nama Konsultan Supervisi / Site Engineer.");
drawBullet(doc, "Pihak 3 (Penyetuju)", "Nama Pemilik Proyek / Kepala Desa / Pejabat Pembuat Komitmen (PPK).");

doc.moveDown(0.6);
drawInfoBox(doc, "Penyimpanan Otomatis (Auto-Save)", "Seluruh konfigurasi perusahaan dan data proyek tersimpan secara otomatis setiap kali Anda melakukan perubahan. Data tidak akan hilang meskipun halaman web di-refresh atau ditutup.");

// =========================================================================
// HALAMAN 10: BAB VI - FAQ & TROUBLESHOOTING
// =========================================================================
doc.addPage();

drawSectionHeading(doc, "06", "TANYA JAWAB (FAQ) & TROUBLESHOOTING");

drawSubHeading(doc, "Q1: Bagaimana jika grafik Kurva S belum muncul pada lembar laporan?");
doc.font("Helvetica").fontSize(8.5).fillColor(SLATE).text(
  "A: Pastikan Anda telah membuka Tahap 4 (Penjadwalan & Kurva S) terlebih dahulu sebelum masuk ke Tahap 5. Membuka Tahap 4 akan memicu inisialisasi render grafik pada sistem.",
  { align: "justify", lineGap: 2 }
);
doc.moveDown(0.6);

drawSubHeading(doc, "Q2: Apakah file Excel yang diunduh bisa dibuka di semua versi Microsoft Office?");
doc.font("Helvetica").fontSize(8.5).fillColor(SLATE).text(
  "A: Ya. Berkas .xlsx yang dihasilkan kompatibel dengan Microsoft Excel 2007 hingga versi terbaru Microsoft 365, serta Google Sheets dan LibreOffice Calc.",
  { align: "justify", lineGap: 2 }
);
doc.moveDown(0.6);

drawSubHeading(doc, "Q3: Bagaimana cara mencetak PDF dengan hasil paling tajam?");
doc.font("Helvetica").fontSize(8.5).fillColor(SLATE).text(
  "A: Gunakan tombol 'Unduh Laporan PDF'. File yang dihasilkan berbasis vektor murni (bukan screenshot gambar), sehingga teks dan garis tabel tetap sangat tajam meskipun di-zoom hingga 400% atau dicetak pada kertas A4 standar.",
  { align: "justify", lineGap: 2 }
);
doc.moveDown(0.6);

drawSubHeading(doc, "Q4: Apakah data estimasi saya aman dan tidak bocor ke internet?");
doc.font("Helvetica").fontSize(8.5).fillColor(SLATE).text(
  "A: Sangat aman. Seluruh pemrosesan komputasi ESTICON berjalan di sisi peramban lokal (Client-side Execution). Tidak ada data angka maupun dokumen proyek Anda yang diunggah ke server pihak ketiga.",
  { align: "justify", lineGap: 2 }
);
doc.moveDown(0.8);

drawHr(doc, doc.y, BLUE, 1);
doc.moveDown(0.8);

// Penutup & Kontak
doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(10).text("PENUTUP & KONTAK DUKUNGAN", { align: "center" });
doc.moveDown(0.3);
doc.font("Helvetica").fontSize(8.5).fillColor(SLATE).text(
  "Aplikasi ESTICON dirancang untuk terus berkembang mendukung kebutuhan digitalisasi dunia konstruksi Indonesia. Saran, masukan, dan kolaborasi dapat disampaikan melalui repositori resmi:",
  { align: "center", lineGap: 2 }
);
doc.moveDown(0.3);
doc.font("Helvetica-Bold").fontSize(9.5).fillColor(BLUE).text(
  "GitHub Repository: https://github.com/hafifimustofa/ESTICON\nAplikasi Live: https://hafifimustofa.github.io/ESTICON/",
  { align: "center", lineGap: 3 }
);

// =========================================================================
// RUNNING FOOTER DI SEMUA HALAMAN (KECUALI COVER)
// =========================================================================
const range = doc.bufferedPageRange();
for (let i = 1; i < range.count; i++) {
  doc.switchToPage(i);
  
  // Running Header Tipis
  doc.save();
  doc.strokeColor(BORDER).lineWidth(0.4).moveTo(45, 32).lineTo(550, 32).stroke();
  doc.font("Helvetica").fontSize(7.5).fillColor(MUTED).text("ESTICON — Panduan Penggunaan Resmi (User Manual)", 45, 23);
  doc.text("Versi 1.0", 500, 23, { align: "right" });
  doc.restore();

  // Running Footer
  doc.save();
  doc.strokeColor(BORDER).lineWidth(0.4).moveTo(45, 805).lineTo(550, 805).stroke();
  doc.font("Helvetica").fontSize(7.5).fillColor(MUTED).text("Hak Cipta © 2026 ESTICON. Dikembangkan untuk Komputasi Teknik Sipil.", 45, 814);
  doc.text(`Halaman ${i + 1} dari ${range.count}`, 490, 814, { align: "right" });
  doc.restore();
}

doc.end();

writeStream.on("finish", () => {
  console.log("PDF User Manual berhasil dibuat di:", outputPath);
});
writeStream.on("error", (err) => {
  console.error("Gagal membuat PDF User Manual:", err);
});
