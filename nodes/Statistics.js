stats = ["mean", "min", "max", "median", "stdev"];

function Statistics() {
    this.addInput("var", "RandomVariable");
    this.addInput("more_input", "number,array");
    stats.forEach(stat => {
        this.addOutput(stat, "number");
    });
    this.addOutput("more_output", "number,array");
    this.properties = { precision: 1e-5, custom_stat: "sum" };
    this.addWidget("combo", "more...", this.properties.custom_stat, { property: "custom_stat", values: ["sum", "sumsqrd", "sumsqerr", "sumrow", "product", "meansqerr", "geomean", "cumsum", "cumprod", "diff", "rank", "mode", "range", "variance", "pooledvariance", "deviation", "pooledstdev", "meandev", "meddev", "skewness", "kurtosis", "coeffvar", "quartiles", "quantiles", "percentile", "percentileOfScore"] } );
}

Statistics.title = "Statistics";

Statistics.prototype.onExecute = function () {
    const rv = this.getInputData(0);
    const alt_input = this.getInputData(1);
    if (rv !== undefined) {
        rv.sample();
        for (let i = 0; i < stats.length; i++) {
            this.setOutputData(i, jStat[stats[i]](rv.samples));
        }
        if (this.properties.custom_stat && jStat[this.properties.custom_stat]) {
            if (["quantiles", "percentile", "percentileOfScore"].includes(this.properties.custom_stat) && alt_input) {
                this.setOutputData(stats.length, jStat[this.properties.custom_stat](rv.samples, alt_input));
            } else {
                this.setOutputData(stats.length, jStat[this.properties.custom_stat](rv.samples));
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
}

Statistics.prototype.getExtraMenuOptions = function () {
    const that = this;
    return [
        {
            content: "Export data...",
            callback: function () {
                if (!that.rv) return;
                const csv = that.rv.samples.join("\n");
                downloadFile(csv, `sample_data.csv`);
            }
        }
    ];
};

LiteGraph.registerNodeType("Risk/Output/Statistics", Statistics);
