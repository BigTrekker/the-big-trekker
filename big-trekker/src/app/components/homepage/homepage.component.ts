import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/auth';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(protected token: TokenService) { }

  ngOnInit() {
  }

}
