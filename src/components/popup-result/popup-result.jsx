import { useEffect } from "react";

export const PopupResult = ({
  resultArr,
  shuffleTile,
  resetStep,
  resetTimer,
  closePopupResult,
}) => {
  useEffect(() => {
    // Когда результат обновится, можно будет открыть попап или сделать другие действия
    if (resultArr.length > 0) {
      console.log("Результаты обновились:", resultArr);
    }
  }, [resultArr]); // Этот useEffect будет срабатывать при изменении resultArr

  return (
    <>
      <section className="bg-[var(--color-custom-gray)] flex justify-center items-start fixed w-[100%] min-h-[100vh] top-0 left-0 overflow-auto z-10 text-black">
        <div className="mx-auto px-[15px] md:h-auto">
          <h1 className="text-2xl font-bold text-amber-300 mb-4 px-4 text-center mt-10">
            Your Results
          </h1>
          <ul className="text-white text-lg flex flex-col gap-2 leading-none mb-10">
            {resultArr.length === 0 ? (
              <li>Нет результатов</li> // Отображаем сообщение, если массив пуст
            ) : (
              resultArr.map((el) => (
                <li key={el.id} className="flex">
                  <span className="mr-2">{el.id}.</span>
                  <span className="mr-10">
                    Time - {el.hour} h: {el.min} min: {el.sec} sec: {el.ms} ms
                  </span>
                  <span>Steps: {el.countStep}</span>
                </li>
              ))
            )}
          </ul>
          <div className="flex justify-center">
            <button
              onClick={() => {
                shuffleTile();
                resetStep();
                resetTimer();
                closePopupResult();
              }}
              type="button"
              className="bg-amber-100 hover:bg-amber-200 border-3 border-amber-500 text-lg rounded-lg text-black mb-6 py-1 px-5 cursor-pointer transition-bg duration-300"
            >
              Ok
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
