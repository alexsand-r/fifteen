import { useState, useEffect } from "react";
import Tile from "../tile/tile";

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

// Исходный массив плиток, включая пустую клетку (null)
const initialTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];

function PlayingField({
  increaseStep,
  isRunning,
  setIsRunning,
  addResultToResultArr,
  setId,
}) {
  const [plates, setPlates] = useState(initialTiles);
  const [isGameWon, setIsGameWon] = useState(false); // Состояние для отслеживания победы
  //функция запускает таймер
  const startTimer = () => {
    setIsRunning(true); // Запускаем таймер
  };
  //функция запускает таймер
  const stopTimer = () => {
    setIsRunning(false); // Запускаем таймер
    setId((prevId) => prevId + 1); // Увеличиваем ID при остановке таймера
  };
  useEffect(() => {
    if (isGameWon) {
      stopTimer();
      addResultToResultArr();
    }
  }, [isGameWon]);

  // При загрузке игры перемешиваем плитки
  useEffect(() => {
    const newPlates = shuffleSolvableArray(initialTiles);
    setPlates(newPlates);
  }, []);

  // Проверка на победу
  const checkWin = (tiles) => {
    const winningOrder = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      null,
    ];
    return tiles.every((tile, index) => tile === winningOrder[index]);
  };

  // Обработчик клика по плитке
  const handleTileClick = (index) => {
    if (isGameWon) return; // Если игра выиграна, не выполняем дальнейшие действия

    const nullIndex = plates.indexOf(null);

    // Координаты выбранной плитки и пустой клетки
    const row = Math.floor(index / 4);
    const col = index % 4;
    const nullRow = Math.floor(nullIndex / 4);
    const nullCol = nullIndex % 4;

    // Проверяем, рядом ли пустая клетка
    const isAdjacent =
      (Math.abs(row - nullRow) === 1 && col === nullCol) ||
      (Math.abs(col - nullCol) === 1 && row === nullRow);

    if (isAdjacent) {
      // Меняем местами плитку и пустую клетку
      const newPlates = [...plates];
      [newPlates[index], newPlates[nullIndex]] = [
        newPlates[nullIndex],
        newPlates[index],
      ];
      setPlates(newPlates);
      increaseStep();

      // Проверяем, выиграна ли игра
      if (checkWin(newPlates)) {
        console.log("Финиш! Вы выиграли 🎉");
        setIsGameWon(true); // Устанавливаем состояние победы

        return;
      }
    }
  };

  return (
    <section className="px-3">
      <div className="grid grid-cols-4 grid-rows-4 border-4 outline-6 outline-yellow-400 border-orange-800 rounded-lg bg-orange-800 w-[280px] h-[280px] 375:w-[350px] 375:h-[350px] gap-1">
        {plates.map((el, index) =>
          el !== null ? (
            <Tile
              key={index}
              number={el}
              onClick={() => {
                handleTileClick(index);
                startTimer();
              }}
              isGameWon={isGameWon} // Передаем состояние победы в Tile
            />
          ) : (
            <div key={index} className="bg-transparent"></div>
          )
        )}
      </div>
    </section>
  );
}

export default PlayingField;
