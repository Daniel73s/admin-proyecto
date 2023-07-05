import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(private router: Router) { }
  public username: string = '';
  public password: string = '';

  ngOnInit() {
  }

  login() {
    // Aquí puedes implementar la lógica de autenticación
    // Por ahora, simplemente redirigimos a otra página después del inicio de sesión
    this.router.navigate(['/dashboard']);
  }
}
