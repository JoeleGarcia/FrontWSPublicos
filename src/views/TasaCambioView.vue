<template>
  <div class="tasa-cambio-view">
    <div class="view-header">
      <div class="header-content">
        <h1>Tasas de Cambio</h1>
        <p>Consulta las tasas de cambio actualizadas de las principales monedas</p>
      </div>
      <div class="header-illustration">
        <i class="fas fa-chart-line"></i>
      </div>
    </div>
    
    <div class="view-content">
      <TasaCambio />
    </div>
    
    <div class="additional-info">
      <div class="info-card">
        <i class="fas fa-info-circle"></i>
        <h3>¿Cómo se determinan las tasas?</h3>
        <p>Las tasas de cambio son actualizadas diariamente por nuestro equipo de análisis financiero basado en los mercados internacionales.</p>
      </div>
      
      <div class="info-card">
        <i class="fas fa-history"></i>
        <h3>Histórico de Tasas</h3>
        <p>Próximamente podrás consultar el histórico de tasas y ver su evolución en el tiempo.</p>
      </div>
    </div>
  </div>
</template>

<script>
import TasaCambio from '@/components/TasaCambio.vue';

export default {
  name: 'TasaCambioView',
  components: {
    TasaCambio
  },
  metaInfo: {
    title: 'Tasas de Cambio',
    meta: [
      { name: 'description', content: 'Consulta las tasas de cambio actualizadas de las principales monedas internacionales' }
    ]
  }
};
</script>

<style scoped>
.tasa-cambio-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.header-content h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.header-content p {
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 600px;
}

.header-illustration {
  font-size: 5rem;
  opacity: 0.7;
}

.view-content {
  margin-bottom: 40px;
}

.additional-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.info-card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #3498db;
  transition: transform 0.3s, box-shadow 0.3s;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.info-card i {
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 15px;
}

.info-card h3 {
  margin: 10px 0;
  color: #2c3e50;
}

.info-card p {
  color: #7f8c8d;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .view-header {
    flex-direction: column;
    text-align: center;
  }
  
  .header-illustration {
    margin-top: 20px;
    font-size: 4rem;
  }
}
</style>