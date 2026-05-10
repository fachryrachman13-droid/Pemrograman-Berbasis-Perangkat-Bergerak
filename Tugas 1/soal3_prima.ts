export {};

const NIM = "053494059";
const batasAkhir: number = parseInt(NIM.slice(-2)) + 10;   // 59 + 10 = 69
 
console.log("=== SOAL 3: Bilangan Prima ===");
console.log(`NIM         : ${NIM}`);
console.log(`Batas akhir : ${batasAkhir} (2 digit terakhir + 10)`);
console.log("------------------------------");
 
// Fungsi cek bilangan prima
function isPrima(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
 
const hasilPrima: number[] = [];
for (let angka = 2; angka <= batasAkhir; angka++) {
  if (isPrima(angka)) {
    hasilPrima.push(angka);
  }
}
 
console.log(`Bilangan prima dari 2 sampai ${batasAkhir}:`);
console.log(hasilPrima.join(", "));
console.log(`Total: ${hasilPrima.length} bilangan prima`);