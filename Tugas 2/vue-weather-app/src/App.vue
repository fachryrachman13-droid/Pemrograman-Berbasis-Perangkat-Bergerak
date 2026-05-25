<template>
  <div class="weather-container">
    <h1>Prakiraan Cuaca Jakarta</h1>
    
    <div v-if="loading" class="loading">Memuat data...</div>
    
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Waktu</th>
            <th>Suhu (°C)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in weatherData" :key="index">
            <td>{{ formatTime(item.time) }}</td>
            <td class="temperature">{{ item.temperature }}°C</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface WeatherItem {
  time: string;
  temperature: number;
}

export default defineComponent({
  name: 'WeatherForecast',
  setup() {
    const weatherData = ref<WeatherItem[]>([]);
    const loading = ref<boolean>(true);
    const error = ref<string | null>(null);

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m'
        );
        if (!response.isValid && !response.ok) {
          throw new Error('Gagal mengambil data dari API');
        }
        
        const data = await response.json();
        
        const times = data.hourly.time.slice(0, 10);
        const temperatures = data.hourly.temperature_2m.slice(0, 10);

        weatherData.value = times.map((time: string, index: number) => ({
          time,
          temperature: temperatures[index]
        }));
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Terjadi kesalahan';
      } finally {
        loading.value = false;
      }
    };

    const formatTime = (isoString: string): string => {
      const date = new Date(isoString);
      return date.toLocaleString('id-ID', {
        dateStyle: 'short',
        timeStyle: 'short'
      });
    };

    onMounted(() => {
      fetchWeatherData();
    });

    return {
      weatherData,
      loading,
      error,
      formatTime
    };
  }
});
</script>

<style scoped>
.weather-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.loading, .error {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
}

.error {
  color: #e74c3c;
}

.table-responsive {
  overflow-x: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

th {
  background-color: #3498db;
  color: white;
  font-weight: 600;
}

tr:hover {
  background-color: #f5f5f5;
}

.temperature {
  font-weight: bold;
  color: #e67e22;
}
</style>