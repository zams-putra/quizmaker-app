import { Route, Routes } from "react-router-dom";

import Home from "../views/Home";
import Quiz from "../views/Quiz";
import Answer from "../views/Answer";
import About from "../views/About";

import { useState } from "react";

export default function AppRoutes() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <main className="w-full pb-44 min-h-screen flex flex-col gap-8 items-center bg-slate-900 text-slate-200 pt-32">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/quiz"
          element={<Quiz setIsLoading={setIsLoading} isLoading={isLoading} />}
        />
        <Route
          path="/answer/:id"
          element={<Answer setIsLoading={setIsLoading} isLoading={isLoading} />}
        />
      </Routes>
    </main>
  );
}
