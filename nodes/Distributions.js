// Auto-generated, DO NOT EDIT!

function NormalDistribution() {
    this.addInput("mean", "number");
    this.addInput("std", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

NormalDistribution.title = "Normal Distribution";

NormalDistribution.prototype.onStart = function () {
    this.rv = null;
}

NormalDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let mean = this.getInputData(0);
        if (mean === undefined)
            mean = 0;
        let std = this.getInputData(1);
        if (std === undefined)
            std = 1;

        this.rv = new RandomVariable(jStat.normal(mean, std), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/Normal", NormalDistribution);

function UniformDistribution() {
    this.addInput("a", "number");
    this.addInput("b", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

UniformDistribution.title = "Uniform Distribution";

UniformDistribution.prototype.onStart = function () {
    this.rv = null;
}

UniformDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let a = this.getInputData(0);
        if (a === undefined)
            a = -1;
        let b = this.getInputData(1);
        if (b === undefined)
            b = 1;

        this.rv = new RandomVariable(jStat.uniform(a, b), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/Uniform", UniformDistribution);

function TriangularDistribution() {
    this.addInput("a", "number");
    this.addInput("b", "number");
    this.addInput("c", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

TriangularDistribution.title = "Triangular Distribution";

TriangularDistribution.prototype.onStart = function () {
    this.rv = null;
}

TriangularDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let a = this.getInputData(0);
        if (a === undefined)
            a = -1;
        let b = this.getInputData(1);
        if (b === undefined)
            b = 0;
        let c = this.getInputData(2);
        if (c === undefined)
            c = 1;

        this.rv = new RandomVariable(jStat.triangular(a, b, c), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/Triangular", TriangularDistribution);

function BetaDistribution() {
    this.addInput("alpha", "number");
    this.addInput("beta", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

BetaDistribution.title = "Beta Distribution";

BetaDistribution.prototype.onStart = function () {
    this.rv = null;
}

BetaDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let alpha = this.getInputData(0);
        if (alpha === undefined)
            alpha = 1;
        let beta = this.getInputData(1);
        if (beta === undefined)
            beta = 1;

        this.rv = new RandomVariable(jStat.beta(alpha, beta), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/Beta", BetaDistribution);

function CentralFDistribution() {
    this.addInput("df1", "number");
    this.addInput("df2", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

CentralFDistribution.title = "CentralF Distribution";

CentralFDistribution.prototype.onStart = function () {
    this.rv = null;
}

CentralFDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let df1 = this.getInputData(0);
        if (df1 === undefined)
            df1 = 1;
        let df2 = this.getInputData(1);
        if (df2 === undefined)
            df2 = 1;

        this.rv = new RandomVariable(jStat.centralF(df1, df2), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/CentralF", CentralFDistribution);

function CauchyDistribution() {
    this.addInput("local", "number");
    this.addInput("scale", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

CauchyDistribution.title = "Cauchy Distribution";

CauchyDistribution.prototype.onStart = function () {
    this.rv = null;
}

CauchyDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let local = this.getInputData(0);
        if (local === undefined)
            local = 0;
        let scale = this.getInputData(1);
        if (scale === undefined)
            scale = 1;

        this.rv = new RandomVariable(jStat.cauchy(local, scale), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/Cauchy", CauchyDistribution);

function ChiSquareDistribution() {
    this.addInput("dof", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

ChiSquareDistribution.title = "ChiSquare Distribution";

ChiSquareDistribution.prototype.onStart = function () {
    this.rv = null;
}

ChiSquareDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let dof = this.getInputData(0);
        if (dof === undefined)
            dof = 1;

        this.rv = new RandomVariable(jStat.chisquare(dof), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/ChiSquare", ChiSquareDistribution);

function ExponentialDistribution() {
    this.addInput("rate", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

ExponentialDistribution.title = "Exponential Distribution";

ExponentialDistribution.prototype.onStart = function () {
    this.rv = null;
}

ExponentialDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let rate = this.getInputData(0);
        if (rate === undefined)
            rate = 1;

        this.rv = new RandomVariable(jStat.exponential(rate), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/Exponential", ExponentialDistribution);

function GammaDistribution() {
    this.addInput("shape", "number");
    this.addInput("scale", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

GammaDistribution.title = "Gamma Distribution";

GammaDistribution.prototype.onStart = function () {
    this.rv = null;
}

GammaDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let shape = this.getInputData(0);
        if (shape === undefined)
            shape = 1;
        let scale = this.getInputData(1);
        if (scale === undefined)
            scale = 1;

        this.rv = new RandomVariable(jStat.gamma(shape, scale), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/Gamma", GammaDistribution);

function InvGammaDistribution() {
    this.addInput("shape", "number");
    this.addInput("scale", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

InvGammaDistribution.title = "InvGamma Distribution";

InvGammaDistribution.prototype.onStart = function () {
    this.rv = null;
}

InvGammaDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let shape = this.getInputData(0);
        if (shape === undefined)
            shape = 1;
        let scale = this.getInputData(1);
        if (scale === undefined)
            scale = 1;

        this.rv = new RandomVariable(jStat.invgamma(shape, scale), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/InvGamma", InvGammaDistribution);

function KumaraswamyDistribution() {
    this.addInput("alpha", "number");
    this.addInput("beta", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

KumaraswamyDistribution.title = "Kumaraswamy Distribution";

KumaraswamyDistribution.prototype.onStart = function () {
    this.rv = null;
}

KumaraswamyDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let alpha = this.getInputData(0);
        if (alpha === undefined)
            alpha = 1;
        let beta = this.getInputData(1);
        if (beta === undefined)
            beta = 1;

        this.rv = new RandomVariable(jStat.kumaraswamy(alpha, beta), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/Kumaraswamy", KumaraswamyDistribution);

function LogNormalDistribution() {
    this.addInput("mu", "number");
    this.addInput("sigma", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

LogNormalDistribution.title = "LogNormal Distribution";

LogNormalDistribution.prototype.onStart = function () {
    this.rv = null;
}

LogNormalDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let mu = this.getInputData(0);
        if (mu === undefined)
            mu = 0;
        let sigma = this.getInputData(1);
        if (sigma === undefined)
            sigma = 1;

        this.rv = new RandomVariable(jStat.lognormal(mu, sigma), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/LogNormal", LogNormalDistribution);

function ParetoDistribution() {
    this.addInput("scale", "number");
    this.addInput("shape", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

ParetoDistribution.title = "Pareto Distribution";

ParetoDistribution.prototype.onStart = function () {
    this.rv = null;
}

ParetoDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let scale = this.getInputData(0);
        if (scale === undefined)
            scale = 1;
        let shape = this.getInputData(1);
        if (shape === undefined)
            shape = 1;

        this.rv = new RandomVariable(jStat.pareto(scale, shape), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/Pareto", ParetoDistribution);

function StudentTDistribution() {
    this.addInput("dof", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

StudentTDistribution.title = "StudentT Distribution";

StudentTDistribution.prototype.onStart = function () {
    this.rv = null;
}

StudentTDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let dof = this.getInputData(0);
        if (dof === undefined)
            dof = 1;

        this.rv = new RandomVariable(jStat.studentt(dof), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/StudentT", StudentTDistribution);

function TukeyDistribution() {
    this.addInput("nmeans", "number");
    this.addInput("dof", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

TukeyDistribution.title = "Tukey Distribution";

TukeyDistribution.prototype.onStart = function () {
    this.rv = null;
}

TukeyDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let nmeans = this.getInputData(0);
        if (nmeans === undefined)
            nmeans = 2;
        let dof = this.getInputData(1);
        if (dof === undefined)
            dof = 1;

        this.rv = new RandomVariable(jStat.tukey(nmeans, dof), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/Tukey", TukeyDistribution);

function WeibullDistribution() {
    this.addInput("scale", "number");
    this.addInput("shape", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

WeibullDistribution.title = "Weibull Distribution";

WeibullDistribution.prototype.onStart = function () {
    this.rv = null;
}

WeibullDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let scale = this.getInputData(0);
        if (scale === undefined)
            scale = 1;
        let shape = this.getInputData(1);
        if (shape === undefined)
            shape = 1;

        this.rv = new RandomVariable(jStat.weibull(scale, shape), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/Weibull", WeibullDistribution);

function BinomialDistribution() {
    this.addInput("n", "number");
    this.addInput("p", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

BinomialDistribution.title = "Binomial Distribution";

BinomialDistribution.prototype.onStart = function () {
    this.rv = null;
}

BinomialDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let n = this.getInputData(0);
        if (n === undefined)
            n = 10;
        let p = this.getInputData(1);
        if (p === undefined)
            p = 0.5;

        this.rv = new RandomVariable(jStat.binomial(n, p), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/Binomial", BinomialDistribution);

function NegBinomialDistribution() {
    this.addInput("r", "number");
    this.addInput("p", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

NegBinomialDistribution.title = "NegBinomial Distribution";

NegBinomialDistribution.prototype.onStart = function () {
    this.rv = null;
}

NegBinomialDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let r = this.getInputData(0);
        if (r === undefined)
            r = 1;
        let p = this.getInputData(1);
        if (p === undefined)
            p = 0.5;

        this.rv = new RandomVariable(jStat.negbin(r, p), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/NegBinomial", NegBinomialDistribution);

function HypergeometricDistribution() {
    this.addInput("N", "number");
    this.addInput("m", "number");
    this.addInput("n", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

HypergeometricDistribution.title = "Hypergeometric Distribution";

HypergeometricDistribution.prototype.onStart = function () {
    this.rv = null;
}

HypergeometricDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let N = this.getInputData(0);
        if (N === undefined)
            N = 10;
        let m = this.getInputData(1);
        if (m === undefined)
            m = 0.5;
        let n = this.getInputData(2);
        if (n === undefined)
            n = 1;

        this.rv = new RandomVariable(jStat.hypgeom(N, m, n), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/Hypergeometric", HypergeometricDistribution);

function PoissonDistribution() {
    this.addInput("l", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

PoissonDistribution.title = "Poisson Distribution";

PoissonDistribution.prototype.onStart = function () {
    this.rv = null;
}

PoissonDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let l = this.getInputData(0);
        if (l === undefined)
            l = 1;

        this.rv = new RandomVariable(jStat.poisson(l), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/Poisson", PoissonDistribution);

function ArcSineDistribution() {
    this.addInput("a", "number");
    this.addInput("b", "number");
    this.addOutput("var", "RandomVariable");
    this.properties = { precision: 1e-5, name: "" };
    this.addWidget("text", "name", this.properties.name, "name");
}

ArcSineDistribution.title = "ArcSine Distribution";

ArcSineDistribution.prototype.onStart = function () {
    this.rv = null;
}

ArcSineDistribution.prototype.onExecute = function () {
    if (!this.rv) {
        let a = this.getInputData(0);
        if (a === undefined)
            a = 0;
        let b = this.getInputData(1);
        if (b === undefined)
            b = 1;

        this.rv = new RandomVariable(jStat.arcsine(a, b), _ctx, null, this.properties.name);
    }
    this.setOutputData(0, this.rv);
}

LiteGraph.registerNodeType("Risk/Distributions/ArcSine", ArcSineDistribution);

