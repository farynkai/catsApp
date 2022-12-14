import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { CatsListReducer, dataListFeatureKey } from './cats-list.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(dataListFeatureKey, CatsListReducer),
  ],
})
export class CatsListModule {}
