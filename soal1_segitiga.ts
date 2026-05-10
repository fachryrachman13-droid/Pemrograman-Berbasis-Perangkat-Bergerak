export {};

const NIM = "053494059";
const tinggi: number = parseInt(NIM[NIM.length - 1]); // digit terakhir = 9
 
console.log("=== SOAL 1: Pola Segitiga ===");
console.log(`NIM        : ${NIM}`);
console.log(`Tinggi     : ${tinggi} (digit terakhir NIM)`);
console.log("-----------------------------");
 
for (let baris = 1; baris <= tinggi; baris++) {
  const angka: number[] = [];
  for (let kolom = 1; kolom <= baris; kolom++) {
    angka.push(kolom);
  }
  console.log(angka.join(" "));
}