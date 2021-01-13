import { Component, OnInit } from '@angular/core';
import {AnalysisService} from '../analysis.service';

@Component({
  selector: 'app-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss']
})
export class AnalysisDetailComponent implements OnInit {

  constructor(public analysisService: AnalysisService) { }
  ngOnInit(): void {
  }

  format(value){
    var numb;
    numb = Math.round(parseFloat(value)*100)/100;
    if(numb){
      return numb;
    } else {
      return value;
    }
  }

}
