import { Component, OnInit, Input } from '@angular/core';
import { ReqService } from '../req.service';

@Component({
  selector: 'app-req-detail',
  templateUrl: './req-detail.component.html',
  styleUrls: ['./req-detail.component.scss']
})
export class ReqDetailComponent implements OnInit {
  @Input() detailId;
  public detail;

  constructor(public reqService: ReqService) {  }

  ngOnInit(): void {
  }

}


