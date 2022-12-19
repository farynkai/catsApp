import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { dataListFeatureKey, CatsListReducer } from './store/cats.reducers';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CatsService } from './services/cats.service';
import { CatsModule } from './cats/cats.module';
import { CatsEffects } from './store/cats.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CatsModule,
    HttpClientModule,
    CommonModule,
    EffectsModule.forRoot([CatsEffects]),
    StoreModule.forRoot({}),
    StoreModule.forFeature(dataListFeatureKey, CatsListReducer),
    AppRoutingModule,
  ],
  providers: [
    CatsService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
