import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StormpathModule } from '../src/stormpath.module';
import { AppComponent } from './app.component';
import { HttpModule, ConnectionBackend } from '@angular/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StormpathModule],
  bootstrap: [AppComponent],
  providers: []
})
export class DemoModule {
}
