export interface Question {
  id: number;
  text: string;
}

export interface Section {
  id: string;
  title: string;
  perQuestionMark: number;
  questions: Question[];
}

export interface Exam {
  organizationName: string;
  examName: string;
  subjectName: string;
  subjectCode: string;
  semester: string;
  technology: string;
  duration: string;
  instructions: string;
  sections: Section[];
}
