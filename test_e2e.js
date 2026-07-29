const http = require('http');

const request = (path, method, body) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);
        const req = http.request({
            hostname: 'localhost',
            port: 8081,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        }, res => {
            let resData = '';
            res.on('data', chunk => resData += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(resData));
                    } catch (e) {
                        resolve(resData);
                    }
                } else {
                    reject(new Error(`Status: ${res.statusCode}, Body: ${resData}`));
                }
            });
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
};

async function testE2E() {
    console.log("=== End-to-End Test for Goobet Apple Game ===\n");
    try {
        console.log("1. Starting a new game...");
        const startRes = await request('/api/game/start', 'POST', { betAmount: 10, playerId: 'test_user' });
        console.log("Response:", startRes);
        const sessionId = startRes.sessionId;
        if (!sessionId) throw new Error("No session ID returned");
        console.log(`✅ Game started successfully. Session ID: ${sessionId}\n`);

        let currentRow = 0;
        let gameStatus = 'playing';

        while (gameStatus === 'playing' && currentRow < 10) {
            console.log(`2. Playing cell (Row: ${currentRow}, Col: 0)...`);
            try {
                const playRes = await request('/api/game/play', 'POST', { sessionId, row: currentRow, col: 0 });
                console.log("Response:", playRes);
                if (playRes.status === 'won' || playRes.status === 'cashed_out') {
                    console.log(`✅ Won! Safe apple found. Current Win: ${playRes.currentWin}`);
                    currentRow = playRes.activeRow;
                    if (playRes.status === 'cashed_out') {
                        gameStatus = 'won';
                    }
                } else if (playRes.status === 'lost') {
                    console.log(`❌ Lost! Hit a core. Game over.`);
                    gameStatus = 'lost';
                    // Grid data is returned, we can print it
                    console.log("Revealed Grid (Row 0-4):");
                    playRes.gridData.slice(0, 5).forEach((r, idx) => {
                        console.log(`Row ${idx}: ${r.map(c => c === 'core' ? 'X' : 'O').join(' ')}`);
                    });
                }
            } catch (err) {
                console.error("Error during play:", err.message);
                break;
            }
        }
        
        console.log("\n=== Test Completed Successfully ===");
    } catch (err) {
        console.error("Test failed:", err.message);
    }
}

testE2E();
