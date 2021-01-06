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

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    RequirementComponent,
    TreeNavigationComponent,
    ReqDetailComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SoulModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ReService],
  bootstrap: [AppComponent]
})
export class AppModule { }