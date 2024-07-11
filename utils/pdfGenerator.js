// utils/pdfGenerator.js
import PDFDocument from 'pdfkit';

export const generate = (data) => {
    const doc = new PDFDocument();
    doc.text('Past Questions');
    data.forEach((item) => {
        doc.text(`${item.course}: ${item.fileUrl}`);
    });
    doc.end();
    return doc;
};
