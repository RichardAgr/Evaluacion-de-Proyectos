/* eslint-disable react/prop-types */
import { Fragment } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PopUpDialog from '../popUPDialog/popUpDialog.jsx'

function ButtonBackAndTitle({titulo, ocultarAtras, confirmarAtras, dirBack}) {
    const navigate = useNavigate();
    const [openConfirmarDialog, setOpenConfirmarDialog] = useState(false);

    function goBack() {
        if (confirmarAtras) {
            handleConfirmar();
        } else {
            navigate(dirBack);
        }
    }

    const handleConfirmar = () => {
        setOpenConfirmarDialog(true);
    };

    const handleConfirmarAtras = () => {
        navigate(dirBack);
    };

    return (
        <Fragment>
            {!ocultarAtras && (
                <Button variant="contained" onClick={goBack}>
                    Atras
                </Button>
            )}
            <h1>{titulo}</h1>
            <PopUpDialog 
                openDialog={openConfirmarDialog} 
                setOpenDialog={setOpenConfirmarDialog}
                especial={handleConfirmarAtras}
                titleDialog={'Esta accion te llevara atras y se desaseran los cambios, ¿Esta Seguro?'}
                textDialog={'Esta acción no se puede deshacer. Todos los cambios realizados se perderán.'}
            />
        </Fragment>
    );
}

export default ButtonBackAndTitle;
