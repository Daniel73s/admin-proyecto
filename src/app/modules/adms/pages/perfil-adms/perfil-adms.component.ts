import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdministradoresService } from '../../services/administradores.service';

@Component({
  selector: 'app-perfil-adms',
  templateUrl: './perfil-adms.component.html',
  styleUrls: ['./perfil-adms.component.scss'],
})
export class PerfilAdmsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _administrador: AdministradoresService) { }
  private id!: string;
  public admin:any;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getAdministrador(this.id);
  }

  private getAdministrador(id: string) {
    this._administrador.getOneAdministrador(id).then((resp: any) => {
      this.admin=resp;
    });
  }

}
