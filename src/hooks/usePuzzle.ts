import { useState, useEffect, useCallback } from 'react';
import Konva from 'konva';
import _shuffle from 'lodash/shuffle';
import { EASY, NORMAL, HARD } from 'constants/puzzle';
import { Diffculty } from 'models/Diffculty';
import { Piece } from 'models/Piece';

type PieceCount = {
  x: number;
  y: number;
};

const usePuzzle = (): {
  pieceData: Piece[];
  pieceTotalCount: number;
  matchPieceCount: number;
  selectDifficulty: (diffculty: Diffculty) => void;
  handlePieceDragStart: (e: Konva.KonvaEventObject<DragEvent>) => void;
  handlePieceDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => void;
  pieceCountReset: VoidFunction;
} => {
  const [matchPieceCount, setMatchPieceCount] = useState(0);
  const [pieceCount, setPieceCount] = useState<PieceCount>({
    x: 0,
    y: 0,
  });
  const [pieceSize, setPieceSize] = useState(0);
  const [pieceData, setPieceData] = useState<Piece[]>([]);

  // ピース初期生成処理
  useEffect(() => {
    const initialPiece = () => {
      const pieceInfo = [];
      const randomKey = Math.random().toString(32).substring(2);
      for (let y = 0; y < pieceCount.y; y += 1) {
        for (let x = 0; x < pieceCount.x; x += 1) {
          pieceInfo.push({
            id: `${y}-${x}-${randomKey}`,
            crop: {
              x: pieceSize * x,
              y: pieceSize * y,
              width: pieceSize,
              height: pieceSize,
            },
            width: pieceSize,
            height: pieceSize,
          });
        }
      }
      setPieceData(_shuffle(pieceInfo));
    };
    if (pieceCount.x && pieceCount.y && pieceSize) {
      initialPiece();
    }
  }, [pieceCount.x, pieceCount.y, pieceSize]);

  const selectDifficulty = useCallback((diffculty: Diffculty) => {
    switch (diffculty) {
      case 'easy':
        setPieceCount({
          x: EASY.PIECE_X_COUNT,
          y: EASY.PIECE_Y_COUNT,
        });
        setPieceSize(EASY.PIECE_SIZE);
        break;
      case 'normal':
        setPieceCount({
          x: NORMAL.PIECE_X_COUNT,
          y: NORMAL.PIECE_Y_COUNT,
        });
        setPieceSize(NORMAL.PIECE_SIZE);
        break;
      case 'hard':
        setPieceCount({
          x: HARD.PIECE_X_COUNT,
          y: HARD.PIECE_Y_COUNT,
        });
        setPieceSize(HARD.PIECE_SIZE);
        break;
      default:
        // eslint-disable-next-line no-console
        console.error('invalid diffculty');
    }
  }, []);

  const checkPiecePosition = useCallback(
    (piecePosition: number, fixedPosition: number) => {
      // 配置位置と正解位置を比較（+20px～-20pxは誤差範囲内とする）
      if (
        piecePosition > fixedPosition + 20 ||
        piecePosition < fixedPosition - 20
      ) {
        return false;
      }
      return true;
    },
    []
  );

  const handlePieceDragStart = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      // ドラッグ時にドラッグ要素がわかりやすいようにする
      e.target.setAttrs({
        shadowOffset: {
          x: 15,
          y: 15,
        },
        scaleX: 1.1,
        scaleY: 1.1,
        shadowColor: 'gray',
        shadowBlur: 10,
        shadowOpacity: 0.6,
      });

      // ドラッグ要素のz位置が常に一番前にくるようにする
      const { id } = e.target.attrs;
      // pieceDataをそのまま代入すると、一番前にくるまで少し時間がかかる、
      // sliceでコピーしたものを使用すると、即座に一番前にくる
      const pieces = pieceData.slice();
      const piece = pieces.find((i) => i.id === id);
      if (piece) {
        const index = pieces.indexOf(piece);
        pieces.splice(index, 1);
        pieces.push(piece);
      }
      setPieceData(pieces);
    },
    [pieceData]
  );

  const handlePieceDragEnd = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      const update = {
        duration: 0.5,
        easing: Konva.Easings.ElasticEaseOut,
        scaleX: 1,
        scaleY: 1,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      };
      if (
        checkPiecePosition(e.target.attrs.x, e.target.attrs.cropX) &&
        checkPiecePosition(e.target.attrs.y, e.target.attrs.cropY)
      ) {
        setMatchPieceCount((count) => count + 1);
        // 正解ピースは正解位置に固定し、ドラッグできないようにする
        Object.assign(update, {
          draggable: false,
          x: e.target.attrs.cropX,
          y: e.target.attrs.cropY,
        });
      }
      e.target.to(update);
    },
    [checkPiecePosition]
  );

  const pieceCountReset = useCallback(() => {
    setPieceCount({ x: 0, y: 0 });
    setMatchPieceCount(0);
  }, []);

  return {
    pieceData,
    pieceTotalCount: pieceCount.x * pieceCount.y,
    matchPieceCount,
    selectDifficulty,
    handlePieceDragStart,
    handlePieceDragEnd,
    pieceCountReset,
  };
};

export default usePuzzle;
