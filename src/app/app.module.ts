import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BookModule} from './book/book.module';
import {RouterModule} from '@angular/router';
import {CoreModule} from './core/core.module';
import {bookRoutes} from './book/book.routes';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {transaltation} from "./core/lang-en";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({defaultLanguage: 'en'}),
    CoreModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/books', pathMatch: 'full'},
      bookRoutes
    ]),
    BookModule.forRoot()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private readonly  translationService:TranslateService) {
    translationService.setTranslation('en',transaltation);
  }
}
