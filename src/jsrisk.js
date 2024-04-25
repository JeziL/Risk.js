/* eslint-disable no-extend-native */
import jStat from 'jstat';

class RandomVariable {
  constructor(dist, context, sampler = null, name = '') {
    this.dist = dist;
    this.context = context;
    this.sampler = sampler;
    this.name = name;
    this.samples = [];
    this.sampledValue = null;
    this.context.register(this);
  }

  sample() {
    if (this.sampledValue === null) {
      let sample = null;
      if (this.sampler) {
        sample = this.sampler();
      } else {
        sample = this.dist.sample();
      }
      this.samples.push(sample);
      this.sampledValue = sample;
    }
    return this.sampledValue;
  }

  clear() {
    this.sampledValue = null;
  }

  reset() {
    this.clear();
    this.samples = [];
  }

  add(other) {
    return new RandomVariable(null, this.context, () => this.sample() + other.sample());
  }

  substract(other) {
    return new RandomVariable(null, this.context, () => this.sample() - other.sample());
  }

  multiply(other) {
    return new RandomVariable(null, this.context, () => this.sample() * other.sample());
  }

  divide(other) {
    return new RandomVariable(null, this.context, () => this.sample() / other.sample());
  }

  pow(other) {
    return new RandomVariable(null, this.context, () => Math.pow(this.sample(), other.sample()));
  }

  math(op) {
    return new RandomVariable(null, this.context, () => Math[op](this.sample()));
  }

  static min(a, b) {
    return new RandomVariable(null, a.context ? a.context : b.context, () => Math.min(a.sample(), b.sample()));
  }

  static max(a, b) {
    return new RandomVariable(null, a.context ? a.context : b.context, () => Math.max(a.sample(), b.sample()));
  }
}

class SampleContext {
  constructor() {
    this.randomVariables = new Set();
  }

  register(rv) {
    this.randomVariables.add(rv);
  }

  sensitivityAnalyze(inputs, target, binCounts) {
    const edges = [];
    inputs.forEach((rv) => {
      const comb = rv.samples.map((value, index) => ({ value, index }));
      comb.sort((a, b) => b.value - a.value);
      const orderedTargets = comb.map((item) => target.samples[item.index]);
      const means = [];
      const binLen = Math.round(rv.samples.length / binCounts);
      for (let i = 0; i < binCounts; i++) {
        means.push(jStat(orderedTargets.slice(i * binLen, (i + 1) * binLen)).mean());
      }
      edges.push({ name: rv.name, edges: [jStat(means).min(), jStat(means).max()] });
    });
    edges.sort((a, b) => {
      const barLen = Math.abs(a.edges[1] - a.edges[0]) - Math.abs(b.edges[1] - b.edges[0]);
      if (barLen !== 0) {
        return barLen;
      }
      return a.name.localeCompare(b.name);
    });
    return edges;
  }

  clear() {
    this.randomVariables.forEach((rv) => rv.clear());
  }

  reset() {
    this.randomVariables.forEach((rv) => rv.reset());
  }
}

Number.prototype.sample = function () {
  return this.valueOf();
};

Number.prototype.add = function (rv) {
  return new RandomVariable(null, rv.context, () => rv.sample() + this.valueOf());
};

Number.prototype.substract = function (rv) {
  return new RandomVariable(null, rv.context, () => this.valueOf() - rv.sample());
};

Number.prototype.multiply = function (rv) {
  return new RandomVariable(null, rv.context, () => rv.sample() * this.valueOf());
};

Number.prototype.divide = function (rv) {
  return new RandomVariable(null, rv.context, () => this.valueOf() / rv.sample());
};

Number.prototype.pow = function (rv) {
  return new RandomVariable(null, rv.context, () => Math.pow(this.valueOf(), rv.sample()));
};

export { RandomVariable, SampleContext };
