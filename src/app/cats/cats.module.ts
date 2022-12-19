import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatsComponent } from './components/cats.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CatsRoutingModule } from './cats-routing.module';
@NgModule({
  declarations: [CatsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CatsRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class CatsModule {}
