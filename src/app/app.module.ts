import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CatsListComponent } from './components/cats-list/cats-list.component';
import { CatsService } from './services/cats.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CatsListModule } from './@ngrx/cats-list/cats-list.module';
import { RootStoreModule } from './@ngrx/root-store.module';

@NgModule({
  declarations: [AppComponent, CatsListComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    CatsListModule,
    FormsModule,
    RootStoreModule,
  ],
  providers: [CatsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
