import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SoulModule } from '@esteco/soul';
import { ModalComponent } from './modal/modal.component';
import { RequirementComponent } from './requirement/requirement.component';
import { ReqService } from './req.service';
import { ReqDetailComponent } from './req-detail/req-detail.component';
import { ReadFileComponent } from './read-file/read-file.component';
import { AnalysisService } from './analysis.service';
import { AnalysisDetailComponent } from './analysis-detail/analysis-detail.component';
import { ModalSelectReqComponent } from './modal-select-req/modal-select-req.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    RequirementComponent,
    ReqDetailComponent,
    ReadFileComponent,
    AnalysisDetailComponent,
    ModalSelectReqComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SoulModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ReqService, AnalysisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
