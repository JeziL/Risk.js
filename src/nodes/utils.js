import jStat from 'jstat';
import { RandomVariable } from '../jsrisk';
import { LiteGraph } from 'litegraph.js';

function Deg2rad() {
  this.addInput('deg', 'number');
  this.addOutput('rad', 'number');
  this.properties = { precision: 1e-5 };
}

Deg2rad.title = 'Degree to Radian';

Deg2rad.prototype.onExecute = function () {
  var A = this.getInputData(0);
  if (A === undefined) {
    A = 0;
  }
  this.setOutputData(0, (A / 180) * Math.PI);
};

function PI() {
  this.addOutput('π', 'number');
  this.properties = { precision: 1e-5 };
}

PI.title = 'PI';

PI.prototype.onExecute = function () {
  this.setOutputData(0, Math.PI);
};

function E() {
  this.addOutput('e', 'number');
  this.properties = { precision: 1e-5 };
}

E.title = 'E';

E.prototype.onExecute = function () {
  this.setOutputData(0, Math.E);
};

function NormalCDF() {
  this.addInput('var_in', 'RandomVariable');
  this.addInput('mean', 'number');
  this.addInput('std', 'number');
  this.addOutput('var', 'RandomVariable');
  this.properties = { precision: 1e-5 };
}

NormalCDF.title = 'Normal CDF';

NormalCDF.prototype.onStart = function () {
  this.rv = null;
};

NormalCDF.prototype.onExecute = function () {
  if (!this.rv) {
    const A = this.getInputData(0);
    let B = this.getInputData(1);
    if (B === undefined) {
      B = 0;
    }
    let C = this.getInputData(2);
    if (C === undefined) {
      C = 1;
    }

    this.rv = new RandomVariable(null, A.context, () => jStat.normal.cdf(A.sample(), B, C));
  }
  this.setOutputData(0, this.rv);
};

LiteGraph.registerNodeType('utils/deg2rad', Deg2rad);
LiteGraph.registerNodeType('utils/pi', PI);
LiteGraph.registerNodeType('utils/e', E);
LiteGraph.registerNodeType('utils/NormalCDF', NormalCDF);
