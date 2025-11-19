<template>
  <div class="historial-crediticio-container">
    <h2>Historial Crediticio</h2>
    
    <div class="search-box">
      <input v-model="cedulaRnc" placeholder="Cédula/RNC" />
      <button @click="consultarHistorial">Consultar</button>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Consultando historial crediticio...</p>
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="historial" class="result">
      <div class="historial-list">
        <div v-for="item in historial" :key="item.id" class="historial-item">
          <div class="empresa">{{ item.rncEmpresa }}</div>
          <div class="concepto">{{ item.conceptoDeuda }}</div>
          <div class="monto">{{ item.montoAdeudado }} USD</div>
          <div class="fecha">{{ formatFecha(item.fecha) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import historialCrediticioService from '@/api/historialCrediticio';

export default {
  data() {
    return {
      cedulaRnc: '',
      historial: [],
      loading: false,
      error: null
    };
  },
  methods: {
    async consultarHistorial() {
      if (!this.cedulaRnc) {
        this.error = 'Por favor ingrese una cédula o RNC';
        return;
      }
      
      this.loading = true;
      this.error = null;
      this.historial = [];
      
      try {
        this.historial = await historialCrediticioService.consultarHistorial(this.cedulaRnc);
      } catch (err) {
        this.error = 'Error al consultar el historial crediticio. Intente nuevamente.';
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