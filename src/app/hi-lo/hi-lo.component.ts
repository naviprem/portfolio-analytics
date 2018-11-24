import {Component, OnInit} from '@angular/core';
import {IextradingService} from "../iextrading.service";
import {LoggerService} from "../logger.service";
import * as d3 from "d3";

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
    this.iextradingService.getStockPriceHistory().subscribe(
      data => {
        if (data && data.length && data.length > 0) {
          const closingValues = data.map(i => {
            return {
              date: new Date(i.date), //date
              close: parseInt(i.close) //convert string to number
            }
          });
          console.log(closingValues);
          this.drawChart(closingValues);
        } else {
          this.logger.error(`Invalid data error`);
        }
      },
      err => {
      }
    );
  }

  ngAfterContentInit() {
    d3.select("p").style("color", "red");
  }

  drawChart(data) {
    var svgWidth = 600, svgHeight = 400;
    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    var svg = d3.select('svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    var g = svg.append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")"
      );
    var x = d3.scaleTime().rangeRound([0, width]);
    var y = d3.scaleLinear().rangeRound([height, 0]);
    var line = d3.line()
      .x(function (d) {
        return x(d.date)
      })
      .y(function (d) {
        return y(d.close)
      })
    x.domain(d3.extent(data, function (d) {
      return d.date
    }));
    y.domain(d3.extent(data, function (d) {
      return d.close
    }));
    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .select(".domain")
      .remove();
    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }

}
