class Visualizer{
    static drawNetwork(ctx,network){
        const margin=50;
        const left=margin;
        const top=margin;
        const width=ctx.canvas.width-margin*2;
        const height=ctx.canvas.height-margin*2;
        Visualizer.drawLevel(ctx,network.levels[0],
            left,top,width,height);

        

    }
    static drawLevel(ctx,level,left,top,width,height){
        const right=left+width;
        const bottom=top+height;
        for(let i=0;i<level.inputs.length;i++){
            for(let j=0;j<level.outputs.length;j++){
                ctx.beginPath();
                ctx.moveTo(
                    Visualizer.#getNode(level.inputs,i,left,right),
                    bottom
                );
                ctx.lineTo(
                    Visualizer.#getNode(level.outputs,j,left,right),
                    top
                );
                ctx.lineWidth=2;
                ctx.strokeStyle=getRGBA(level.weights[i][j])
                ctx.stroke();
            }
        }

        const nodeRadius=18;
        for(let i=0;i<level.inputs.length;i++){
            const x= Visualizer.#getNode(level.inputs,
                i,left,right);

            ctx.beginPath();
            ctx.arc(x,bottom,nodeRadius,0,Math.PI*2);
            ctx.fillStyle="white";
            ctx.fill();
        }
        for(let i=0;i<level.outputs.length;i++){
            const x= Visualizer.#getNode(level.outputs,
                i,left,right);

            ctx.beginPath();
            ctx.arc(x,top,nodeRadius*0.6,0,Math.PI*2);
            ctx.fillStyle="white";
            ctx.fill();

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.arc(x,top,nodeRadius*0.6,0,Math.PI*2);
            ctx.strokeStyle=getRGBA(level.biases[i]);
            ctx.stroke();
        }
        
    }
    static #getNode(nodes,index,left,right){
        return lerp(
            left,
            right,
            nodes.length==1?0.5:index/(nodes.length-1)
        );
            
    }
}