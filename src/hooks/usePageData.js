// src/hooks/usePageData.js
import { useState, useEffect } from "react";
import api from "@/lib/api";

export const usePageData = (slug) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/v1/page/${slug}`);
        setData(response.data);
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { data, loading };
};