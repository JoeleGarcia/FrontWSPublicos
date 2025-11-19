<template>
  <div class="salud-financiera-view">
    <div class="view-header">
      <div class="header-content">
        <h1>Salud Financiera</h1>
        <p>Evalúa la salud financiera de tus clientes o tu propia situación financiera</p>
      </div>
      <div class="header-illustration">
        <i class="fas fa-heartbeat"></i>
      </div>
    </div>
    
    <div class="view-content">
      <SaludFinanciera />
    </div>
    
    <div class="benefits-section">
      <h2>Beneficios de una Buena Salud Financiera</h2>
      <div class="benefits-grid">
        <div class="benefit-card">
          <i class="fas fa-shield-alt"></i>
          <h3>Seguridad Económica</h3>
          <p>Protección contra imprevistos financieros y capacidad para enfrentar emergencias</p>
        </div>
        
        <div class="benefit-card">
          <i class="fas fa-rocket"></i>
          <h3>Oportunidades de Crecimiento</h3>
          <p>Acceso a mejores oportunidades de inversión y financiamiento</p>
        </div>
        
        <div class="benefit-card">
          <i class="fas fa-smile"></i>
          <h3>Paz Mental</h3>
          <p>Reducción del estrés financiero y mayor calidad de vida</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SaludFinanciera from '@/components/SaludFinanciera.vue';

export default {
  name: 'SaludFinancieraView',
  components: {
    SaludFinanciera
  },
  metaInfo: {
    title: 'Salud Financiera',
    meta: [
      { name: 'description', content: 'Evalúa la salud financiera de tus clientes o tu propia situación financiera' }
    ]
  }
};
</script>

<style scoped>
.salud-financiera-view {
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
  background: linear-gradient(135deg, #27ae60, #219653);
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

.benefits-section {
  margin-top: 50px;
}

.benefits-section h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.benefit-card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s;
}

.benefit-card:hover {
  transform: translateY(-10px);
}

.benefit-card i {
  font-size: 3rem;
  color: #27ae60;
  margin-bottom: 20px;
}

.benefit-card h3 {
  margin: 15px 0;
  color: #2c3e50;
}

.benefit-card p {
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