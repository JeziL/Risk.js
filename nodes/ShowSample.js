function ShowSample() {
    this.addInput("var", "RandomVariable");
    this.addOutput("current", "number");
    this.addOutput("all", "array");
    this.properties = { precision: 1e-5 };
}

ShowSample.title = "Show Sample";

ShowSample.prototype.onExecute = function () {
    let rv = this.getInputData(0);
    if (rv !== undefined) {
        rv.sample();
        this.setOutputData(0, rv.sampledValue);
        this.setOutputData(1, rv.samples);
    } else {
        this.setOutputData(0, null);
        this.setOutputData(1, null);
    }
}

LiteGraph.registerNodeType("Risk/Output/ShowSample", ShowSample);
