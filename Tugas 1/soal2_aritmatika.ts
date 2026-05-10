export {};

const NIM = "053494059";
const angkaAwal: number = parseInt(NIM.slice(-2));          // "59" → 59
const beda: number = parseInt(NIM[NIM.length - 3]) + 1;    // "0"  → 1
const jumlahSuku = 10;
 
console.log("=== SOAL 2: Deret Aritmatika ===");
console.log(`NIM        : ${NIM}`);
console.log(`Angka awal : ${angkaAwal} (2 digit terakhir NIM)`);
console.log(`Beda       : ${beda} (digit ke-3 dari belakang + 1)`);
console.log("--------------------------------");
 
const deret: number[] = [];
for (let i = 0; i < jumlahSuku; i++) {
  deret.push(angkaAwal + i * beda);
}
 
console.log("10 suku pertama:");
console.log(deret.join(", "));