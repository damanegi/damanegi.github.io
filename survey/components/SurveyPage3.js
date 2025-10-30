const { useState } = React;

const SurveyPage3 = ({ title, subtitle, questionText, smcqRadioLabel }) => {
  const questions = [
    { text: "당신의 삶에 대체로 만족하십니까?", scoringAnswer: "no" },
    { text: "활동이나 관심거리가 많이 줄었습니까?", scoringAnswer: "yes" },
    { text: "삶이 공허하다고 느끼십니까?", scoringAnswer: "yes" },
    { text: "지루하거나 따분할 때가 많습니까?", scoringAnswer: "yes" },
    { text: "앞날이 희망적이라고 생각하십니까?", scoringAnswer: "no" },
    { text: "떨쳐버릴 수 없는 생각들 때문에 괴롭습니까?", scoringAnswer: "yes" },
    { text: "대체로 활기차게 사시는 편입니까?", scoringAnswer: "no" },
    { text: "당신에게 좋지 않은 일이 생길 것 같아 걱정스럽습니까?", scoringAnswer: "yes" },
    { text: "대체로 행복하다고 느끼십니까?", scoringAnswer: "no" },
    { text: "아무 것도 할 수 없을 것 같은 무력감이 자주 듭니까?", scoringAnswer: "yes" },
    { text: "불안해지거나 안절부절 못할 때가 자주 있습니까?", scoringAnswer: "yes" },
    { text: "외출하는 것보다 그냥 집안에 있는 것이 더 좋습니까?", scoringAnswer: "yes" },
    { text: "앞날에 대한 걱정을 자주 하십니까?", scoringAnswer: "yes" },
    { text: "다른 사람들보다 기억력에 문제가 더 많다고 느끼십니까?", scoringAnswer: "yes" },
    { text: "살아있다는 사실이 기쁘십니까?", scoringAnswer: "no" },
    { text: "기분이 가라앉거나 울적할 때가 자주 있습니까?", scoringAnswer: "yes" },
    { text: "요즘 자신이 아무 쓸모없는 사람처럼 느끼십니까?", scoringAnswer: "yes" },
    { text: "지난 일에 대해 걱정을 많이 하십니까?", scoringAnswer: "yes" },
    { text: "산다는 것이 매우 신나고 즐겁습니까?", scoringAnswer: "no" },
    { text: "새로운 일을 시작하는 것이 어렵습니까?", scoringAnswer: "yes" },
    { text: "생활에 활력이 넘치십니까?", scoringAnswer: "no" },
    { text: "당신의 처지가 절망적이라고 느끼십니까?", scoringAnswer: "yes" },
    { text: "다른 사람들이 대체로 당신보다 낫다고 느끼십니까?", scoringAnswer: "yes" },
    { text: "사소한 일에도 속상할 때가 많습니까?", scoringAnswer: "yes" },
    { text: "울고 싶을 때가 자주 있습니까?", scoringAnswer: "yes" },
    { text: "집중하기가 어렵습니까?", scoringAnswer: "yes" },
    { text: "아침에 기분 좋게 일어나십니까?", scoringAnswer: "no" },
    { text: "사람들과 어울리는 자리를 피하는 편이십니까?", scoringAnswer: "yes" },
    { text: "쉽게 결정하는 편이십니까?", scoringAnswer: "no" },
    { text: "예전처럼 정신이 맑습니까?", scoringAnswer: "no" }
  ];

  const [answers, setAnswers] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAnswers((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[`q${index}`] === question.scoringAnswer ? 1 : 0),
    0
  );

  return (
    <div>
      <h2 className={title}>한국형 노인우울척도 (GDS-KR)</h2>
      <p className={subtitle}>최근 1주일 동안의 기분에 대한 질문입니다.</p>
      <div className="space-y-6">
        {questions.map((question, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b py-4"
          >
            <p className={`${questionText} mb-3 sm:mb-0 sm:mr-4 flex-grow`}>
              {i + 1}. {question.text}
            </p>
            <div className="flex space-x-3 flex-shrink-0">
              <label className={smcqRadioLabel}>
                <input
                  type="radio"
                  name={`q${i}`}
                  value="no"
                  className="hidden"
                  onChange={handleChange}
                  checked={answers[`q${i}`] === "no"}
                />
                아니오
              </label>
              <label className={smcqRadioLabel}>
                <input
                  type="radio"
                  name={`q${i}`}
                  value="yes"
                  className="hidden"
                  onChange={handleChange}
                  checked={answers[`q${i}`] === "yes"}
                />
                네
              </label>
            </div>
          </div>
        ))}
      </div>
      <div className="text-right mt-8 font-bold text-2xl text-slate-700">
        총점: <span className="text-indigo-600 tabular-nums">{score}</span> / 30
      </div>
    </div>
  );
};

window.SurveyPage3 = SurveyPage3;
