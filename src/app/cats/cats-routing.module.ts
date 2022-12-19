import { CatResolver } from './cats.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatsComponent } from './components/cats.component';

const routes: Routes = [
  {
    path: '',
    component: CatsComponent,
    resolve: {
      cat: CatResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatsRoutingModule {}
