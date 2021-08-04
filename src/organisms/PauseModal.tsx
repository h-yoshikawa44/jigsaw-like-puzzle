import { VFC } from 'react';
import { Box, Fade, Modal } from '@material-ui/core';
import PrimaryButton from '../atoms/PrimaryButton';

type Props = {
  open: boolean;
  handlePauseReleseAction: VoidFunction;
};

const PauseModal: VFC<Props> = ({ open, handlePauseReleseAction }) => (
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
          <PrimaryButton text="復帰" onClickAction={handlePauseReleseAction} />
        </Box>
      </Box>
    </Fade>
  </Modal>
);

export default PauseModal;
