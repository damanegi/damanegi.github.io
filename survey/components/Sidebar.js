const pageLabels = {
  1: "주관적 기억감퇴 설문 (SMCQ)",
  2: "운동기능 평가",
  3: "한국형 노인우울척도 (GDS-KR)",
  4: "외로움 척도 (K-DJGLS)"
};

const Sidebar = ({ isOpen, pages = [], activePage, onNavigate, navId = "sidebar-navigation" }) => {
  const base = "w-full lg:w-64 bg-slate-50 border-b border-slate-200 lg:border-b-0 lg:border-r";
  const navClasses = "flex flex-col gap-2";
  const itemBase =
    "w-full flex items-center justify-start px-4 py-3 h-20 rounded-lg border transition-all text-sm sm:text-base leading-snug text-left";
  const itemActive = "bg-indigo-600 border-indigo-600 text-white shadow-md";
  const itemInactive = "bg-white border-indigo-100 text-indigo-600 hover:bg-indigo-50";
  const visibility = isOpen ? "block" : "hidden";

  const handleNavigate = page => {
    if (typeof onNavigate === "function") {
      onNavigate(page);
    }
  };

  return (
    <aside
      className={`${base} ${visibility}`}
      aria-hidden={!isOpen}
    >
      <div className="p-4 sm:p-6">
        <div className="text-lg font-semibold text-slate-700 mb-4">설문 단계</div>
        <nav id={navId} className={navClasses} aria-label="Survey navigation">
          {pages.map(pageNumber =>
            pageNumber === activePage ? (
              <span
                key={pageNumber}
                className={`${itemBase} ${itemActive}`}
                aria-current="page"
              >
                {pageLabels[pageNumber] || `설문지${pageNumber}`}
              </span>
            ) : (
              <button
                key={pageNumber}
                type="button"
                onClick={() => handleNavigate(pageNumber)}
                className={`${itemBase} ${itemInactive}`}
              >
                {pageLabels[pageNumber] || `설문지${pageNumber}`}
              </button>
            )
          )}
        </nav>
      </div>
    </aside>
  );
};

window.Sidebar = Sidebar;
