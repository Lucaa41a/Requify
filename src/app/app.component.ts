import { Component } from '@angular/core';
import { AnalysisService } from './analysis.service';
import { ReService } from './re.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Requify';
  detailSelected:Object = null;
  
  constructor(public reqService: ReService, public analysisService:AnalysisService){};

  closeReq(){
    this.reqService.requirements = [];
    this.detailSelected=null;
  }

  closeAnalysis(){
    this.analysisService.analysisJSON = null;
    this.detailSelected=null;
  }
}

