import React, { useEffect, useState } from 'react';
import BaseUI from "../../../../components/baseUI/baseUI";

function EmpresasPorGrupo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Initial data fetch with GET request
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/grupo/empresas/1');
        if (!response.ok) throw new Error('Error fetching data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to handle search (POST request)
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError('Por favor, ingresa un término de búsqueda.');
      return;
    }
    setLoading(true);
    setError(null); // Limpiar error antes de hacer la búsqueda
    try {
      const response = await fetch('http://localhost:8000/api/grupo/docente/1/barraBusqueda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ termino: searchTerm }),
      });

      if (!response.ok) throw new Error('Error en la búsqueda');
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <BaseUI
      titulo={`LISTADO DE GRUPOS`}
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack={`/`}
    >
      {/* Search bar */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar Empresa"
        />
        <button type="submit">Buscar</button>
      </form>

      <div className="pageBorder">
        <div className="pageBorder_interior">
          <table className="excelTable">
            <thead>
              <tr>
                <th>Nombre Empresa</th>
                <th>Nombre Largo</th>
                <th>Total Estudiantes</th>
                <th>Gestión</th>
                <th>Num Grupo</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((empresa, index) => (
                  <tr key={index}>
                    <td>{empresa.nombreEmpresa}</td>
                    <td>{empresa.nombreLargo}</td>
                    <td>{empresa.totalEstudiantes}</td>
                    <td>{empresa.gestionGrupo}</td>
                    <td>{empresa.numGrupo}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No se encontraron empresas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </BaseUI>
  );
}

export default EmpresasPorGrupo;

// Estilos en la misma página
const styles = `
  .pageBorder {
    border: 2px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    background-color: #f9f9f9;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .pageBorder_interior {
    padding: 20px;
  }

  .excelTable {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  .excelTable th, .excelTable td {
    border: 1px solid #000;
    padding: 10px;
    text-align: center;
    background-color: #fff;
  }

  .excelTable th {
    background-color: #f0f0f0;
    font-weight: bold;
  }

  input[type="text"] {
    padding: 8px;
    width: 200px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 8px 12px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
`;

// Insert styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
