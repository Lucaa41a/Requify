import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SoulModule } from '@esteco/soul';
import { ModalComponent } from './modal/modal.component';
import { RequirementComponent } from './requirement/requirement.component';
import { ReService } from './re.service';
import { TreeNavigationComponent } from './tree-navigation/tree-navigation.component';
import { ReqDetailComponent } from './req-detail/req-detail.component';
import { ReadFileComponent } from './read-file/read-file.component';
import { AnalysisService } from './analysis.service';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    RequirementComponent,
    TreeNavigationComponent,
    ReqDetailComponent,
    ReadFileComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SoulModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ReService, AnalysisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
