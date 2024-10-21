import { Fragment } from 'react';
import styled from '@emotion/styled'
function infoEmpresa({nombreLargo, nombreCorto}) {
  return (
    <Fragment>
        <ContainerInfoEmpresa>
            <h1>{nombreCorto}</h1>
             <h2>{nombreLargo}</h2>
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
`