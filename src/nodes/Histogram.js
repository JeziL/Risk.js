import * as echarts from 'echarts';
import { histogram } from 'echarts-stat';
import { LiteGraph } from 'litegraph.js';
import { downloadFile } from '../utils';

function Histogram() {
  this.addInput('var', 'RandomVariable');
  this.size = [600, 400];
}

Histogram.title = 'Histogram';
Histogram.widgets = [
  { name: 'resize', text: 'Resize box', type: 'button' },
  { name: 'view', text: 'View Image', type: 'button' }
];

Histogram.prototype.onDrawBackground = function (ctx) {
  if (this.frame && !this.flags.collapsed) {
    ctx.drawImage(this.frame, 0, 0, this.size[0], this.size[1]);
  }
};

Histogram.prototype.onStart = function () {
  const chart = document.createElement('div');
  chart.style.width = '600px';
  chart.style.height = '400px';
  chart.id = 'histchart' + this.id;
  this.chartContainer = chart;
  this.chart = echarts.init(chart, null, { width: 'auto', height: 'auto' });
};

Histogram.prototype.onExecute = function () {
  const rv = this.getInputData(0);
  if (rv !== undefined) {
    rv.sample();
    const bins = histogram(rv.samples, { padBounds: true });
    const option = {
      title: {
        text: this.title,
        left: 'center',
        top: '4%',
        textStyle: {
          color: '#999'
        }
      },
      color: ['rgb(220, 20, 60)'],
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        // boundaryGap: '5%',
        scale: true
      },
      yAxis: {},
      series: [
        {
          name: 'height',
          type: 'bar',
          barWidth: '99.3%',
          barCategoryGap: 0,
          label: {
            show: false,
            position: 'insideTop'
          },
          data: bins.data
        }
      ],
      animation: false
    };
    this.chart.setOption(option);
    this.frame = this.chartContainer.getElementsByTagName('canvas')[0];
    this.rv = rv;
    this.setDirtyCanvas(true);
  }
};

Histogram.prototype.onWidget = function (e, widget) {
  if (widget.name === 'resize' && this.frame) {
    let width = this.frame.width;
    let height = this.frame.height;

    if (!width && this.frame.videoWidth !== null) {
      width = this.frame.videoWidth;
      height = this.frame.videoHeight;
    }

    if (width && height) {
      this.size = [width, height];
    }
    this.setDirtyCanvas(true, true);
  } else if (widget.name === 'view') {
    this.show();
  }
};

Histogram.prototype.getExtraMenuOptions = function () {
  const that = this;
  return [
    {
      content: 'Save...',
      callback: function () {
        if (!that.chart) {
          return;
        }
        const imgData = that.chart.getDataURL({ type: 'png' });
        downloadFile(imgData, `${that.title}.png`, true);
      }
    },
    {
      content: 'Export data...',
      callback: function () {
        if (!that.rv) {
          return;
        }
        const csv = that.rv.samples.join('\n');
        downloadFile(csv, `${that.title}_data.csv`);
      }
    }
  ];
};

LiteGraph.registerNodeType('Risk/Output/Histogram', Histogram);
