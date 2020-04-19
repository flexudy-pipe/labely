import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { PaginationContainerComponent } from './common/pagination-container/pagination-container.component';
import { AppComponent } from './app.component';
import { TextComponent } from './text/text.component';
import { LabelyService } from './services/labely.service';

@NgModule({
  declarations: [AppComponent, TextComponent, PaginationContainerComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, NgbPaginationModule],
  providers: [LabelyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
