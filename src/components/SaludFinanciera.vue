<template>
  <div class="salud-financiera-container">
    <h2>Salud Financiera</h2>
    
    <div class="search-box">
      <input v-model="cedulaRnc" placeholder="Cédula/RNC" />
      <button @click="consultarSalud">Consultar</button>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Consultando salud financiera...</p>
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="salud" class="result">
      <div class="salud-info">
        <div class="indicador">
          Indicador: {{ salud.indicadorSalud }}
        </div>
        <div class="monto">
          Monto Adeudado: {{ salud.montoTotalAdeudado }} USD
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import saludFinancieraService from '@/api/saludFinanciera';

export default {
  data() {
    return {
      cedulaRnc: '',
      salud: null,
      loading: false,
      error: null
    };
  },
  methods: {
    async consultarSalud() {
      if (!this.cedulaRnc) {
        this.error = 'Por favor ingrese una cédula o RNC';
        return;
      }
      
      this.loading = true;
      this.error = null;
      this.salud = null;
      
      try {
        this.salud = await saludFinancieraService.consultarSaludFinanciera(this.cedulaRnc);
      } catch (err) {
        this.error = 'Error al consultar la salud financiera. Intente nuevamente.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>