import React, { useEffect, useRef } from "react";

// Fungsi penembak API Google Gratisan
async function translateDynamicText(text, targetLang = 'id') {
  if (!text || String(text).trim() === "") return "";
  
  // 🔴 FIX BAHASA JEPANG: Ubah kode 'jp' menjadi 'ja' agar dimengerti oleh Google Translate
  if (targetLang === "jp") {
    targetLang = "ja";
  }

  // Gunakan targetLang yang sudah diperbaiki untuk cache key
  const cacheKey = `trans_${targetLang}_${btoa(unescape(encodeURIComponent(text.substring(0, 80))))}`;
  const cachedText = sessionStorage.getItem(cacheKey);
  if (cachedText) return cachedText;

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    if (!response.ok) return text;

    const result = await response.json();
    if (result && result[0]) {
      let translatedText = result[0].map(item => item[0]).join('');
      sessionStorage.setItem(cacheKey, translatedText);
      return translatedText;
    }
    return text;
  } catch (error) {
    return text;
  }
}

const AutoTranslate = () => {
  // Gunakan ref untuk melacak teks yang sedang dalam proses translasi agar tidak terjadi looping tanpa akhir
  const processingNodes = useRef(new Set());

  useEffect(() => {
    const translatePageElements = async () => {
      const currentLang = localStorage.getItem("user_lang") || "id";
      
      // Jika bahasa Indonesia, kita kembalikan halaman ke kondisi semula (atau jika butuh reload untuk refresh data asli)
      if (currentLang === "id") return;

      const wrapper = document.querySelector(".fullpage-wrapper");
      if (!wrapper) return;

      // Ambil semua Text Node yang ada di dalam wrapper saat ini
      const textNodes = [];
      const walk = document.createTreeWalker(wrapper, NodeFilter.SHOW_TEXT, null, false);

      let node;
      while ((node = walk.nextNode())) {
        const trimmed = node.nodeValue.trim();
        
        // Validasi: Teks harus berupa huruf, bukan angka saja, dan belum pernah diproses
        if (trimmed.length > 1 && isNaN(trimmed) && !processingNodes.current.has(node)) {
          textNodes.push(node);
        }
      }

      // Jalankan proses translasi secara paralel
      await Promise.all(
        textNodes.map(async (node) => {
          const originalText = node.nodeValue;
          
          // Tandai node ini sedang diproses agar tidak dihitung ganda oleh MutationObserver
          processingNodes.current.add(node);

          const translated = await translateDynamicText(originalText, currentLang);
          
          if (translated && translated !== originalText) {
            node.nodeValue = translated; // Paksa HTML menampilkan teks hasil translasi
          }
        })
      );
    };

    // 1. Eksekusi pertama kali
    translatePageElements();

    // 2. Dengarkan tombol bahasa dari Navbar
    const handleLangChange = () => {
      processingNodes.current.clear(); // Bersihkan pelacak memori agar bisa diterjemahkan ulang ke bahasa lain
      translatePageElements();
    };
    window.addEventListener("storage", handleLangChange);

    // 3. STRATEGI AGRESIF: Pantau setiap mili detik perubahan DOM (Saat React selesai fetch API)
    const observer = new MutationObserver((mutations) => {
      let shouldTranslate = false;
      
      for (let mutation of mutations) {
        // Jika ada element baru masuk (data API selesai di-render React) atau ada teks yang berubah kembali ke asal
        if (mutation.addedNodes.length > 0 || mutation.type === "characterData") {
          // Pastikan perubahan itu bukan dilakukan oleh fungsi translasi kita sendiri
          if (!processingNodes.current.has(mutation.target)) {
            shouldTranslate = true;
            break;
          }
        }
      }

      if (shouldTranslate) {
        translatePageElements();
      }
    });

    const wrapper = document.querySelector(".fullpage-wrapper");
    if (wrapper) {
      observer.observe(wrapper, { 
        childList: true, 
        subtree: true, 
        characterData: true // Pantau perubahan isi teks terdalam
      });
    }

    return () => {
      window.removeEventListener("storage", handleLangChange);
      observer.disconnect();
      processingNodes.current.clear();
    };
  }, []);

  return null;
};

export default AutoTranslate;