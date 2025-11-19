<template>
  <div class="inflacion-container">
    <h2>Índice de Inflación</h2>
    
    <div class="search-box">
      <input v-model="periodo" placeholder="Período (yyyymm)" />
      <button @click="consultarInflacion">Consultar</button>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Cargando índice de inflación...</p>
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="indice" class="result">
      <div class="indice-info">
        <div class="valor">
          {{ indice.valor }}%
        </div>
        <div class="periodo">
          Período: {{ periodo }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import inflacionService from '@/api/inflacion';

export default {
  data() {
    return {
      periodo: '',
      indice: null,
      loading: false,
      error: null
    };
  },
  methods: {
    async consultarInflacion() {
      if (!this.periodo) {
        this.error = 'Por favor ingrese un período';
        return;
      }
      
      this.loading = true;
      this.error = null;
      this.indice = null;
      
      try {
        this.indice = await inflacionService.obtenerIndiceInflacion(this.periodo);
      } catch (err) {
        this.error = 'Error al consultar el índice de inflación. Intente nuevamente.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>