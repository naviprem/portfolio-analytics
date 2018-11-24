import { Component, OnInit } from '@angular/core';
import {IextradingService} from "../iextrading.service";
import {LoggerService} from "../logger.service";

@Component({
  selector: 'app-hi-lo',
  templateUrl: './hi-lo.component.html',
  styleUrls: ['./hi-lo.component.css']
})
export class HiLoComponent implements OnInit {

  private logger = new LoggerService(this.constructor.name);

  constructor(private iextradingService: IextradingService) { }

  ngOnInit() {
    this.iextradingService.getStockPriceHistory().subscribe(
      data => {
        if(data && data.length && data.length > 0) {
          const closingValues = data.map(price => price.close);
          console.log(closingValues);
        } else {
          this.logger.error(`Invalid data error`);
        }
      },
      err => {}
    );
  }

}
