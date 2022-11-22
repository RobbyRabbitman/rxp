import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiOperatorShowcaseComponent } from './ui/ui-operator-showcase/ui-operator-showcase.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UiOperatorShowcaseComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
