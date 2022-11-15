import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiMarbleGraphComponent } from './ui/ui-marble-graph/ui-marble-graph.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UiMarbleGraphComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
