const balanceDisplay = document.getElementById('balanceDisplay');
const betInput = document.getElementById('betInput');
const playBtn = document.getElementById('playBtn');
const cashoutBtn = document.getElementById('cashoutBtn');
const betControls = document.getElementById('betControls');
const betInputRow = document.getElementById('betInputRow');
const cashoutControls = document.getElementById('cashoutControls');
const currentWinDisplay = document.getElementById('currentWinDisplay');
const winPopup = document.getElementById('winPopup');
const winAmountDisplay = document.getElementById('winAmountDisplay');
const grid = document.getElementById('grid');
const multipliersElements = document.querySelectorAll('.mult-row');

let balance = 10000.00;
let currentBet = parseFloat(betInput.value);
let gameState = 'IDLE'; // IDLE, PLAYING, GAMEOVER
let activeRow = 0; // 0 to 9 (bottom to top)
let gridData = []; // Store where the cores are

// Multipliers from bottom (index 0) to top (index 9)
const MULTIPLIERS = [1.23, 1.54, 1.93, 2.41, 4.02, 6.71, 11.18, 27.97, 69.93, 349.68];
// Number of cores per row (0 to 9)
const CORES_PER_ROW = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];

function updateBalanceDisplay() {
    balanceDisplay.innerText = balance.toFixed(2);
}

function initGrid() {
    grid.innerHTML = '';
    // Create grid elements. CSS grid is 10 rows, 5 cols.
    // Row 9 is top, Row 0 is bottom.
    // To match CSS grid which goes top to bottom, we generate row 9 to 0.
    for (let r = 9; r >= 0; r--) {
        for (let c = 0; c < 5; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = r;
            cell.dataset.col = c;
            
            const cellInner = document.createElement('div');
            cellInner.className = 'cell-inner';
            
            // Default wood bg
            const front = document.createElement('div');
            front.className = 'wood-bg front-face';
            
            const back = document.createElement('div');
            back.className = 'cell-back';
            
            cellInner.appendChild(front);
            cellInner.appendChild(back);
            cell.appendChild(cellInner);
            
            cell.addEventListener('click', () => handleCellClick(r, c, cell));
            
            grid.appendChild(cell);
        }
    }
}

function generateGridData() {
    gridData = [];
    for (let r = 0; r < 10; r++) {
        let rowCores = Array(5).fill('apple');
        let numCores = CORES_PER_ROW[r];
        
        let indices = [0, 1, 2, 3, 4];
        for (let i = 0; i < numCores; i++) {
            const randIdx = Math.floor(Math.random() * indices.length);
            const pos = indices.splice(randIdx, 1)[0];
            rowCores[pos] = 'core';
        }
        gridData[r] = rowCores;
    }
}

function updateUIState() {
    if (gameState === 'IDLE' || gameState === 'GAMEOVER') {
        betControls.classList.remove('hidden');
        betInputRow.classList.remove('hidden');
        cashoutControls.classList.add('hidden');
    } else if (gameState === 'PLAYING') {
        betControls.classList.add('hidden');
        betInputRow.classList.add('hidden');
        cashoutControls.classList.remove('hidden');
    }
}

function updateMultipliers() {
    multipliersElements.forEach(el => {
        const r = parseInt(el.dataset.row);
        el.classList.remove('active', 'passed');
        if (gameState === 'PLAYING') {
            if (r === activeRow) {
                el.classList.add('active');
            } else if (r < activeRow) {
                el.classList.add('passed');
            }
        }
    });
}

function setRowVisuals() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const r = parseInt(cell.dataset.row);
        const front = cell.querySelector('.front-face');
        
        if (gameState === 'PLAYING') {
            if (r === activeRow) {
                front.className = 'covered-bg front-face';
                cell.classList.add('active');
            } else if (r > activeRow) {
                front.className = 'wood-bg front-face';
                cell.classList.remove('active');
            }
        } else {
            front.className = 'wood-bg front-face';
            cell.classList.remove('active', 'revealed');
        }
    });
}

function startGame() {
    const bet = parseFloat(betInput.value);
    if (isNaN(bet) || bet <= 0 || bet > balance) return;
    
    currentBet = bet;
    balance -= currentBet;
    updateBalanceDisplay();
    
    gameState = 'PLAYING';
    activeRow = 0;
    currentWinDisplay.innerText = "0.00";
    winPopup.classList.add('hidden');
    
    generateGridData();
    initGrid();
    updateUIState();
    updateMultipliers();
    setRowVisuals();
}

function revealCell(r, c, cell) {
    const isCore = gridData[r][c] === 'core';
    const back = cell.querySelector('.cell-back');
    back.innerHTML = ''; // clear
    
    const icon = document.createElement('div');
    icon.className = isCore ? 'core' : 'apple';
    if(isCore){
        // Add seeds for core detail
        const seeds = document.createElement('div');
        seeds.className = 'seeds';
        icon.appendChild(seeds);
    }
    back.appendChild(icon);
    
    cell.classList.add('revealed');
    cell.classList.remove('active');
    
    return !isCore; // return true if won
}

function revealAll() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if (!cell.classList.contains('revealed')) {
            const r = parseInt(cell.dataset.row);
            const c = parseInt(cell.dataset.col);
            const isCore = gridData[r][c] === 'core';
            
            const back = cell.querySelector('.cell-back');
            back.innerHTML = '';
            
            const icon = document.createElement('div');
            icon.className = isCore ? 'core' : 'apple';
            if(isCore){
                const seeds = document.createElement('div');
                seeds.className = 'seeds';
                icon.appendChild(seeds);
            }
            back.appendChild(icon);
            cell.classList.add('revealed');
        }
    });
}

function handleCellClick(r, c, cell) {
    if (gameState !== 'PLAYING') return;
    if (r !== activeRow) return;
    if (cell.classList.contains('revealed')) return;

    const won = revealCell(r, c, cell);
    
    if (won) {
        // Update win amount
        const winAmount = (currentBet * MULTIPLIERS[activeRow]).toFixed(2);
        currentWinDisplay.innerText = winAmount;
        
        if (activeRow === 9) {
            // Reached top! Auto cashout
            cashout(winAmount);
        } else {
            activeRow++;
            updateMultipliers();
            setRowVisuals();
        }
    } else {
        // Lose
        gameState = 'GAMEOVER';
        revealAll();
        setTimeout(() => {
            updateUIState();
            updateMultipliers();
            setRowVisuals(); // Will reset active classes
        }, 1500);
    }
}

function cashout(forceAmount = null) {
    if (gameState !== 'PLAYING') return;
    
    // We can only cashout if we completed at least row 0 (so activeRow > 0)
    if (activeRow === 0 && forceAmount === null) return; 
    
    let winAmount = forceAmount;
    if (winAmount === null) {
        winAmount = (currentBet * MULTIPLIERS[activeRow - 1]).toFixed(2);
    }
    
    balance += parseFloat(winAmount);
    updateBalanceDisplay();
    
    winAmountDisplay.innerText = winAmount;
    winPopup.classList.remove('hidden');
    
    gameState = 'GAMEOVER';
    revealAll();
    
    setTimeout(() => {
        updateUIState();
        updateMultipliers();
    }, 1500);
}

// Event Listeners
playBtn.addEventListener('click', startGame);
cashoutBtn.addEventListener('click', () => cashout());

// Bet modifiers
document.querySelectorAll('.bet-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const action = e.target.innerText;
        let bet = parseFloat(betInput.value) || 0;
        
        if (action === 'MIN') bet = 1.00;
        else if (action === 'MAX') bet = balance;
        else if (action === 'X/2') bet = Math.max(1, bet / 2);
        else if (action === 'X2') bet = Math.min(balance, bet * 2);
        
        betInput.value = bet.toFixed(2);
    });
});

// Initialize
balanceDisplay.innerText = balance.toFixed(2);
initGrid();
updateUIState();
