import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let pageTitle = "";
    if (path === "/" || path === "/beranda") {
      pageTitle = "Beranda";
    } else if (path.includes("/sector/")) {
      const sectorSlug = path.split("/").pop();
      pageTitle = sectorSlug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
    } else {
      const plainPath = path.split("/")[1];
      pageTitle = plainPath.charAt(0).toUpperCase() + plainPath.slice(1);
    }
    document.title = `${pageTitle} | AS Putra Group`;
    
  }, [location]);

  return null;
};

export default TitleManager;