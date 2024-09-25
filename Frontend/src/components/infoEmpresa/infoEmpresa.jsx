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
        border-radius: 0.5rem;
        padding: 1rem;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 9px, rgba(0, 0, 0, 0.22) 0px 4px 3px;
        margin-left: calc(2vw + 8rem);
    }
    span{
        color: darkgray;
    }
`