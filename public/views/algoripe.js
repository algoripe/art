console.log('Algoripe.js ready to use...');

// COLOR PALETTES SAMPLES

// COLOR PALETTES
const colorPalettes = [
    {palette: 
        {name: 'Natural Hawai',
        colors: {
            0: '#FFFFFF',
            1: '#000000',
            2: '#1FE0C3',
            3: '#2B9AE0',
            4: '#E03636',
            5: '#E08709',
            6: '#14E04E'
            }
        }
    },
    {palette: {
        name: 'Pink Shades',
        colors: {
            0: '#F49AAF',
            1: '#E7658A',
            2: '#D51067',
            3: '#FCCDD6',
            4: '#FCF2F1',
            5: '#FFFFFF',
            6: '#000000'
            }
        }
    },
    {palette: {
        name: 'Alice',
        colors: {
            0: '#1FE0C3',
            1: '#2B9AE0',
            2: '#E03636',
            3: '#E08709',
            4: '#14E04E'
            }
        }
    },
    {palette: {
        name: 'FMedia',
        colors: {
            0: '#1F2020',
            1: '#0D075F',
            2: '#FF8E2C'
            }
        }
    },
    {palette: {
        name: 'Imperial Red',
        colors: {
            0: '#101010',
            1: '#530B0E',
            2: '#EB3939',
            3: '#FCEEEE'
            }
        }
    },
    {palette: {
        name: 'Algoff',
        colors: {
            0: '#A160FF',
            1: '#F954FF',
            2: '#B84DE8',
            3: '#634DE8',
            4: '#5469FF'
            }
        }
    },
    {palette: {
        name: 'Glowing All',
        colors: {
            0: '#0A1747',
            1: '#0029FA',
            2: '#8D07F6',
            3: '#FFFF05',
            4: '#D4DBF5'
            }
        }
    },
    {palette: {
        name: 'CB Friendly',
        colors: {
            0: '#2D3047',
            1: '#419D78',
            2: '#E0A458',
            3: '#FFDBB5',
            4: '#C04ABC'
            }
        }
    },
    {palette: {
        name: 'Aloha',
        colors: {
            0: '#000000',
            1: '#00C6FF',
            2: '#0078FF',
            3: '#DE5246',
            4: '#FBAD50',
            5: '#FFFFFF'
            }
        }
    },
    {palette: {
        name: 'FE1994 Square',
        serie: 'Calligraphy',
        colors: {
            0: '#FF1994',
            1: '#FF0088',
            2: '#FFBD33',
            3: '#06FF00',
            4: '#0D66FF',
            5: '#000000',
            6: '#FFFFFF'
            }
        }
    }
];

// DEFAULT PALETTE
let currentPaletteIndex = 1;

let currentPalette = colorPalettes[currentPaletteIndex].palette.colors;

// Exports the current canvas
function exportDrawing(format, action, additionalText) {

    const downloadFileName = `${colorPalettes[currentPaletteIndex].palette.name}_${additionalText}`;

    if(format === 'png' || format === 'jpg') {
        saveCanvas(downloadFileName, format);
    } else {
        console.log(`Your input ('${format}') does not match the expected inputs ('png' or 'jpg')`);
        return;
    }
    if(action === 'noLoop') {
        noLoop();
        console.log('Loop stopped');
    }
}

// Returns a color from a specific palette
function pickColorFromPalette(index) {
    const color = currentPalette[index];
    if(color === undefined) {
        console.log(`Color is undefined. You are currently using this palette:\n${currentPalette}`);
        return '#FF55FF';
    } else {
        return color;
    }
}

// Schedules an automated export of the drawing after a certain amount of frames
function scheduleAutoExport(frameNumber, action, additionalText) {
    if(frameCount === frameNumber) {
        if(action === "noLoop"){
            exportDrawing("png", 'noLoop', additionalText);
        }else{
            exportDrawing("png",'',additionalText);
        }
    }
}

// Stops the loop after a certain number of frames
function stopLoopAfterXFrames(frameNumber) {
    if(frameCount === frameNumber) {
        noLoop();
    }
}

function updateLoopBtn() {
    const btn = document.getElementById('noloop-btn');
    if(btn.className.includes('loop-off')) {
        loop();
        btn.classList.remove('loop-off');
        btn.classList.add('loop-on');
        btn.innerText = 'Stop!';
    } else {
        noLoop();
        btn.classList.remove('loop-on');
        btn.classList.add('loop-off');
        btn.innerText = 'Start!';
    }
}

// TOOLKIT SETUP
// Adds event listeners to stop the loop (and restart it)
document.getElementById('noloop-btn').addEventListener('click', () => updateLoopBtn()); // on button click
document.getElementById('canvas-div').addEventListener('click', () => updateLoopBtn()); // on canvas click

// Adds event listeners to download the drawing
document.getElementById('png-btn').addEventListener('click', () => exportDrawing("png","","oct"));
document.getElementById('jpg-btn').addEventListener('click', () => exportDrawing("jpg","",""));

// Adds event listeners to display colors
document.getElementById('color-btn').addEventListener('click', displayPalettes);

// Centers canvas
document.getElementById('canvas-div').style.margin = '0 auto';

// // Add the following function to "function setup()" to add the webcam video
function importWebcamStream() {
    let constraints = {
        video: {
          mandatory: {
            minWidth: width,
            minHeight: height
          },
          optional: [{ maxFrameRate: 24 }]
        },
        audio: true
      };
      createCapture(constraints, function(stream) {
        console.log(stream);
      });
}

// // Get a different color from a palette depending on the frame count
// function getFrameCountColor(numberOfColors) {
//     const i = frameCount % numberOfColors;
//     return currentPalette[i].hex;
// }

function adjustStrokeWeight() {
    if(strokeIncrease === true && strokeWeightValue <= strokeWeightMax) {
      strokeWeightValue *= 1.2;
    } else {
      strokeIncrease = false;
      strokeWeightValue /= 1.2;
      if(strokeWeightValue <= 0.2) {
          strokeIncrease = true;
      }
    }
}

// Displays palettes
function loadPalettes() {

    const paletteHtmlDiv = document.getElementById('palettes');
    paletteHtmlDiv.style.display = 'none';

    for(let i=0; i<colorPalettes.length; i++) {

        const paletteHtmlElement = document.createElement("div");
        paletteHtmlDiv.appendChild(paletteHtmlElement);

        const name = colorPalettes[i].palette.name;
        paletteHtmlElement.id = `${name}`;
        paletteHtmlElement.classList.add(`palette`)
        const paletteNameHtmlElement = document.createElement("h2");
        paletteNameHtmlElement.innerText = `${name}`;
        paletteHtmlElement.appendChild(paletteNameHtmlElement);
        paletteHtmlElement.style.padding = '15px';
        paletteHtmlElement.style.margin = '10px';
        paletteHtmlElement.style.borderRadius = '4px';
        paletteHtmlElement.style.background = 'rgb(31,32,32)';
        paletteHtmlElement.style.background = 'linear-gradient(241deg, rgba(31,32,32,1) 0%, rgba(45,48,71,1) 100%)';
        // paletteNameHtmlElement.style.textAlign = 'center';

        const colors = colorPalettes[i].palette.colors;

        for(const property in colors) {
            const colorHtmlElement = document.createElement("div");
            paletteHtmlElement.appendChild(colorHtmlElement);
            const color = colors[property];
            colorHtmlElement.innerText = `${color}`;
            colorHtmlElement.style.backgroundColor = `${color}`;
            colorHtmlElement.style.textShadow = '-1px 1px #000000';
            colorHtmlElement.style.padding = '10px';
            colorHtmlElement.style.margin = '5px';
            colorHtmlElement.style.borderRadius = '4px';
        }

        // add event listeners to change palette
        paletteHtmlElement.addEventListener('click', updateChosenPalette);
    }


}

function displayPalettes() {
    const div = document.getElementById('palettes');
    if(div.style.display != 'none') {
        div.style.display = 'none';
    } else {
        div.style.display = 'block';
    }
}

function updateChosenPalette(event) {

    let id;

    if(event.target.parentNode == document.getElementById('palettes')) {
        id = event.target.id;
    } else {
        id = event.target.parentNode.id;
    }

    for(let i=0; i<colorPalettes.length; i++) {
        if(id == colorPalettes[i].palette.name) {
            currentPalette = colorPalettes[i].palette.colors;
            console.log(`Selected new palette: ${id}`);
            console.log(currentPalette);
        }
    }
}

// PALETTE SELECTOR SETUP
loadPalettes();
