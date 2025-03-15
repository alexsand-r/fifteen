import { useState, useEffect, useRef } from "react";
import PlayingField from "./components/playing-field/playing-field";

import Step from "./components/step/step";
import Timer from "./components/timer/timer";
import { PopupResult } from "./components/popup-result/popup-result";

// Исходный массив плиток, включая пустую клетку (null)
const initialTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];
// Функция перемешивания массива, гарантированно создающая решаемую головоломку
const shuffleSolvableArray = (array) => {
  let newArr = [...array];

  // Делаем несколько случайных движений, чтобы сохранить решаемость
  for (let i = 0; i < 1000; i++) {
    const nullIndex = newArr.indexOf(null);
    const possibleMoves = [];

    // Вычисляем возможные ходы
    if (nullIndex % 4 !== 0) possibleMoves.push(nullIndex - 1); // Влево
    if (nullIndex % 4 !== 3) possibleMoves.push(nullIndex + 1); // Вправо
    if (nullIndex >= 4) possibleMoves.push(nullIndex - 4); // Вверх
    if (nullIndex < 12) possibleMoves.push(nullIndex + 4); // Вниз

    // Выбираем случайный ход и двигаем пустую клетку
    const moveIndex =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    [newArr[nullIndex], newArr[moveIndex]] = [
      newArr[moveIndex],
      newArr[nullIndex],
    ];
  }

  return newArr;
};

// массив для результатов игры
const resultArr = [];
console.log("массив результатов сначала-", resultArr);

function App() {
  const [plates, setPlates] = useState(initialTiles); //состояние для исходного массива
  const [countStep, setCountStep] = useState(0); // состояние для счетчика шагов
  const [ms, setMs] = useState(0); // миллисекунды
  const [sec, setSec] = useState(0); // состояние для сек
  const [min, setMin] = useState(0); //состояние минуты
  const [hour, setHour] = useState(0); //состояние часы
  const [id, setId] = useState(0); // состояние для ключа
  const [isRunning, setIsRunning] = useState(false); // Флаг для запуска таймера
  const [visiblePopup, setVisiblePopup] = useState(false); //попап с результатом
  const [isGameWon, setIsGameWon] = useState(false); // Состояние для отслеживания победы

  //открываю попап с результатом
  const openPopupResult = () => {
    setVisiblePopup(true);
  };

  //закрываю попап с результатом
  const closePopupResult = () => {
    setVisiblePopup(false);
  };

  // Останавливаем прокручивание страницы при открытии попапа
  useEffect(() => {
    if (visiblePopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; // Восстанавливаем прокручивание, когда попап скрыт
    }

    return () => {
      document.body.style.overflow = "auto"; // В случае, если компонент будет удалён
    };
  }, [visiblePopup]);

  // объект таймера
  const [result, setResult] = useState({
    ms: 0,
    sec: 0,
    min: 0,
    hour: 0,
    countStep: 0,
    id: 0,
  });

  // При загрузке игры перемешиваем плитки
  useEffect(() => {
    const newPlates = shuffleSolvableArray(initialTiles);
    setPlates(newPlates);
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

  // функция которая перемешивает плитки при клике на кнопку
  const shuffleTile = () => {
    const newPlates = shuffleSolvableArray(initialTiles);
    setPlates(newPlates);
    setIsGameWon(false); // Сбрасываем флаг победы
  };

  // функция счетчик
  const increaseStep = () => {
    setCountStep(countStep + 1);
    //console.log("step -", count);
  };

  const lastId = useRef(null);

  useEffect(() => {
    if (id !== 0 && lastId.current !== id) {
      const newResult = { ms, sec, min, hour, id, countStep };

      setResult(newResult); // Обновляем result
      resultArr.push(newResult); // Добавляем в массив только уникальные id
      lastId.current = id; // Запоминаем последний добавленный id

      console.log("Обновленный массив результатов:", resultArr);
    }
  }, [ms, sec, min, hour, id, countStep]); // Следим за изменениями

  const addResultToResultArr = () => {
    setResult((prevResult) => {
      const newResult = { ...prevResult, id: prevResult.id + 1 }; // Увеличиваем ID
      return newResult;
    });
  };

  // сбрасываю таймер
  const resetTimer = () => {
    setMs(0);
    setSec(0);
    setMin(0);
    setHour(0);

    setResult((prevResult) => ({
      ...prevResult,
      ms: 0,
      sec: 0,
      min: 0,
      hour: 0,
      countStep: 0,
    }));

    setIsRunning(false); // Останавливаем таймер
  };

  // сбросить шаги
  const resetStep = () => {
    setCountStep(0);
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
        plates={plates}
        setPlates={setPlates}
        openPopupResult={openPopupResult}
        isGameWon={isGameWon}
        setIsGameWon={setIsGameWon}
      />
      {visiblePopup && (
        <PopupResult
          resultArr={resultArr}
          shuffleTile={shuffleTile}
          resetStep={resetStep}
          resetTimer={resetTimer}
          closePopupResult={closePopupResult}
        />
      )}
    </>
  );
}

export default App;
