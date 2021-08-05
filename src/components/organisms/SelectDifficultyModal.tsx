import { VFC } from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import DifficultyButton from 'components/atoms/DifficultyButton';
import { Diffculty } from 'models/Diffculty';

type Props = {
  open: boolean;
  loading: boolean;
  onSelectDifficulty: (diffculty: Diffculty) => void;
};

const SelectDifficultyModal: VFC<Props> = ({
  open,
  loading,
  onSelectDifficulty,
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
                onClick={onSelectDifficulty}
              />
            </Box>
            <Box p={2}>
              <DifficultyButton
                difficulty="normal"
                onClick={onSelectDifficulty}
              />
            </Box>
            <Box p={2}>
              <DifficultyButton
                difficulty="hard"
                onClick={onSelectDifficulty}
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
