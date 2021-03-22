import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ReqService } from '../req.service';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
})
export class RequirementComponent implements OnInit {

  @Input('reqElement') reqEl:number;

  @Output() detailSelected = new EventEmitter<Object>();

  req;

  constructor(public reqService: ReqService) { }
    ngOnInit(): void {
      this.req = this.reqService.requirements[this.reqEl];
    }

  showDetail(){
    this.detailSelected.emit(this.reqService.requirements[this.reqEl]);
  }

  getStyle(){
    var style = {};
    if(this.reqService.requirements[this.reqEl].selected){
      style["backgroundColor"] = 'hsl(125, 39%, 94%)';
    } else{
      style["backgroundColor"] = '';
    }
    if(!this.req.formulation || this.req.missingParam.length>0){
      style["color"] = 'red';
    } else {
      style["color"] = '';
    }
    return style;
  }
}
