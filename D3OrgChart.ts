import { OrgChart } from 'd3-org-chart';

export default class D3OrgChart {
  chart: OrgChart;
  constructor(data) {
    if (data) {
      this.chart = this.render(data);
    }
  }

  render(data): void {
    if (data) {
      this.chart = new OrgChart()
        .container('#chart')
        .svgHeight(250)
        .data(data)
        .childrenMargin((d) => 1)
        .nodeContent(
          (d) => `
      <div class="circle">
      ${d.data.value}
      </div>
      `
        )
        .initialZoom(0.2)
        .render();
      this.chart.expandAll();
    }
  }
}
