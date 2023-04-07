import { ComfyWidgets } from "/scripts/widgets.js";
import { app } from "/scripts/app.js";


class Math {
    constructor() {
        this.addOutput("float", "FLOAT");
        this.addInput("number", "*");
        this.addInput("number", "*");

        const algo = this.addWidget("combo","", "add", () => {}, { values:["add","subtract","multiply, divide"]} );
        
        const val1 = this.addWidget("number","Number", 0, () => {}, {} );
        const val2 = this.addWidget("number","Number", 0, () => {}, {} );

        this.setOutputData( 0, 15);

        this.serialize_widgets = false;
        this.isVirtualNode = true;

        this.class_type="ALOIS"
    }

    // onExecute = function()
    //     {
    //     var A = this.getInputData(0);
    //     if( A === undefined )
    //         A = 0;
    //     var B = this.getInputData(1);
    //     if( B === undefined )
    //         B = 0;
    //     this.setOutputData( 0, A + B );
    //     }


    onConnectionsChange(portType, myPortIndex, isConnected) {
        if (portType == 1) {    // dealing with input node
            if (! isConnected) {
                this.widgets[myPortIndex + 1].disabled = false;
            }
            else {
                
                const linkId  = this.inputs[myPortIndex].link;
                const link = app.graph.links[linkId];
                if (link) {
                    const theirNode = app.graph.getNodeById(link.origin_id)
                    const theirType = theirNode.outputs[link.origin_slot].type;

                    const validTypes = ["FLOAT", "INT"];
                    if (validTypes.includes(theirType)) {
                        this.widgets[myPortIndex + 1].disabled = true;
                    } 
                    else {
                        this.disconnectInput(myPortIndex);
                    }

                    console.log(portType, myPortIndex, isConnected)
                }
            }
        }
        else {    // dealing with output node
        }
    }

    
    applyToGraph () {
        console.log("EXECUTE");
        this.outputs[0].value = 23;
    }
}


class Test {
    constructor() {
        this.addOutput("float", "FLOAT");
        // this.addInput("number", "*");
        // this.addInput("number", "*");

        // const algo = this.addWidget("combo","", "add", () => {}, { values:["add","subtract","multiply, divide"]} );
        // const val1 = this.addWidget("number","Number", 0, () => {}, {} );
        // const val2 = this.addWidget("number","Number", 0, () => {}, {} );

        this.setOutputData( 0, 15);
        this.serialize_widgets = true;
        this.isVirtualNode = true;



    }
}

app.registerExtension({
	name: "Comfy.MathNodes",
    
    registerCustomNodes() {
        LiteGraph.registerNodeType(
			"Math",
			Object.assign(Math, {
				title: "Math",
			})
		);
		Math.category = "utils/Math";
        
        LiteGraph.registerNodeType(
            "Test",
			Object.assign(Test, {
                title: "Test",
			})
            );
            Math.category = "utils/Test";
        },

});