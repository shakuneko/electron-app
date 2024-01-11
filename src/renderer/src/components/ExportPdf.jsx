
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

//金流匯出
export const RevenueExportPDF = (rows, title) => {
    const doc = new jsPDF();
    doc.setFont('NotoSansTC');

    const columns = [
        { header: "項目名稱", dataKey: "courseType" },
        { header: "Ｘ月未核銷 (金額 / 堂)", dataKey: "preMonthLeft" },
        { header: "Ｘ月簽約  (金額 / 堂)", dataKey: "thisMonthTotal" },
        { header: "Ｘ月已核銷 (金額 / 堂)", dataKey: "thisMonthFin" },
        { header: "Ｘ月未核銷 (金額 / 堂)", dataKey: "thisMonthLeft" },
    ];

    const tableData = rows.map(row => {
        return {
            courseType: row.courseType,
            preMonthLeft: `$ ${row.preLeftMoney} / ${row.preLeftCourse}堂`,
            thisMonthTotal: `$ ${row.totalMoney} / ${row.totalCourse}堂`,
            thisMonthFin: `$ ${row.finMoney} / ${row.finCourse}堂`,
            thisMonthLeft: `$ ${row.leftMoney} / ${row.leftCourse}堂`,
        };
    });

    autoTable(doc, {
        columns,
        body: tableData,
        startY: 20,
        styles: {
            font: "NotoSansTC",
            fontStyle: 'bold',
        }
    });

    doc.save(`${title.toLowerCase()}.pdf`);
};

//點進課程頁的匯出
export const CourseTyprExportPDF = (rows, title) => {
    const doc = new jsPDF();
    doc.setFont('NotoSansTC');

    const columns = [
        { header: "教練名稱", dataKey: "coachName" },
        { header: "Ｘ月未核銷 (金額 / 堂)", dataKey: "preMonthLeft" },
        { header: "Ｘ月簽約  (金額 / 堂)", dataKey: "thisMonthTotal" },
        { header: "Ｘ月已核銷 (金額 / 堂)", dataKey: "thisMonthFin" },
        { header: "Ｘ月未核銷 (金額 / 堂)", dataKey: "thisMonthLeft" },
        { header: "PT 體驗課堂數", dataKey: "exCourseTotal" }
    ];

    const tableData = rows.map(row => {
        return {
            coachName: row.coachName,
            preMonthLeft: `$ ${row.preLeftMoney} / ${row.preLeftCourse}堂`,
            thisMonthTotal: `$ ${row.totalMoney} / ${row.totalCourse}堂`,
            thisMonthFin: `$ ${row.finMoney} / ${row.finCourse}堂`,
            thisMonthLeft: `$ ${row.leftMoney} / ${row.leftCourse}堂`,
            exCourseTotal: row.exCourseTotal
        };
    });

    autoTable(doc, {
        columns,
        body: tableData,
        startY: 20,
        styles: {
            font: "NotoSansTC",
            fontStyle: 'bold',
        }
    });

    doc.save(`${title.toLowerCase()}.pdf`);
};

//點進教練的匯出
export const CoachExportPDF = (rows, title, headers) => {
    const doc = new jsPDF();
    doc.setFont('NotoSansTC');
    const tableData = rows.map((row) => Object.values(row));

    autoTable(doc, {
        head: [headers],
        body: tableData,
        startY: 20,
        styles: {
            font: "NotoSansTC",
            fontStyle: 'bold',
        }
    });

    doc.save(`${title.toLowerCase()}.pdf`);
};

