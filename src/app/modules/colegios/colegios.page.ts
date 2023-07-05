import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colegios',
  templateUrl: './colegios.page.html',
  styleUrls: ['./colegios.page.scss'],
})
export class ColegiosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  buscar(e: any) {
    console.log(e);
  }
}
