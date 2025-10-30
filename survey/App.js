const { useState, useMemo } = React;
const SidebarComponent = window.Sidebar || (() => null);

const TOTAL_PAGES = 4;

const ProgressBar = ({ page }) => {
  const progress = useMemo(() => {
    if (TOTAL_PAGES <= 1) {
      return 100;
    }
    return ((page - 1) / (TOTAL_PAGES - 1)) * 100;
  }, [page]);
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-0 overflow-hidden">
      <div
        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

const App = () => {
  const [page, setPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const goToPage = target => {
    if (target >= 1 && target <= TOTAL_PAGES) {
      setPage(target);
      setIsSidebarOpen(false);
    }
  };
  const nextPage = () => setPage(p => (p < TOTAL_PAGES ? p + 1 : p));
  const previousPage = () => setPage(p => (p > 1 ? p - 1 : p));
  const breadcrumbs = useMemo(
    () => Array.from({ length: TOTAL_PAGES }, (_, idx) => idx + 1),
    []
  );
  const isFirstPage = page === 1;
  const isLastPage = page === TOTAL_PAGES;

  // Shared styles across survey pages
  const container = "min-h-screen bg-slate-100 flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8";
  const outerWrapper = "relative w-full max-w-5xl";
  const title = "text-3xl font-bold mb-2 text-center text-slate-800";
  const subtitle = "text-gray-500 mb-8 text-center";
  const questionText = "text-lg font-medium text-gray-800";
  const button = "bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg inline-flex items-center justify-center";
  const radioLabel = "p-4 border rounded-lg cursor-pointer hover:bg-gray-50 hover:border-indigo-400 transition-colors has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 has-[:checked]:text-indigo-900 has-[:checked]:font-semibold";
  const smcqRadioLabel = "flex items-center justify-center p-3 w-24 border rounded-lg cursor-pointer hover:bg-gray-50 hover:border-indigo-400 transition-colors has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 has-[:checked]:text-indigo-900 has-[:checked]:font-semibold text-center";
  const textInput = "w-full border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors";
  const layout = "bg-white shadow-2xl rounded-xl w-full flex flex-col lg:flex-row overflow-hidden";
  const sidebarNavId = "survey-navigation";
  const mainContentWrapper = "flex-1 flex flex-col";
  const mainContentInner = "flex-1 p-6 sm:p-8 lg:p-10";
  const toggleLabel = isSidebarOpen ? "메뉴 닫기" : "메뉴 열기";
  const toggleButton =
    "inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

  const renderCurrentPage = () => {
    switch (page) {
      case 1:
        return (
          <SurveyPage1
            title={title}
            subtitle={subtitle}
            questionText={questionText}
            smcqRadioLabel={smcqRadioLabel}
          />
        );
      case 2:
        return (
          <SurveyPage2
            title={title}
            subtitle={subtitle}
            radioLabel={radioLabel}
            textInput={textInput}
          />
        );
      case 3:
        return (
          <SurveyPage3
            title={title}
            subtitle={subtitle}
            questionText={questionText}
            smcqRadioLabel={smcqRadioLabel}
          />
        );
      case 4:
        return (
          <SurveyPage4
            title={title}
            subtitle={subtitle}
            questionText={questionText}
            radioLabel={radioLabel}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={container}>
      <div className={outerWrapper}>
        <div className={layout}>
          <SidebarComponent
            isOpen={isSidebarOpen}
            pages={breadcrumbs}
            activePage={page}
            onNavigate={goToPage}
            navId={sidebarNavId}
          />
          <div className={mainContentWrapper}>
            <div className="p-6 sm:p-8 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className={toggleButton}
                  aria-expanded={isSidebarOpen}
                  aria-controls={sidebarNavId}
                  onClick={() => setIsSidebarOpen(open => !open)}
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>{toggleLabel}</span>
                </button>
                <div className="flex-1">
                  <ProgressBar page={page} />
                </div>
              </div>
            </div>
            <div className={mainContentInner}>
              {renderCurrentPage()}
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                <div>
                  {!isFirstPage && (
                    <button type="button" onClick={previousPage} className={button}>
                      이전 설문으로 이동
                    </button>
                  )}
                </div>
                <div className="sm:ml-auto">
                  {!isLastPage && (
                    <button type="button" onClick={nextPage} className={button}>
                      다음 설문으로 이동
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
