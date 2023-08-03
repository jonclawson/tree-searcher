import { OrgChart } from 'd3-org-chart';

export default class D3OrgChart {
  chart: OrgChart;
  constructor(data) {
    if (data) {
      this.chart = this.render(data);
    }
  }

  render(data): void {
    // const test = document.querySelector('#chart').innerHTML;
    console.log(data);
    if (data) {
      this.chart = new OrgChart()
        .container('#chart')
        .data(data)
        .childrenMargin((d) => 0.1)
        .nodeContent(
          (d) => `
      <div class="circle">
      ${d.data.value}
      </div>
      `
        )
        .initialZoom(.2)
        .render();
      this.chart.expandAll();
    }
  }
}
