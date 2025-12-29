import ExamQuestionBuilder from "./ques-from";

const QuestionBuilder = () => {
  return (
    <section className="container mx-auto">
      <div className="flex justify-center items-center text-center flex-col my-10 space-y-4">
        <h2 className="text-5xl font-bold">
          Build your <span className="text-purple-700">Question Paper</span>
        </h2>
        <p className="text-lg font-medium">
          Build section-wise question papers, preview changes in real time, and
          export when ready.
        </p>
      </div>
      <div>
       <ExamQuestionBuilder/>
      </div>
    </section>
  );
};

export default QuestionBuilder;
