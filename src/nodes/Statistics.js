import jStat from 'jstat';
import { LiteGraph } from 'litegraph.js';
import { downloadFile } from '../utils';

const stats = ['mean', 'min', 'max', 'median', 'stdev'];

function Statistics() {
  this.addInput('var', 'RandomVariable');
  this.addInput('more_input', 'number,array');
  stats.forEach((stat) => {
    this.addOutput(stat, 'number');
  });
  this.addOutput('more_output', 'number,array');
  this.properties = { precision: 1e-5, customStat: 'sum' };
  this.addWidget('combo', 'more...', this.properties.customStat, {
    property: 'customStat',
    values: [
      'sum',
      'sumsqrd',
      'sumsqerr',
      'sumrow',
      'product',
      'meansqerr',
      'geomean',
      'cumsum',
      'cumprod',
      'diff',
      'rank',
      'mode',
      'range',
      'variance',
      'pooledvariance',
      'deviation',
      'pooledstdev',
      'meandev',
      'meddev',
      'skewness',
      'kurtosis',
      'coeffvar',
      'quartiles',
      'quantiles',
      'percentile',
      'percentileOfScore'
    ]
  });
}

Statistics.title = 'Statistics';

Statistics.prototype.onExecute = function () {
  const rv = this.getInputData(0);
  const altInput = this.getInputData(1);
  if (rv !== undefined) {
    rv.sample();
    for (let i = 0; i < stats.length; i++) {
      this.setOutputData(i, jStat[stats[i]](rv.samples));
    }
    if (this.properties.customStat && jStat[this.properties.customStat]) {
      if (['quantiles', 'percentile', 'percentileOfScore'].includes(this.properties.customStat) && altInput) {
        this.setOutputData(stats.length, jStat[this.properties.customStat](rv.samples, altInput));
      } else {
        this.setOutputData(stats.length, jStat[this.properties.customStat](rv.samples));
      }
    } else {
      this.setOutputData(stats.length, null);
    }
  } else {
    for (let i = 0; i <= stats.length; i++) {
      this.setOutputData(i, null);
    }
  }
  this.rv = rv;
};

Statistics.prototype.getExtraMenuOptions = function () {
  const that = this;
  return [
    {
      content: 'Export data...',
      callback: function () {
        if (!that.rv) {
          return;
        }
        const csv = that.rv.samples.join('\n');
        downloadFile(csv, 'sample_data.csv');
      }
    }
  ];
};

LiteGraph.registerNodeType('Risk/Output/Statistics', Statistics);
