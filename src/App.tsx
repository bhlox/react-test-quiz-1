import React, { useEffect, useState } from "react";

type questionData = {
  question: string;
  choices: [""];
};

const firstQuestion = {
  question: "what is your gender?",
  choices: ["male", "female"],
};

function App() {
  const [question, setQuestion] = useState(firstQuestion);

  const fetchQuestion = async (id: number) => {
    const response = await fetch("https://kaizerfit.com/questions.php", {
      method: "POST",
      body: JSON.stringify({ id: id }),
    });
    const { data }: { data: questionData } = await response.json();
    setQuestion(data);
  };

  const handleClick = (id: number) => {
    fetchQuestion(id);
  };

  // useEffect(() => {
  //   // fetchQuestion();
  // }, []);

  console.log(question);

  return (
    <div className="bg-green-400 flex flex-col items-center space-y-4">
      <button
        className="outline p-4 rounded w-max"
        onClick={() => handleClick(1)}
      >
        question 1
      </button>
      <button
        className="outline p-4 rounded w-max"
        onClick={() => handleClick(2)}
      >
        question 2
      </button>
      <button
        className="outline p-4 rounded w-max"
        onClick={() => handleClick(3)}
      >
        question 3
      </button>
      <button
        className="outline p-4 rounded w-max"
        onClick={() => handleClick(4)}
      >
        question 4
      </button>
      <button
        className="outline p-4 rounded w-max"
        onClick={() => handleClick(5)}
      >
        question 5
      </button>
    </div>
  );
}

export default App;
