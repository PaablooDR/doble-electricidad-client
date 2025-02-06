import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { variable64 } from "../../assets/img-pdf";

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const generatePDF = (reciboNo: string, fecha: string, holderName: string, amount: number, address: string) => {
  
  const content: any[] = [];

  content.push({
    columns: [
      { image: variable64.miVar, width: 150 },
      {
        qr: `https://doble-electricidad.com/invoice/${reciboNo}`,
        fit: 100,
        alignment: "right",
      },
    ],
  });

  // content.push({
  //   qr: `https://doble-electricidad.com/invoice/${reciboNo}`,
  //   fit: 100,
  //   alignment: "right",
  //   margin: [0, 10, 0, 10],
  // });

  content.push({
    canvas: [
      {
        type: "line",
        x1: 0,
        y1: 0,
        x2: 525,
        y2: 0,
        lineWidth: 1,
        lineColor: "#3052A1", // Azul
      },
    ],
    margin: [0, 10, 0, 10],
  });

  content.push({
    text: `Titular: ${holderName}`,
    style: "info",
  });

  content.push({
    text: `Dirección: ${address}`,
    style: "info",
  });

  content.push({
    text: `Monto total: $${amount}`,
    style: "total",
    alignment: "right",
  });

  const styles = {
    header: {
      fontSize: 14,
      bold: true,
    },
    subheader: {
      fontSize: 12,
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

  const docDefinition: any = {
    content,
    styles,
  };

  pdfMake.createPdf(docDefinition).open();
};

export default generatePDF;
