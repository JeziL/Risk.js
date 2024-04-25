/* eslint-disable no-undef */
import * as echarts from 'echarts';
import { LiteGraph } from 'litegraph.js';
import { downloadFile } from '../utils';

function Sensitivity() {
  this.addInput('var', 'RandomVariable');
  this.size = [600, 400];
}

Sensitivity.title = 'Sensitivity';

Sensitivity.widgets = [
  { name: 'resize', text: 'Resize box', type: 'button' },
  { name: 'view', text: 'View Image', type: 'button' }
];

Sensitivity.prototype.onDrawBackground = function (ctx) {
  if (this.frame && !this.flags.collapsed) {
    ctx.drawImage(this.frame, 0, 0, this.size[0], this.size[1]);
  }
};

Sensitivity.prototype.onStart = function () {
  const chart = document.createElement('div');
  chart.style.width = '600px';
  chart.style.height = '400px';
  chart.id = 'senschart' + this.id;
  this.chartContainer = chart;
  this.chart = echarts.init(chart, null, { width: 'auto', height: 'auto' });
};

Sensitivity.prototype.onExecute = function () {
  const rv = this.getInputData(0);
  if (rv !== undefined) {
    rv.sample();
    const inputs = [];
    _ctx.randomVariables.forEach((input) => {
      if (input.name !== '') {
        inputs.push(input);
      }
    });
    const edges = _ctx.sensitivityAnalyze(inputs, rv, 10);
    const barValuesP = [];
    const barValuesN = [];
    const placeholderValues = [];
    edges.forEach((e) => {
      if (e.edges[0] >= 0) {
        barValuesP.push(e.edges[1] - e.edges[0]);
        placeholderValues.push(e.edges[0]);
        barValuesN.push(0);
      } else if (e.edges[1] <= 0) {
        barValuesN.push(e.edges[0] - e.edges[1]);
        barValuesP.push(0);
        placeholderValues.push(e.edges[1]);
      } else {
        barValuesP.push(e.edges[1]);
        barValuesN.push(e.edges[0]);
        placeholderValues.push(0);
      }
    });
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
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax'
      },
      yAxis: {
        type: 'category',
        data: edges.map((e) => e.name)
      },
      series: [
        {
          name: 'Placeholder',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          },
          emphasis: {
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent'
            }
          },
          data: placeholderValues
        },
        {
          name: 'P',
          type: 'bar',
          stack: 'Total',
          label: {
            show: false,
            position: 'inside'
          },
          data: barValuesP
        },
        {
          name: 'N',
          type: 'bar',
          stack: 'Total',
          label: {
            show: false,
            position: 'inside'
          },
          data: barValuesN
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

Sensitivity.prototype.onWidget = function (e, widget) {
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

Sensitivity.prototype.getExtraMenuOptions = function () {
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

LiteGraph.registerNodeType('Risk/Output/Sensitivity', Sensitivity);
