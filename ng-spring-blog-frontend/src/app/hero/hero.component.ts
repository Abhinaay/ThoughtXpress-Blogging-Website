import { Component, OnInit } from '@angular/core';
import {DynamicLoaderService} from 'angular-dynamic-loader';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor(private loader: DynamicLoaderService) { }

  ngOnInit(): void {
    this.loader.show();
    setTimeout(() => {
      /** spinner ends after 3 seconds */
      this.loader.hide();
    }, 3000);
  }

}
