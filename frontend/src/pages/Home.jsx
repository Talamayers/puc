import React from 'react';
import { motion } from 'framer-motion';
import { FaBalanceScale, FaBook, FaUsers } from 'react-icons/fa';
import AnimatedBackground from '../components/AnimatedBackground'; // Ajusta la ruta si es diferente

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Fondo animado */}
      <AnimatedBackground />

      {/* Contenido */}
      <div className="relative z-10" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-5"
        >
          <h1 className="display-3 fw-bold">Plan Único de Cuentas</h1>
          <p className="lead">Consulta dinámica y moderna del PUC Colombiano</p>
          <button
            className="btn btn-outline-light mt-3"
            onClick={() => window.location.href = '/puc'}
          >
            Ver el PUC completo
          </button>
        </motion.div>

        <div className="container py-5">
          <div className="row text-center">
            <motion.div className="col-md-4 mb-4" whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 150 }}>
              <FaBalanceScale size={50} className="mb-3" />
              <h4>Normatividad</h4>
              <p>Basado en normas contables colombianas desde 1971.</p>
            </motion.div>

            <motion.div className="col-md-4 mb-4" whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 150 }}>
              <FaBook size={50} className="mb-3" />
              <h4>Categorización</h4>
              <p>Consulta rápida por clases, grupos y subgrupos.</p>
            </motion.div>

            <motion.div className="col-md-4 mb-4" whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 150 }}>
              <FaUsers size={50} className="mb-3" />
              <h4>Accesible</h4>
              <p>Diseñado para estudiantes, contadores y empresas.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
