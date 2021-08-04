import { VFC } from 'react';
import Konva from 'konva';
import { Group, Image, Layer, Line, Rect, Stage } from 'react-konva';

type Piece = {
  id: string;
  crop: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  width: number;
  height: number;
};

type Props = {
  image: HTMLImageElement | undefined;
  shuffledPieceInfo: Piece[];
  handleDragStart: (e: Konva.KonvaEventObject<DragEvent>) => void;
  handleDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => void;
};

const PuzzleCanvas: VFC<Props> = ({
  image,
  shuffledPieceInfo,
  handleDragStart,
  handleDragEnd,
}) => {
  const flameWidth = 40;
  const imageWidth = 720;
  const imageHeight = 480;
  const padding = 50;
  // eslint-disable-next-line no-undef
  const stageWidth = window.innerWidth;
  const stageHeight = imageHeight + flameWidth * 2 + padding * 2;
  const imageFlameX = stageWidth / 2 - (imageWidth + flameWidth * 2) / 2;
  const initialPieceSpaceX = -180;

  return (
    <Stage width={stageWidth} height={stageHeight}>
      <Layer>
        <Group x={imageFlameX} y={padding}>
          <Rect
            width={imageWidth}
            height={imageHeight}
            x={flameWidth}
            y={flameWidth}
            fill="white"
          />
          <Image
            image={image}
            opacity={0.6}
            width={imageWidth}
            height={imageHeight}
            x={flameWidth}
            y={flameWidth}
          />
          <Line
            points={[
              0,
              0,
              flameWidth * 2 + imageWidth,
              0,
              flameWidth + imageWidth,
              flameWidth,
              flameWidth,
              flameWidth,
            ]}
            closed
            fillLinearGradientStartPoint={{
              x: flameWidth + imageWidth / 2,
              y: 0,
            }}
            fillLinearGradientEndPoint={{
              x: flameWidth + imageWidth / 2,
              y: flameWidth,
            }}
            fillLinearGradientColorStops={[0, '#b34e06', 1, '#501300']}
          />
          <Line
            points={[
              0,
              0,
              flameWidth,
              flameWidth,
              flameWidth,
              flameWidth + imageHeight,
              0,
              flameWidth * 2 + imageHeight,
            ]}
            closed
            fillLinearGradientStartPoint={{
              x: 0,
              y: flameWidth + imageHeight / 2,
            }}
            fillLinearGradientEndPoint={{
              x: flameWidth,
              y: flameWidth + imageHeight / 2,
            }}
            fillLinearGradientColorStops={[0, '#b34e06', 1, '#501300']}
          />
          <Line
            points={[
              flameWidth,
              flameWidth + imageHeight,
              flameWidth + imageWidth,
              flameWidth + imageHeight,
              flameWidth * 2 + imageWidth,
              flameWidth * 2 + imageHeight,
              0,
              flameWidth * 2 + imageHeight,
            ]}
            closed
            fillLinearGradientStartPoint={{
              x: flameWidth + imageWidth / 2,
              y: flameWidth * 2 + imageHeight,
            }}
            fillLinearGradientEndPoint={{
              x: flameWidth + imageWidth / 2,
              y: flameWidth + imageHeight,
            }}
            fillLinearGradientColorStops={[0, '#b34e06', 1, '#501300']}
          />
          <Line
            points={[
              flameWidth + imageWidth,
              flameWidth,
              flameWidth * 2 + imageWidth,
              0,
              flameWidth * 2 + imageWidth,
              flameWidth * 2 + imageHeight,
              flameWidth + imageWidth,
              flameWidth + imageHeight,
            ]}
            closed
            fillLinearGradientStartPoint={{
              x: flameWidth * 2 + imageWidth,
              y: flameWidth + imageHeight / 2,
            }}
            fillLinearGradientEndPoint={{
              x: flameWidth + imageWidth,
              y: flameWidth + imageHeight / 2,
            }}
            fillLinearGradientColorStops={[0, '#b34e06', 1, '#501300']}
          />
          <Line
            points={[
              0,
              0,
              flameWidth,
              flameWidth,
              flameWidth,
              flameWidth + imageHeight,
              0,
              flameWidth * 2 + imageHeight,
            ]}
            closed
            fillLinearGradientStartPoint={{
              x: 0,
              y: flameWidth + imageHeight / 2,
            }}
            fillLinearGradientEndPoint={{
              x: flameWidth,
              y: flameWidth + imageHeight / 2,
            }}
            fillLinearGradientColorStops={[0, '#b34e06', 1, '#501300']}
          />
          <Line
            points={[
              0,
              0,
              flameWidth * 2 + imageWidth,
              0,
              flameWidth + imageWidth,
              flameWidth,
              flameWidth,
              flameWidth,
            ]}
            closed
            fillLinearGradientStartPoint={{
              x: flameWidth + imageWidth / 2,
              y: 0,
            }}
            fillLinearGradientEndPoint={{
              x: flameWidth + imageWidth / 2,
              y: flameWidth,
            }}
            fillLinearGradientColorStops={[0, '#b34e06', 1, '#501300']}
          />
        </Group>
      </Layer>
      <Layer>
        <Group x={imageFlameX + flameWidth} y={padding + flameWidth}>
          {shuffledPieceInfo.map((piece) => (
            <Image
              key={piece.id}
              id={piece.id}
              image={image}
              crop={piece.crop}
              width={piece.width}
              height={piece.height}
              x={initialPieceSpaceX}
              draggable
              onDragStart={(e) => handleDragStart(e)}
              onDragEnd={(e) => handleDragEnd(e)}
            />
          ))}
        </Group>
      </Layer>
    </Stage>
  );
};

export default PuzzleCanvas;
