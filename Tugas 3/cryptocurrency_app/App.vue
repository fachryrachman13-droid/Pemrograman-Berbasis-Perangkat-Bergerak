<template>
  <div class="phone-wrapper">
    <div class="phone-screen">
      
      <div class="button-container">
        <button @click="fetchCryptoData" :disabled="loading">Refresh</button>
      </div>

      <div v-if="loading" class="status-msg">Memuat data...</div>
      <div v-else-if="error" class="status-msg error">{{ error }}</div>

      <div v-else class="crypto-list">
        <div v-for="coin in cryptoData" :key="coin.id" class="crypto-item">
          <div class="left-section">
            <span class="label">Rank</span>
            <span class="rank-value">{{ coin.rank }}</span>
          </div>
          
          <div class="middle-section">
            <span class="coin-name">{{ coin.name }}</span>
            <span class="coin-symbol">{{ coin.symbol }}</span>
          </div>
          
          <div class="right-section">
            <span class="label">USD</span>
            <span class="price-value">{{ formatPrice(coin.price_usd) }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface CryptoCoin {
  id: string;
  rank: string;
  name: string;
  symbol: string;
  price_usd: string;
}

export default defineComponent({
  name: 'CryptoTracker',
  setup() {
    const cryptoData = ref<CryptoCoin[]>([]);
    const loading = ref<boolean>(true);
    const error = ref<string | null>(null);

    const fetchCryptoData = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await fetch('https://api.coinlore.net/api/tickers/');
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari API');
        }
        const json = await response.json();
        
        // Mengambil 7 data pertama sesuai petunjuk gambar soal
        cryptoData.value = json.data.slice(0, 7);
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Terjadi kesalahan';
      } finally {
        loading.value = false;
      }
    };

    const formatPrice = (price: string): string => {
      const num = parseFloat(price);
      if (num >= 100) {
        return num.toFixed(2);
      }
      return price;
    };

    onMounted(() => {
      fetchCryptoData();
    });

    return {
      cryptoData,
      loading,
      error,
      fetchCryptoData,
      formatPrice
    };
  }
});
</script>

<style scoped>
.phone-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
  padding: 20px;
}

.phone-screen {
  width: 360px;
  height: 640px;
  background-color: #f7e7c4; 
  border: 12px solid #555;
  border-radius: 36px;
  padding: 20px 10px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 30px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

button:disabled {
  background-color: #aaa;
}

.status-msg {
  text-align: center;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
}

.error {
  color: red;
}

.crypto-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background-color: #cca474; 
}

.crypto-item {
  display: flex;
  background-color: #fcf1d6; 
  padding: 10px;
  align-items: center;
  font-family: Arial, sans-serif;
}

.left-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;
  border-right: 1px solid #cca474;
}

.middle-section {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 15px;
}

.right-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 120px;
}

.label {
  font-size: 10px;
  color: #777;
}

.rank-value {
  font-size: 20px;
  font-weight: bold;
  color: #000;
}

.coin-name {
  font-size: 13px;
  color: #555;
}

.coin-symbol {
  font-size: 18px;
  font-weight: bold;
  color: #000;
}

.price-value {
  font-size: 18px;
  font-weight: bold;
  color: #000;
}
</style>