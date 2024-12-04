export default function Loading() {
  return (
    <>
      <section className="w-full h-screen gap-8 flex flex-col items-center justify-center">
        <div className="w-32 animate-spin h-32 mx-auto rounded-full border-t-2 border-r-2 border-indigo-500"></div>
        <p className="text-2xl p-8 font-bold bg-gradient-to-r from-indigo-500 to-slate-200 bg-clip-text text-transparent">
          Loading.....
        </p>
      </section>
    </>
  );
}
