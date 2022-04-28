import {Box, IconButton, Modal} from '@mui/material'
import {FC} from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  open: boolean,
  title: string,
  content: string,
  onClose: () => void,
  icon?: 'success' | 'failed'
}

export interface ModalContent {
  title: string,
  content: string,
  icon?: 'success' | 'failed',
}

const MyModal: FC<ModalProps> = ({open, title, content, onClose, icon}) => {
  return (
    <Modal open={open}>
      <Box
        sx={{
          padding: '30px 40px 30px',
          backgroundColor: 'white',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: "translate(-50%, -50%)",
          borderRadius: '4px',
          minWidth: {
            xs: '100vw',
            sm: '500px',
            md: '500px'
          },
          height: {
            xs: '100vh',
            sm: 'auto',
            md: 'auto'
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '0px',
            right: '00px',
          }}
        >
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            fontSize: '25px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {
            icon && icon === 'success' ?
              <CheckCircleIcon sx={{mr: '10px', color: 'green'}} /> :
              icon ?
                <DangerousIcon sx={{mr: '10px', color: 'red'}} /> :
                null
          }
          {title}
        </Box>
        <Box sx={{mt: '15px'}}>
          {content}
        </Box>
      </Box>
    </Modal>
  )
}

export default MyModal
