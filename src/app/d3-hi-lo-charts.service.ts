import { Injectable } from '@angular/core';
import * as d3 from "d3";

@Injectable({
  providedIn: 'root'
})
export class D3HiLoChartsService {

  static tootTip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background", "lightsteelblue")
    .style("opacity", 0);

  static toolTipOnMouseOver = d => {
    D3HiLoChartsService.tootTip.transition()
      .duration(200)
      .style("opacity", .9);
    D3HiLoChartsService.tootTip.html(d.close)
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
  };

  static toolTipOnMouseOut = d => {
    D3HiLoChartsService.tootTip.transition()
      .duration(500)
      .style("opacity", 0);
  };

  constructor() { }

  static draw(index, symbol, data: any[], his: any[], los: any[]) {
    const svgWidth = 1000, svgHeight = 200;
    const margin = {top: 50, right: 10, bottom: 30, left: 50};
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3
      .select(`div.charts`)
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const g = svg.append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")"
      );
    const x = d3.scaleTime().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const line = d3.line()
      .x((d:any) => x(d.date))
      .y((d:any) => y(d.close));



    x.domain(d3.extent(data, (d) => d.date));
    y.domain(d3.extent(data, (d) => d.close));

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .call(d3.axisLeft(y));

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => x(d.date))
      .attr("cy", (d, i) => y(d.close))
      .attr("r", 2)
      .attr("fill", 'steelblue')
      .attr("opacity", .5);

    g.selectAll("circle.his")
      .data(his)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => x(d.date))
      .attr("cy", (d, i) => y(d.close))
      .attr("r", 4)
      .attr("fill", 'green')
      .attr("opacity", 1)
      .on("mouseover", D3HiLoChartsService.toolTipOnMouseOver)
      .on("mouseout", D3HiLoChartsService.toolTipOnMouseOut );

    g.selectAll("circle.los")
      .data(los)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => x(d.date))
      .attr("cy", (d, i) => y(d.close))
      .attr("r", 4)
      .attr("fill", 'red')
      .attr("opacity", 1)
      .on("mouseover", D3HiLoChartsService.toolTipOnMouseOver)
      .on("mouseout", D3HiLoChartsService.toolTipOnMouseOut );

    g.append("g")
      .append("text")
      .attr("transform", "translate(-50, -20)")
      .text(symbol);
  }

}
