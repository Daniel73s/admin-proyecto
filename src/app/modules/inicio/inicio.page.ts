import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  public datos: any[] = [];
  constructor(private _reportes: ReportesService) { }

  ngOnInit() {
    this.getinfoinicio();
  }

  public getinfoinicio() {
    this._reportes.getInfoInicio().then((resp: any) => {
      console.log(resp);
      this.datos = resp;
    }).catch(e => {
      console.log(e.message);
    })
  }


}