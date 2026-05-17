// src/helpers/translator.js

/**
 * Fungsi utilitas untuk menerjemahkan teks secara otomatis (on-the-fly).
 * Menggunakan endpoint Google Translate Client gratisan yang aman untuk tahap Development.
 * * @param {string} text - Teks asli yang ingin diterjemahkan (biasanya Bahasa Inggris dari API)
 * @param {string} targetLang - Kode bahasa tujuan (default 'id' untuk Bahasa Indonesia)
 * @returns {Promise<string>} - Hasil teks yang sudah diterjemahkan
 */
export async function translateDynamicText(text, targetLang = 'id') {
  // Jika parameter teks kosong, bernilai null, atau hanya spasi, langsung kembalikan teks kosong
  if (!text || String(text).trim() === "") return "";

  // Trik Caching untuk Fase Dev:
  // Membuat key unik berdasarkan teks agar saat Anda memodifikasi kode (hot-reload),
  // laptop Anda tidak terus-menerus menembak Google untuk teks yang sama.
  const cacheKey = `trans_${btoa(unescape(encodeURIComponent(text.substring(0, 100))))}`;
  const cachedText = sessionStorage.getItem(cacheKey);
  
  if (cachedText) {
    return cachedText; // Jika sudah pernah diterjemahkan sebelumnya, ambil dari memori browser (instan!)
  }

  try {
    // Endpoint Google Translate Client (Jalur pintas gratis)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Translate API bermasalah (Status: ${response.status})`);
    }

    const result = await response.json();
    
    // Format response dari Google gratisan berbentuk array berlapis: [[[ "Teks Terjemahan", "Teks Asli" ]]]
    if (result && result[0]) {
      // Gabungkan potongan teks jika barisnya panjang/banyak paragraf
      let translatedText = result[0].map(item => item[0]).join('');
      
      // Simpan hasil sukses ke sessionStorage browser
      sessionStorage.setItem(cacheKey, translatedText);
      
      return translatedText;
    }
    
    return text; // Fallback: kembalikan teks asli jika struktur array tidak sesuai
  } catch (error) {
    console.error("Gagal melakukan translasi otomatis:", error);
    return text; // Fallback: jika internet Anda putus/rto, tampilkan teks asli dari API admin agar web tidak blank/crash
  }
}