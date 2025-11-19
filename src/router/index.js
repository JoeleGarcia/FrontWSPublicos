import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ReporteUsoView from '@/views/ReporteUsoView.vue';
import TasaCambioView from '@/views/TasaCambioView.vue';
import InflacionView from '@/views/InflacionView.vue';
import SaludFinancieraView from '@/views/SaludFinancieraView.vue';
import HistorialCrediticioView from '@/views/HistorialCrediticioView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/reporte-uso',
        name: 'reporte-uso',
        component: ReporteUsoView
    },
    {
        path: '/tasa-cambio',
        name: 'tasa-cambio',
        component: TasaCambioView
    },
    {
        path: '/inflacion',
        name: 'inflacion',
        component: InflacionView
    },
    {
        path: '/salud-financiera',
        name: 'salud-financiera',
        component: SaludFinancieraView
    },
    {
        path: '/historial-crediticio',
        name: 'historial-crediticio',
        component: HistorialCrediticioView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;