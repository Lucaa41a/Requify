import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { ApiKey, NgVoltaApiAuthenticationService, NgVoltaApiService } from '@proservices/ng-volta-api';
import { AnalysisService } from '../analysis.service';
import { parse } from 'papaparse';

@Component({
  selector: 'doc-modal-results',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  public data = "";
  public proj=[];
  @Input() sessionList;
  public show = false;
  public selected = "";
  @Output() sessionListEvent = new EventEmitter<Object>();
  key = "0ee574dd-e38b-49d9-9a9c-dd05b9393cb4";


  constructor(private authService: NgVoltaApiAuthenticationService, private voltaApiService: NgVoltaApiService, private analysisService: AnalysisService) {
  }

  search(projName : string){
    this.authService.login(new ApiKey(this.key), false) // ApiKey
    //  .subscribe((out) => console.log(out));
    this.voltaApiService.search(projName).subscribe((items) => {
      var temp = [];
      for(var i=0; i<items.length; i++){
        if(items[i].type == "session"){
          temp.push(items[i]);
          this.proj = temp;
          this.show = true;
          this.sessionListEvent.emit(temp);
        }
      }
    });

  }

  carica(){    
    this.authService.login(new ApiKey(this.key), false) // ApiKey
   //   .subscribe((out) => console.log(out));
    this.voltaApiService.getSessionData(this.selected)
      .subscribe((session) => {
        session.text().then((data) => {
          parse(data, {
            complete: (results) => {
              this.analysisService.addData(results.data);
            }
          });
        });
      })
        
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


}

