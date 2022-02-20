import { VFC } from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import ClearTime from 'components/molecules/ClearTime';
import PrimaryButton from 'components/atoms/PrimaryButton';

type Props = {
  open: boolean;
  hour: string;
  minutes: string;
  seconds: string;
  onRestart: VoidFunction;
};

const CompleteModal: VFC<Props> = ({
  open,
  hour,
  minutes,
  seconds,
  onRestart,
}) => (
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
        <h2 id="transition-modal-title">Congratulations！</h2>
        <p id="transition-modal-description">お疲れさまでしたー</p>
        <ClearTime hour={hour} minutes={minutes} seconds={seconds} />
        <Box p={2}>
          <PrimaryButton text="再チャレンジ" onClick={onRestart} />
        </Box>
      </Box>
    </Fade>
  </Modal>
);

export default CompleteModal;
