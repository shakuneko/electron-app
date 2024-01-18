
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
// 計算月份
const calculateMonth = (monthData) => {
    const currentMonth = monthData.replace('月', '');
    const dateObj = new Date(`2022-${currentMonth}-01`);
    dateObj.setMonth(dateObj.getMonth() - 1);
    const minusMonth = (dateObj.getMonth() + 1).toString().padStart(2, '0') + '月';
    return minusMonth === 'NaN月' ? '某月份' : minusMonth;
};
//金流匯出
export const RevenueExportPDF = (rows, title,displayMonth) => {
    const monthData = calculateMonth(displayMonth);
    const doc = new jsPDF();
    doc.setFont('JhengHei');

    const columns = [
        { header: "項目名稱", dataKey: "courseType" },
        { header: `${monthData}未核銷  (金額 / 堂)`, dataKey: "preMonthLeft" },
        { header: `${displayMonth}簽約  (金額 / 堂)`, dataKey: "thisMonthTotal" },
        { header: `${displayMonth}已核銷 (金額 / 堂)`, dataKey: "thisMonthFin" },
        { header: `${displayMonth}未核銷 (金額 / 堂)`, dataKey: "thisMonthLeft" },
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
            font: "JhengHei",
            fontStyle: 'bold',
        },
        headerStyles: {
            fillColor: [223, 201, 148],
            textColor: [53, 47, 41]
        }
    });

    doc.save(`${title.toLowerCase()}.pdf`);
};

//點進課程頁的匯出
export const CourseTyprExportPDF = (rows, title,monthValue) => {
    const monthData = calculateMonth(monthValue);
    const doc = new jsPDF();
    doc.setFont('JhengHei');

    const columns = [
        { header: "教練名稱", dataKey: "coachName" },
        { header: `${monthData}未核銷 (金額 / 堂)`, dataKey: "preMonthLeft" },
        { header: `${monthValue}簽約  (金額 / 堂)`, dataKey: "thisMonthTotal" },
        { header: `${monthValue}已核銷 (金額 / 堂)`, dataKey: "thisMonthFin" },
        { header: `${monthValue}未核銷 (金額 / 堂)`, dataKey: "thisMonthLeft" },
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
            font: "JhengHei",
            fontStyle: 'bold',
        },
        headerStyles: {
            fillColor: [223, 201, 148],
            textColor: [53, 47, 41]
        }
    });

    doc.save(`${title.toLowerCase()}.pdf`);
};

//點進教練的匯出
export const CoachExportPDF = (rows, title, headers) => {
    const doc = new jsPDF();
    doc.setFont('JhengHei');
    const tableData = rows.map((row) => Object.values(row));

    autoTable(doc, {
        head: [headers],
        body: tableData,
        startY: 20,
        styles: {
            font: "JhengHei",
            fontStyle: 'bold',
        },
        headerStyles: {
            fillColor: [223, 201, 148],
            textColor: [53, 47, 41]
        }
    });

    doc.save(`${title.toLowerCase()}.pdf`);
};

