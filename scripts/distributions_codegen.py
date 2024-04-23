import json

dists = []

with open('distributions.json') as json_file:
    dists = json.load(json_file)

with open("../src/nodes/Distributions.js", "w") as f:
    f.write('''/* eslint-disable no-undef */
// Auto-generated, DO NOT EDIT!

import jStat from 'jstat';
import { LiteGraph } from 'litegraph.js';
import { RandomVariable } from '../jsrisk';

''')
    for count, dist in enumerate(dists):
        i = 0
        jstat_api = dist['name'].lower()
        if "jstat_api" in dist:
            jstat_api = dist['jstat_api']
        add_inputs_code = []
        read_inputs_code = []
        for p in dist['inputs']:
            add_inputs_code.append(f"  this.addInput('{p['name']}', 'number');")
            read_inputs_code.append(f'''    let {p['name']} = this.getInputData({i});
    if ({p['name']} === undefined) {{
      {p['name']} = {p['default']};
    }}''')
            i += 1
        f.write(f'''function {dist['name']}Distribution() {{
{"\n".join(add_inputs_code)}
  this.addOutput('var', 'RandomVariable');
  this.properties = {{ precision: 1e-5, name: '' }};
  this.addWidget('text', 'name', this.properties.name, 'name');
}}

{dist['name']}Distribution.title = '{dist['name']} Distribution';

{dist['name']}Distribution.prototype.onStart = function () {{
  this.rv = null;
}};

{dist['name']}Distribution.prototype.onExecute = function () {{
  if (!this.rv) {{
{"\n".join(read_inputs_code)}

    this.rv = new RandomVariable(jStat.{jstat_api}({', '.join([p['name'] for p in dist['inputs']])}), _ctx, null, this.properties.name);
  }}
  this.setOutputData(0, this.rv);
}};

LiteGraph.registerNodeType('Risk/Distributions/{dist['name']}', {dist['name']}Distribution);
''')
        if (count < len(dists) - 1):
            f.write("\n")
