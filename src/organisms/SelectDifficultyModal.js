import React from 'react';
import PropTypes from 'prop-types';
import { Box, Fade, Modal } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DifficultyButton from '../atoms/DifficultyButton';

const SelectDifficultyModal = ({
  open,
  loading,
  handleSelectDifficultyAction,
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
          <h2 id="transition-modal-title">難易度選択</h2>
          <p id="transition-modal-description">
            難易度に応じて、ピース数が変わります
          </p>
          {loading ? (
            <p>読み込み中...</p>
          ) : (
            <>
              <Box p={2}>
                <DifficultyButton
                  difficulty="easy"
                  onClickAction={handleSelectDifficultyAction}
                />
              </Box>
              <Box p={2}>
                <DifficultyButton
                  difficulty="normal"
                  onClickAction={handleSelectDifficultyAction}
                />
              </Box>
              <Box p={2}>
                <DifficultyButton
                  difficulty="hard"
                  onClickAction={handleSelectDifficultyAction}
                />
              </Box>
            </>
          )}
          <Box mt={6} fontSize="0.8rem">
            <Link to="/policy">当サービスについて</Link>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

SelectDifficultyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSelectDifficultyAction: PropTypes.func.isRequired,
};

export default SelectDifficultyModal;
