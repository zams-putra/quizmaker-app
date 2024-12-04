import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

// eslint-disable-next-line react/prop-types
export default function Answer({ setIsLoading, isLoading }) {
  const { id } = useParams();

  const [quiz, setData] = useState([]);

  useEffect(() => {
    try {
      const getQuiz = async () => {
        setIsLoading(true);
        const result = await axios.get(
          `https://quizmaker-app-api.vercel.app/api/answer/${id}`
        );
        setData(result.data.quiz?.quizes || []); // langsung ambil aja dah data arr nya
        setIsLoading(false);
      };
      getQuiz();
    } catch (err) {
      console.log(err);
    }
  }, [id, setIsLoading]);

  const [done, setDone] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [answerVal, setAnswerVal] = useState([]);
  const [showResult, setShowResult] = useState({
    score: 0,
    correct: 0,
    wrong: 0,
  });
  const [justShow, setJustShow] = useState(false);

  const answeredHandler = (val, index) => {
    if (!answered.includes(index)) {
      setAnswered([...answered, index]);
      setDone(done + 1);
      const isCorrect =
        val === quiz[index].correct ? "Correct Answer" : "Wrong Answer";
      const newObj = {
        num: index + 1,
        answer: val,
        correct: isCorrect,
      };
      setAnswerVal((before) => [...before, newObj]);
    }
  };

  const submitHandler = () => {
    let correct = 0;
    answerVal.forEach((val) => {
      if (val.correct == "Correct Answer") {
        correct++;
      }
    });

    const skor = (correct / answerVal.length) * 100;
    setShowResult({
      ...showResult,
      wrong: answerVal.length - correct,
      score: skor,
      correct,
    });
    if (answerVal.length === quiz.length) {
      setJustShow(true);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (quiz.length < 1) {
    return <p>Data empty 😔</p>;
  }

  return (
    <>
      <h1 className="text-4xl p-8 font-bold bg-gradient-to-r from-indigo-500 to-slate-700 bg-clip-text text-transparent">
        Answer Page
      </h1>
      <section className="w-full flex flex-col gap-8 m-8 p-8 mx-auto">
        {quiz.map((data, index) => {
          return (
            <div
              key={index}
              className="w-full p-8 gap-8 md:w-1/3 md:mx-auto border-2 rounded-md border-blue-400"
            >
              <p className="mb-8">
                <span>
                  {index + 1}. {data.question}
                </span>
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <input
                    onChange={(e) => answeredHandler(e.target.value, index)}
                    type="radio"
                    name={index}
                    id={`q-${index}-a`}
                    value="a"
                  />
                  <label htmlFor={`q-${index}-a`}>{data.a}</label>
                </div>
                <div className="flex gap-4">
                  <input
                    onChange={(e) => answeredHandler(e.target.value, index)}
                    type="radio"
                    name={index}
                    id={`q-${index}-b`}
                    value="b"
                  />
                  <label htmlFor={`q-${index}-b`}>{data.b}</label>
                </div>
                <div className="flex gap-4">
                  <input
                    onChange={(e) => answeredHandler(e.target.value, index)}
                    type="radio"
                    name={index}
                    id={`q-${index}-c`}
                    value="c"
                  />
                  <label htmlFor={`q-${index}-c`}>{data.c}</label>
                </div>
                <div className="flex gap-4">
                  <input
                    onChange={(e) => answeredHandler(e.target.value, index)}
                    type="radio"
                    name={index}
                    id={`q-${index}-d`}
                    value="d"
                  />
                  <label htmlFor={`q-${index}-d`}>{data.d}</label>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {done == quiz.length ? (
        <span className="text-xs animate-muncul">💡Submit for assesment</span>
      ) : (
        ""
      )}
      <button
        onClick={submitHandler}
        className=" w-1/2 md:w-1/4 mb-24 font-semibold mt-8 px-8 py-2 rounded-md border-2 border-indigo-500 mx-auto hover:bg-indigo-500 hover:text-slate-900 duration-100 active:animate-ping active:border-slate-900 active:text-slate-100"
      >
        Submit Quiz
      </button>

      <div className="fixed top-1/2 right-0 border-2 border-indigo-500 w-16 md:w-32 h-10 flex justify-center items-center">
        <div
          style={{ width: `${(done / quiz.length) * 100}%` }}
          className="h-full bg-indigo-500 absolute right-0 z-0"
        ></div>
        <p className="z-10">{((done / quiz.length) * 100).toFixed()}%</p>
      </div>

      <section className="flex flex-col gap-4 items-center w-full p-4">
        <h1 className="text-4xl p-8 font-bold bg-gradient-to-r from-indigo-500 to-slate-700 bg-clip-text text-transparent">
          Your Answer is
        </h1>
        {answerVal.map((val, index) => {
          return (
            <div
              className="p-4 flex items-center border-l-2 border-b-2 border-b-indigo-500 border-l-indigo-500"
              key={index}
            >
              <p className="flex gap-4 justify-center items-center">
                <span>
                  {val.num}. <span className="font-bold">{val.answer}</span>
                </span>
                <span
                  className={`font-semibold ${
                    val.correct.includes("Correct")
                      ? "text-green-400"
                      : "text-red-500"
                  } p-2`}
                >
                  {val.correct}
                </span>
              </p>
            </div>
          );
        })}
      </section>

      {justShow && (
        <section className="m-4 p-4 flex flex-col justify-center items-center gap-4">
          <p className="text-2xl p-8 font-bold bg-gradient-to-r from-indigo-500 to-slate-700 bg-clip-text text-transparent md:text-4xl">
            Your score is
            <span
              className={`${
                showResult.score > 50 ? "text-green-400" : "text-red-500"
              } border-b-2 border-b-indigo-500 p-2`}
            >
              {showResult.score}
            </span>
            ({showResult.correct}/{answerVal.length})
          </p>
          <div className="w-full flex gap-4 p-4 items-center justify-center border-l-2 border-l-indigo-500">
            <p className="text-green-400">Correct: {showResult.correct}</p>
            <p className="text-red-500">Wrong: {showResult.wrong}</p>
          </div>
        </section>
      )}
    </>
  );
}
