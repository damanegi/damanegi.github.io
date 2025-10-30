const { useState } = React;

const SurveyPage4 = ({ title, subtitle, questionText, radioLabel }) => {
  const optionClass = `${radioLabel} flex items-center justify-center text-center`;

  const questions = [
    { text: "나는 일상의 문제에 대해 얘기를 나눌 수 있는 사람이 항상 있다.", reverse: true },
    { text: "나는 친한 친구가 그립다.", reverse: false },
    { text: "나는 전반적으로 공허함을 느낀다.", reverse: false },
    { text: "내가 힘들 때 기댈 수 있는 사람들이 많다.", reverse: true },
    { text: "나는 사람들과 함께 할 때의 즐거움이 그립다.", reverse: false },
    { text: "나는 내 친구와 지인들의 범위가 너무 제한적이라고 생각한다.", reverse: false },
    { text: "내가 전적으로 믿을 수 있는 사람들이 많다.", reverse: true },
    { text: "내가 가깝다고 느끼는 사람들이 충분히 있다.", reverse: true },
    { text: "내 주위에 사람들이 있던 것이 그립다.", reverse: false },
    { text: "나는 종종 사람들로부터 거절당했다고 느낀다.", reverse: false },
    { text: "나는 필요할 때마다 친구들에게 의지할 수 있다.", reverse: true }
  ];

  const options = [
    { label: "전혀 그렇지 않다", baseScore: 1 },
    { label: "그렇지 않다", baseScore: 2 },
    { label: "보통이다", baseScore: 3 },
    { label: "그렇다", baseScore: 4 },
    { label: "매우 그렇다", baseScore: 5 }
  ];

  const [answers, setAnswers] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAnswers((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const score = Object.values(answers).reduce(
    (total, value) => total + Number(value || 0),
    0
  );

  return (
    <div>
      <h2 className={title}>외로움 척도 (K-DJGLS)</h2>
      <p className={subtitle}>
        다음 문항은 평소에 귀하께서 느끼고 있는 자신의 상태를 알아보기 위한 것입니다.
        <br></br>
        다음 각 문항들에 대해 최근 자신의 상황과 느낌을 잘 나타내는 정도에 표시하여 주십시오.
      </p>
      <div className="space-y-6">
        {questions.map((question, i) => (
          <div key={i}>
            <p className={`${questionText} mb-3`}>
              {i + 1}. {question.text}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pl-4 sm:pl-6">
              {options.map((option) => {
                const scoreValue = question.reverse
                  ? 6 - option.baseScore
                  : option.baseScore;

                return (
                  <label key={option.label} className={optionClass}>
                    <input
                      type="radio"
                      name={`q${i}`}
                      value={String(scoreValue)}
                      className="hidden"
                      onChange={handleChange}
                      checked={answers[`q${i}`] === String(scoreValue)}
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="text-right mt-8 font-bold text-2xl text-slate-700">
        총점: <span className="text-indigo-600 tabular-nums">{score}</span> / 55
      </div>
    </div>
  );
};

window.SurveyPage4 = SurveyPage4;
