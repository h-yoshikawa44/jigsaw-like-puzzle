import { FC } from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import PrimaryButton from 'components/atoms/PrimaryButton';

type Props = {
  open: boolean;
  onPauseRelese: VoidFunction;
};

const PauseModal: FC<Props> = ({ open, onPauseRelese }) => (
  <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={open}
    closeAfterTransition
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Fade in={open}>
      <Box
        p={4}
        width={400}
        bgcolor="background.paper"
        boxShadow={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <h2 id="transition-modal-title">一時停止中</h2>
        <p id="transition-modal-description">疲れたときは小休憩</p>
        <Box p={2}>
          <PrimaryButton text="復帰" onClick={onPauseRelese} />
        </Box>
      </Box>
    </Fade>
  </Modal>
);

export default PauseModal;
