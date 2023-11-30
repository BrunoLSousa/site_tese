const fs = require('fs');
const signMap = {0: "-", 2: "+"};

try {

    let jsonString = fs.readFileSync("./data/models/systems.json");
    const metrics = ["dit", "fanin", "fanout", "lcom", "noa", "noc", "nom", "tcc"];
    const types = ["linear", "square", "cubic", "log1", "log2", "log3"];
    let systems = JSON.parse(jsonString);

    let data = {};
    let keys = Object.keys(systems);

    console.log(keys[14]);
    throw "parou";

    for (let i = 0; i < metrics.length; i++) {
        let currentMetric = metrics[i];
        data[currentMetric] = {};

        for (let j = 0; j < types.length; j++) {
            let currentType = types[j];
            data[currentMetric][currentType] = {};

            for (let m = 0; m < keys.length; m++) {
                let currentSystem = keys[m];
                let path = "./data/models/" + currentMetric + "/" + currentSystem + "/" + currentType + ".json";
                if (fs.existsSync(path)) {
                    let jsonString = fs.readFileSync(path);
                    let jsonObj = JSON.parse(jsonString);
                    data[currentMetric][currentType][currentSystem] = jsonObj;
                }
            }
        }
    }
    
    let finalJSON = {
        "systems": systems,
        "data": data
    };

    fs.writeFileSync("./data/models/data.json", JSON.stringify(finalJSON));

    // console.log(JSON.stringify(finalJSON));
    // throw "parou";













    /*let sign = {0: "-", 2:"+"};
    for (let i = 2; i < keys.length; i++) {
        let key = keys[14];
        // console.log(key);
        // throw "parou";
        let path = "./data/models/dit/" + key + "/cubic.json";

        console.log(path);
        console.log(fs.existsSync(path));
        throw "parou";

        let jsonString = fs.readFileSync(path);
        let data = JSON.parse(jsonString);
        
        let formula = data.coeffs.lin + "*x " + sign[Math.sign(data.coeffs.const) + 1] + " " + Math.abs(data.coeffs.const);
        if (data.intervention_data) {
            for (let i = 0; i < data.intervention_data.length; i++) {
                let item = data.coeffs["interv" + (i + 1)];
                formula += " " + sign[Math.sign(item) + 1] + " " + Math.abs(item) + "*I" + (i + 1);
            }
        }
        
        // console.log(data);
        // console.log("");
        // console.log(formula);
        // console.log("");
        // console.log(Math.sign(data.coeffs.lin));
        // console.log("");
        // console.log(Math.sign(data.coeffs.const));
        // return;
    }*/

} catch (err) {
    console.log(err);
    return;
}