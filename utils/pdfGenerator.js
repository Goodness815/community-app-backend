// utils/pdfGenerator.js
import PDFDocument from "pdfkit";

const handleGenerate = (data) => {
  const doc = new PDFDocument();
  doc.text("Past Questions");
  data.forEach((item) => {
    doc.text(`${item.course}: ${item.fileUrl}`);
  });
  doc.end();
  return doc;
};

export { handleGenerate };
