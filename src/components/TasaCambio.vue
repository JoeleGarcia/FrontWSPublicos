<template>
  <div class="tasa-cambio-container">
    <h2>Tasa de Cambio</h2>
    
    <div class="search-box">
      <input v-model="codigoMoneda" placeholder="Código de moneda (ej: USD)" />
      <button @click="consultarTasa">Consultar</button>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Cargando tasa de cambio...</p>
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="tasa" class="result">
      <div class="tasa-info">
        <div class="moneda">
          {{ codigoMoneda }}: {{ tasa.monto }} USD
        </div>
        <div class="fecha">
          Actualizado: {{ formatFecha(tasa.fechaActualizacion) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tasaCambioService from '@/api/tasaCambio';

export default {
  data() {
    return {
      codigoMoneda: '',
      tasa: null,
      loading: false,
      error: null
    };
  },
  methods: {
    async consultarTasa() {
      if (!this.codigoMoneda) {
        this.error = 'Por favor ingrese un código de moneda';
        return;
      }
      
      this.loading = true;
      this.error = null;
      this.tasa = null;
      
      try {
        this.tasa = await tasaCambioService.obtenerTasa(this.codigoMoneda);
      } catch (err) {
        this.error = 'Error al consultar la tasa de cambio. Intente nuevamente.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    formatFecha(fecha) {
      return new Date(fecha).toLocaleDateString('es-ES');
    }
  }
};
</script>