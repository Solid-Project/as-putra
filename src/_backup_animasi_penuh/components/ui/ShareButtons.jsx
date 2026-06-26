// src/components/ui/ShareButtons.jsx
import React from 'react';

const ShareButtons = ({ title, url }) => {
  const shareLinks = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
        </svg>
      ),
      color: '#1877F2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.78-.2-7.14-2-9.4-4.76-.4.7-.6 1.5-.6 2.36 0 1.58.8 2.97 2.02 3.78-.74-.02-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.38.1-.78.15-1.19.15-.3 0-.58-.03-.87-.08.59 1.84 2.3 3.18 4.32 3.22-1.58 1.24-3.58 1.98-5.75 1.98-.37 0-.74-.02-1.1-.06 2.04 1.3 4.45 2.06 7.05 2.06 8.45 0 13.07-7 13.07-13.07v-.6c.9-.64 1.68-1.44 2.3-2.36z"/>
        </svg>
      ),
      color: '#1DA1F2',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.45 20.45h-3.55v-5.6c0-1.34-.03-3.07-1.88-3.07-1.88 0-2.17 1.46-2.17 2.97v5.7H9.3V9.3h3.4v1.52c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.4 4.3 5.52v5.96zM5.34 7.9c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zM2.97 20.45h4.74V9.3H2.97v11.15z"/>
        </svg>
      ),
      color: '#0A66C2',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.04 2.5c-5.24 0-9.5 4.26-9.5 9.5 0 1.68.44 3.33 1.27 4.77L2.5 21.5l4.85-1.27c1.4.8 2.98 1.22 4.6 1.22 5.24 0 9.5-4.26 9.5-9.5S17.28 2.5 12.04 2.5zm0 17.45c-1.44 0-2.86-.38-4.1-1.1l-.3-.18-2.87.75.77-2.8-.2-.3c-.8-1.28-1.22-2.76-1.22-4.27 0-4.36 3.55-7.9 7.92-7.9 4.36 0 7.9 3.54 7.9 7.9 0 4.36-3.54 7.9-7.9 7.9zm4.33-5.93c-.24-.12-1.4-.68-1.62-.76-.22-.08-.38-.12-.54.12-.16.24-.62.76-.76.92-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.63-1.17-1.4-1.3-1.64-.14-.24-.02-.37.1-.5.12-.12.26-.32.38-.48.12-.16.16-.28.24-.46.08-.18.04-.34-.02-.48-.06-.14-.54-1.3-.74-1.78-.2-.48-.4-.4-.54-.4-.14 0-.3-.02-.46-.02-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.1 3.64.57.25 1.02.4 1.37.5.58.18 1.1.15 1.52.1.46-.06 1.4-.58 1.6-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/>
        </svg>
      ),
      color: '#25D366',
      url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
    }
  ];

  return (
    <div className="flex gap-3">
      {shareLinks.map((platform) => (
        <button
          key={platform.name}
          onClick={() => window.open(platform.url, '_blank')}
          className="p-2.5 bg-gray-100 hover:bg-[var(--color-utama)] hover:text-white rounded-full transition-all duration-300 group"
        >
          {platform.icon}
        </button>
      ))}
    </div>
  );
};

export default ShareButtons;