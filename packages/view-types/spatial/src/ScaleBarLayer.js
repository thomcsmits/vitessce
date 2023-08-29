import { deck } from '@vitessce/gl';

const DEFAULT_FONT_FAMILY = "-apple-system, 'Helvetica Neue', Arial, sans-serif";

function range(len) {
  return [...Array(len).keys()];
}

function makeBoundingBox(viewState) {
  const viewport = new deck.OrthographicView().makeViewport({
    // From the current `detail` viewState, we need its projection matrix (actually the inverse).
    viewState,
    height: viewState.height,
    width: viewState.width,
  });
  // Use the inverse of the projection matrix to map screen to the view space.
  return [
    viewport.unproject([0, 0]),
    viewport.unproject([viewport.width, 0]),
    viewport.unproject([viewport.width, viewport.height]),
    viewport.unproject([0, viewport.height]),
  ];
}

function snapValue(value) {
  const targets = [1, 5, 10, 20, 25, 50, 100, 200, 250, 500];
  const minTarget = targets[0];
  const maxTarget = targets[targets.length - 1];

  let magnitude = 0;

  if (value < minTarget) {
    // Change units
    magnitude = Math.ceil(Math.log10(minTarget / value));
  } else if (value > maxTarget) {
    // Change units
    magnitude = -1 * Math.ceil(Math.log10(value / maxTarget));
  }

  const adjustedValue = value * (10 ** magnitude);

  const targetNewUnits = targets.find(t => t > adjustedValue);
  const targetOrigUnits = targetNewUnits / (10 ** magnitude);

  // TODO: return:
  // - snapped value in original units
  // - snapped value in new units
  // - new units, or unit prefix/exponent (with respect to meters)

  return [targetOrigUnits, targetNewUnits];
}

function getPosition(boundingBox, position, length) {
  const viewLength = boundingBox[2][0] - boundingBox[0][0];
  switch (position) {
    case 'bottom-right': {
      const yCoord = boundingBox[2][1] - (boundingBox[2][1] - boundingBox[0][1]) * length;
      const xLeftCoord = boundingBox[2][0] - viewLength * length;
      return [yCoord, xLeftCoord];
    }
    case 'top-right': {
      const yCoord = (boundingBox[2][1] - boundingBox[0][1]) * length;
      const xLeftCoord = boundingBox[2][0] - viewLength * length;
      return [yCoord, xLeftCoord];
    }
    case 'top-left': {
      const yCoord = (boundingBox[2][1] - boundingBox[0][1]) * length;
      const xLeftCoord = viewLength * length;
      return [yCoord, xLeftCoord];
    }
    case 'bottom-left': {
      const yCoord = boundingBox[2][1] - (boundingBox[2][1] - boundingBox[0][1]) * length;
      const xLeftCoord = viewLength * length;
      return [yCoord, xLeftCoord];
    }
    default: {
      throw new Error(`Position ${position} not found`);
    }
  }
}

const defaultProps = {
  pickable: { type: 'boolean', value: true, compare: true },
  viewState: {
    type: 'object',
    value: { zoom: 0, target: [0, 0, 0] },
    compare: true,
  },
  unit: { type: 'string', value: '', compare: true },
  size: { type: 'number', value: 1, compare: true },
  position: { type: 'string', value: 'bottom-right', compare: true },
  length: { type: 'number', value: 0.085, compare: true },
};
/**
 * @typedef LayerProps
 * @type {Object}
 * @property {String} unit Physical unit size per pixel at full resolution.
 * @property {Number} size Physical size of a pixel.
 * @property {Object} viewState The current viewState for the desired view.
 * We cannot internally use this.context.viewport because it is one frame behind:
 * https://github.com/visgl/deck.gl/issues/4504
 * @property {Array=} boundingBox Boudning box of the view in which this should render.
 * @property {string=} id Id from the parent layer.
 * @property {number=} length Value from 0 to 1 representing the portion of the view to
 * be used for the length part of the scale bar.
 */

/**
 * @type {{ new(...props: LayerProps[]) }}
 * @ignore
 */
const ScaleBarLayer = class extends deck.CompositeLayer {
  renderLayers() {
    const { id, unit, size, position, viewState, length } = this.props;
    const boundingBox = makeBoundingBox(viewState);
    const { zoom } = viewState;
    const viewLength = boundingBox[2][0] - boundingBox[0][0];
    const barLength = viewLength * 0.05;
    // This is a good heuristic for stopping the bar tick marks from getting too small
    // and/or the text squishing up into the bar.
    const barHeight = Math.max(
      2 ** (-zoom + 1.5),
      (boundingBox[2][1] - boundingBox[0][1]) * 0.007,
    );
    const numUnits = barLength * size;
    // TODO: account for different units returned by snapValue
    // eslint-disable-next-line no-unused-vars
    const [snappedOrigUnits, snappedNewUnits] = snapValue(numUnits);
    // Get snapped value in original units and new units.
    const adjustedBarLength = (numUnits * (snappedOrigUnits / numUnits)) / size;


    const [yCoord, xRightCoordPartial] = getPosition(boundingBox, position, length);
    const xRightCoord = xRightCoordPartial + barLength;
    const lengthBar = new deck.LineLayer({
      id: `scale-bar-length-${id}`,
      coordinateSystem: deck.COORDINATE_SYSTEM.CARTESIAN,
      data: [
        [
          [xRightCoord - adjustedBarLength, yCoord],
          [xRightCoord, yCoord],
        ],
      ],
      getSourcePosition: d => d[0],
      getTargetPosition: d => d[1],
      getWidth: 2,
      getColor: [220, 220, 220],
    });
    const tickBoundsLeft = new deck.LineLayer({
      id: `scale-bar-height-left-${id}`,
      coordinateSystem: deck.COORDINATE_SYSTEM.CARTESIAN,
      data: [
        [
          [xRightCoord - adjustedBarLength, yCoord - barHeight],
          [xRightCoord - adjustedBarLength, yCoord + barHeight],
        ],
      ],
      getSourcePosition: d => d[0],
      getTargetPosition: d => d[1],
      getWidth: 2,
      getColor: [220, 220, 220],
    });
    const tickBoundsRight = new deck.LineLayer({
      id: `scale-bar-height-right-${id}`,
      coordinateSystem: deck.COORDINATE_SYSTEM.CARTESIAN,
      data: [
        [
          [xRightCoord, yCoord - barHeight],
          [xRightCoord, yCoord + barHeight],
        ],
      ],
      getSourcePosition: d => d[0],
      getTargetPosition: d => d[1],
      getWidth: 2,
      getColor: [220, 220, 220],
    });
    const textLayer = new deck.TextLayer({
      id: `units-label-layer-${id}`,
      coordinateSystem: deck.COORDINATE_SYSTEM.CARTESIAN,
      data: [
        {
          text: snappedOrigUnits + unit,
          position: [xRightCoord - barLength * 0.5, yCoord + barHeight * 4],
        },
      ],
      getColor: [220, 220, 220, 255],
      getSize: 12,
      fontFamily: DEFAULT_FONT_FAMILY,
      sizeUnits: 'meters',
      sizeScale: 2 ** -zoom,
      characterSet: [
        ...unit.split(''),
        ...range(10).map(i => String(i)),
        '.',
        'e',
        '+',
      ],
    });
    return [lengthBar, tickBoundsLeft, tickBoundsRight, textLayer];
  }
};

ScaleBarLayer.layerName = 'ScaleBarLayer';
ScaleBarLayer.defaultProps = defaultProps;
export default ScaleBarLayer;