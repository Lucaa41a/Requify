import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { ApiKey, NgVoltaApiAuthenticationService, NgVoltaApiService } from '@proservices/ng-volta-api';

@Component({
  selector: 'doc-modal-neutral',
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
  ses = "86d527d8-18a8-445f-ba42-6dfec70b5928";
  file = "fa683e84-e0a2-4f42-9de4-857d5c38ffbe";
  model = "5e7ea0ff-681d-460e-8aff-4e9c6b6eeec3";
  projID = "1683a68e-30c3-40b9-b906-31cf63d52a16";

  constructor(private authService: NgVoltaApiAuthenticationService, private voltaApiService: NgVoltaApiService) {
  }

  go() {
    this.authService.login(new ApiKey(this.key), false) // ApiKey
      .subscribe((out) => console.log(out));
    // this.voltaApiService.getSessionData(session).subscribe((session) => { session.text().then((data) => this.data = data);     })
    //this.voltaApiService.getSession(this.ses).subscribe((session) => { console.log(session);   })         // funziona
    //this.voltaApiService.getDOESessionsByModelId(this.model).subscribe((session) => {console.log(session);   }) 

   // this.voltaApiService.getProjectModels(this.projID).subscribe((session) => { console.log(session);   })      // l'item non è un project
   // this.voltaApiService.getItem(this.projID).subscribe((item) => {console.log(item)});                         // l'item è un project

 //   this.voltaApiService.getMyFiles().subscribe((session) => { console.log(session)});

    this.voltaApiService.search("beam").subscribe((item) => {console.log(item)});

      
  }

  search(projName : string){
 //   this.proj = projName;
    this.authService.login(new ApiKey(this.key), false) // ApiKey
      .subscribe((out) => console.log(out));
    this.voltaApiService.search(projName).subscribe((items) => {
      var temp = [];
      for(var i=0; i<items.length; i++){
        if(items[i].type == "session"){
          console.log(items[i]);
          temp.push(items[i]);
          this.proj = temp;
          this.show = true;
          this.sessionListEvent.emit(temp);
        }
      }
    });

  }

  carica(){
    console.log(this.selected);
    /*
    this.authService.login(new ApiKey(this.key), false) // ApiKey
      .subscribe((out) => console.log(out));
    this.voltaApiService.getSessionData(this.selected)
      .subscribe((session) => {
        session.text().then((data) => {
          this.data = data;
          console.log(data);
          // salvare nel service l'analisi
        });
      })
      */
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

