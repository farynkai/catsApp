import { CatsEffects } from './store/cats.effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

import { dataListFeatureKey, CatsListReducer } from './store/cats.reducers';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CatsListComponent } from './components/cats-list/cats-list.component';
import { CatsService } from './services/cats.service';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [AppComponent, CatsListComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    EffectsModule.forRoot([CatsEffects]),
    StoreModule.forRoot({}),
    StoreModule.forFeature(dataListFeatureKey, CatsListReducer),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [
    CatsService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
