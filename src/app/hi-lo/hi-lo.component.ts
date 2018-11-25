import {Component, OnInit} from '@angular/core';
import {IextradingService} from "../iextrading.service";
import {LoggerService} from "../logger.service";
import * as d3 from "d3";
import {MatCardModule} from '@angular/material/card';
import {D3HiLoChartsService} from "../d3-hi-lo-charts.service";

@Component({
  selector: 'app-hi-lo',
  templateUrl: './hi-lo.component.html',
  styleUrls: ['./hi-lo.component.css']
})
export class HiLoComponent implements OnInit {

  private logger = new LoggerService(this.constructor.name);

  constructor(private iextradingService: IextradingService) {
  }

  ngOnInit() {
    this.iextradingService.getStockPriceHistory("aapl,tsla,fb").subscribe(
      data => {
        Object.keys(data).forEach((symbol, index) => {
          if (data.hasOwnProperty(symbol) && data[symbol].chart && Array.isArray(data[symbol].chart)) {
            const chart = data[symbol].chart;
            const dataPts = chart.map(HiLoComponent.mapDataPts);
            const his = [];
            const los = [];
            if (HiLoComponent.findHiLos(dataPts, his, los)) {
              D3HiLoChartsService.draw(index, symbol, dataPts, his, los);
            } else {
              this.logger.error(`Cannot find Hi-Los for ${symbol}`);
            }
          } else {
            this.logger.error(`Invalid data error for ${symbol}`);
          }
        });
      },
      err => {
      }
    );
  }

  static mapDataPts(i: any) {
    return {
      date: new Date(i.date),
      close: +i.close,
      open: +i.open,
      high: +i.high,
      low: +i.low,
      volume: +i.volume,
      unadjustedVolume: +i.unadjustedVolume,
      change: +i.change,
      changePercent: +i.changePercent,
      vwap: +i.vwap,
      label: i.label,
      changeOverTime: +i.changeOverTime
    };
  }

  static findHiLos(dataPts: any[], his: any[], los: any[]) {
    if (Array.isArray(dataPts) && dataPts.length > 3) {
      let upwards = dataPts[0].close < dataPts[1].close;
      let curr = dataPts[0];
      const marginPercent = .05;

      for (let i = 1; i < dataPts.length; i++) {
        if (upwards) {
          if (dataPts[i].close > curr.close) {
            curr = dataPts[i];
          } else {
            if ((curr.close - dataPts[i].close) > (curr.close * marginPercent)) {
              his.push(curr);
              upwards = false;
              curr = dataPts[i];
            }
          }
        } else {
          if (dataPts[i].close < curr.close) {
            curr = dataPts[i];
          } else {
            if ((dataPts[i].close - curr.close) > (curr.close * marginPercent)) {
              los.push(curr);
              upwards = true;
              curr = dataPts[i];
            }
          }
        }
      }
      return true;
    } else {
      return false;
    }
  }



}
