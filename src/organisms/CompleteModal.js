import React from 'react';
import PropTypes from 'prop-types';
import { Box, Fade, Modal } from '@material-ui/core';
import ClearTime from '../molecules/ClearTime';
import PrimaryButton from '../atoms/PrimaryButton';

const CompleteModal = ({
  open,
  hour,
  minutes,
  seconds,
  handleRestartAction,
}) => {
  return (
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
};

CompleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  hour: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  handleRestartAction: PropTypes.func.isRequired,
};

export default CompleteModal;
