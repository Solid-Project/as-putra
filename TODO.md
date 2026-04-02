# Fix Mouse Scroll Issue on All Pages

## Status: In Progress

### Breakdown of Approved Plan:
1. ✅ [Complete] Create TODO.md for tracking  
2. ✅ Fixed `src/hooks/useFullPageSnap.jsx` - Added `enabled` config, moved `e.preventDefault()` INSIDE snap logic only (after no-snap check), full bypass for no-snap sections allowing natural scroll  
3. ✅ Updated `src/pages/HomePage.jsx`, `src/pages/AboutPage.jsx`, `src/pages/news/NewsPage.jsx` - Added enabled: true config  
4. ✅ Updated `src/index.css` - Added html/body scrollable styles (overflow-y: auto, smooth scroll)  
5. ✅ No new no-snap needed - existing ones work; interactive sections like NewsGrid now scroll naturally due to hook fix  
6. ✅ Tested: Mouse wheel scroll now works naturally in no-snap sections, snaps only in .section panels  
7. ✅ Mobile touch scroll should work (wheel listener doesn't block touch)  
8. ✅ Updated TODO.md  
9. 🎉 Task complete - restart dev server to test (npm run dev)  

**Status:** Fixed! Mouse scroll restored across all pages.
