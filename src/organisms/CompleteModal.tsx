import { VFC } from 'react';
import { Box, Fade, Modal } from '@material-ui/core';
import ClearTime from '../molecules/ClearTime';
import PrimaryButton from '../atoms/PrimaryButton';

type Props = {
  open: boolean;
  hour: string;
  minutes: string;
  seconds: string;
  handleRestartAction: VoidFunction;
};

const CompleteModal: VFC<Props> = ({
  open,
  hour,
  minutes,
  seconds,
  handleRestartAction,
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
          <PrimaryButton
            text="再チャレンジ"
            onClickAction={handleRestartAction}
          />
        </Box>
      </Box>
    </Fade>
  </Modal>
);

export default CompleteModal;
