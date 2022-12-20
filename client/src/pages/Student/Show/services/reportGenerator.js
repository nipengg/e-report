import jsPDF from "jspdf"
import "jspdf-autotable"

const generatePDF = (scores) => {
    const report = new jsPDF();

    const tableColumn = ["#", "Course", "Lecturer", "Semester", "Score"];

    const tableRows = [];

    scores.forEach(score => {
        const scoreData = [
            score.id,
            score.enroll.course.course_name,
            score.enroll.lecturer.lecturer_name,
            score.enroll.course.semester,
            score.score,
        ];
        tableRows.push(scoreData);
    });


    report.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");

    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    report.text("Report Score", 14, 15);

    report.save(`report_${dateStr}.pdf`);
}

export default generatePDF;