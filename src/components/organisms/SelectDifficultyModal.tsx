import { VFC } from 'react';
import { Box, Fade, Modal } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DifficultyButton from 'components/atoms/DifficultyButton';
import { Diffculty } from 'models/Diffculty';

type Props = {
  open: boolean;
  loading: boolean;
  handleSelectDifficultyAction: (diffculty: Diffculty) => void;
};

const SelectDifficultyModal: VFC<Props> = ({
  open,
  loading,
  handleSelectDifficultyAction,
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

export default SelectDifficultyModal;
