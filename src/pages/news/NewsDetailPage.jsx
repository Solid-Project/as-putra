// src/pages/NewsDetailPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShareButtons from "@/components/ui/ShareButtons";

gsap.registerPlugin(ScrollTrigger);

const NewsDetailPage = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  // Refs untuk animasi
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  const breadcrumbRef = useRef(null);

  // Data berita lengkap
  const newsData = {
    "csr-1": {
      id: "csr-1",
      title: "Program Pemberdayaan Peternak Mandiri di Kuningan",
      date: "24 Januari 2026",
      category: "Program CSR",
      image:
        "https://images.unsplash.com/photo-1595245842103-1250357e62bd?auto=format&fit=crop&w=1920&q=80",
      content: `
        <p><strong>KUNINGAN</strong> – Sebagai wujud komitmen terhadap perekonomian lokal, AS PUTRA Group meluncurkan program pendampingan intensif bagi lebih dari 100 peternak mandiri di wilayah Kuningan dan sekitarnya.</p>
        <p>Program ini dirancang untuk menjawab tantangan utama yang dihadapi peternak kecil, yakni akses terhadap pakan berkualitas dan manajemen kesehatan ternak yang efisien. Melalui inisiatif ini, perusahaan menurunkan tim ahli untuk memberikan pelatihan teknis secara berkala di lapangan.</p>
        <p>"Kami percaya bahwa kemajuan perusahaan tidak boleh terjadi sendirian. Jika ekosistem peternakan di sekitar kami tumbuh sehat, maka industri ini akan semakin kuat," ujar Aif Arifin Sidhik, CEO AS PUTRA Group, dalam acara peresmian program.</p>
        <p>Selain pelatihan, para peternak binaan juga mendapatkan akses khusus ke rantai pasok pakan ternak AS PUTRA dengan harga mitra, memastikan biaya produksi mereka tetap kompetitif di tengah fluktuasi pasar.</p>
      `,
    },
    "csr-2": {
      id: "csr-2",
      title: "AS PUTRA Green: Penanaman 5000 Pohon Pelindung",
      date: "20 Januari 2026",
      category: "Program CSR",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?auto=format&fit=crop&w=1920&q=80",
      content: `
        <p>Dalam upaya menjaga kelestarian lingkungan dan sumber daya air di kaki Gunung Ciremai, AS PUTRA Group menggelar aksi penanaman 5000 bibit pohon keras dan buah-buahan.</p>
        <p>Kegiatan ini melibatkan karyawan, komunitas pecinta alam, dan pemerintah daerah setempat. Pohon-pohon yang ditanam dipilih secara khusus yang memiliki kemampuan menyerap air tinggi untuk mencegah erosi dan menjaga debit mata air yang menjadi sumber kehidupan masyarakat sekitar.</p>
        <p>Langkah ini merupakan bagian dari roadmap keberlanjutan perusahaan menuju <em>Carbon Neutral</em> pada 2030. Perusahaan menyadari bahwa sektor agrikultur sangat bergantung pada keseimbangan alam, sehingga menjaganya adalah kewajiban mutlak.</p>
      `,
    },
    "csr-3": {
      id: "csr-3",
      title: "Bantuan Kemanusiaan Tanggap Darurat Bencana",
      date: "15 Januari 2026",
      category: "Program CSR",
      image:
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1920&q=80",
      content: `
        <p>Tim relawan AS PUTRA bergerak cepat menyalurkan bantuan logistik ke lokasi terdampak bencana alam di wilayah Jawa Barat. Bantuan yang disalurkan meliputi bahan makanan pokok, selimut, obat-obatan, dan kebutuhan bayi.</p>
        <p>Armada logistik dari divisi Ekspedisi (Andeff) dikerahkan untuk menembus lokasi-lokasi yang sulit dijangkau, memastikan bantuan sampai langsung ke tangan mereka yang membutuhkan.</p>
        <p>"Solidaritas adalah nilai inti kami. Di saat saudara kita tertimpa musibah, seluruh sumber daya perusahaan yang relevan akan kami optimalkan untuk membantu," tegas manajemen.</p>
      `,
    },
    "comm-1": {
      id: "comm-1",
      title: "Kolaborasi Riset Pakan Ternak dengan IPB",
      date: "10 Januari 2026",
      category: "Acara",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1920&q=80",
      content: `
        <p>AS PUTRA Group menandatangani Nota Kesepahaman (MoU) dengan Institut Pertanian Bogor (IPB) untuk pengembangan formula pakan ternak berbasis bahan baku lokal.</p>
        <p>Kerjasama ini bertujuan menciptakan pakan yang tidak hanya bernutrisi tinggi untuk unggas, tetapi juga ramah lingkungan dengan mengurangi emisi karbon dari proses produksi. Mahasiswa dan peneliti akan mendapatkan akses ke fasilitas laboratorium dan farm milik AS PUTRA untuk pengujian lapangan.</p>
        <p>Sinergi antara akademisi dan praktisi industri ini diharapkan dapat melahirkan inovasi yang mendongkrak efisiensi produksi pangan nasional.</p>
      `,
    },
    "comm-2": {
      id: "comm-2",
      title: "Gathering Mitra Nasional 2025: Tumbuh Bersama",
      date: "05 Januari 2026",
      category: "Acara",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1920&q=80",
      content: `
        <p>Lebih dari 500 mitra bisnis dari seluruh Indonesia berkumpul dalam acara tahunan Gathering Mitra AS PUTRA 2025. Acara ini menjadi ajang apresiasi bagi distributor, supplier, dan partner strategis yang telah berjalan beriringan selama ini.</p>
        <p>Mengusung tema 'Tumbuh Bersama', acara diisi dengan sesi sharing session mengenai outlook ekonomi 2026, peluncuran produk baru, dan penganugerahan penghargaan bagi mitra dengan performa terbaik.</p>
      `,
    },
    "comm-3": {
      id: "comm-3",
      title: "Pelatihan Manajemen Bisnis untuk UMKM",
      date: "28 Desember 2025",
      category: "Acara",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80",
      content: `
        <p>Divisi Retail AS PUTRA menyelenggarakan workshop digital marketing dan manajemen keuangan bagi pelaku UMKM binaan. Di era serba digital, kemampuan beradaptasi dengan teknologi pemasaran online menjadi kunci bertahan hidup usaha kecil.</p>
        <p>Para peserta diajarkan cara membuat laporan keuangan sederhana namun akuntabel, serta strategi memanfaatkan media sosial untuk menjangkau pasar yang lebih luas.</p>
      `,
    },
    "biz-1": {
      id: "biz-1",
      title: "Peresmian Pabrik Pakan Ternak Modern Unit IV",
      date: "20 Desember 2025",
      category: "Prestasi",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
      content: `
        <p>AS PUTRA meresmikan fasilitas produksi terbaru di Cirebon dengan kapasitas produksi mencapai 50 ton per jam. Pabrik Unit IV ini dilengkapi dengan teknologi otomatisasi penuh (fully automated) dari Eropa.</p>
        <p>Investasi ini dilakukan untuk menjawab permintaan pasar yang terus meningkat seiring dengan pertumbuhan populasi dan konsumsi protein hewani di Indonesia. Dengan teknologi baru ini, konsistensi kualitas pakan dapat dijaga dengan tingkat presisi 99,9%.</p>
      `,
    },
    "biz-2": {
      id: "biz-2",
      title: "Implementasi Smart Farming IoT di Internal Farm",
      date: "15 Desember 2025",
      category: "Prestasi",
      image:
        "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1920&q=80",
      content: `
        <p>Transformasi digital terus digulirkan. Kini, seluruh kandang internal farm AS PUTRA telah terintegrasi dengan sistem IoT (Internet of Things). Sensor suhu, kelembaban, dan kadar amonia dipantau secara real-time melalui dashboard pusat.</p>
        <p>Sistem ini memungkinkan deteksi dini terhadap anomali lingkungan kandang, sehingga tindakan korektif dapat dilakukan seketika sebelum mempengaruhi kesehatan ternak. Hasil uji coba menunjukkan peningkatan performa panen sebesar 12% sejak sistem ini diterapkan.</p>
      `,
    },
    "biz-3": {
      id: "biz-3",
      title: "Grand Opening Hotel Amanara: Ikon Baru Pariwisata",
      date: "10 Desember 2025",
      category: "Prestasi",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80",
      content: `
        <p>Divisi Hospitaly AS PUTRA dengan bangga meluncurkan Hotel Amanara, sebuah hotel butik bintang 4 yang memadukan kenyamanan modern dengan sentuhan kearifan lokal Cirebon.</p>
        <p>Terletak strategis di pusat kota, Amanara menawarkan fasilitas MICE (Meeting, Incentive, Convention, Exhibition) terlengkap untuk mendukung pariwisata bisnis di wilayah Ciayumajakuning. Kehadiran hotel ini mempertegas langkah diversifikasi grup ke sektor layanan gaya hidup premium.</p>
      `,
    },
  };

  // Berita lain untuk sidebar
  const otherNews = [
    {
      id: "csr-1",
      title: "Pemberdayaan Peternak Mandiri",
      date: "24 Jan 2026",
      category: "Program CSR",
    },
    {
      id: "biz-1",
      title: "Peresmian Pabrik Pakan Unit IV",
      date: "20 Des 2025",
      category: "Prestasi",
    },
    {
      id: "comm-1",
      title: "Kolaborasi Riset IPB",
      date: "10 Jan 2026",
      category: "Acara",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      const selectedNews = newsData[id];
      if (selectedNews) {
        setNews(selectedNews);
        document.title = `${selectedNews.title} | AS PUTRA`;
      } else {
        setNews(null);
        document.title = "Berita Tidak Ditemukan | AS PUTRA";
      }
      setLoading(false);
    }, 100);
  }, [id]);

  // Animasi GSAP
  useEffect(() => {
    if (!news || loading) return;

    const ctx = gsap.context(() => {
      // Animasi Hero Image
      gsap.fromTo(
        heroRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
      );

      // Animasi Breadcrumb
      gsap.fromTo(
        breadcrumbRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.2,
          ease: "power2.out",
        },
      );

      // Animasi Title
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "back.out(0.7)",
        },
      );

      // Animasi Content
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "power3.out",
        },
      );

      // Animasi Sidebar
      gsap.fromTo(
        sidebarRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.6,
          ease: "power3.out",
        },
      );
    });

    return () => ctx.revert();
  }, [news, loading]);

  // Scroll ke atas saat halaman dibuka
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-utama)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--color-teks-muted)]">Memuat berita...</p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-5">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-[var(--color-teks)] mb-4">
            404 - Berita Tidak Ditemukan
          </h1>
          <p className="text-[var(--color-teks-muted)] mb-8">
            Maaf, berita yang Anda cari tidak tersedia.
          </p>
          <Link
            to="/news"
            className="group relative inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-utama)] text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-utama)]/30 hover:-translate-y-1"
          >
            <span className="relative z-10">Kembali ke Berita</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  const categoryColors = {
    "Program CSR": "bg-green-100 text-green-700",
    Acara: "bg-blue-100 text-blue-700",
    Prestasi: "bg-orange-100 text-orange-700",
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Image Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div ref={heroRef} className="absolute inset-0">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>

        {/* Hero Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
          <div className="max-w-[1200px] mx-auto">
            <div ref={breadcrumbRef} className="mb-4 text-sm text-white/80">
              <Link to="/" className="hover:text-white transition">
                Beranda
              </Link>
              <span className="mx-2">/</span>
              <Link to="/news" className="hover:text-white transition">
                Berita
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{news.title}</span>
            </div>
            <div ref={titleRef}>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${categoryColors[news.category] || "bg-gray-100 text-gray-700"}`}
              >
                {news.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] font-bold leading-tight max-w-4xl">
                {news.title}
              </h1>
              <div className="flex items-center gap-4 mt-4 text-sm text-white/70">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {news.date}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Humas AS PUTRA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1200px] mx-auto px-5 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <article
            ref={contentRef}
            className="lg:col-span-2 prose prose-lg max-w-none text-[var(--color-teks-muted)] leading-relaxed"
          >
            <div dangerouslySetInnerHTML={{ __html: news.content }} />

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-[var(--color-teks)] mb-4">
                Bagikan artikel ini:
              </h4>
              <ShareButtons title={news.title} url={window.location.href} />
            </div>
          </article>

          {/* Sidebar */}
          <aside ref={sidebarRef} className="lg:sticky lg:top-[100px]">
            {/* Related News */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h4 className="text-lg font-bold text-[var(--color-teks)] mb-4 pb-2 border-b-2 border-[var(--color-utama)] inline-block">
                Berita Lainnya
              </h4>
              <div className="space-y-4 mt-4">
                {otherNews
                  .filter((item) => item.id !== id)
                  .map((item) => (
                    <Link
                      key={item.id}
                      to={`/news/${item.id}`}
                      className="block group p-3 rounded-xl hover:bg-gray-50 transition-all duration-300"
                    >
                      <span className="text-xs text-[var(--color-teks-muted)]">
                        {item.date}
                      </span>
                      <h5 className="text-base font-semibold text-[var(--color-teks)] mt-1 group-hover:text-[var(--color-utama)] transition-colors line-clamp-2">
                        {item.title}
                      </h5>
                      <span
                        className={`inline-block text-xs mt-2 px-2 py-0.5 rounded-full ${categoryColors[item.category] || "bg-gray-100 text-gray-600"}`}
                      >
                        {item.category}
                      </span>
                    </Link>
                  ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <Link
                  to="/news"
                  className="group relative inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[var(--color-utama)] text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-utama)]/30 hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Lihat Semua Berita</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 bg-gradient-to-r from-[var(--color-utama)]/10 to-transparent rounded-2xl p-6 border border-[var(--color-utama)]/20">
              <h4 className="font-bold text-[var(--color-teks)] mb-2">
                Tertarik Bergabung?
              </h4>
              <p className="text-sm text-[var(--color-teks-muted)] mb-4">
                Kunjungi halaman karir kami untuk melihat peluang terbaru.
              </p>
              <Link
                to="/career"
                className="inline-block px-5 py-2 bg-[var(--color-utama)] text-white rounded-full text-sm hover:bg-[var(--color-utama-hover)] transition-all"
              >
                Lihat Karir
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .prose {
          font-size: 1.125rem;
        }
        .prose p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
        }
        .prose strong {
          color: var(--color-teks);
          font-weight: 600;
        }
        .prose em {
          font-style: italic;
        }
      `}</style>
    </main>
  );
};

export default NewsDetailPage;
