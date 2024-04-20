function Histogram() {
    this.addInput("var", "RandomVariable");
    this.size = [600, 400];
}

Histogram.title = "Histogram";
Histogram.widgets = [
    { name: "resize", text: "Resize box", type: "button" },
    { name: "view", text: "View Image", type: "button" }
];

Histogram.prototype.onDrawBackground = function (ctx) {
    if (this.frame && !this.flags.collapsed) {
        ctx.drawImage(this.frame, 0, 0, this.size[0], this.size[1]);
    }
};

Histogram.prototype.onExecute = function () {
    const rv = this.getInputData(0);
    if (rv !== undefined) {
        rv.sample();
        const chart = document.createElement("div");
        chart.style.width = "600px";
        chart.style.height = "400px";
        chart.id = "histchart" + this.id;
        const myChart = echarts.init(chart);

        const bins = ecStat.histogram(rv.samples, { padBounds: true });
        const option = {
            title: {
                text: this.title,
                left: "center",
                top: "4%",
                textStyle: {
                    color: "#999"
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
                scale: true,
            },
            yAxis: {
            },
            series: [{
                name: 'height',
                type: 'bar',
                barWidth: '99.3%',
                barCategoryGap: 0,
                label: {
                    normal: {
                        show: false,
                        position: 'insideTop'
                    }
                },
                data: bins.data
            }],
            animation: false
        };
        myChart.setOption(option);

        this.frame = chart.getElementsByTagName("canvas")[0];
        this.chart = myChart;
        this.setDirtyCanvas(true);
    }
};

Histogram.prototype.onWidget = function (e, widget) {
    if (widget.name == "resize" && this.frame) {
        let width = this.frame.width;
        let height = this.frame.height;

        if (!width && this.frame.videoWidth != null) {
            width = this.frame.videoWidth;
            height = this.frame.videoHeight;
        }

        if (width && height) {
            this.size = [width, height];
        }
        this.setDirtyCanvas(true, true);
    } else if (widget.name == "view") {
        this.show();
    }
};

Histogram.prototype.show = function () {
    if (showElement && this.frame) {
        showElement(this.frame);
    }
};

// By ChatGPT
function downloadBase64File(base64Data, fileName) {
    // Split the base64 string into the actual base64 data and the MIME type
    const [mimeInfo, base64] = base64Data.split(',');
    const mime = mimeInfo.match(/:(.*?);/)[1];

    // Convert base64 to raw binary data held in a string
    const byteString = atob(base64);

    // Convert that text into a byte array
    const byteNumbers = new Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        byteNumbers[i] = byteString.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Create a blob with the byte array
    const blob = new Blob([byteArray], { type: mime });

    // Create a link element for download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.style.display = 'none';

    // Append the link, trigger the click, then remove the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

Histogram.prototype.getExtraMenuOptions = function () {
    const that = this;
    const filename = `${that.title}.png`;
    return [{
        content: "Save...",
        callback: function () {
            if (!that.chart) return;
            const imgData = that.chart.getDataURL({ type: "png" });
            downloadBase64File(imgData, filename);
        }
    }];
};

LiteGraph.registerNodeType("Risk/Output/Histogram", Histogram);
