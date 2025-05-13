let fields = [
    "circle",
    "cross",
    "circle",
    "cross",
    "circle",
    "cross",
    "circle",
    null,
    null,
]

function init(){
    render();
}

function render(){
    let content = document.getElementById('content');
    let tableHTML = '<table>';
    
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }
            tableHTML += `<td onclick="handleClick(${index})">${symbol}</td>`;
        }
        tableHTML += '</tr>';
    }
    
    tableHTML += '</table>';
    content.innerHTML = tableHTML;
}

function generateCircleSVG() {
    const svg = `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r="30" 
                    stroke="#00B0EF" 
                    stroke-width="5"
                    stroke-dasharray="188.5"
                    stroke-dashoffset="188.5"
                    fill="none">
                <animate attributeName="stroke-dashoffset"
                         from="188.5"
                         to="0"
                         dur="0.4s"
                         fill="freeze"/>
            </circle>
        </svg>
    `;
    return svg;
}

function generateCrossSVG() {
    const svg = `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <line x1="15" y1="15" x2="55" y2="55"
                  stroke="#FFC000"
                  stroke-width="5"
                  stroke-dasharray="56.57"
                  stroke-dashoffset="56.57">
                <animate attributeName="stroke-dashoffset"
                         from="56.57"
                         to="0"
                         dur="0.2s"
                         fill="freeze"/>
            </line>
            <line x1="55" y1="15" x2="15" y2="55"
                  stroke="#FFC000"
                  stroke-width="5"
                  stroke-dasharray="56.57"
                  stroke-dashoffset="56.57">
                <animate attributeName="stroke-dashoffset"
                         from="56.57"
                         to="0"
                         dur="0.2s"
                         fill="freeze"
                         begin="0.2s"/>
            </line>
        </svg>
    `;
    return svg;
}

