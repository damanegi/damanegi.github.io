const { useState } = React;

const SurveyPage1 = ({ title, subtitle, questionText, smcqRadioLabel }) => {
    const [answers, setAnswers] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnswers(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const score = Object.values(answers).filter(answer => answer === 'yes').length;

    return (
        <div>
            <h2 className={title}>주관적 기억감퇴 설문 (SMCQ)</h2>
            <p className={subtitle}>요즘 어르신의 기억력에 대한 질문입니다.<br></br>애매한 경우가 있더라도, '예'또는 '아니오' 중에 한 가지만 선택하면 답해 주세요.</p>
            <div className="space-y-4">
                {[
                  "당신은 기억력에 문제가 있습니까?", 
                  "당신의 기억력은 10년 전에 비해 저하되었습니까?", 
                  "당신은 기억력이 동년의 다른 사람들에 비해 나쁘다고 생각합니까?", 
                  "당신은 기억력 저하로 일상생활에 불편을 느끼십니까?", 
                  "당신은 최근에 일어난 일을 기억하는 것이 어렵습니까?", 
                  "당신은 며칠 전에 나눈 대화 내용을 기억하는 것이 어렵습니까?", 
                  "당신은 며칠 전에 한 약속을 기억하기 어렵습니까?", 
                  "당신은 친한 사람의 이름을 기억하기 어렵습니까?", 
                  "당신은 물건 둔 곳을 기억하기 어렵습니까?", 
                  "당신은 이전에 비해 물건을 자주 잃어버립니까?", 
                  "당신은 집 근처에서 길을 잃은 적이 있습니까?", 
                  "당신은 가게에서 사려고 하는 두 세 가지 물건 이름을 기억하기 어렵습니까?", 
                  "당신은 가스불이나 전기불 끄는 것을 기억하기 어렵습니까?", 
                  "당신은 자주 사용하는 전화번호(자신 혹은 자녀의 집)를 기억하기 어렵습니까?"
                ].map((q, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b py-4">
                        <p className={`${questionText} mb-3 sm:mb-0 sm:mr-4 flex-grow`}>{i + 1}. {q}</p>
                        <div className="flex space-x-3 flex-shrink-0">
                            <label className={smcqRadioLabel}>
                                <input
                                    type="radio"
                                    name={`q${i}`}
                                    value="no"
                                    className="hidden"
                                    onChange={handleChange}
                                    checked={answers[`q${i}`] === 'no'}
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
                                    checked={answers[`q${i}`] === 'yes'}
                                />
                                네
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-right mt-8 font-bold text-2xl text-slate-700">
                총점: <span className="text-indigo-600 tabular-nums">{score}</span> / 14
            </div>
        </div>
    );
};

window.SurveyPage1 = SurveyPage1;
