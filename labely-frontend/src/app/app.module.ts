import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { PaginationContainerComponent } from './common/pagination-container/pagination-container.component';
import { AppComponent } from './app.component';
import { CsvComponent } from './csv/csv.component';
import { LabelyService } from './services/labely.service';
import { AddLabelComponent } from './common/add-label/add-label.component';
import { HomeComponent } from './home/home.component';
import { ImporterComponent } from './common/importer/importer.component';
import { ItemsContainerComponent } from './items-container/items-container.component';
import { TextComponent } from './text/text.component';
import { LabelComponent } from './common/label/label.component';

@NgModule({
  declarations: [
    AppComponent,
    CsvComponent,
    PaginationContainerComponent,
    AddLabelComponent,
    HomeComponent,
    ImporterComponent,
    ItemsContainerComponent,
    TextComponent,
    LabelComponent
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, NgbPaginationModule],
  providers: [LabelyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
