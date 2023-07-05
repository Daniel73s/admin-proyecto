import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './modules/dashboard/dashboard.page';

const routes: Routes = [
  {
    path: 'dashboard',
    component:DashboardPage,
    loadChildren: () => import('./modules/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
