import { Component } from '@angular/core';
import { AnalysisService } from './analysis.service';
import { ReqService } from './req.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Requify';
  detailSelected:Object = null;
  showAnalysis:boolean = false;
  sessionList = [];
  
  constructor(public reqService: ReqService, public analysisService:AnalysisService){};

  closeReq(){
    this.reqService.requirements = [];
    this.detailSelected = null;
  }

  closeAnalysis(){
    this.analysisService.close();
    this.detailSelected = null;
    this.showAnalysis = false;
  }

}

