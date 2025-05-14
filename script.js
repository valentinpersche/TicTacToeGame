let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
]

let currentPlayer = 'circle'; // circle beginnt

// Gewinnkombinationen
const winningCombinations = [
    [0, 1, 2], // horizontal
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // vertikal
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonal
    [2, 4, 6]
];

function init(){
    render();
    updatePlayerSwitch();
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

function updatePlayerSwitch() {
    const switchElement = document.getElementById('currentPlayerSwitch');
    const isCircle = currentPlayer === 'circle';
    
    switchElement.innerHTML = `
        <div class="player-switch ${isCircle ? 'circle-turn' : 'cross-turn'}">
            <div class="switch-content">
                <div class="player-icon circle-icon">
                    ${generateCircleSVG()}
                    <span class="player-name">Player One</span>
                </div>
                <div class="player-icon cross-icon">
                    ${generateCrossSVG()}
                    <span class="player-name">Player Two</span>
                </div>
            </div>
        </div>
    `;
}

function handleClick(index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        let td = document.getElementsByTagName('td')[index];
        
        if (currentPlayer === 'circle') {
            td.innerHTML = generateCircleSVG();
            currentPlayer = 'cross';
        } else {
            td.innerHTML = generateCrossSVG();
            currentPlayer = 'circle';
        }
        
        td.removeAttribute('onclick');
        updatePlayerSwitch();
        checkWinner();
    }
}

function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(combination);
            return true;
        }
    }
    return false;
}

function getLineType(combination) {
    if (combination[0] === 0 && combination[2] === 8 || combination[0] === 2 && combination[2] === 6) {
        return 'diagonal';
    }
    if (combination[0] === 0 && combination[2] === 6 || combination[0] === 1 && combination[2] === 7 || combination[0] === 2 && combination[2] === 8) {
        return 'vertical';
    }
    return 'horizontal';
}

function calculateCellPositions(combination, cells, table) {
    const lineType = getLineType(combination);
    const offset = lineType === 'diagonal' ? 15 : 20;
    
    return combination.map((index, i) => {
        const cell = cells[index];
        const rect = cell.getBoundingClientRect();
        const tableRect = table.getBoundingClientRect();
        const x = rect.left + rect.width / 2 - tableRect.left;
        const y = rect.top + rect.height / 2 - tableRect.top;
        
        if (i === 0) {
            return {
                x: lineType === 'vertical' ? x : x - offset,
                y: lineType === 'horizontal' ? y : y - offset
            };
        }
        if (i === 2) {
            return {
                x: lineType === 'vertical' ? x : x + offset,
                y: lineType === 'horizontal' ? y : y + offset
            };
        }
        return { x, y };
    });
}

function createAnimatedLine(startPos, endPos) {
    return `
        <line x1="${startPos.x}" y1="${startPos.y}" x2="${endPos.x}" y2="${endPos.y}"
              stroke="#ff0059"
              stroke-width="5"
              stroke-dasharray="1000"
              stroke-dashoffset="1000">
            <animate attributeName="stroke-dashoffset"
                     from="1000"
                     to="0"
                     dur="0.5s"
                     fill="freeze"/>
        </line>
    `;
}

function drawWinningLine(combination) {
    const table = document.querySelector('table');
    const cells = table.getElementsByTagName('td');
    const positions = calculateCellPositions(combination, cells, table);
    
    const svgHTML = `
        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;">
            ${createAnimatedLine(positions[0], positions[2])}
        </svg>
    `;
    
    table.style.position = "relative";
    table.insertAdjacentHTML('beforeend', svgHTML);
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
                         dur="0.3s"
                         fill="freeze"/>
            </circle>
        </svg>
    `;
    return svg;
}

function generateCrossSVG() {
    const svg = `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <line x1="5" y1="5" x2="65" y2="65"
                  stroke="#FFC000"
                  stroke-width="5"
                  stroke-dasharray="84.85"
                  stroke-dashoffset="84.85">
                <animate attributeName="stroke-dashoffset"
                         from="84.85"
                         to="0"
                         dur="0.15s"
                         fill="freeze"/>
            </line>
            <line x1="65" y1="5" x2="5" y2="65"
                  stroke="#FFC000"
                  stroke-width="5"
                  stroke-dasharray="84.85"
                  stroke-dashoffset="84.85">
                <animate attributeName="stroke-dashoffset"
                         from="84.85"
                         to="0"
                         dur="0.15s"
                         fill="freeze"
                         begin="0.2s"/>
            </line>
        </svg>
    `;
    return svg;
}

