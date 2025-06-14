import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSortUp, FaSortDown, FaSearch, FaFilter, FaUndo } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';

function PucTable() {
  const [datos, setDatos] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [orden, setOrden] = useState({ campo: 'codigo', direccion: 'asc' });

  useEffect(() => {
    axios.get('http://localhost:3001/api/puc')
      .then(response => setDatos(response.data))
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  const limpiarFiltros = () => {
    setFiltroTexto('');
    setCategoriaSeleccionada('Todas');
  };

  const ordenarPor = (campo) => {
    const nuevaDireccion =
      orden.campo === campo && orden.direccion === 'asc' ? 'desc' : 'asc';
    setOrden({ campo, direccion: nuevaDireccion });
  };

  const filtrarDatos = () => {
    let filtrados = datos.filter((item) => {
      const coincideTexto =
        item.nombre.toLowerCase().includes(filtroTexto.toLowerCase()) ||
        item.codigo.includes(filtroTexto);
      const coincideCategoria =
        categoriaSeleccionada === 'Todas' || item.categoria === categoriaSeleccionada;
      return coincideTexto && coincideCategoria;
    });

    filtrados.sort((a, b) => {
      if (a[orden.campo] < b[orden.campo]) return orden.direccion === 'asc' ? -1 : 1;
      if (a[orden.campo] > b[orden.campo]) return orden.direccion === 'asc' ? 1 : -1;
      return 0;
    });

    return filtrados;
  };

  const categoriasUnicas = ['Todas', ...new Set(datos.map(item => item.categoria))];

  const getIconoOrden = (campo) => {
    if (orden.campo !== campo) return null;
    return orden.direccion === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <>
      {/* Fondo animado en el nivel más alto, con estilos inline para que quede detrás */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }}>
        <AnimatedBackground />
      </div>

      {/* Contenido principal */}
      <motion.div
        className="container mt-5"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-primary text-white text-center p-4 rounded shadow">
          <h1>📘 Plan Único de Cuentas</h1>
          <p className="lead">Consulta, filtra y ordena fácilmente el PUC</p>
        </div>

        <div className="row mt-4 mb-3">
          <div className="col-md-5 mb-2">
            <div className="input-group">
              <span className="input-group-text bg-secondary text-white"><FaSearch /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por código o nombre"
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-5 mb-2">
            <div className="input-group">
              <span className="input-group-text bg-secondary text-white"><FaFilter /></span>
              <select
                className="form-select"
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              >
                {categoriasUnicas.map((categoria, index) => (
                  <option key={index} value={categoria}>{categoria}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-2 d-grid mb-2">
            <button className="btn btn-outline-danger" onClick={limpiarFiltros}>
              <FaUndo className="me-1" /> Limpiar
            </button>
          </div>
        </div>

        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th onClick={() => ordenarPor('codigo')} style={{ cursor: 'pointer' }}>
                  Código {getIconoOrden('codigo')}
                </th>
                <th onClick={() => ordenarPor('nombre')} style={{ cursor: 'pointer' }}>
                  Nombre {getIconoOrden('nombre')}
                </th>
                <th onClick={() => ordenarPor('categoria')} style={{ cursor: 'pointer' }}>
                  Categoría {getIconoOrden('categoria')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filtrarDatos().length > 0 ? (
                filtrarDatos().map((item, index) => (
                  <tr key={index}>
                    <td>{item.codigo}</td>
                    <td>{item.nombre}</td>
                    <td>{item.categoria}</td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">No se encontraron resultados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
}

export default PucTable;
