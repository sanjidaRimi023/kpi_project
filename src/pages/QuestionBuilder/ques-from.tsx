import { useState } from "react";
import type { Exam, Section } from "./types/question";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ExamPdf } from "./utils/generatepdf";

const initialExam: Exam = {
  organizationName: "",
  examName: "",
  subjectName: "",
  subjectCode: "",
  semester: "",
  technology: "",
  duration: "",
  instructions: "",
  sections: [],
};

export default function ExamQuestionBuilder() {
  const [exam, setExam] = useState<Exam>(initialExam);

  /* ---------- LOGIC ---------- */
  const addSection = () => {
    const newSection: Section = {
      id: crypto.randomUUID(),
      title: "",
      perQuestionMark: 0,
      questions: [{ id: 1, text: "" }],
    };
    setExam({ ...exam, sections: [...exam.sections, newSection] });
  };

  const removeSection = (id: string) => {
    setExam({ ...exam, sections: exam.sections.filter((s) => s.id !== id) });
  };

  const addQuestion = (sectionId: string) => {
    setExam({
      ...exam,
      sections: exam.sections.map((sec) =>
        sec.id === sectionId
          ? { ...sec, questions: [...sec.questions, { id: sec.questions.length + 1, text: "" }] }
          : sec
      ),
    });
  };

  const sectionTotal = (sec: Section) => (sec.perQuestionMark || 0) * sec.questions.length;
  const examTotal = exam.sections.reduce((sum, sec) => sum + sectionTotal(sec), 0);

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 ">
      
      {/* BUILDER SIDE */}
      <div className="w-full lg:w-1/2 p-6 border-r bg-white overflow-y-auto">
        <h2 className="text-xl font-bold text-indigo-700 mb-6 border-b pb-2">Question Paper Builder</h2>
        
        {/* Header Inputs */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <input className="border p-2 rounded" placeholder="Organization Name" value={exam.organizationName} onChange={(e) => setExam({...exam, organizationName: e.target.value})} />
          <input className="border p-2 rounded" placeholder="Exam Name" value={exam.examName} onChange={(e) => setExam({...exam, examName: e.target.value})} />
          
          <div className="grid grid-cols-2 gap-4">
            <input className="border p-2 rounded" placeholder="Subject Name" value={exam.subjectName} onChange={(e) => setExam({...exam, subjectName: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Subject Code" value={exam.subjectCode} onChange={(e) => setExam({...exam, subjectCode: e.target.value})} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input className="border p-2 rounded" placeholder="Semester" value={exam.semester} onChange={(e) => setExam({...exam, semester: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Technology" value={exam.technology} onChange={(e) => setExam({...exam, technology: e.target.value})} />
            <input className="border p-2 rounded" placeholder="Time Duration" value={exam.duration} onChange={(e) => setExam({...exam, duration: e.target.value})} />
          </div>

          <textarea className="border p-2 rounded h-20" placeholder="Special Instructions" value={exam.instructions} onChange={(e) => setExam({...exam, instructions: e.target.value})} />
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {exam.sections.map((sec) => (
            <div key={sec.id} className="border-2 border-indigo-100 p-4 rounded-lg bg-indigo-50/30 relative">
              <button onClick={() => removeSection(sec.id)} className="absolute top-2 right-2 text-red-500 text-xs font-bold hover:underline">Delete</button>
              
              <div className="flex gap-4 mb-4">
                <input className="border-b bg-transparent p-1 flex-1 font-bold outline-none border-indigo-300" placeholder="Section Title (e.g. Section A)" value={sec.title} onChange={(e) => setExam({...exam, sections: exam.sections.map(s => s.id === sec.id ? {...s, title: e.target.value} : s)})} />
                <input className="border-b bg-transparent p-1 w-20 text-center outline-none border-indigo-300" type="number" placeholder="Marks" onChange={(e) => setExam({...exam, sections: exam.sections.map(s => s.id === sec.id ? {...s, perQuestionMark: Number(e.target.value)} : s)})} />
              </div>

              {sec.questions.map((q, qIdx) => (
                <div key={q.id} className="flex gap-2 mb-2">
                  <span className="mt-2 text-sm text-gray-500">{qIdx + 1}.</span>
                  <textarea className="w-full border p-2 rounded text-sm bg-white" placeholder="Type question..." value={q.text} onChange={(e) => setExam({...exam, sections: exam.sections.map(s => s.id === sec.id ? {...s, questions: s.questions.map(qq => qq.id === q.id ? {...qq, text: e.target.value} : qq)} : s)})} />
                </div>
              ))}

              <div className="flex justify-between items-center mt-3">
                <button onClick={() => addQuestion(sec.id)} className="text-indigo-600 text-sm font-semibold hover:underline">+ Add Question</button>
                <button onClick={addSection} className="text-green-600 text-sm font-semibold hover:underline">+ Add Next Section</button>
                <span className="text-xs font-bold bg-indigo-100 px-2 py-1 rounded text-indigo-700">Total: {sectionTotal(sec)}</span>
              </div>
            </div>
          ))}

          {exam.sections.length === 0 && (
            <button onClick={addSection} className="w-full py-3 border-2 border-dashed border-indigo-200 text-indigo-500 font-bold rounded-lg hover:bg-indigo-50 transition">
              + Create First Section
            </button>
          )}
        </div>

        <div className="mt-10">
          <PDFDownloadLink document={<ExamPdf exam={exam} />} fileName="question-paper.pdf">
            {({ loading }) => (
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 shadow-lg">
                {loading ? "Preparing PDF..." : "Download PDF Document"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      {/* PREVIEW SIDE */}
      <div className="hidden lg:block lg:w-1/2 p-10 bg-gray-200 overflow-y-auto h-screen">
        <div className="bg-white shadow-2xl p-12 min-h-[11in] mx-auto text-black border border-gray-300">
          
          {/* Paper Header */}
          <div className="text-center mb-6 uppercase tracking-tight">
            <h1 className="text-2xl font-bold mb-1">{exam.organizationName || "ORGANIZATION NAME"}</h1>
            <h2 className="text-lg font-bold mb-1">{exam.examName || "EXAM NAME"}</h2>
            <h3 className="font-semibold">{exam.subjectName} {exam.subjectCode && `(${exam.subjectCode})`}</h3>
            <p className="text-sm font-medium">{exam.semester && `Semester: ${exam.semester}`} {exam.technology && ` | Technology: ${exam.technology}`}</p>
          </div>

          <div className="flex justify-between font-bold border-y-2 border-black py-1 text-sm mb-4">
            <span>Time: {exam.duration}</span>
            <span>Total Marks: {examTotal}</span>
          </div>

          <div className="text-sm mb-8">
            <p className="italic font-semibold">Instructions: {exam.instructions || "Answer all the questions."}</p>
          </div>

          {/* Sections List */}
          {exam.sections.map((sec) => (
            <div key={sec.id} className="mb-8">
              <div className="flex justify-between items-center border-b border-gray-400 mb-4">
                <h4 className="font-bold text-lg uppercase">Section {sec.title}</h4>
                <span className="text-sm font-bold">Section Total: {sectionTotal(sec)}</span>
              </div>
              
              <div className="space-y-4">
                {sec.questions.map((q, i) => (
                  <div key={q.id} className="flex justify-between gap-4">
                    <div className="flex gap-2">
                      <span className="font-bold">{i + 1}.</span>
                      <p className="text-sm">{q.text || "...................................................................."}</p>
                    </div>
                    <span className="font-bold text-sm">({sec.perQuestionMark})</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}