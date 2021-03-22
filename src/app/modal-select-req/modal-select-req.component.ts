import { Component, OnInit } from '@angular/core';
import { ReqService } from '../req.service';

@Component({
  selector: 'app-modal-select-req',
  templateUrl: './modal-select-req.component.html',
  styleUrls: ['./modal-select-req.component.scss']
})
export class ModalSelectReqComponent implements OnInit {

  constructor(public reqService: ReqService) { }
    ngOnInit(): void {

  }

  public isModalOpen = false;

  public open(): void {
    this.isModalOpen = true;
  }

  public close(): void {
    this.isModalOpen = false;
  }

  public executeWhenCloseAnimationEnds(): void {
  }

  public updateSelected(){
    var list = document.getElementById("reqList").getElementsByTagName("li");
    for (var i=0; i< list.length; i++){
      var inputList = list[i].getElementsByTagName("input");
      for (var j=0; j< inputList.length; j++){
        this.reqService.requirements[i].selected = inputList[j].checked;
      }
    }

   
    this.isModalOpen = false;
  }
}



