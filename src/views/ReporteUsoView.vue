<template>
  <div class="reporte-view">
    <div class="header">
      <h1>Monitoreo de Uso de Servicios</h1>
    </div>
    
    <!-- Escucha el evento directamente con @ -->
    <ReporteUso 
      ref="reporteComponent" 
      @estadisticas-actualizadas="actualizarEstadisticas" 
    />
    
    <div class="estadisticas">
      <div class="estadistica-card">
        <h3>Total de Invocaciones</h3>
        <p>{{ totalRegistros }}</p>
      </div>
      <div class="estadistica-card">
        <h3>Servicio Más Utilizado</h3>
        <p>{{ servicioPopular ? nombreAmigable(servicioPopular) : 'N/A' }}</p>
        <p class="subtexto">{{ vecesConsultado }} veces</p>
      </div>
      <div class="estadistica-card">
        <h3>Última Invocación</h3>
        <p>{{ ultimoRegistro || 'N/A' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ReporteUso from '@/components/ReporteUso.vue';

export default {
  components: {
    ReporteUso
  },
  data() {
    return {
      totalRegistros: 0,
      servicioPopular: '',
      vecesConsultado: 0,
      ultimoRegistro: ''
    };
  },
  methods: {
    actualizarEstadisticas(estadisticas) {
      this.totalRegistros = estadisticas.totalRegistros;
      this.servicioPopular = estadisticas.servicioMasConsultado;
      this.vecesConsultado = estadisticas.vecesConsultado;
      this.ultimoRegistro = estadisticas.ultimoRegistro;
    },
    
    nombreAmigable(servicio) {
      const nombres = {
        '/TasaCambio.asmx': 'Tasa Cambiaria',
        '/Inflacion.asmx': 'Índice Inflación',
        '/SaludFinanciera.asmx': 'Salud Financiera',
        '/HistorialCrediticio.asmx': 'Historial Crediticio'
      };
      return nombres[servicio] || servicio;
    }
  }
};
</script>

<style scoped>
.reporte-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.estadisticas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.estadistica-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.estadistica-card h3 {
  margin-top: 0;
  color: #2c3e50;
}

.estadistica-card p {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
  color: #3498db;
}

.subtexto {
  font-size: 0.8rem;
  color: #7f8c8d;
  margin-top: 5px;
}
</style>