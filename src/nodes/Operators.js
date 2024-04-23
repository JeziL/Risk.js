import { LiteGraph } from 'litegraph.js';
import { RandomVariable } from '../jsrisk';

function Add() {
  this.addInput('A', 'RandomVariable,number');
  this.addInput('B', 'RandomVariable,number');
  this.addOutput('A+B', 'RandomVariable');
  this.properties = { precision: 1e-5 };
}

Add.title = '+';

Add.prototype.onStart = function () {
  this.rv = null;
};

Add.prototype.onExecute = function () {
  if (!this.rv) {
    const a = this.getInputData(0);
    const b = this.getInputData(1);
    if (a !== undefined && b !== undefined) {
      this.rv = a.add(b);
    }
  }

  this.setOutputData(0, this.rv);
};

function Substract() {
  this.addInput('A', 'RandomVariable,number');
  this.addInput('B', 'RandomVariable,number');
  this.addOutput('A-B', 'RandomVariable');
  this.properties = { precision: 1e-5 };
}

Substract.title = '-';

Substract.prototype.onStart = function () {
  this.rv = null;
};

Substract.prototype.onExecute = function () {
  if (!this.rv) {
    const a = this.getInputData(0);
    const b = this.getInputData(1);
    if (a !== undefined && b !== undefined) {
      this.rv = a.substract(b);
    }
  }

  this.setOutputData(0, this.rv);
};

function Multiply() {
  this.addInput('A', 'RandomVariable,number');
  this.addInput('B', 'RandomVariable,number');
  this.addOutput('A×B', 'RandomVariable');
  this.properties = { precision: 1e-5 };
}

Multiply.title = '×';

Multiply.prototype.onStart = function () {
  this.rv = null;
};

Multiply.prototype.onExecute = function () {
  if (!this.rv) {
    const a = this.getInputData(0);
    const b = this.getInputData(1);
    if (a !== undefined && b !== undefined) {
      this.rv = a.multiply(b);
    }
  }

  this.setOutputData(0, this.rv);
};

function Divide() {
  this.addInput('A', 'RandomVariable,number');
  this.addInput('B', 'RandomVariable,number');
  this.addOutput('A÷B', 'RandomVariable');
  this.properties = { precision: 1e-5 };
}

Divide.title = '÷';

Divide.prototype.onStart = function () {
  this.rv = null;
};

Divide.prototype.onExecute = function () {
  if (!this.rv) {
    const a = this.getInputData(0);
    const b = this.getInputData(1);
    if (a !== undefined && b !== undefined) {
      this.rv = a.divide(b);
    }
  }

  this.setOutputData(0, this.rv);
};

function Pow() {
  this.addInput('A', 'RandomVariable,number');
  this.addInput('B', 'RandomVariable,number');
  this.addOutput('A^B', 'RandomVariable');
  this.properties = { precision: 1e-5 };
}

Pow.title = '^';

Pow.prototype.onStart = function () {
  this.rv = null;
};

Pow.prototype.onExecute = function () {
  if (!this.rv) {
    const a = this.getInputData(0);
    const b = this.getInputData(1);
    if (a !== undefined && b !== undefined) {
      this.rv = a.pow(b);
    }
  }

  this.setOutputData(0, this.rv);
};

function Max() {
  this.addInput('A', 'RandomVariable,number');
  this.addInput('B', 'RandomVariable,number');
  this.addOutput('max(A, B)', 'RandomVariable');
  this.properties = { precision: 1e-5 };
}

Max.title = 'Max';

Max.prototype.onStart = function () {
  this.rv = null;
};

Max.prototype.onExecute = function () {
  if (!this.rv) {
    const a = this.getInputData(0);
    const b = this.getInputData(1);
    if (a !== undefined && b !== undefined) {
      this.rv = RandomVariable.max(a, b);
    }
  }

  this.setOutputData(0, this.rv);
};

function Min() {
  this.addInput('A', 'RandomVariable,number');
  this.addInput('B', 'RandomVariable,number');
  this.addOutput('min(A, B)', 'RandomVariable');
  this.properties = { precision: 1e-5 };
}

Min.title = 'Min';

Min.prototype.onStart = function () {
  this.rv = null;
};

Min.prototype.onExecute = function () {
  if (!this.rv) {
    const a = this.getInputData(0);
    const b = this.getInputData(1);
    if (a !== undefined && b !== undefined) {
      this.rv = RandomVariable.min(a, b);
    }
  }

  this.setOutputData(0, this.rv);
};

function MathOp() {
  this.addInput('A', 'RandomVariable');
  this.properties = { op: 'sin', precision: 1e-5 };
  this.addWidget('combo', 'Operation', this.properties.op, {
    property: 'op',
    values: [
      'clz32',
      'sign',
      'log10',
      'log2',
      'log1p',
      'expm1',
      'cosh',
      'sinh',
      'tanh',
      'acosh',
      'asinh',
      'atanh',
      'trunc',
      'fround',
      'cbrt',
      'abs',
      'acos',
      'asin',
      'atan',
      'ceil',
      'cos',
      'exp',
      'floor',
      'log',
      'round',
      'sin',
      'sqrt',
      'tan'
    ]
  });
  this.addOutput('Math.op(A)', 'RandomVariable');
}

MathOp.title = 'Math';

MathOp.prototype.onStart = function () {
  this.rv = null;
};

MathOp.prototype.onExecute = function () {
  if (!this.rv) {
    const a = this.getInputData(0);
    if (a !== undefined && this.properties.op !== '') {
      this.rv = a.math(this.properties.op);
    }
  }

  this.setOutputData(0, this.rv);
};

function Condition() {
  this.addInput('A', 'RandomVariable,number');
  this.addInput('B', 'RandomVariable,number');
  this.addOutput('result', 'RandomVariable');
  this.addProperty('A', 1);
  this.addProperty('B', 1);
  this.addProperty('OP', '>', 'enum', { values: Condition.values });
  this.addWidget('combo', 'Cond.', this.properties.OP, { property: 'OP', values: Condition.values });
}

Condition.values = ['>', '<', '==', '!=', '<=', '>='];
Condition['@OP'] = {
  type: 'enum',
  title: 'operation',
  values: Condition.values
};

Condition.title = 'Condition';

Condition.prototype.getTitle = function () {
  return 'A ' + this.properties.OP + ' B?';
};

Condition.prototype.onStart = function () {
  this.rv = null;
};

Condition.prototype.onExecute = function () {
  if (!this.rv) {
    const A = this.getInputData(0);
    const B = this.getInputData(1);
    if (A !== undefined && B !== undefined) {
      const ctx = A.context ? A.context : B.context;
      switch (this.properties.OP) {
        case '>':
          this.rv = new RandomVariable(null, ctx, () => (A.sample() > B.sample() ? 1 : 0));
          break;
        case '<':
          this.rv = new RandomVariable(null, ctx, () => (A.sample() < B.sample() ? 1 : 0));
          break;
        case '==':
          this.rv = new RandomVariable(null, ctx, () => (A.sample() === B.sample() ? 1 : 0));
          break;
        case '!=':
          this.rv = new RandomVariable(null, ctx, () => (A.sample() !== B.sample() ? 1 : 0));
          break;
        case '<=':
          this.rv = new RandomVariable(null, ctx, () => (A.sample() <= B.sample() ? 1 : 0));
          break;
        case '>=':
          this.rv = new RandomVariable(null, ctx, () => (A.sample() >= B.sample() ? 1 : 0));
          break;
      }
    }
  }

  this.setOutputData(0, this.rv);
};

LiteGraph.registerNodeType('Risk/Operators/Add', Add);
LiteGraph.registerNodeType('Risk/Operators/Substract', Substract);
LiteGraph.registerNodeType('Risk/Operators/Multiply', Multiply);
LiteGraph.registerNodeType('Risk/Operators/Divide', Divide);
LiteGraph.registerNodeType('Risk/Operators/Pow', Pow);
LiteGraph.registerNodeType('Risk/Operators/Math', MathOp);
LiteGraph.registerNodeType('Risk/Operators/Max', Max);
LiteGraph.registerNodeType('Risk/Operators/Min', Min);
LiteGraph.registerNodeType('Risk/Operators/Condition', Condition);
