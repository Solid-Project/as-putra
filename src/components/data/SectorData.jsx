// src/data/sectorData.js
export const sectorData = [
  {
    id: 'peternakan',
    number: '01',
    title: 'Peternakan',
    subtitle: 'Pilar Utama Ketahanan Pangan',
    description: 'Fokus utama kami dalam mendukung ketahanan pangan melalui manajemen peternakan terintegrasi. Dengan teknologi modern dan kemitraan yang kuat, kami menghadirkan produk unggas berkualitas tinggi yang memenuhi standar nasional.',
    image: '/react/img/peternakan.webp',
    layout: 'layout1',
    order: 1,
    items: [
      { title: 'Breeding & Hatchery', description: 'Pemuliaan & penetasan unggul', icon: '🥚', link: '/sector/breeding' },
      { title: 'Kemitraan', description: 'Sinergi dengan peternak lokal', icon: '🤝', link: '/sector/kemitraan' },
      { title: 'Internal Farm', description: 'Peternakan modern mandiri', icon: '🏭', link: '/sector/internal-farm' },
      { title: 'RPA', description: 'Rumah Potong Ayam higienis', icon: '🍗', link: '/sector/rpa' }
    ],
    cta: {
      text: 'Lihat Detail Peternakan',
      link: '/sector/peternakan'
    }
  },
  {
    id: 'hotel',
    number: '02',
    title: 'Hotel & Resort',
    subtitle: 'Luxury Hospitality',
    description: 'Menghadirkan pengalaman menginap yang tak terlupakan dengan layanan prima. Dari hotel bisnis hingga resort eksklusif, kami melayani dengan standar internasional untuk memenuhi kebutuhan tamu modern.',
    image: '/img/hotel2.webp',
    layout: 'layout2',
    order: 2,
    items: [
      { title: 'Cordela', description: 'Hotel bisnis nyaman dengan fasilitas lengkap', icon: '🏨', link: '/sector/cordela' },
      { title: 'Bulak Laut', description: 'Resort tepi pantai dengan pemandangan indah', icon: '🏖️', link: '/sector/bulak-laut' },
      { title: 'Amanara', description: 'Akomodasi berkelas dengan sentuhan lokal', icon: '✨', link: '/sector/amanara' },
      { title: 'Aston', description: 'Jaringan hotel internasional terpercaya', icon: '🌟', link: '/sector/aston' }
    ],
    cta: {
      text: 'Jelajahi Semua Akomodasi',
      link: '/sector/hotel'
    }
  }
];