<template>
  <div class="historial-crediticio-view">
    <div class="view-header">
      <div class="header-content">
        <h1>Historial Crediticio</h1>
        <p>Consulta y analiza el historial crediticio de tus clientes</p>
      </div>
      <div class="header-illustration">
        <i class="fas fa-file-invoice-dollar"></i>
      </div>
    </div>
    
    <div class="view-content">
      <HistorialCrediticio />
    </div>
    
    <div class="importance-section">
      <h2>Importancia del Historial Crediticio</h2>
      <div class="importance-content">
        <div class="importance-text">
          <p>Un buen historial crediticio es fundamental para el éxito financiero personal y empresarial. Te permite:</p>
          <ul>
            <li>Acceder a mejores tasas de interés en préstamos</li>
            <li>Obtener mayores límites de crédito</li>
            <li>Facilitar procesos de alquiler de vivienda</li>
            <li>Mejorar oportunidades laborales en ciertos sectores</li>
            <li>Negociar mejores condiciones con proveedores</li>
          </ul>
          <p>Nuestro servicio te permite monitorear y gestionar el historial crediticio de manera efectiva.</p>
        </div>
        <div class="importance-tips">
          <h3>Consejos para Mejorar tu Historial</h3>
          <div class="tip">
            <i class="fas fa-check-circle"></i>
            <p>Paga tus deudas a tiempo</p>
          </div>
          <div class="tip">
            <i class="fas fa-check-circle"></i>
            <p>Mantén tus saldos de crédito bajos</p>
          </div>
          <div class="tip">
            <i class="fas fa-check-circle"></i>
            <p>Evita abrir múltiples cuentas en poco tiempo</p>
          </div>
          <div class="tip">
            <i class="fas fa-check-circle"></i>
            <p>Revisa tu historial regularmente</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HistorialCrediticio from '@/components/HistorialCrediticio.vue';

export default {
  name: 'HistorialCrediticioView',
  components: {
    HistorialCrediticio
  },
  metaInfo: {
    title: 'Historial Crediticio',
    meta: [
      { name: 'description', content: 'Consulta y analiza el historial crediticio de tus clientes' }
    ]
  }
};
</script>

<style scoped>
.historial-crediticio-view {
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
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
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

.importance-section {
  margin-top: 50px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.importance-section h2 {
  color: #2c3e50;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.importance-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

.importance-text p {
  margin-bottom: 15px;
  line-height: 1.6;
  color: #34495e;
}

.importance-text ul {
  padding-left: 20px;
  margin: 20px 0;
}

.importance-text li {
  margin-bottom: 10px;
  color: #2c3e50;
}

.importance-tips {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  border-left: 4px solid #9b59b6;
}

.importance-tips h3 {
  margin-top: 0;
  color: #2c3e50;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.tip {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.tip i {
  color: #27ae60;
  font-size: 1.2rem;
}

.tip p {
  margin: 0;
  color: #34495e;
}

@media (max-width: 900px) {
  .importance-content {
    grid-template-columns: 1fr;
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