function countPairs(socks) {
    let pairs = 0;
    const sockMap = new Map();

    // Mencatat jumlah setiap jenis kaos kaki
    for (let i = 0; i < socks.length; i++) {
        const sock = socks[i];
        if (sockMap.has(sock)) {
            sockMap.set(sock, sockMap.get(sock) + 1);
        } else {
            sockMap.set(sock, 1);
        }
    }

    // Menghitung jumlah pasang kaos kaki
    sockMap.forEach(count => {
        pairs += Math.floor(count / 2);
    });

    return pairs;
}

const socks1 = [10, 20, 20, 10, 10, 30, 50, 10, 20]; //Output yang diharapkan: 3
const socks2 = [6, 5, 2, 3, 5, 2, 2, 1, 1, 5, 1, 3, 3, 3, 5]; //Output yang diharapkan: 6
const socks3 = [1, 1, 3, 1, 2, 1, 3, 3, 3, 3]; //Output yang diharapkan: 4

console.log(countPairs(socks1)); 
console.log(countPairs(socks2)); 
console.log(countPairs(socks3)); 