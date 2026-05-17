// src/utils/translateService.js

// Menggunakan MyMemory API (Gratis, tanpa API Key, Kuota 1000 kata/hari gratis)
export const translateText = async (text, targetLang) => {
  if (!text) return "";
  if (targetLang === "id") return text; // Jika bahasa Indonesia, tidak perlu di-translate

  // Siasatkan kode jepang (jp -> ja)
  const langPair = `id|${targetLang === "jp" ? "ja" : targetLang}`;

  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`
    );
    const json = await response.json();
    
    if (json.responseData && json.responseData.translatedText) {
      return json.responseData.translatedText;
    }
    return text; // Fallback jika API limit
  } catch (error) {
    console.error("Gagal auto-translate:", error);
    return text; // Fallback teks asli jika error network
  }
};