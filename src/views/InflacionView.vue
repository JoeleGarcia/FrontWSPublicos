<template>
  <div class="inflacion-view">
    <div class="view-header">
      <div class="header-content">
        <h1>Índices de Inflación</h1>
        <p>Monitoreo de la inflación y análisis de tendencias económicas</p>
      </div>
      <div class="header-illustration">
        <i class="fas fa-chart-pie"></i>
      </div>
    </div>
    
    <div class="view-content">
      <Inflacion />
    </div>
    
    <div class="methodology">
      <h2>Metodología de Cálculo</h2>
      <div class="methodology-content">
        <div class="methodology-text">
          <p>El índice de inflación se calcula utilizando la metodología del Índice de Precios al Consumidor (IPC), que mide la variación de los precios de una canasta de bienes y servicios representativa del consumo de los hogares.</p>
          <p>Nuestros datos provienen de fuentes oficiales y son actualizados mensualmente por nuestro equipo de economistas.</p>
          <p>Los principales componentes de la canasta incluyen:</p>
          <ul>
            <li>Alimentos y bebidas no alcohólicas</li>
            <li>Vivienda y servicios básicos</li>
            <li>Transporte</li>
            <li>Educación y cultura</li>
            <li>Salud y cuidado personal</li>
          </ul>
        </div>
        <div class="methodology-chart">
          <div class="chart-placeholder">
            <i class="fas fa-chart-bar"></i>
            <p>Distribución de la Canasta</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Inflacion from '@/components/Inflacion.vue';

export default {
  name: 'InflacionView',
  components: {
    Inflacion
  },
  metaInfo: {
    title: 'Índices de Inflación',
    meta: [
      { name: 'description', content: 'Monitoreo de la inflación y análisis de tendencias económicas' }
    ]
  }
};
</script>

<style scoped>
.inflacion-view {
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
  background: linear-gradient(135deg, #e74c3c, #c0392b);
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

.methodology {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
}

.methodology h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.methodology-content {
  display: flex;
  gap: 30px;
}

.methodology-text {
  flex: 1;
}

.methodology-text p {
  margin-bottom: 15px;
  line-height: 1.6;
  color: #34495e;
}

.methodology-text ul {
  padding-left: 20px;
  margin-top: 15px;
}

.methodology-text li {
  margin-bottom: 10px;
  color: #2c3e50;
}

.methodology-chart {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-placeholder {
  width: 100%;
  height: 250px;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #7f8c8d;
}

.chart-placeholder i {
  font-size: 4rem;
  margin-bottom: 15px;
}

@media (max-width: 900px) {
  .methodology-content {
    flex-direction: column;
  }
  
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