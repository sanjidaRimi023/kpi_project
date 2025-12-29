import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,

} from "@react-pdf/renderer";
import type { Exam, Section } from "../types/question";

interface Props {
  exam: Exam;
}

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
    color: "#000",
  },
  headerContainer: {
    textAlign: "center",
    marginBottom: 15,
    textTransform: "uppercase",
  },
  orgName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  examName: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 2,
  },
  subjectInfo: {
    fontSize: 11,
    marginTop: 2,
  },
  subHeaderRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginTop: 3,
    fontSize: 10,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: 1.5,
    borderBottom: 1.5,
    borderColor: "#000",
    paddingVertical: 4,
    marginTop: 10,
    fontWeight: "bold",
  },
  instructions: {
    marginTop: 10,
    marginBottom: 15,
    fontStyle: "italic",
    fontSize: 9,
  },
  sectionContainer: {
    marginTop: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottom: 0.5,
    borderColor: "#000",
    paddingBottom: 2,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
  },
  sectionTotal: {
    fontSize: 9,
    fontWeight: "bold",
  },
  questionRow: {
    flexDirection: "row",
    marginBottom: 6,
    paddingLeft: 5,
  },
  questionNumber: {
    width: 25,
    fontWeight: "bold",
  },
  questionText: {
    flex: 1,
    textAlign: "justify",
  },
  questionMark: {
    width: 40,
    textAlign: "right",
    fontWeight: "bold",
  }
});

const sectionTotal = (section: Section): number =>
  (section.perQuestionMark || 0) * section.questions.length;

export const ExamPdf = ({ exam }: Props) => {
  const examTotal = exam.sections.reduce(
    (sum, s) => sum + sectionTotal(s),
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.orgName}>{exam.organizationName || "ORGANIZATION NAME"}</Text>
          <Text style={styles.examName}>{exam.examName || "EXAM NAME"}</Text>
          <Text style={styles.subjectInfo}>
            Subject: {exam.subjectName} {exam.subjectCode ? `(${exam.subjectCode})` : ""}
          </Text>
          <View style={styles.subHeaderRow}>
            <Text>Semester: {exam.semester || "N/A"}</Text>
            <Text>|</Text>
            <Text>Technology: {exam.technology || "N/A"}</Text>
          </View>
        </View>

        {/* Time and Marks Row */}
        <View style={styles.statsRow}>
          <Text>Time: {exam.duration || "..."}</Text>
          <Text>Total Marks: {examTotal}</Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text>Instructions: {exam.instructions || "Answer all the questions."}</Text>
        </View>

        {/* Sections Mapping */}
        {exam.sections.map((section, index) => (
          <View key={section.id || index} style={styles.sectionContainer} wrap={false}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Section {section.title || String.fromCharCode(65 + index)}</Text>
              <Text style={styles.sectionTotal}>Section Total: {sectionTotal(section)}</Text>
            </View>

            {/* Questions Mapping */}
            {section.questions.map((q, qIndex) => (
              <View key={q.id || qIndex} style={styles.questionRow}>
                <Text style={styles.questionNumber}>{qIndex + 1}.</Text>
                <Text style={styles.questionText}>{q.text || "................................................................................................"}</Text>
                <Text style={styles.questionMark}>({section.perQuestionMark})</Text>
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
};