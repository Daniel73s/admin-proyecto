import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import QRious from 'qrious';
@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }


  public pedidosProveedorMesPDF(data: any[], proveedor: any, mes: string) {
    const doc = new jsPDF();

    // Dimensiones de la página
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Título del PDF
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text('Reporte de Pedidos', pageWidth / 2, 20, { align: 'center' });

    // Subtítulo
    doc.setFontSize(14);
    doc.text(`(Mes de ${mes})`, pageWidth / 2, 30, { align: 'center' });

    // Información del Proveedor (Izquierda)
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Proveedor:${proveedor.razon_social.toLowerCase()}`, 10, 40);
    doc.text(`Nit: ${proveedor.nit || 'sin nit'}`, 10, 50);

    // Información del Colegio (Derecha)
    doc.setFontSize(12);
    doc.setTextColor(100);
    const InfoX = pageWidth - 80; // Ajusta este valor según sea necesario
    doc.text(`Celular: ${proveedor.celular}`, InfoX, 40);
    doc.text(`Zona: ${proveedor.zona.toLowerCase()}`, InfoX, 50);

    // Línea divisoria
    doc.setLineWidth(0.5);
    doc.setDrawColor(194, 191, 189);
    doc.line(10, 55, pageWidth - 10, 55);

    // Información adicional
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Fecha de generación: ' + new Date().toLocaleDateString(), 10, 65);

    // Generar código QR
    const qr = new QRious({
      value: proveedor.id_proveedor, // URL o texto para el QR
      size: 100 // Tamaño del QR
    });

    // Convertir el QR a base64 y agregarlo al PDF
    const qrDataUrl = qr.toDataURL();
    doc.addImage(qrDataUrl, 'PNG', pageWidth - 20, 10, 15, 15);


    // Encabezados de la tabla
    const col = ['Fecha Entrega', 'Fecha Creacion', 'Colegio', 'Producto', 'Cantidad', 'Estado'];
    const rows: any[] = [];

    // Datos de la tabla
    data.forEach(pedido => {
      const temp = [
        new Date(pedido.fecha_entrega).toLocaleDateString(),
        new Date(pedido.fecha_creacion).toLocaleDateString(),
        pedido.colegio,
        pedido.producto,
        pedido.cantidad.toString(),
        pedido.estado.toUpperCase()
      ];
      rows.push(temp);
    });

    // Agregar la tabla al PDF usando autoTable
    (doc as any).autoTable({
      head: [col],
      body: rows,
      startY: 70,
      theme: 'grid',
      headStyles: {
        fillColor: [247, 139, 54], // Color de fondo de los encabezados
        textColor: 255, // Color del texto de los encabezados
        fontSize: 12 // Tamaño de la fuente de los encabezados
      },
      styles: {
        fontSize: 10, // Tamaño de la fuente del cuerpo de la tabla
        cellPadding: 3 // Espaciado interno de las celdas
      }
    });

    // Calcular el total de pedidos y la suma de las cantidades
    const totalPedidos = data.length;
    const totalCantidad = data.reduce((sum, pedido) => sum + pedido.cantidad, 0);

    // Posición donde comenzará la tabla de resumen
    const finalY = (doc as any).autoTable.previous.finalY || 70;

    // Encabezados de la tabla de resumen
    const resumenCol = ['Total Pedidos', 'Suma de Cantidades'];
    const resumenRows = [
      [totalPedidos.toString(), totalCantidad.toString()]
    ];

    // Agregar la tabla de resumen al PDF, alineada a la derecha
    (doc as any).autoTable({
      head: [resumenCol],
      body: resumenRows,
      startY: finalY + 10,
      theme: 'grid',
      headStyles: {
        fillColor: [100, 100, 100], // Color de fondo de los encabezados
        textColor: 255, // Color del texto de los encabezados
        fontSize: 12 // Tamaño de la fuente de los encabezados
      },
      styles: {
        fontSize: 10, // Tamaño de la fuente del cuerpo de la tabla
        cellPadding: 3, // Espaciado interno de las celdas
        tableWidth: 'wrap' // Ajuste automático del ancho de la tabla
      },
      margin: { left: pageWidth - 70 } // Alinear a la derecha
    });


    // Guardar el PDF
    doc.save('reporte_pedidos.pdf');
  }

  public pedidosProveedorDatePDF(data: any[], proveedor: any, fecha: string) {
    const doc = new jsPDF();

    // Dimensiones de la página
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Título del PDF
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text('Reporte de Pedidos', pageWidth / 2, 20, { align: 'center' });

    // Subtítulo
    doc.setFontSize(14);
    doc.text(`(Fecha ${fecha})`, pageWidth / 2, 30, { align: 'center' });

    // Información del Proveedor (Izquierda)
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Proveedor: ${proveedor.razon_social.toLowerCase()}`, 10, 40);
    doc.text(`Nit: ${proveedor.nit || 'sin nit'}`, 10, 50);

    // Información del Proveedor (Derecha)
    doc.setFontSize(12);
    doc.setTextColor(100);
    const InfoX = pageWidth - 80; // Ajusta este valor según sea necesario
    doc.text(`Celular: ${proveedor.celular}`, InfoX, 40);
    doc.text(`Zona: ${proveedor.zona.toLowerCase()}`, InfoX, 50);

    // Línea divisoria
    doc.setLineWidth(0.5);
    doc.setDrawColor(194, 191, 189);
    doc.line(10, 55, pageWidth - 10, 55);

    // Información adicional
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Fecha de generación: ' + new Date().toLocaleDateString(), 10, 65);

    // Generar código QR
    const qr = new QRious({
      value: proveedor.id_proveedor, // URL o texto para el QR
      size: 100 // Tamaño del QR
    });

    // Convertir el QR a base64 y agregarlo al PDF
    const qrDataUrl = qr.toDataURL();
    doc.addImage(qrDataUrl, 'PNG', pageWidth - 20, 10, 15, 15);

    // Encabezados de la tabla
    const col = ['Fecha Entrega', 'Fecha Creacion', 'Colegio', 'Producto', 'Cantidad', 'Estado'];
    const rows: any[] = [];

    // Datos de la tabla
    data.forEach(pedido => {
      const temp = [
        new Date(pedido.fecha_entrega).toLocaleDateString(),
        new Date(pedido.fecha_creacion).toLocaleDateString(),
        pedido.colegio,
        pedido.producto,
        pedido.cantidad.toString(),
        pedido.estado.toUpperCase()
      ];
      rows.push(temp);
    });

    // Agregar la tabla al PDF usando autoTable
    (doc as any).autoTable({
      head: [col],
      body: rows,
      startY: 70,
      theme: 'grid',
      headStyles: {
        fillColor: [247, 139, 54], // Color de fondo de los encabezados
        textColor: 255, // Color del texto de los encabezados
        fontSize: 12 // Tamaño de la fuente de los encabezados
      },
      styles: {
        fontSize: 10, // Tamaño de la fuente del cuerpo de la tabla
        cellPadding: 3 // Espaciado interno de las celdas
      }
    });

    // Calcular el total de pedidos y la suma de las cantidades
    const totalPedidos = data.length;
    const totalCantidad = data.reduce((sum, pedido) => sum + pedido.cantidad, 0);

    // Posición donde comenzará la tabla de resumen
    const finalY = (doc as any).autoTable.previous.finalY || 70;

    // Encabezados de la tabla de resumen
    const resumenCol = ['Total Pedidos', 'Suma de Cantidades'];
    const resumenRows = [
      [totalPedidos.toString(), `${totalCantidad.toString()} `]
    ];

    // Agregar la tabla de resumen al PDF, alineada a la derecha
    (doc as any).autoTable({
      head: [resumenCol],
      body: resumenRows,
      startY: finalY + 10,
      theme: 'grid',
      headStyles: {
        fillColor: [100, 100, 100], // Color de fondo de los encabezados
        textColor: 255, // Color del texto de los encabezados
        fontSize: 12,// Tamaño de la fuente de los encabezados
        valign: 'middle', // Alineación vertical
        align: 'center', // Alineación horizontal
      },
      styles: {
        fontSize: 10, // Tamaño de la fuente del cuerpo de la tabla
        cellPadding: 3, // Espaciado interno de las celdas
        tableWidth: 'wrap' // Ajuste automático del ancho de la tabla
      },
      margin: { left: pageWidth - 70 } // Alinear a la derecha
    });

    // Guardar el PDF
    doc.save('reporte_pedidos.pdf');
  }

  public pedidosProveedorEntreFechasPDF(data: any[], proveedor: any, inicio: string, fin: string) {
    const doc = new jsPDF();

    // Dimensiones de la página
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Título del PDF
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text('Reporte de Pedidos', pageWidth / 2, 20, { align: 'center' });

    // Subtítulo
    doc.setFontSize(14);
    doc.text(`(entre ${inicio} a ${fin})`, pageWidth / 2, 30, { align: 'center' });

    // Información del Proveedor (Izquierda)
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Proveedor: ${proveedor.razon_social.toLowerCase()}`, 10, 40);
    doc.text(`Nit: ${proveedor.nit || 'sin nit'}`, 10, 50);

    // Información del Proveedor (Derecha)
    doc.setFontSize(12);
    doc.setTextColor(100);
    const InfoX = pageWidth - 80; // Ajusta este valor según sea necesario
    doc.text(`Celular: ${proveedor.celular}`, InfoX, 40);
    doc.text(`Zona: ${proveedor.zona.toLowerCase()}`, InfoX, 50);

    // Línea divisoria
    doc.setLineWidth(0.5);
    doc.setDrawColor(194, 191, 189);
    doc.line(10, 55, pageWidth - 10, 55);

    // Información adicional
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Fecha de generación: ' + new Date().toLocaleDateString(), 10, 65);

    // Generar código QR
    const qr = new QRious({
      value: proveedor.id_proveedor, // URL o texto para el QR
      size: 100 // Tamaño del QR
    });

    // Convertir el QR a base64 y agregarlo al PDF
    const qrDataUrl = qr.toDataURL();
    doc.addImage(qrDataUrl, 'PNG', pageWidth - 20, 10, 15, 15);

    // Encabezados de la tabla
    const col = ['Fecha Entrega', 'Fecha Creacion', 'Colegio', 'Producto', 'Cantidad', 'Estado'];
    const rows: any[] = [];

    // Datos de la tabla
    data.forEach(pedido => {
      const temp = [
        new Date(pedido.fecha_entrega).toLocaleDateString(),
        new Date(pedido.fecha_creacion).toLocaleDateString(),
        pedido.colegio,
        pedido.producto,
        pedido.cantidad.toString(),
        pedido.estado.toUpperCase()
      ];
      rows.push(temp);
    });

    // Agregar la tabla al PDF usando autoTable
    (doc as any).autoTable({
      head: [col],
      body: rows,
      startY: 70,
      theme: 'grid',
      headStyles: {
        fillColor: [247, 139, 54], // Color de fondo de los encabezados
        textColor: 255, // Color del texto de los encabezados
        fontSize: 12 // Tamaño de la fuente de los encabezados
      },
      styles: {
        fontSize: 10, // Tamaño de la fuente del cuerpo de la tabla
        cellPadding: 3 // Espaciado interno de las celdas
      }
    });

    // Calcular el total de pedidos y la suma de las cantidades
    const totalPedidos = data.length;
    const totalCantidad = data.reduce((sum, pedido) => sum + pedido.cantidad, 0);

    // Posición donde comenzará la tabla de resumen
    const finalY = (doc as any).autoTable.previous.finalY || 70;

    // Encabezados de la tabla de resumen
    const resumenCol = ['Total Pedidos', 'Suma de Cantidades'];
    const resumenRows = [
      [totalPedidos.toString(), `${totalCantidad.toString()} `]
    ];

    // Agregar la tabla de resumen al PDF, alineada a la derecha
    (doc as any).autoTable({
      head: [resumenCol],
      body: resumenRows,
      startY: finalY + 10,
      theme: 'grid',
      headStyles: {
        fillColor: [100, 100, 100], // Color de fondo de los encabezados
        textColor: 255, // Color del texto de los encabezados
        fontSize: 12,// Tamaño de la fuente de los encabezados
        valign: 'middle', // Alineación vertical
        align: 'center', // Alineación horizontal
      },
      styles: {
        fontSize: 10, // Tamaño de la fuente del cuerpo de la tabla
        cellPadding: 3, // Espaciado interno de las celdas
        tableWidth: 'wrap' // Ajuste automático del ancho de la tabla
      },
      margin: { left: pageWidth - 70 } // Alinear a la derecha
    });

    // Guardar el PDF
    doc.save('reporte_pedidos.pdf');
  }

  public pedidosColegioMesPDF(data: any[], colegio: any, mes: string) {
    const doc = new jsPDF();

    // Dimensiones de la página
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Título del PDF
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text('Reporte de Pedidos', pageWidth / 2, 20, { align: 'center' });

    // Subtítulo
    doc.setFontSize(14);
    doc.text(`(Mes de ${mes})`, pageWidth / 2, 30, { align: 'center' });

    // Información del Proveedor (Izquierda)
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Colegio:${colegio.nombre.toLowerCase()}`, 10, 40);
    doc.text(`Dependencia: ${colegio.dependencia}`, 10, 50);

    // Información del Colegio (Derecha)
    doc.setFontSize(12);
    doc.setTextColor(100);
    const InfoX = pageWidth - 80; // Ajusta este valor según sea necesario
    doc.text(`Celular: ${colegio.num_celular}`, InfoX, 40);
    doc.text(`Zona: ${colegio.zona.toLowerCase()}`, InfoX, 50);

    // Línea divisoria
    doc.setLineWidth(0.5);
    doc.setDrawColor(194, 191, 189);
    doc.line(10, 55, pageWidth - 10, 55);

    // Información adicional
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Fecha de generación: ' + new Date().toLocaleDateString(), 10, 65);

    // Generar código QR
    const qr = new QRious({
      value: colegio.id_colegio, // URL o texto para el QR
      size: 100 // Tamaño del QR
    });

    // Convertir el QR a base64 y agregarlo al PDF
    const qrDataUrl = qr.toDataURL();
    doc.addImage(qrDataUrl, 'PNG', pageWidth - 20, 10, 15, 15);


    // Encabezados de la tabla
    const col = ['Fecha Entrega', 'Fecha Creacion', 'Proveedor', 'Producto', 'Cantidad', 'Estado'];
    const rows: any[] = [];

    // Datos de la tabla
    data.forEach(pedido => {
      const temp = [
        new Date(pedido.fecha_entrega).toLocaleDateString(),
        new Date(pedido.fecha_creacion).toLocaleDateString(),
        pedido.proveedor,
        pedido.producto,
        pedido.cantidad.toString(),
        pedido.estado.toUpperCase()
      ];
      rows.push(temp);
    });

    // Agregar la tabla al PDF usando autoTable
    (doc as any).autoTable({
      head: [col],
      body: rows,
      startY: 70,
      theme: 'grid',
      headStyles: {
        fillColor: [247, 139, 54], // Color de fondo de los encabezados
        textColor: 255, // Color del texto de los encabezados
        fontSize: 12 // Tamaño de la fuente de los encabezados
      },
      styles: {
        fontSize: 10, // Tamaño de la fuente del cuerpo de la tabla
        cellPadding: 3 // Espaciado interno de las celdas
      }
    });

    // Calcular el total de pedidos y la suma de las cantidades
    const totalPedidos = data.length;
    const totalCantidad = data.reduce((sum, pedido) => sum + pedido.cantidad, 0);

    // Posición donde comenzará la tabla de resumen
    const finalY = (doc as any).autoTable.previous.finalY || 70;

    // Encabezados de la tabla de resumen
    const resumenCol = ['Total Pedidos', 'Suma de Cantidades'];
    const resumenRows = [
      [totalPedidos.toString(), totalCantidad.toString()]
    ];

    // Agregar la tabla de resumen al PDF, alineada a la derecha
    (doc as any).autoTable({
      head: [resumenCol],
      body: resumenRows,
      startY: finalY + 10,
      theme: 'grid',
      headStyles: {
        fillColor: [100, 100, 100], // Color de fondo de los encabezados
        textColor: 255, // Color del texto de los encabezados
        fontSize: 12 // Tamaño de la fuente de los encabezados
      },
      styles: {
        fontSize: 10, // Tamaño de la fuente del cuerpo de la tabla
        cellPadding: 3, // Espaciado interno de las celdas
        tableWidth: 'wrap' // Ajuste automático del ancho de la tabla
      },
      margin: { left: pageWidth - 70 } // Alinear a la derecha
    });


    // Guardar el PDF
    doc.save('reporte_pedidos_colegio.pdf');
  }
  //funciona para reportes de proveedores
  public generar_PDF_Proveedor(data: any[], proveedor: any, inicio: string, fin: string) {
    const doc = new jsPDF();

    // Logo
    const logoWidth = 30;
    const logoHeight = 30;
    const logoX = 15;
    const logoY = 15;
    doc.addImage('./assets/img/logo.png', 'PNG', logoX, logoY, logoWidth, logoHeight);
    const pageWidth = doc.internal.pageSize.getWidth();
    // Encabezado
    doc.setFontSize(22);
    doc.text('REPORTE DE PEDIDOS', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text('Ameprat', 105, 30, { align: 'center' });
    doc.text('Asociacion de microempresas de ', 105, 35, { align: 'center' });
    doc.text('productos artesanales tarija', 105, 40, { align: 'center' });
    doc.text('celular 74534249', 105, 45, { align: 'center' });
    doc.text('Tarija-Bolivia', 105, 50, { align: 'center' });

    // Generar código QR
    const qr = new QRious({
      value: proveedor.id_proveedor, // URL o texto para el QR
      size: 100 // Tamaño del QR
    });

    // Convertir el QR a base64 y agregarlo al PDF
    const qrDataUrl = qr.toDataURL();
    doc.addImage(qrDataUrl, 'PNG', pageWidth - 20, 10, 15, 15);


    // Información del cliente
    doc.setFontSize(10);
    doc.text(`Nit: ${proveedor.nit || 'NO CUENTA CON NIT'}`, 15, 60);
    doc.text(`Proveedor: ${proveedor.razon_social}`, 15, 65);
    doc.text(`Dirección: ${proveedor.zona}, ${proveedor.calle}`, 15, 70);
    doc.text(`Teléfono: ${proveedor.celular}`, 15, 75);
    if (fin != '') {
      doc.text(`Fecha de entrega: ${inicio} a ${fin}`, 15, 80);
    } else {
      doc.text(`Fecha de entrega: ${inicio}`, 15, 80);
    }



    // Encabezados de la tabla
    const col = ['item', 'Colegio', 'Producto', 'Precio', 'Cantidad', 'Precio total', 'Estado', 'Fecha'];
    const rows: any[] = [];
    // Datos de la tabla
    data.forEach((pedido, index) => {
      const temp = [
        `${index + 1}`,
        pedido.colegio,
        pedido.producto,
        `${pedido.precio_unitario} Bs`,
        `${pedido.cantidad.toString()} Uni.`,
        `${Number(pedido.precio_unitario * Number(pedido.cantidad))} Bs`,
        pedido.estado.toUpperCase(),
        new Date(pedido.fecha_entrega).toLocaleDateString(),
      ];
      rows.push(temp);
    });
    // Tabla
    (doc as any).autoTable({
      startY: 90,
      head: [col],
      body: rows,
    });

    // Total en letras
    doc.text('Total, pedidos:', 15, (doc as any).autoTable.previous.finalY + 10);
    doc.text(`${data.length}, pedidos`, 15, (doc as any).autoTable.previous.finalY + 15);
    const totalCantidad = data.reduce((sum, pedido) => sum + pedido.cantidad, 0);
    // Cantidad
    doc.text('Total, cantidad:', 15, (doc as any).autoTable.previous.finalY + 25);
    doc.text(`${totalCantidad}, Unidades`, 15, (doc as any).autoTable.previous.finalY + 30);

    // Footer
    doc.text('AMEPRAT', 105, doc.internal.pageSize.height - 10, { align: 'center' });

    // Guardar PDF
    doc.save('reporte_proveedor.pdf');
  }

  // funcion para generar pdf de colegios
  public generar_PDF_Colegio(data: any[], colegio: any, mes: string) {
    const doc = new jsPDF();

    // Logo
    const logoWidth = 30;
    const logoHeight = 30;
    const logoX = 15;
    const logoY = 15;
    doc.addImage('./assets/img/logo.png', 'PNG', logoX, logoY, logoWidth, logoHeight);
    const pageWidth = doc.internal.pageSize.getWidth();
    // Encabezado
    doc.setFontSize(22);
    doc.text('PLANILLA DE MENU MENSUAL', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text('Ameprat', 105, 30, { align: 'center' });
    doc.text('Asociacion de microempresas de ', 105, 35, { align: 'center' });
    doc.text('productos artesanales tarija', 105, 40, { align: 'center' });
    doc.text('celular 74534249', 105, 45, { align: 'center' });
    doc.text('Tarija-Bolivia', 105, 50, { align: 'center' });

    // Generar código QR
    const qr = new QRious({
      value: colegio.id_colegio, // URL o texto para el QR
      size: 100 // Tamaño del QR
    });

    // Convertir el QR a base64 y agregarlo al PDF
    const qrDataUrl = qr.toDataURL();
    doc.addImage(qrDataUrl, 'PNG', pageWidth - 20, 10, 15, 15);


    // Información del cliente
    doc.setFontSize(10);
    doc.text(`Codigo Rue: ${colegio.rue || 'NO CUENTA CON RUE'}`, 15, 60);
    doc.text(`Unidad Educativa: ${colegio.nombre}`, 15, 65);
    doc.text(`Dirección: ${colegio.zona}, ${colegio.calle}`, 15, 70);
    doc.text(`Teléfono: ${colegio.num_celular}`, 15, 75);
    doc.text(`Mes : ${mes}`, 15, 80);



    // Encabezados de la tabla
    const col = ['N°', 'Fecha', 'Proveedor', 'Descripcion', 'Cantidad', 'Precio (BS)', 'Total'];
    const rows: any[] = [];
    let sumaTotal = 0;
    // Datos de la tabla
    data.forEach((pedido, index) => {
      const total = Number(pedido.precio_unitario * Number(pedido.cantidad));
      sumaTotal += total;
      const temp = [
        `${index + 1}`,
        new Date(pedido.fecha_entrega).toLocaleDateString(),
        pedido.proveedor,
        pedido.producto,
        `${pedido.cantidad.toString()}`,
        `${pedido.precio_unitario}`,
        `${total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      ];
      rows.push(temp);
    });
    // Formatear la suma total
    const sumaTotalFormatted = sumaTotal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    // Añadir fila para la suma total
    const totalRow = ['', '', '', '', '', 'Total:', `${sumaTotalFormatted}`];
    rows.push(totalRow);
    // Tabla
    (doc as any).autoTable({
      startY: 90,
      head: [col],
      body: rows,
      theme: 'striped',
      styles: {
        fontSize: 10,
        cellPadding: 2,
        overflow: 'linebreak', // Manejo del desbordamiento del texto
        halign: 'center', // Alineación horizontal del texto
        valign: 'middle', // Alineación vertical del texto
      }
    });

    // Footer
    doc.text('AMEPRAT', 105, doc.internal.pageSize.height - 10, { align: 'center' });

    // Guardar PDF
    doc.save('reporte_colegio.pdf');
  }


}
