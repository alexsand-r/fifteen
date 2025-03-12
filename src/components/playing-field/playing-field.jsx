import { useState, useEffect } from "react";
import Tile from "../tile/tile";

// Функция перемешивания массива Фишера-Йетса (Fisher-Yates)
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Исходный массив плиток, включая пустую клетку (null)
const initialTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];

function PlayingField() {
  const [plates, setPlates] = useState([]);

  // При загрузке игры перемешиваем плитки
  useEffect(() => {
    setPlates(shuffleArray(initialTiles));
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

      // Проверяем, выиграна ли игра
      if (checkWin(newPlates)) {
        console.log("Финиш! Вы выиграли 🎉");
        alert("Финиш! Вы выиграли 🎉"); // Можно заменить на что-то другое
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
              onClick={() => handleTileClick(index)}
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
