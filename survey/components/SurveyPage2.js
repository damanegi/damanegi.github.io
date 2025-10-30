const { useState, useMemo, useRef } = React;

const SurveyPage2 = ({ title, subtitle, radioLabel, textInput }) => {
    const [balanceSelections, setBalanceSelections] = useState({
        balance1: null,
        balance2: null,
        balance3: null
    });
    const [gaitTimes, setGaitTimes] = useState({
        trial1: '',
        trial2: ''
    });
    const gaitSectionRef = useRef(null);
    const gripSectionRef = useRef(null);
    const [chairTime, setChairTime] = useState('');

    const handleBalanceChange = (name, value) => {
        setBalanceSelections(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const balanceTotal = useMemo(
        () =>
            Object.values(balanceSelections).reduce(
                (total, value) => total + (value ? Number(value) : 0),
                0
            ),
        [balanceSelections]
    );

    const handleGaitTimeChange = (trial, value) => {
        const normalized = value.replace(',', '.');
        setGaitTimes(prev => ({
            ...prev,
            [trial]: normalized
        }));
    };

    const toggleGaitUnable = trial => {
        setGaitTimes(prev => ({
            ...prev,
            [trial]: prev[trial] === 'unable' ? '' : 'unable'
        }));
    };

    const calculateGaitScore = value => {
        if (!value) return null;
        if (value === 'unable') return 0;
        const numeric = Number(value);
        if (!Number.isFinite(numeric)) return null;
        if (numeric < 4.82) return 4;
        if (numeric <= 6.2) return 3;
        if (numeric <= 8.7) return 2;
        return 1;
    };

    const handleChairTimeChange = value => {
        const normalized = value.replace(',', '.');
        setChairTime(normalized);
    };

    const toggleChairUnable = () => {
        setChairTime(prev => (prev === 'unable' ? '' : 'unable'));
    };

    const calculateChairScore = value => {
        if (!value) return null;
        if (value === 'unable') return 0;
        const numeric = Number(value);
        if (!Number.isFinite(numeric)) return null;
        if (numeric < 11.19) return 4;
        if (numeric < 13.7) return 3;
        if (numeric < 16.7) return 2;
        if (numeric < 60) return 1;
        return 0;
    };

    const gaitScores = useMemo(
        () => ({
            trial1: calculateGaitScore(gaitTimes.trial1),
            trial2: calculateGaitScore(gaitTimes.trial2)
        }),
        [gaitTimes]
    );

    const gaitAverageTime = useMemo(() => {
        const numericValues = Object.values(gaitTimes)
            .map(value =>
                value && value !== 'unable' ? Number(value) : NaN
            )
            .filter(Number.isFinite);
        if (!numericValues.length) return '';
        const average =
            numericValues.reduce((sum, current) => sum + current, 0) /
            numericValues.length;
        return average.toFixed(2);
    }, [gaitTimes]);

    const gaitAverageScore = useMemo(() => {
        const scores = Object.values(gaitScores).filter(
            score => typeof score === 'number'
        );
        if (!scores.length) return '';
        const average =
            scores.reduce((sum, current) => sum + current, 0) /
            scores.length;
        return average.toFixed(1);
    }, [gaitScores]);

    const chairScore = useMemo(() => calculateChairScore(chairTime), [chairTime]);

    const scrollToGaitSection = () => {
        if (gaitSectionRef.current) {
            gaitSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const scrollToGripSection = () => {
        if (gripSectionRef.current) {
            gripSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div>
          <h2 className={title}>운동기능 평가</h2>
          <p className={subtitle}>
            '1. 평형검사 → 2. 보행검사 → TUG 테스트 → 3. 의자 일어서기 검사 → 악력검사 → 외발서기 검사' 순으로 진행하며, 
            <br></br>
            중단할 경우 Stop을 선택 해 주세요. 
            </p>
          <div className="space-y-8">
            <div>
                <h3 className="text-xl font-semibold mb-4 text-slate-700">1. SPPB 테스트 (Short Physical Performance Battery)</h3>
                <div className="space-y-8">
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-slate-700">1) 평형검사 (Balance Test)</h4>
                    <div className="p-6 border rounded-lg bg-slate-50 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start p-4 rounded-lg bg-white border shadow-sm">
                            <div className="flex items-center gap-3">
                                <img src="images/side_by_side.png" alt="양발자세" className="w-16 h-16 object-contain" />
                                <div>
                                    <div className="text-lg font-semibold text-slate-700">양발자세</div>
                                    <div className="text-sm text-slate-500">(side by side stance)</div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className={radioLabel}>
                                    <input
                                        type="radio"
                                        name="balance1"
                                        value="1"
                                        className="hidden"
                                        onChange={e => handleBalanceChange('balance1', e.target.value)}
                                        checked={balanceSelections.balance1 === '1'}
                                    />
                                    10초 (1점)
                                </label>
                                <label className={radioLabel}>
                                    <input
                                        type="radio"
                                        name="balance1"
                                        value="0"
                                        className="hidden"
                                        onChange={e => handleBalanceChange('balance1', e.target.value)}
                                        checked={balanceSelections.balance1 === '0'}
                                    />
                                    10초 미만 (0점)
                                </label>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <button
                                    type="button"
                                    onClick={scrollToGaitSection}
                                    className={`${radioLabel} w-full text-center bg-red-500 hover:bg-red-600 text-white font-semibold`}
                                >
                                    STOP
                                </button>
                                <span className="text-sm text-slate-500 text-center w-full">2번으로 이동</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start p-4 rounded-lg bg-white border shadow-sm">
                            <div className="flex items-center gap-3">
                                <img src="images/semi_tandem.png" alt="반일렬자세" className="w-16 h-16 object-contain" />
                                <div>
                                    <div className="text-lg font-semibold text-slate-700">반일렬자세</div>
                                    <div className="text-sm text-slate-500">(semi tandem stance)</div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className={radioLabel}>
                                    <input
                                        type="radio"
                                        name="balance2"
                                        value="1"
                                        className="hidden"
                                        onChange={e => handleBalanceChange('balance2', e.target.value)}
                                        checked={balanceSelections.balance2 === '1'}
                                    />
                                    10초 (1점)
                                </label>
                                <label className={radioLabel}>
                                    <input
                                        type="radio"
                                        name="balance2"
                                        value="0"
                                        className="hidden"
                                        onChange={e => handleBalanceChange('balance2', e.target.value)}
                                        checked={balanceSelections.balance2 === '0'}
                                    />
                                    10초 미만 (0점)
                                </label>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <button
                                    type="button"
                                    onClick={scrollToGaitSection}
                                    className={`${radioLabel} w-full text-center bg-red-500 hover:bg-red-600 text-white font-semibold`}
                                >
                                    STOP
                                </button>
                                <span className="text-sm text-slate-500 text-center w-full">2번으로 이동</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start p-4 rounded-lg bg-white border shadow-sm">
                            <div className="flex items-center gap-3">
                                <img src="images/tandem.png" alt="일렬자세" className="w-16 h-16 object-contain" />
                                <div>
                                    <div className="text-lg font-semibold text-slate-700">일렬자세</div>
                                    <div className="text-sm text-slate-500">(tandem stance)</div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className={radioLabel}>
                                    <input
                                        type="radio"
                                        name="balance3"
                                        value="2"
                                        className="hidden"
                                        onChange={e => handleBalanceChange('balance3', e.target.value)}
                                        checked={balanceSelections.balance3 === '2'}
                                    />
                                    10초 (2점)
                                </label>
                                <label className={radioLabel}>
                                    <input
                                        type="radio"
                                        name="balance3"
                                        value="1"
                                        className="hidden"
                                        onChange={e => handleBalanceChange('balance3', e.target.value)}
                                        checked={balanceSelections.balance3 === '1'}
                                    />
                                    3~9초 (1점)
                                </label>
                                <label className={radioLabel}>
                                    <input
                                        type="radio"
                                        name="balance3"
                                        value="0"
                                        className="hidden"
                                        onChange={e => handleBalanceChange('balance3', e.target.value)}
                                        checked={balanceSelections.balance3 === '0'}
                                    />
                                    3초 미만 (0점)
                                </label>
                            </div>
                            <div></div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-4 border-t border-slate-200">
                            <span className="text-base font-semibold text-slate-700">1) 평형검사 (Balance Test) 점수</span>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-indigo-600">{balanceTotal}</span>
                                <span className="text-base font-semibold text-slate-700">/ 4점</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={gaitSectionRef}>
                    <h4 className="text-lg font-semibold mb-4 text-slate-700">2) 보행검사 (Gait Speed Test)</h4>
                    <div className="p-6 border rounded-lg bg-slate-50 space-y-6">
                        <p>평소 보행속도로 4m를 걷습니다 (2회 측정하여 평균값 사용).</p>
                        <div>
                            <img src="images/gait_speed.png" alt="Gait Speed Test" className="w-full h-auto object-contain rounded-lg" />
                        </div>
                        <p className="text-sm text-slate-600">
                            4.82초 미만 (4점), 4.82~6.20초 (3점), 6.21~8.70초 (2점), 8.70초 이상 (1점), 수행불능 (0점)
                        </p>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                <div className="font-semibold text-slate-700">1회</div>
                                <div className="flex items-center gap-2 w-full">
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="시간"
                                        className={`${textInput} flex-1 ${gaitTimes.trial1 === 'unable' ? 'bg-slate-100 cursor-not-allowed text-slate-500' : ''}`}
                                        value={gaitTimes.trial1 === 'unable' ? '' : gaitTimes.trial1}
                                        onChange={e => handleGaitTimeChange('trial1', e.target.value)}
                                        disabled={gaitTimes.trial1 === 'unable'}
                                    />
                                    <span className="text-sm text-slate-500">초</span>
                                </div>
                                <input
                                    type="text"
                                    readOnly
                                    placeholder="점수"
                                    className={`${textInput} font-semibold text-center`}
                                    value={
                                        gaitScores.trial1 === null
                                            ? ''
                                            : `${gaitScores.trial1}점`
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleGaitUnable('trial1')}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        gaitTimes.trial1 === 'unable'
                                            ? 'bg-red-50 border border-red-400 text-red-600'
                                            : 'border border-slate-300 text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    수행불능 (0점)
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                <div className="font-semibold text-slate-700">2회</div>
                                <div className="flex items-center gap-2 w-full">
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="시간"
                                        className={`${textInput} flex-1 ${gaitTimes.trial2 === 'unable' ? 'bg-slate-100 cursor-not-allowed text-slate-500' : ''}`}
                                        value={gaitTimes.trial2 === 'unable' ? '' : gaitTimes.trial2}
                                        onChange={e => handleGaitTimeChange('trial2', e.target.value)}
                                        disabled={gaitTimes.trial2 === 'unable'}
                                    />
                                    <span className="text-sm text-slate-500">초</span>
                                </div>
                                <input
                                    type="text"
                                    readOnly
                                    placeholder="점수"
                                    className={`${textInput} font-semibold text-center`}
                                    value={
                                        gaitScores.trial2 === null
                                            ? ''
                                            : `${gaitScores.trial2}점`
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleGaitUnable('trial2')}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        gaitTimes.trial2 === 'unable'
                                            ? 'bg-red-50 border border-red-400 text-red-600'
                                            : 'border border-slate-300 text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    수행불능 (0점)
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                <div className="font-semibold text-slate-700">평균</div>
                                <div className="flex items-center gap-2 w-full">
                                    <input
                                        type="text"
                                        readOnly
                                        placeholder="평균 시간"
                                        className={`${textInput} font-semibold text-center flex-1`}
                                        value={gaitAverageTime}
                                    />
                                    <span className="text-sm text-slate-500">초</span>
                                </div>
                                <input
                                    type="text"
                                    readOnly
                                    placeholder="평균 점수"
                                    className={`${textInput} font-semibold text-center`}
                                    value={
                                        gaitAverageScore
                                            ? `${gaitAverageScore}점`
                                            : ''
                                    }
                                />
                                <div className="text-sm text-slate-500 md:text-right">
                                    자동 계산
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-4 border-t border-slate-200">
                            <span className="text-base font-semibold text-slate-700">2) 보행검사 (Gait Speed Test) 점수</span>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-indigo-600">
                                    {(gaitScores.trial1 ?? 0) + (gaitScores.trial2 ?? 0)}
                                </span>
                                <span className="text-base font-semibold text-slate-700">/ 4점</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-slate-700">3) 의자 일어서기 검사 (Chair Stand Test)</h4>
                    <div className="p-6 border rounded-lg bg-slate-50 space-y-4">
                        <div className="p-4 rounded-lg bg-white border shadow-sm flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold text-slate-700">Pre-test (1회)</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-500">수행불능</span>
                                    <button
                                        type="button"
                                        onClick={scrollToGripSection}
                                        className={`${radioLabel} px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold`}
                                    >
                                        STOP
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-white border shadow-sm space-y-4">
                            <div>
                                <p className="font-semibold text-slate-700 leading-relaxed">
                                    5회 의자 일어서기 반복<br />
                                    <span className="text-sm font-normal text-slate-600">
                                        (손을 가슴에 팔짱 낀 채로 가능한 빨리 의자 일어서기 반복)
                                    </span>
                                </p>
                                <p className="mt-2 text-sm text-slate-600">
                                    11.19초 미만 (4점), 11.20~13.69초 (3점), 13.70~16.69초 (2점), 16.70초 이상 (1점), 60초 이상 또는 수행불능 (0점)
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm font-semibold text-slate-700">시간(초)</span>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="시간"
                                            className={`${textInput} flex-1 ${chairTime === 'unable' ? 'bg-slate-100 cursor-not-allowed text-slate-500' : ''}`}
                                            value={chairTime === 'unable' ? '' : chairTime}
                                            onChange={e => handleChairTimeChange(e.target.value)}
                                            disabled={chairTime === 'unable'}
                                        />
                                        <span className="text-sm text-slate-500">초</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm font-semibold text-slate-700">점수</span>
                                    <input
                                        type="text"
                                        readOnly
                                        placeholder="점수"
                                        className={`${textInput} font-semibold text-center`}
                                        value={
                                            chairScore === null ? '' : `${chairScore}점`
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-4 border-t border-slate-200">
                            <span className="text-base font-semibold text-slate-700">3. 의자 일어서기 검사 (Chair Stand Test) :</span>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-indigo-600">
                                    {chairScore ?? 0}
                                </span>
                                <span className="text-base font-semibold text-slate-700">/ 4점</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div ref={gripSectionRef}>
            <h3 className="text-xl font-semibold mb-4 text-slate-700">2. 악력 검사</h3>
            <div className="p-6 border rounded-lg bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <h4 className="font-bold text-center mb-2">우측</h4>
                    <input type="text" placeholder="1차 측정값(kg)" className={textInput} />
                    <input type="text" placeholder="2차 측정값(kg)" className={textInput} />
                </div>
                <div className="space-y-2">
                    <h4 className="font-bold text-center mb-2">좌측</h4>
                    <input type="text" placeholder="1차 측정값(kg)" className={textInput} />
                    <input type="text" placeholder="2차 측정값(kg)" className={textInput} />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
  
window.SurveyPage2 = SurveyPage2;
