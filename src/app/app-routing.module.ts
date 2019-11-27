import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/services/authguard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'home-detail', loadChildren: './home-detail/home-detail.module#HomeDetailPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'logoff', loadChildren: './logoff/logoff.module#LogoffPageModule' },
  { path: 'cliente-cadastro', loadChildren: './cliente-cadastro/cliente-cadastro.module#ClienteCadastroPageModule' },
  { path: 'cliente-detalhes', loadChildren: './cliente-detalhes/cliente-detalhes.module#ClienteDetalhesPageModule' },
  { path: 'filme-cadastro', loadChildren: './filme-cadastro/filme-cadastro.module#FilmeCadastroPageModule' },
  { path: 'filme-detalhes', loadChildren: './filme-detalhes/filme-detalhes.module#FilmeDetalhesPageModule' },
  { path: 'funcionario-cadastro', loadChildren: './funcionario-cadastro/funcionario-cadastro.module#FuncionarioCadastroPageModule' },
  { path: 'funcionario-detalhes', loadChildren: './funcionario-detalhes/funcionario-detalhes.module#FuncionarioDetalhesPageModule' },
  { path: 'chamado-cadastro', loadChildren: './chamado-cadastro/chamado-cadastro.module#ChamadoCadastroPageModule' },
  { path: 'chamado-detalhes', loadChildren: './chamado-detalhes/chamado-detalhes.module#ChamadoDetalhesPageModule' },
  { path: 'funcionario', loadChildren: './funcionario/funcionario.module#FuncionarioPageModule' },
  { path: 'chamado', loadChildren: './chamado/chamado.module#ChamadoPageModule' },
  { path: 'filme', loadChildren: './filme/filme.module#FilmePageModule' },
  { path: 'games', loadChildren: './games/games.module#GamesPageModule' },
  { path: 'rotas', loadChildren: './rotas/rotas.module#RotasPageModule' },
  { path: 'exemplo3', loadChildren: './exemplo3/exemplo3.module#Exemplo3PageModule' },
  { path: 'exemplo4', loadChildren: './exemplo4/exemplo4.module#Exemplo4PageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
