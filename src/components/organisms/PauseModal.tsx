import { VFC } from 'react';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import PrimaryButton from 'components/atoms/PrimaryButton';

type Props = {
  open: boolean;
  onPauseRelese: VoidFunction;
};

const PauseModal: VFC<Props> = ({ open, onPauseRelese }) => (
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
