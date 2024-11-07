import { Component } from '@angular/core';
import { ProveedoresService } from '../proveedores/services/proveedores.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { ToastController } from '@ionic/angular';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';
import { ColegiosService } from '../colegios/services/colegios.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent {
  //variable para saber que dias bloquear
  public isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0 && utcDay !== 6;
  };
  public proveedores: any[] = [];
  public colegios: any[] = [];
  public custom: boolean = false;
  public fecha: boolean = false;
  public mensual: boolean = false;
  public tiporeporte: string = 'hoy';
  public estado_pedido: string = 'pendiente';
  public idproveedor: string = '';
  public idcolegio: string = '';
  public reporte: any[] = [];
  public reportecolegio: any[] = [];
  private fecha_ini!: Date;
  private fecha_fin!: Date;
  private fechaunica!: Date;
  public mes_anio!: Date;
  constructor(private _proveedores: ProveedoresService,
    private _reportes: ReportesService,
    private toastCtrl: ToastController,
    public pdfgenerate: PdfGeneratorService,
    private _colegios: ColegiosService
  ) { }

  ionViewWillEnter() {
    this.getProveedores();
    this.getColegios();
  }

  public fechainicio(e: any) {
    this.fecha_ini = e.detail.value;
  }

  public fechafin(e: any) {
    this.fecha_fin = e.detail.value;
  }

  public fecha_determinada(e: any) {
    this.fechaunica = e.detail.value;
  }

  public selectOnSegment(event: any) {
    switch (event.detail.value) {
      case 'hoy':
        this.tiporeporte = event.detail.value;
        return this.custom = false, this.fecha = false, this.mensual = false;
      case 'custom':
        this.tiporeporte = event.detail.value;
        return this.custom = true, this.fecha = false, this.mensual = false;
      case 'fecha':
        this.tiporeporte = event.detail.value;
        return this.custom = false, this.fecha = true, this.mensual = false;
      case 'mensual':
        this.tiporeporte = event.detail.value;
        return this.custom = false, this.fecha = false, this.mensual = true;
      default:
        return 'no se encontro ninguna coincidencia';
    }
  }

  private getProveedores() {
    this._proveedores.getProveedores().then((resp: any) => {
      this.proveedores = resp;
    }).catch(e => {
      console.log(e);

    })
  }

  private getColegios() {
    this._colegios.getColegios().then((resp: any) => {
      this.colegios = resp;
    }).catch(e => {
      console.log(e);
    })
  }

  public generarReporte() {
    this.reporte = [];
    if (this.tiporeporte == 'hoy') {
      const date = new Date().toISOString();
      this._reportes.getPedidosProveedorByDate(this.idproveedor, date.slice(0, 10), this.estado_pedido)
        .then((resp: any) => {
          if (resp.length <= 0) {
            this.mensaje('no se encontraron registros', 'dark', 3000);
            return
          }
          this.reporte = resp;

        }).catch(e => {
          console.log(e);
          this.mensaje('ocurrio un error al generar el reporte', 'dark', 3000);
        })
    } else if (this.tiporeporte == 'custom') {
      const inicio = this.fecha_ini.toLocaleString().slice(0, 10);
      const fin = this.fecha_fin.toLocaleString().slice(0, 10);

      this._reportes.getPedidosProveedorEntreFechas(this.idproveedor, inicio, fin, this.estado_pedido)
        .then((resp: any) => {
          if (resp.length <= 0) {
            this.mensaje('no se encontraron registros', 'dark', 3000);
            return
          }
          this.reporte = resp;
        }).catch(e => {
          console.log(e);
          this.mensaje('ocurrio un error al generar el reporte', 'dark', 3000);
        })
    } else if (this.tiporeporte == 'fecha') {
      const fecha = this.fechaunica.toLocaleString().slice(0, 10);
      this._reportes.getPedidosProveedorByDate(this.idproveedor, fecha, this.estado_pedido)
        .then((resp: any) => {
          if (resp.length <= 0) {
            this.mensaje('no se encontraron registros', 'dark', 3000);
            return
          }
          this.reporte = resp;
        }).catch(e => {
          console.log(e);
          this.mensaje('ocurrio un error al generar el reporte', 'dark', 3000);
        })
    } else if (this.tiporeporte == 'mensual') {
      const anio = new Date(this.mes_anio).getFullYear();
      const mes = new Date(this.mes_anio).getMonth() + 1;
      this._reportes.getPedidosProveedorByMes(this.idproveedor, anio, mes, this.estado_pedido)
        .then((resp: any) => {
          if (resp.length <= 0) {
            this.mensaje('No se encontro ningun registro ', 'danger', 3000);
            return
          }
          this.reporte = resp;
          // this._pdfGenerator.pedidosProveedorMesPDF(resp, this.proveedor, this.getMonthName(mes));
        }).catch((e: any) => {
          console.log(e);
        })

    }
  }

  public generarPDF() {
    if (this.tiporeporte == 'hoy') {
      const date = new Date().toISOString();
      const proveedor = this.proveedores.filter(item => item.id_proveedor == this.idproveedor);
      this.pdfgenerate.pedidosProveedorDatePDF(this.reporte, proveedor[0], date.slice(0, 10));
    } else if (this.tiporeporte == 'custom') {
      const inicio = new Date(this.fecha_ini).toISOString().slice(0, 10);
      const fin = new Date(this.fecha_fin).toISOString().slice(0, 10);
      const proveedor = this.proveedores.filter(item => item.id_proveedor == this.idproveedor);
      this.pdfgenerate.generar_PDF_Proveedor(this.reporte, proveedor[0], inicio, fin);
    } else if (this.tiporeporte == 'fecha') {
      const fecha = new Date(this.fechaunica).toISOString().slice(0, 10);
      const proveedor = this.proveedores.filter(item => item.id_proveedor == this.idproveedor);
      this.pdfgenerate.generar_PDF_Proveedor(this.reporte, proveedor[0], fecha, '');
    } else if (this.tiporeporte == 'mensual') {
      const mes = new Date(this.mes_anio).getMonth() + 1;
      const proveedor = this.proveedores.filter(item => item.id_proveedor == this.idproveedor);
      this.pdfgenerate.generar_PDF_Proveedor(this.reporte, proveedor[0], this.getMonthName(mes), '');
    }

  }
  public generate_PDF_colegio(){
    const colegio = this.colegios.filter(item => item.id_colegio == this.idcolegio);
    const date = new Date(this.mes_anio);
    const mes = date.getMonth() + 1;
      this.pdfgenerate.generar_PDF_Colegio(this.reportecolegio,colegio[0],this.getMonthName(mes))
  }

  public confirmarProveedor(e: any) {
    this.idproveedor = e.detail.value;
  }

  public confirmarColegio(e: any) {
    this.idcolegio = e.detail.value;
  }

  async mensaje(message: string, color: string, duration: number) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      color,
      position: 'top'
    });
    toast.present();
  }

  private getMonthName(NumeroMes: number) {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    if (NumeroMes < 1 || NumeroMes > 12) {
      throw new Error('El número del mes debe estar entre 1 y 12.');
    }

    return months[NumeroMes - 1];
  }

  public generarReporteColegio() {
    this.reporte=[];
    const date = new Date(this.mes_anio);
    const mes = date.getMonth() + 1;
    const anio = date.getFullYear();
    if (this.estado_pedido && this.idcolegio && this.mes_anio) {
      this._reportes.getPedidosColegioByMes(this.idcolegio, anio, mes, this.estado_pedido).then((resp: any) => {
        this.reportecolegio=resp;
      }).catch(e => {
        console.log(e);
      })
    }else{
      console.log('faltan campos');
      console.log(this.estado_pedido ,this.idcolegio ,this.mes_anio);
      
    }
  }

 
}
