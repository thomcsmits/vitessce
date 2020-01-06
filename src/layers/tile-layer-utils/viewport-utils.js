/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

/*
------------------------------------------
THIS CODE IS FROM DECKGL MOSTLY
IT IS AWAITING A PR THERE AND WILL
THEN BE REMOVED IN FAVOR OF THAT
------------------------------------------
*/

// This has been changed from deck.gl
function getBoundingBox(viewport) {
  const corners = [
    ...viewport.unproject([0, 0]),
    ...viewport.unproject([viewport.width, viewport.height]),
  ];
  return corners;
}

function pixelsToTileIndex(pixelCount, z, tileSize) {
  return pixelCount / (tileSize * (2 ** -z));
}

/**
 * Returns all tile indices in the current viewport. If the current zoom level is smaller
 * than minZoom, return an empty array. If the current zoom level is greater than maxZoom,
 * return tiles that are on maxZoom.
 */
 // This has been changed from deck.gl
export function getTileIndices(viewport, maxZoom, minZoom, tileSize) {
  const z = Math.min(0, Math.ceil(viewport.zoom));

  if (z <= minZoom) {
    return [{ x: 0, y: 0, z: minZoom }];
  }
  const bbox = getBoundingBox(viewport);
  const [minX, minY, maxX, maxY] = bbox.map(pixels => pixelsToTileIndex(pixels, z, tileSize));
  /*
      |  TILE  |  TILE  |  TILE  |
        |(minX)                 |(maxX)
      |(roundedMinX)             |(roundedMaxX)
   */
  const roundedMinX = Math.max(0, Math.floor(minX));
  const roundedMaxX = Math.max(0, Math.ceil(maxX));
  const roundedMinY = Math.max(0, Math.floor(minY));
  const roundedMaxY = Math.max(0, Math.ceil(maxY));
  const indices = [];
  for (let x = roundedMinX; x < roundedMaxX; x += 1) {
    for (let y = roundedMinY; y < roundedMaxY; y += 1) {
      indices.push({ x, y, z });
    }
  }
  return indices;
}