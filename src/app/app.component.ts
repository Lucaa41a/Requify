import { Component } from '@angular/core';
import { ReService } from './re.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Requify';
  detailSelected:Object = null;
  
  constructor(public reqService: ReService){};

  closeReq(){
    this.reqService.requirements = [];
    this.detailSelected=null;
  }
}

