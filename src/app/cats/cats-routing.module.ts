import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatsComponent } from './components/cats/cats.component';
import { CatResolver } from './cats.resolver';

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
