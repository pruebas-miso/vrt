const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");

const fs = require('fs');
const path = require('path');

const { viewportHeight, viewportWidth,vesrionsToCompare,functionalities, options } = config;

function createReport(datetime, resInfo){
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for Ghost </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${config.functionalities.map(f=> resInfo[f].map(info=> functionality(f,info)))}
            </div>
        </body>
    </html>`
}

function functionality(f,info){
    return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Functionality: ${f}</h2>
        <h3>Image name: ${info.nameFile} with tool : ${info.tool} </h3>
        <p>Data: ${JSON.stringify(info.info)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference (Version ${info.versionCompare[0]})</span>
        <img class="img2" src="${info.paths[0]}" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test (Version ${info.versionCompare[1]})</span>
        <img class="img2" src="${info.paths[1]}" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="${info.paths[2]}" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
}

async function getNameFiles(f,v){
    let files = [];
    let pathFiles = [];

    const directoryPath = path.join(__dirname, `results/${f}/${v}`); 

    fs.readdirSync(directoryPath).forEach(file => {
        pathFiles.push(`${directoryPath}/${file}`);
        files.push(file);
    })

    return [files,pathFiles]

}

async function compareFiles(f1,fpath1,f2,fpath2,f,datetime){
    
    v1 = fpath1[0].split("/");
    v2 = fpath2[0].split("/");

    result = [];
    const dummy = path.join(__dirname, `dummy/dummy.png`) 
    
    if (!fs.existsSync(`./results/${f}/compare/${datetime}`)){
        fs.mkdirSync(`./results/${f}/compare/${datetime}`, { recursive: true });
    }

    for(nameFile of f1){ 

        let n1,n2 ;

        n1 = fpath1[f1.indexOf(nameFile)]; 

        let ind = f2.indexOf(nameFile);

        f1Abs = `../../${f}/${v1[v1.length-2]}/${nameFile}`

        if (ind >= 0){
            n2 = fpath2[ind]
            f2.splice(ind, 1);
            fpath2.splice(ind, 1);
            f2Abs = `../../${f}/${v2[v2.length-2]}/${nameFile}`
        }
        else{
            n2 = dummy
            f2Abs = "../../../dummy/dummy.png"
        }

        const data = await compareImages(
            fs.readFileSync(n1),
            fs.readFileSync(n2),
            options
        );

        fs.writeFileSync(`./results/${f}/compare/${datetime}/${nameFile}`, data.getBuffer()); 

        
        f3Abs = `../../${f}/compare/${datetime}/${nameFile}`

        result.push( {
            nameFile : nameFile,
            tool: nameFile.split("_")[1],
            versionCompare : [v1[v1.length-2],v2[v2.length-2]],
            paths : [f1Abs,f2Abs,f3Abs],
            info : {
                isSameDimensions: data.isSameDimensions,
                dimensionDifference: data.dimensionDifference,
                rawMisMatchPercentage: data.rawMisMatchPercentage,
                misMatchPercentage: data.misMatchPercentage,
                diffBounds: data.diffBounds,
                analysisTime: data.analysisTime
            }
        })

    }

    return result
   
}


async function executeTest(){

    let datetime = new Date().toISOString().replace(/:/g,".");
    let resultInfo = {}
    
    if (!fs.existsSync(`./results`)){
        throw new Error('Debe existir la carpeta results')
    }

    if(!functionalities){
        throw new Error('no hay funcionalidades para comparar')
    }

    for(f of functionalities){

        let filesV1 = await getNameFiles(f,vesrionsToCompare[0]);
        let filesV2 = await getNameFiles(f,vesrionsToCompare[1]);
        
        if (filesV1[0].length > filesV2[0] ) {
            resultInfo[f] = await compareFiles(filesV1[0],filesV1[1],filesV2[0],filesV2[1],f,datetime)
        }
        else {
            resultInfo[f] = await compareFiles(filesV2[0],filesV2[1],filesV1[0],filesV1[1],f,datetime)
        }
    }
    
    if (!fs.existsSync(`./results/html/${datetime}`)){
        fs.mkdirSync(`./results/html/${datetime}`, { recursive: true });
    }

    fs.writeFileSync(`./results/html/${datetime}/report.html`, createReport(datetime, resultInfo));
    fs.copyFileSync('./index.css', `./results/html/${datetime}/index.css`);


    console.log('------------------------------------------------------------------------------------')
    console.log("Execution finished. Check the report under the results folder")
    return resultInfo;  
  }
(async ()=>console.log(await executeTest()))();