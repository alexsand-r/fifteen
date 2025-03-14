function Step({ countStep }) {
  return (
    <>
      <section className="flex gap-6 mb-4 items-end">
        <p className="text-xl font-bold">Step:</p>
        <p className="text-2xl font-bold">{countStep}</p>
      </section>
    </>
  );
}
export default Step;
