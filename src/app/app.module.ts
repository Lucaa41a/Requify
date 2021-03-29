import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';

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
import { NgVoltaApiService, NgVoltaApiStorageService } from '@proservices/ng-volta-api';
import { AppRoutingModule } from './modal/app-routing.module';
import { environment } from '../environments/environment';

export function init_app(apiService: NgVoltaApiService, ngVoltaApiStorageService: NgVoltaApiStorageService) {
  return () => {
    ngVoltaApiStorageService.load();
    if (!environment.production || true) {
      apiService.setVOLTAUrl(environment.voltaServerAddress)
    }
  }
}

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
    SoulModule,
    AppRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ReqService, AnalysisService, {provide: APP_INITIALIZER, useFactory: init_app, deps: [NgVoltaApiService, NgVoltaApiStorageService], multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
