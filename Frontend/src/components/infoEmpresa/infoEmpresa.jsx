import { Fragment } from 'react';
import styled from '@emotion/styled'
function infoEmpresa() {
  return (
    <Fragment>
        <ContainerInfoEmpresa>
            <h1>Creative Harbor S.R.L.</h1>
             <h2>Creative Harbor</h2>
            <div className='integrantes'>
                <h3>Integrantes:</h3>
                    <p>Jhon</p>
                    <p>Jhon</p>
                    <p>Jhon</p>
                    <p>Jhon</p>
                    <p>Jhon</p>
            </div>
            <div className= 'docente'>
                <h3>Docente:</h3>
                    <p>LETI God</p>
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
    h1,h2{
        text-align: center;
    }
    .integrantes{
        margin: calc(3vw + 1rem);
        display: block;
    }
    .docente{
        margin: calc(3vw + 1rem);
        display: block;        
    }
    p{
        margin-left: calc(2vw + 8rem);
    }
`