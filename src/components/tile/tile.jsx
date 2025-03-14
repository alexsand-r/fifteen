function Tile({ number, onClick, isGameWon }) {
  return (
    <div
      className="w-full h-full bg-yellow-400 rounded-lg flex items-center justify-center cursor-pointer hover:bg-yellow-500"
      onClick={onClick} // Добавляем обработчик клика
    >
      <div
        className={`text-4xl 375:text-5xl flex items-center justify-center leading-none bg-amber-500 h-[80%] w-[80%] rounded-full border border-amber-700 ${
          isGameWon ? "text-green-500" : "text-white"
        } select-none`}
      >
        {number}
      </div>
    </div>
  );
}

export default Tile;
