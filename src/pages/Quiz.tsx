import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

type questionData = {
  question: string;
  choices: [""];
};

const firstQuestion = {
  question: "what is your gender?",
  choices: ["male", "female"],
};

function Quiz() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState(firstQuestion);
  const [indexQuestion, setIndexQuestion] = useState(0);

  // user input states
  const [gender, setGender] = useState("");
  const [age, setAge] = useState<String>();
  const [metabolism, setMetabolism] = useState<String>();
  const [weight, setWeight] = useState<String>();
  const [weightGoal, setWeightGoal] = useState<String>();
  const [challenge, setChallenge] = useState<String>();

  const fetchQuestion = async (id: number) => {
    const response = await fetch("https://kaizerfit.com/questions.php", {
      method: "POST",
      body: JSON.stringify({ id: indexQuestion }),
    });
    const { data }: { data: questionData } = await response.json();
    setQuestion(data);
  };

  const handleClick = (category: string, choice: string) => {
    if (category === "gender") {
      setGender(choice);
    }
    if (category === "age") {
      setAge(choice);
    }
    if (category === "metabolism") {
      setMetabolism(choice);
    }
    if (category === "weight") {
      console.log(choice, "weight");
      setWeight(choice);
    }
    if (category === "weightGoal") {
      setWeightGoal(choice);
    }
    if (category === "challenge") {
      setChallenge(choice);
      console.log("WTF");
    }

    if (indexQuestion === 5) {
      const userAnswers = {
        gender,
        age,
        metabolism,
        weight,
        weightGoal,
        challenge: choice,
      };
      localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
      navigate("/results");
      return;
    }

    setIndexQuestion((prev) => prev + 1);
  };

  useEffect(() => {
    if (indexQuestion) {
      fetchQuestion(indexQuestion);
    }
  }, [indexQuestion]);

  useEffect(() => {
    localStorage.setItem("userAnswers", JSON.stringify({}));
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center space-y-4">
      <div>progress bar here</div>
      <div className="flex space-x-4">
        {gender && (
          <p>
            gender: <span>{gender}</span>
          </p>
        )}
        {age && (
          <p>
            age: <span>{age.toString()}</span>
          </p>
        )}
        {metabolism && (
          <p>
            metabolism: <span>{metabolism}</span>
          </p>
        )}
        {weight && (
          <p>
            weight: <span>{weight.toString()}</span>
          </p>
        )}
        {weightGoal && (
          <p>
            weight goal: <span>{weightGoal}</span>
          </p>
        )}
        {challenge && (
          <p>
            challenge: <span>{challenge}</span>
          </p>
        )}
      </div>
      {question.question === "what is your gender?" && (
        <div>insert images for first question here</div>
      )}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold capitalize">
          {question.question}
        </h3>
        <div className="flex flex-col items-center space-y-4">
          {question.choices &&
            question.choices.map((choice, i) => (
              <Choice
                key={Math.random() * 123}
                choice={choice}
                handleClick={handleClick}
                indexQuestion={indexQuestion}
              />
            ))}
          {!question.choices && (
            <Choice choice={""} handleClick={handleClick} />
          )}
        </div>
      </div>
    </div>
  );
}

function Choice({
  choice,
  handleClick,
  indexQuestion,
}: {
  choice: string;
  handleClick: (category: string, choice: string) => void;
  indexQuestion?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const category =
    indexQuestion === 0
      ? "gender"
      : indexQuestion === 1
      ? "age"
      : indexQuestion === 2
      ? "metabolism"
      : indexQuestion === 3
      ? "weight"
      : indexQuestion === 4
      ? "weightGoal"
      : indexQuestion === 5
      ? "challenge"
      : "";

  console.log(category);

  if (!choice) {
    return (
      <div>
        <input ref={inputRef} type="range" min={0} max={400} name="" id="" />
        <button onClick={() => handleClick("weight", inputRef.current!.value)}>
          submit
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => handleClick(category, choice)}
      className="outline rounded px-4 py-2"
    >
      {choice}
    </button>
  );
}

export default Quiz;
