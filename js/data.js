/* =========================================================
   SORA CITY — DATA & PENGATURAN
   Semua yang sering diubah ada di file ini. Tidak perlu
   menyentuh script.js atau style.css untuk update konten.
   ========================================================= */

const CONFIG = {
  ip: "play.sorasmp.my.id",
  port: "",                       // kosongkan jika port default (25565)
  waNumber: "62085712000705",                   // WAJIB diisi untuk tombol beli rank. Format: 628123456789 (tanpa +)
  statusApi: "https://api.mcsrvstat.us/3/"
};

// Latar hero (bergantian otomatis). Tambah/hapus foto sesuka hati.
const HERO_SLIDES = [
  "assets/img/sora-mount.jpg",
  "assets/img/sayama-gedung.jpg",
  "assets/img/billiard.jpg"
];

// Video cinematic untuk latar hero. Taruh file di assets/video/hero.mp4.
// Jika file tidak ada / gagal dimuat, otomatis memakai foto HERO_SLIDES di atas. Kosongkan ("") untuk memakai foto saja.
const HERO_VIDEO = "assets/video/testi4.mp4";
// Bagian video yang dipertahankan di layar HP (video lebar dipotong di sisi kiri/kanan): "50% 50%" = tengah, "20% 50%" = lebih ke kiri, "80% 50%" = lebih ke kanan.
const HERO_FOCUS = "50% 50%";

// Tautan komunitas
const COMMUNITY = [
  { name: "Discord",          note: "Ngobrol & dapat bantuan", url: "https://discord.gg/bkDHcBhjf" },
  { name: "Grup WhatsApp",    note: "Gabung grup pemain",      url: "https://chat.whatsapp.com/JXnPsjsN4wk39DurPaMwk6" },
  { name: "Saluran WhatsApp", note: "Info & pengumuman",       url: "https://whatsapp.com/channel/0029VacQ78RF6smzsbKUXN1S" },
  { name: "TikTok",           note: "@sora_city",              url: "https://www.tiktok.com/@sora_city?is_from_webapp=1&sender_device=pc" }
];

// Fitur — tambah objek baru untuk fitur baru. img: kosongkan jika belum ada foto.
// Kalau lebih dari 4 fitur, otomatis dibagi jadi 2 baris geser. Foto yang belum ada otomatis tampil sebagai kotak huruf.
const FEATURES = [
  { name: "Fishing",  desc: "Memancing santai di perairan kota Sora.", img: "assets/img/mancing2.jpg" },
  { name: "Billiard", desc: "Main biliar bersama pemain lain di ruang billiard.", img: "assets/img/billiard.jpg" },
  { name: "Dukcapil",      desc: "Sistem kartu identitas untuk setiap pemain.", img: "assets/img/buatktp.jpg" },
  { name: "Farmer",   desc: "Bertani dan menghasilkan di kota.", img: "assets/img/farmer2.jpg" },
  { name: "PvP",      desc: "Arena adu kemampuan dengan pemain lain.", img: "assets/img/pvp.jpg" },
  { name: "Mine Area", desc: "Area khusus untuk menambang.", img: "assets/img/miner1.jpg" },
  { name: "Lumberjack Area", desc: "Area khusus untuk menebang pohon.", img: "assets/img/pohon.jpg" },
  { name: "Food Shop", desc: "Toko makanan di kota Sora.", img: "assets/img/food.jpg" },
  { name: "Sekolah",  desc: "Gedung sekolah di kota Sora.", img: "assets/img/sekolah4.jpg" }
];

// Galeri — src kosong = slot "foto menyusul". rot = kemiringan foto (derajat).
const GALLERY = [
  { src: "assets/img/soramount1.jpg",   cap: "Sora Mount",        rot: -2 },
  { src: "assets/img/sayama-gedung.jpg", cap: "Gedung sekolah di SoraCity",  rot: 1.5 },
  { src: "assets/img/billiard.jpg",     cap: "Ruang Billiard",    rot: -1 },
  { src: "assets/img/cosmetic.jpg", cap: "Sora Cosmetic",       rot: 2 },
  { src: "assets/img/mancing.jpg", cap: "Sora Fising",  rot: -1.5 },
  { src: "assets/img/foto2.jpg", cap: "Warga Sora",      rot: 1 },
  { src: "assets/img/pvp.jpg",        cap: "Arena PvP",        rot: -1.5 },
  { src: "assets/img/foto1.jpg",       cap: "Warga Sora 2025-2026",        rot: 1.5 },
  { src: "assets/img/foto3.jpg", cap: "Warga sora 2025",  rot: -1 },
  { src: "assets/img/food.jpg",   cap: "Food Shop",        rot: 2 },
  { src: "assets/img/sekolah.jpg",    cap: "Sekolah Sora",     rot: -2 },
  { src: "assets/img/farmer.jpg",     cap: "Farmer Area",      rot: 1 }
];
// Foto yang filenya belum ada otomatis tampil "foto menyusul". Hapus baris yang tidak dipakai.

// Staff — tampil sebagai kartu KTP.
// CARA MENAMBAH SLOT: salin satu baris { name: ... } di dalam "members" lalu isi datanya.
// CARA MENAMBAH GRUP BARU (misal "Helper"): salin satu blok { group: "...", members: [ ... ] }.
// skin  : URL/path gambar skin atau foto (kosong = inisial)
// tiktok: link profil TikTok  | email: alamat email  (kosong = ikon abu-abu tidak bisa diklik)
const STAFF = [
  { group: "Owner", members: [
    { name: "Alexa", role: "Owner", skin: "assets/skins/ale.jpeg", tiktok: "https://www.tiktok.com/@alexcimonn?_r=1&_t=ZS-9BcLEHkoyKQ", email: "aralexsa18@gmail.com", desc: "Alexa adalah Owner SoraCity" },
    { name: "Miuxa", role: "Co-Owner", skin: "assets/skins/miuxa2.jpg", tiktok: "https://www.tiktok.com/@rownmiu?_r=1&_t=ZS-9BcJa5aEdFa", email: "mareditz64@gmail.com", desc: "Miuxa adalah Co-Owner SoraCity." }
  ] },
    { group: "Developer / Supervisor", members: [
    { name: "IanAdhi", role: "Supervisor", skin: "assets/skins/ian.jpeg", tiktok: "https://www.tiktok.com/@ian_akihiko?_r=1&_t=ZS-9BcL4t1mEVe", email: "ianadhi.24@gmail.com", desc: "IanAdhi adalah Supervisor SoraCity" },
    { name: "Megu", role: "Developer", skin: "assets/skins/megu.jpeg", tiktok: "https://tiktok.com/@azrae__", email: "azraelorentza@gmail.com", desc: "Megu adalah Developer Utama SoraCity" },
    { name: "Arvyn", role: "Developer", skin: "assets/skins/aeryn.jpeg", tiktok: "https://www.tiktok.com/@arvynn_1?is_from_webapp=1&sender_device=pc", email: "khalifiazam053@gmail.com", desc: "Arvyn adalah Developer ke2 SoraCity" }
  ] },
  { group: "Admin", members: [
    { name: "Isan", role: "Admin Media", skin: "assets/skins/isan2.png", tiktok: "https://www.tiktok.com/@isannnnss?_r=1&_t=ZS-9BcSzCY0AGV", email: "ikhsanpratama0895621@gmail.com", desc: "Isan adalah Admin Media" },
    { name: "Exu", role: "Ex-Owner", skin: "assets/skins/exu.jpeg", tiktok: "https://www.tiktok.com/@exu.caelora?is_from_webapp=1&sender_device=pc", email: "", desc: "Exu adalah Mantan Owner SoraCity 2023-2025" }
  ] },
  
];

// Rank — tampil sebagai tiket
const RANKS = [
  { icon: "🍜", price: "150K", period: "Permanen",   prefix: "Ultimate, Mythical, Costume",
    perms: ["/teleport", "/ptime", "/pweather", "/nick", "/top"], extra: ["Money 750k", "Permission 70k"] },
  { icon: "🥙", price: "70K",  period: "Per bulan",  prefix: "Ultra+, Royal+, Legend+, Premium+",
    perms: ["/speed walk & fly", "/enderchest", "/repair", "/enchant", "/rename", "/feed"], extra: ["Money 350k", "Permission 35k"] },
  { icon: "🍮", price: "35K",  period: "Per bulan",  prefix: "King, Queen, Starboy, Stargirl",
    perms: ["/fly", "/heal", "/anvil", "/tphere", "/back"], extra: ["Money 175k", "Permission default"] },
  { icon: "🍬", price: "10K",  period: "Per minggu", prefix: "Vip",
    perms: ["/fly", "/heal", "/anvil", "/tphere", "/back"], extra: ["Money 50k", "Permission default"] }
];

const STEPS = [
  ["Buka Minecraft", "Pakai Minecraft Java Edition di PC, atau PojavLauncher / launcher Java lain di Android."],
  ["Pilih versi", "Gunakan versi 1.20.1 sampai versi terbaru yang didukung. Bedrock tidak bisa masuk."],
  ["Tambah server", "Masuk Multiplayer → Add Server, lalu tempel alamat server (tombol Salin IP)."],
  ["Masuk kota", "Simpan, lalu klik Join Server."]
];

const NAV = [
  ["home", "Beranda"], ["about", "Tentang"], ["features", "Fitur"],
  ["gallery", "Galeri"], ["staff", "Staff"], ["ranks", "Rank"], ["creators", "Web Dev"]
];

// Halaman khusus dua pendiri (menu "Arsitek"; ganti nama menu di NAV di atas).
// skin       : render skin seluruh badan (PNG transparan)
// skinHover  : render skin Spiderman dengan POSE & UKURAN SAMA persis (muncul seperti bayangan saat kursor di atas skin)
const CREATORS = [
  { name: "Miuxa",    role: "Co-Owner", tagline: "Penentuan konsep akhir, menyesuaikan code, pengembangan tampilan website tingkat lanjut.", skin: "assets/skins/miuxa.png", skinHover: "assets/skins/sapi.png", tiktok: "https://www.tiktok.com/@rownmiu?_r=1&_t=ZS-9BcJa5aEdFa", email: "mareditz64@gmail.com" },
  { name: "Isan", role: "Admin-Media", tagline: "Penentuan konsep awal, pengembangan fitur tingkat lanjut, membantu menyesuaikan tampilan website.", skin: "assets/skins/isan.png", skinHover: "assets/skins/sapi2.png", tiktok: "https://www.tiktok.com/@isannnnss?_r=1&_t=ZS-9BcSzCY0AGV", email: "ikhsanpratrama0895621@gmail.com" }
];


// Musik latar. Taruh file mp3 di assets/audio/. Kosongkan ("") jika tidak dipakai.
// main     : diputar di Beranda sampai Rank (satu lagu terus nyambung)
// creators : khusus halaman Web Dev (misal lagu Spiderman). Jika kosong, lagu utama tetap jalan.
const MUSIC = {
  main: "assets/audio/main.mp3",
  creators: "assets/audio/spiderman.mp3",
  volume: 0.15            // 0 – 1
};
