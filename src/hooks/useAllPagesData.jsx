import { useState, useEffect } from "react";
import api from "@/lib/api";

export const useAllPagesData = () => {
  const [combinedSections, setCombinedSections] = useState([]);
  const [rawMenu, setRawMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEverything = async () => {
      try {
        // 1. Ambil List Halaman
        const listRes = await api.get("/api/v1/page/list");
        const allPages = listRes.data.data;
        setRawMenu(allPages);

        // 2. Filter yang bukan Sector
        const targetPages = allPages.filter(p => !p.name.toLowerCase().includes("sector"));

        // 3. Fetch detail tiap halaman secara paralel
        const detailPromises = targetPages.map(page => 
          api.get(`/api/v1/page/${page.name.toLowerCase()}`)
        );

        const responses = await Promise.all(detailPromises);

        // 4. Flattening data
        const flatData = responses.flatMap((res, pageIdx) => {
          const sections = res.data.data;
          const pageName = targetPages[pageIdx].name;

          return sections.map((section, secIdx) => ({
            ...section,
            // ID unik hanya di section pertama tiap page untuk target scroll
            anchorId: secIdx === 0 ? pageName.toLowerCase().replace(/\s+/g, "-") : undefined
          }));
        });

        setCombinedSections(flatData);
      } catch (err) {
        console.error("Gagal menggabungkan halaman:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEverything();
  }, []);

  return { combinedSections, rawMenu, loading };
};