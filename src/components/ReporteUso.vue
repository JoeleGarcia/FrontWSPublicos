<template>
  <div class="reporte-container">
    <h2>Reporte de Uso de Servicios</h2>
    
    <div class="filtros">
      <div class="filtro-group">
        <label>Servicio:</label>
        <select v-model="filtros.nombreServicio">
          <option value="">Todos los servicios</option>
          <option value="/TasaCambio.asmx">Tasa Cambiaria</option>
          <option value="/Inflacion.asmx">Índice Inflación</option>
          <option value="/SaludFinanciera.asmx">Salud Financiera</option>
          <option value="/HistorialCrediticio.asmx">Historial Crediticio</option>
        </select>
      </div>
      
      <div class="filtro-group">
        <label>Fecha Inicio:</label>
        <input type="date" v-model="filtros.fechaInicio">
      </div>
      
      <div class="filtro-group">
        <label>Fecha Fin:</label>
        <input type="date" v-model="filtros.fechaFin">
      </div>
      
      <div class="button-group">
        <button @click="aplicarFiltros" class="btn-primary">Filtrar</button>
        <button @click="limpiarFiltros" class="btn-secondary">Limpiar</button>
      </div>
    </div>

    <div v-if="cargando" class="cargando">
      <p>Cargando registros...</p>
      <div class="spinner"></div>
    </div>
    
    <div v-else>
      <div v-if="error" class="error">
        {{ error }}
      </div>
      
      <div v-else>
        <!-- <div class="resumen">
          <div class="resumen-item">
            <span>Total de registros:</span>
            <strong>{{ registros.length }}</strong>
          </div>
          <div class="resumen-item">
            <span>Servicio más consultado:</span>
            <strong>{{ servicioMasConsultado ? nombreAmigable(servicioMasConsultado) : 'N/A' }}</strong>
            <span v-if="servicioMasConsultado">({{ conteoServicios[servicioMasConsultado] }} veces)</span>
          </div>
          <div class="resumen-item">
            <span>Última consulta:</span>
            <strong>{{ ultimoRegistro || 'N/A' }}</strong>
          </div>
        </div> -->
        
        <div class="tabla-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Servicio</th>
                <th>Fecha de Invocación</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="registro in registros" :key="registro.id">
                <td>{{ registro.id }}</td>
                <td>{{ nombreAmigable(registro.nombreServicio) }}</td>
                <td>{{ formatoFecha(registro.fechaInvocacion) }}</td>
              </tr>
              <tr v-if="registros.length === 0">
                <td colspan="3" class="sin-resultados">No se encontraron registros con los filtros aplicados</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import reporteUsoService from '@/api/reporteUso';

export default {
  emits: ['estadisticas-actualizadas'],
  data() {
    return {
      registros: [],
      cargando: false,
      error: null,
      filtros: {
        nombreServicio: '',
        fechaInicio: null,
        fechaFin: null
      },
      conteoServicios: {},
      servicioMasConsultado: '',
      ultimoRegistro: ''
    };
  },
  methods: {
    async cargarRegistros() {
      this.cargando = true;
      this.error = null;
      
      try {
        this.registros = await reporteUsoService.consultarUsoServicios(
          this.filtros.nombreServicio,
          this.filtros.fechaInicio ? new Date(this.filtros.fechaInicio) : null,
          this.filtros.fechaFin ? new Date(this.filtros.fechaFin) : null
        );
        
        // Calcular estadísticas
        this.calcularEstadisticas();
      } catch (err) {
        this.error = 'Error al cargar los registros. Intente nuevamente.';
        console.error(err);
      } finally {
        this.cargando = false;
      }
    },
    
    calcularEstadisticas() {
      // Reiniciar estadísticas
      this.conteoServicios = {};
      this.servicioMasConsultado = '';
      this.ultimoRegistro = '';
      
      if (this.registros.length === 0) {
        this.emitirEstadisticas();
        return;
      }
      
      // Calcular frecuencia de servicios
      this.registros.forEach(registro => {
        const servicio = registro.nombreServicio;
        this.conteoServicios[servicio] = (this.conteoServicios[servicio] || 0) + 1;
      });
      
      // Encontrar servicio más popular
      let maxCount = 0;
      let servicioMasPopular = '';
      
      for (const servicio in this.conteoServicios) {
        if (this.conteoServicios[servicio] > maxCount) {
          maxCount = this.conteoServicios[servicio];
          servicioMasPopular = servicio;
        }
      }
      
      this.servicioMasConsultado = servicioMasPopular;
      
      // Obtener último registro
      const ultimo = this.registros.reduce((latest, current) => 
        new Date(current.fechaInvocacion) > new Date(latest.fechaInvocacion) ? current : latest
      );
      
      this.ultimoRegistro = this.formatoFecha(ultimo.fechaInvocacion);
      
      // Emitir estadísticas al componente padre
      this.emitirEstadisticas();
    },
    
    emitirEstadisticas() {
      this.$emit('estadisticas-actualizadas', {
        totalRegistros: this.registros.length,
        servicioMasConsultado: this.servicioMasConsultado,
        vecesConsultado: this.servicioMasConsultado ? this.conteoServicios[this.servicioMasConsultado] : 0,
        ultimoRegistro: this.ultimoRegistro
      });
    },
    
    aplicarFiltros() {
      this.cargarRegistros();
    },
    
    limpiarFiltros() {
      this.filtros = {
        nombreServicio: '',
        fechaInicio: null,
        fechaFin: null
      };
      this.cargarRegistros();
    },
    
    nombreAmigable(servicio) {
      const nombres = {
        '/TasaCambio.asmx': 'Tasa Cambiaria',
        '/Inflacion.asmx': 'Índice Inflación',
        '/SaludFinanciera.asmx': 'Salud Financiera',
        '/HistorialCrediticio.asmx': 'Historial Crediticio'
      };
      return nombres[servicio] || servicio;
    },
    
    formatoFecha(fecha) {
      if (!fecha) return '';
      const dateObj = new Date(fecha);
      return dateObj.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
  },
  mounted() {
    this.cargarRegistros();
  }
};
</script>

<style scoped>
.reporte-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filtros {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.filtro-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: 500;
}

select, input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.button-group {
  display: flex;
  gap: 10px;
  align-items: flex-end;
}

.btn-primary, .btn-secondary {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

.tabla-container {
  margin-top: 20px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  background-color: #f9f9f9;
}

.sin-resultados {
  text-align: center;
  padding: 20px;
  color: #777;
}

.cargando {
  text-align: center;
  padding: 30px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  background-color: #ffdddd;
  border-left: 4px solid #e74c3c;
  padding: 15px;
  margin: 20px 0;
  color: #e74c3c;
}

.resumen {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.resumen-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
}
</style>