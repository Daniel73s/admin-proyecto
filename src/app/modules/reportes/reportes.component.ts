import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent  implements OnInit {
  //variable para saber que dias bloquear
  public isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0 && utcDay !== 6;
  };

  public custom:boolean=false;

  constructor() { }
  ngOnInit() {}


  public fechainicio(fecha:any){
    console.log("esta es la fecha de inicio ",fecha)
  }
  public fechafin(fecha:any){
     console.log("esta es la fecha de fin ",fecha)
  }

  public selectOnSegment(event:any){
      switch (event.detail.value) {
        case 'hoy':
          return this.custom=false;
          ;
        case 'semanal':
          return this.custom=false;
        case 'mensual':
          return this.custom=false;
        case 'custom':
          return this.custom=true;
        default:
          return 'no se encontro ninguna coincidencia';
      }
  }
}
