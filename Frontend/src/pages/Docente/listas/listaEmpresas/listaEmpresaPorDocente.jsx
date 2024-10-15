import React, { useEffect, useState } from 'react';
import Header from '../../../../components/Header/header.jsx';
import Footer from '../../../../components/Footer/footer.jsx';
import ButtonBackAndTitle from '../../../../components/buttonBackAndTitle/buttonBackAndTitle.jsx';

function EmpresasPorGrupo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Initial data fetch with GET request
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/grupo/empresas/1');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          throw new Error('Error fetching data');
        }
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
    try {
        const response = await fetch('http://localhost:8000/api/grupo/docente/1/barraBusqueda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ termino: searchTerm }),  // Enviar el término de búsqueda
        });

        if (response.ok) {
            const result = await response.json();
            setData(result);  // Actualizar la tabla con los resultados de la búsqueda
        } else {
            throw new Error('Error en la búsqueda');
        }
    } catch (error) {
        setError(error.message);
    }
};

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header />
      <div className="box">
        <div className="container">
          <ButtonBackAndTitle datosTitleBack={{ ocultarAtras: false, titulo: 'EMPRESAS POR GRUPO' }} />
          <h1>LISTADO DE GRUPOS</h1>

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
                  {data.map((empresa, index) => (
                    <tr key={index}>
                      <td>{empresa.nombreEmpresa}</td>
                      <td>{empresa.nombreLargo}</td>
                      <td>{empresa.totalEstudiantes}</td>
                      <td>{empresa.gestionGrupo}</td>
                      <td>{empresa.numGrupo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EmpresasPorGrupo;

// Estilos en la misma página
const styles = `
  .box {
    padding: 20px;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

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
