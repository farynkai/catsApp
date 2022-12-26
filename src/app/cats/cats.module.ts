import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { CatsRoutingModule } from './cats-routing.module';
import { UnsubscriberComponent } from './components/unsubscriber/unsubcriber.component';
import { CatsComponent } from './components/cats/cats.component';

@NgModule({
  declarations: [CatsComponent, UnsubscriberComponent],
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
