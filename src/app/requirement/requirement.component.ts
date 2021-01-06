import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
})
export class RequirementComponent implements OnInit {
  @Input('reqElement') reqEl: {Name:string, Text:string, Constraints:object};
  @Output() detailSelected = new EventEmitter<Object>();
  constructor() { }

  ngOnInit(): void {
  }

  showDetail(){
    this.detailSelected.emit(this.reqEl);
  }
}
