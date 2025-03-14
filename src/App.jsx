import { useState, useEffect } from "react";
import PlayingField from "./components/playing-field/playing-field";

import Step from "./components/step/step";
import Timer from "./components/timer/timer";

const resultArr = [];
console.log("массив результатов сначала-", resultArr);

function App() {
  const [countStep, setCountStep] = useState(0); // состояние для счетчика шагов
  const [ms, setMs] = useState(0); // миллисекунды
  const [sec, setSec] = useState(0); // состояние для сек
  const [min, setMin] = useState(0); //состояние минуты
  const [hour, setHour] = useState(0); //состояние часы
  const [id, setId] = useState(0); // состояние для ключа
  const [isRunning, setIsRunning] = useState(false); // Флаг для запуска таймера
  // объект таймера
  const [result, setResult] = useState({
    ms: 0,
    sec: 0,
    min: 0,
    hour: 0,
    countStep: 0,
    id: 0,
  });

  useEffect(() => {
    console.log("Timer start-", result);
  }, []);

  // useEffect для запуска таймера
  useEffect(() => {
    if (!isRunning) return; // Если таймер не запущен, ничего не делаем

    const interval = setInterval(() => {
      setMs((prevMs) => prevMs + 1);
    }, 10);

    return () => clearInterval(interval);
  }, [isRunning]); // Следим за `isRunning`

  // перевод мили секунд в минуты
  useEffect(() => {
    if (ms === 99) {
      setMs(0);
      setSec((sec) => sec + 1);
    }
  }, [ms]);

  // useEffect для перевода секунд в минуты
  useEffect(() => {
    if (sec === 60) {
      setSec(0);
      setMin((prevMin) => prevMin + 1);
    }
  }, [sec]);

  // useEffect для перевода минут в часы
  useEffect(() => {
    if (min === 60) {
      setMin(0);
      setHour((prevHour) => prevHour + 1);
      if (hour === 24) {
        setHour = 0;
      }
    }
  }, [min]);

  // функция счетчик
  const increaseStep = () => {
    setCountStep(countStep + 1);
    //console.log("step -", count);
  };

  // получаю значения  финиша счетчика
  useEffect(() => {
    setResult({ ms, sec, min, hour, id, countStep });
  }, [ms, sec, min, hour, id, countStep]);

  useEffect(() => {
    console.log("Timer finish-", result);
  }, [result]);

  // Следит за изменением result и добавляет его в массив
  useEffect(() => {
    if (result.id !== 0) {
      // Добавляем только когда id уже изменился
      resultArr.push(result);
      console.log("Обновленный массив результатов:", resultArr);
    }
  }, [result]); // Срабатывает при изменении result

  const addResultToResultArr = () => {
    setResult((prevResult) => {
      const newResult = { ...prevResult, id: prevResult.id + 1 }; // Увеличиваем ID
      return newResult;
    });
  };
  console.log("массив результатов после игры-", resultArr);

  return (
    <>
      <h1 className="text-2xl font-bold text-amber-300 mb-4 px-4 text-center">
        Sliding Puzzle
      </h1>
      <div className="flex items-center justify-between gap-3 px-3">
        <Timer ms={ms} sec={sec} min={min} hour={hour} />
        <Step countStep={countStep} />
      </div>

      <PlayingField
        increaseStep={increaseStep}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        addResultToResultArr={addResultToResultArr}
        setId={setId}
      />
    </>
  );
}

export default App;
