import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Food } from '../models/entities/Food';

// define a generatePDF function that accepts a tickets argument
const generateFoodReport = (foods: Food[], reataurantName: string) => {
    // initialize jsPDF
    const doc = new jsPDF();

    // define the columns we want and their titles
    const tableColumn = [
        ['Id', 'Name', 'Price(lei)', 'Description', 'Category'],
    ];
    // define an empty array of rows
    const tableRows = [] as any[];

    // for each ticket pass all its data into an array
    foods.forEach((food, index) => {
        const ticketData = [
            index + 1, //no one will know that this isn't the food id
            food.name,
            food.price,
            food.description,
            food.category,
        ];
        // push each tickcet's info into a row
        tableRows.push(ticketData);
    });

    // startY is basically margin-top
    autoTable(doc, {
        head: tableColumn,
        body: tableRows,
        startY: 20,
        styles: { minCellHeight: 20 },
    });
    const date = Date().split(' ');
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // ticket title. and margin-top + margin-left
    doc.text(`List of foods of ${reataurantName}`, 14, 15);
    // we define the name of our PDF file.
    doc.save(`report_${dateStr}.pdf`);
};

export default generateFoodReport;
