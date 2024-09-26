import { Fragment } from 'react';
import styled from '@emotion/styled'
function infoEmpresa({nombreLargo, nombreCorto, integrantes}) {
  return (
    <Fragment>
        <ContainerInfoEmpresa>
            <h1>{nombreLargo}</h1>
             <h2>{nombreCorto}</h2>
            <div className='integrantes'>
                <h3>Integrantes:</h3>
                    {integrantes.map((integrante) => (
                        <p key={`${integrante.nombreEstudiante}-${integrante.primerApellido}`}>
                            {integrante.nombreEstudiante} {integrante.primerApellido} {integrante.segundoApellido}
                            <span> {' ROL: '+ integrante.rol} </span>
                        </p>
                    ))}
                <h3>Docente:</h3>
                    <p>Ing. Leticia Blanco Coca</p>
            </div>
        </ContainerInfoEmpresa>
    </Fragment>
  );
}

export default infoEmpresa;

let ContainerInfoEmpresa = styled.div`
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0.3rem solid black;
    border-radius: 0.3rem;
        -webkit-border-radius: 0.3rem;
        -moz-border-radius: 0.3rem;
        -ms-border-radius: 0.3rem;
        -o-border-radius: 0.3rem;
    h1,h2{
        text-align: center;
    }
    .integrantes{
        margin: calc(3vw + 1rem);
        display: block;
    }
    p{  
        margin-left: calc(2vw + 8rem);
    }
    span{
        color: darkgray;
    }
`