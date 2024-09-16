import styled from '@emotion/styled'
import Typography from '@mui/material/Typography';

function footer() {
  return (
    <FooterContainer >
        <div>
            <footer className='footer'>
                <div className='footer_links'>
                    <h6 className='links'>Politica de Privacidad</h6>
                    <h6 className='links'>Terminos y Condiciones</h6>
                    <h6 className='links'>Politicas de Cokiees</h6>
                    <h6 className='links'>Contactar</h6>
                </div>
                <div className='footer_name'>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <h5>WEB TIS</h5>
                    </Typography>
                </div>              
            </footer>
            <p>© 2024 CREATIVE HARBOR S.R.L. All rights reserved.</p>
        </div>        
    </FooterContainer>
  );
}

export default footer;


let FooterContainer = styled.footer`
    display: flex;
    color: white;
    background-color: #114093;
    
    .footer{
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
        margin-left: calc(0.6vw + 1rem);
        margin-right: 2rem;
        margin-bottom: 0;
    }
    .footer_links{
        margin: 0;
        padding: 0;
    }
    .footer_name{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .links{
        margin: 0;
    }
    p{
        width: 98vw;
        text-align: center;
        font-size: calc(0.5vw + 0.3rem);
        display: block;
    }
`