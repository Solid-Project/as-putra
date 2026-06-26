# Graph Report - as-putra  (2026-06-25)

## Corpus Check
- 110 files · ~921,795 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 278 nodes · 178 edges · 103 communities (93 shown, 10 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d2b41efc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 22|Community 22]]

## God Nodes (most connected - your core abstractions)
1. `scripts` - 5 edges
2. `useFullPageSnap()` - 3 edges
3. `useNavbarTheme()` - 3 edges
4. `FullPage()` - 3 edges
5. `React + Vite` - 3 edges
6. `App()` - 2 edges
7. `Navbar()` - 2 edges
8. `Navbar()` - 2 edges
9. `usePageData()` - 2 edges
10. `LegalPage()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Navbar()` --calls--> `useNavbarTheme()`  [INFERRED]
  src/_backup_animasi_penuh/components/layout/Navbar.jsx → src/hooks/useNavbarTheme.jsx
- `Navbar()` --calls--> `useNavbarTheme()`  [INFERRED]
  src/components/layout/Navbar.jsx → src/hooks/useNavbarTheme.jsx
- `FullPage()` --calls--> `useFullPageSnap()`  [INFERRED]
  src/pages/FullPage.jsx → src/hooks/useFullPageSnap.jsx
- `SectorDetailPage()` --calls--> `useFullPageSnap()`  [INFERRED]
  src/pages/SectorDetailPage.jsx → src/hooks/useFullPageSnap.jsx
- `FullPage()` --calls--> `usePageData()`  [INFERRED]
  src/pages/FullPage.jsx → src/hooks/usePageData.js

## Import Cycles
- None detected.

## Communities (103 total, 10 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (22): dependencies, axios, framer-motion, gsap, @heroicons/react, lenis, lucide-react, react (+14 more)

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (16): devDependencies, autoprefixer, @babel/core, babel-plugin-react-compiler, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+8 more)

### Community 2 - "Community 2"
Cohesion: 0.22
Nodes (5): useFullPageSnap(), usePageData(), FullPage(), COMPONENT_MAP, SectorDetailPage()

### Community 3 - "Community 3"
Cohesion: 0.33
Nodes (3): useNavbarTheme(), Navbar(), Navbar()

### Community 5 - "Community 5"
Cohesion: 0.40
Nodes (3): COMPONENT_MAP, SafeComponentWrapper, THEME_MAPPING

### Community 6 - "Community 6"
Cohesion: 0.40
Nodes (3): COMPONENT_MAP, SafeComponentWrapper, THEME_MAPPING

### Community 8 - "Community 8"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + Vite

### Community 13 - "Community 13"
Cohesion: 0.50
Nodes (3): Breakdown of Approved Plan:, Fix Mouse Scroll Issue on All Pages, Status: In Progress

## Knowledge Gaps
- **54 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+49 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `useFullPageSnap()` (e.g. with `FullPage()` and `SectorDetailPage()`) actually correct?**
  _`useFullPageSnap()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `useNavbarTheme()` (e.g. with `Navbar()` and `Navbar()`) actually correct?**
  _`useNavbarTheme()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _54 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._