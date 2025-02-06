import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { variable64 } from "../../assets/img-pdf";

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const generatePDF = (invoiceN: string, date: string, holderName: string, amount: number, address: string, userName: string, userEmail: string, userAddress: string) => {
  
  const content: any[] = [];

  // Header
  content.push({
    columns: [
      { image: variable64.miVar, width: 150 },
      {
        qr: `https://doble-electricidad.com/invoice/${invoiceN}`,
        fit: 100,
        alignment: "right",
      },
    ],
  });

  // Blue line between header and content
  content.push({
    canvas: [
      {
        type: "line",
        x1: 0,
        y1: 0,
        x2: 525,
        y2: 0,
        lineWidth: 1,
        lineColor: "#3052A1",
      },
    ],
    margin: [0, 10, 0, 20],
  });

  // Invoice data
  content.push({
    text: 'DATOS DE LA FACTURA',
    style: "header",
  });

  content.push({
    text: `Nº factura: ${invoiceN}`,
    style: "info",
  });

  content.push({
    text: `Nombre de la factura: ${holderName}`,
    style: "info",
  });

  content.push({
    text: `Fecha de emisión factura: ${date}`,
    style: "info",
  });

  content.push({
    text: `Dirección: ${address}`,
    style: "info",
  });

  // Blue line between invoice data and user data
  content.push({
    canvas: [
      {
        type: "line",
        x1: 0,
        y1: 0,
        x2: 525,
        y2: 0,
        lineWidth: 1,
        lineColor: "#BFBFBF",
      },
    ],
    margin: [0, 20, 0, 20],
  });

  // User data
  content.push({
    text: 'DATOS DEL RECEPTOR',
    style: "header",
  });

  content.push({
    text: `Titular: ${userName}`,
    style: "info",
  });

  content.push({
    text: `Correo electrónico: ${userEmail}`,
    style: "info",
  });

  content.push({
    text: `Dirección: ${userAddress}`,
    style: "info",
  });

  // Blue line between user data and total amont
  content.push({
    canvas: [
      {
        type: "line",
        x1: 0,
        y1: 0,
        x2: 525,
        y2: 0,
        lineWidth: 1,
        lineColor: "#BFBFBF",
      },
    ],
    margin: [0, 20, 0, 20],
  });

  // Total amount of the invoice
  content.push({
    text: `Cuota a pagar: ${amount}€`,
    style: "total",
    alignment: "right",
  });

  // Styles
  const styles = {
    header: {
      fontSize: 14,
      bold: true,
      background: "#3052A1",
      color: "white",
      margin: [0, 5, 0, 5],
    },
    info: {
      fontSize: 12,
      margin: [0, 5, 0, 5],
    },
    total: {
      fontSize: 14,
      bold: true,
      margin: [0, 10, 0, 10],
    },
  };

  // Functions that create the PDF
  const docDefinition: any = {
    content,
    styles,
  };

  pdfMake.createPdf(docDefinition).open();
};

export default generatePDF;
