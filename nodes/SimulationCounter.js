function SimulationCounter() {
    this.properties = { times: 100, counter: 0, prog: 0 };
    this.times_widget = this.addWidget("number", "times", this.properties.times, "times", { precision: 0, step: 10, min: 0 });
    this.iter_widget = this.addWidget("text", "current", this.properties.counter, "counter");
}

SimulationCounter.title = "Simulation Counter";

SimulationCounter.prototype.onStart = function () {
    this.properties.counter = 0;
    this.properties.prog = this.properties.counter / this.properties.times;
    this.iter_widget.value = this.properties.counter;
}

SimulationCounter.prototype.onExecute = function () {
    this.properties.counter++;
    this.properties.prog = this.properties.counter / this.properties.times;
    this.iter_widget.value = this.properties.counter;
    if (this.properties.counter >= this.properties.times) {
        let button = document.querySelector("#playnode_button");
        button.innerHTML = "<img src='imgs/icon-play.png'/> Start";
        window.graph.stop();
    }
}

SimulationCounter.prototype.onDrawForeground = function(ctx) {
    ctx.lineWidth = 1;
    ctx.fillStyle = "#dc143c";
    var v = this.properties.prog;
    v = Math.min(1, v);
    v = Math.max(0, v);
    ctx.fillRect(2, 2, (this.size[0] - 4) * v, this.size[1] - 4);
};

LiteGraph.registerNodeType("Risk/SimulationCounter", SimulationCounter);
