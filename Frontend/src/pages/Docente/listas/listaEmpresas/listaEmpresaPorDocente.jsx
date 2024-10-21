import { useEffect, useState } from 'react';
import BaseUI from "../../../../components/baseUI/baseUI";
import { styled } from '@mui/material';

function EmpresasPorGrupo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

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

  // Búsqueda en vivo
  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null); // Limpiar error antes de hacer la búsqueda

      if (!searchTerm.trim()) {
        // Si el término de búsqueda está vacío, restablecer los datos
        const response = await fetch('http://localhost:8000/grupo/empresas/1');
        const result = await response.json();
        setData(result); // Restablece los datos a todos
        setLoading(false);
        return;
      }

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

    // Llamar a la función de búsqueda
    fetchSearchResults();
  }, [searchTerm]); // Efecto se ejecuta al cambiar `searchTerm`

  // Paginación: cálculos
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData = data.slice(indexOfFirst, indexOfLast);

  if (error) return <p>Error: {error}</p>;

  return (
    <BaseUI
      titulo={`LISTADO DE GRUPOS`}
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack={`/`}
    >
      <div style={{ margin: '20px' }}>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Cambia el valor en tiempo real
          placeholder="Buscar Empresa"
        />
      </div>
      <Tabla>
        <thead>
          <tr>
            <th>Nombre Largo</th>
            <th>Nombre Corto</th>
            <th>Total Estudiantes</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((empresa, index) => (
              <tr key={index}>
                <td>{empresa.nombreLargo}</td>
                <td>{empresa.nombreEmpresa}</td>
                <td>{empresa.totalEstudiantes}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No se encontraron empresas.</td>
            </tr>
          )}
        </tbody>
      </Tabla>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={data.length}
        rowsPerPage={rowsPerPage}
        handlePreviousPage={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        handleNextPage={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
      />
    </BaseUI>
  );
}

const Tabla = styled('table')({
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',

  'th, td': {
    padding: '12px 15px',
    textAlign: 'left',
    border: 'none',
  },

  th: {
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #ddd',
  },

  'td': {
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
  },

  'tr:nth-of-type(even)': {
    backgroundColor: '#f2f2f2',
  },
});

const Boton = styled('button')`
  box-sizing: border-box;
  margin-right: 5px;           
  border: none;                
  background-color: transparent; 
  font-size: 16px;            
  cursor: pointer;            
  padding: 10px;
  opacity: ${({ currentPage }) => (currentPage === 1 ? 0.5 : 1)}; 
`;

const SearchInput = styled('input')`
  width: 100%;
  max-width: 200px; 
  padding: 10px;    
  font-size: 16px;  
  border: 1px solid #ccc;  
  border-radius: 5px;      
  outline: none;          
`;

// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, totalItems, rowsPerPage, handlePreviousPage, handleNextPage }) => {
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className='pagination' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '2px solid #ddd', marginTop: '0px' }}>
      <div style={{ marginRight: '30px' }}>
        <span style={{ marginRight: '10px' }}>Filas por página:</span>
        <span>{rowsPerPage}</span>
      </div>
      <div style={{ marginRight: '30px' }}>
        <span>{startRow}-{endRow} of {totalItems}</span>
      </div>
      <div>
        <Boton onClick={handlePreviousPage} disabled={currentPage === 1}>&lt;</Boton>
        <Boton onClick={handleNextPage} disabled={currentPage === totalPages}>&gt;</Boton>
      </div>
    </div>
  );
};

export default EmpresasPorGrupo;
