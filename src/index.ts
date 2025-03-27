import { SvgElement, WindBarbSvgOptions } from './types'

const defaultOptions = {
  color: '#000000',
  rotationPoint: 'stem',
}

// Constants for the SVG
const WIDTH = 18
const HALF_WIDTH = Number(WIDTH) / 2
const HEIGHT = 25
const HALF_HEIGHT = Number(HEIGHT) / 2
const STROKE_WIDTH = '2'

// Y coordinates for the wind barb stem elements
const START_Y = 2.9
const SECOND_ELEMENT_Y = 6.85

// For calm winds, 0-2 knots flag
const RADIUS = 5

// X coordinate, 3-7 knots flag
const LO_SPEED_SHORT_BARB_X = 13.35
const LO_SPEED_SHORT_BARB_Y = 1.45

// X and Y coordinates, 8-12 knots flag
const FIRST_LONG_BARB_HEIGHT_Y = 3.9
const FIRST_LONG_BARB_TIP_X = 17.7
const FIRST_LONG_BARB_TIP_Y = 0.95

// X and Y coordinates, and SCALAR for the wind barb flags
const FLAG_TIP_X = 15
const FLAG_TIP_Y_SCALAR = 2
const FLAG_BOTTOM_Y_SCALAR = 4
const FLAG_NEXT_FLAG_Y_SCALAR = 5.5
const FLAG_NEXT_ELEM_Y_SCALAR = 7

const SPEED_INTERVAL = 5
const NO_WIND_THRESHOLD = 3
const FIRST_LONG_BARB_SPEED_THRESHOLD = 8
const FLAG_SPEED = 50
const LONG_BARB_SPEED = 10
const SHORT_BARB_SPEED = 5

/**
 * Generate a wind barb SVG element
 * @param {number} windSpeed - The wind speed in knots
 * @param {number?} windDirection - The wind direction in degrees
 * @param {WindBarbSvgOptions?} options - Options for customizing the SVG
 * @returns {SvgElement} The SVG element representing the wind barb
 */
const generateWindBarbSvgAst = (
  windSpeed: number,
  windDirection: number = 0,
  options?: WindBarbSvgOptions,
): SvgElement => {
  const roundedWindSpeed = Math.round(windSpeed / SPEED_INTERVAL) * SPEED_INTERVAL
  const { color = defaultOptions.color, rotationPoint = defaultOptions.rotationPoint } = options || {}

  const svgNS = 'http://www.w3.org/2000/svg'
  const svgPath = {
    attr: {
      viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
      xmlns: svgNS,
      style: {
        transform: `rotate(${windDirection}deg)`,
        transformOrigin: rotationPoint === 'stem' ? 'bottom center' : 'center center',
        height: '100%',
      },
    },
    children: [],
  } as SvgElement

  if (roundedWindSpeed < NO_WIND_THRESHOLD) {
    svgPath.children = [
      {
        type: 'circle',
        attr: {
          cx: HALF_WIDTH.toString(),
          cy: HALF_HEIGHT.toString(),
          r: RADIUS.toString(),
          stroke: color,
          strokeWidth: STROKE_WIDTH,
          fill: 'none',
        },
      },
    ]
    return svgPath
  }

  let currentY = START_Y

  // Add flags based on wind speed
  let remainingSpeed = roundedWindSpeed

  // Create the stem
  if (roundedWindSpeed >= FLAG_SPEED || roundedWindSpeed < FIRST_LONG_BARB_SPEED_THRESHOLD) {
    svgPath.children.push({
      type: 'polyline',
      attr: {
        points: `${HALF_WIDTH},${HEIGHT} ${HALF_WIDTH},${START_Y}`,
        fill: 'none',
        stroke: color,
        strokeWidth: STROKE_WIDTH,
      },
    })
  } else {
    svgPath.children.push({
      type: 'polyline',
      attr: {
        points: `${HALF_WIDTH},${HEIGHT} ${HALF_WIDTH},${FIRST_LONG_BARB_HEIGHT_Y} ${FIRST_LONG_BARB_TIP_X},${FIRST_LONG_BARB_TIP_Y}`,
        fill: 'none',
        stroke: color,
        strokeWidth: STROKE_WIDTH,
      },
    })

    remainingSpeed -= LONG_BARB_SPEED
    currentY = SECOND_ELEMENT_Y
  }

  if (roundedWindSpeed >= NO_WIND_THRESHOLD && roundedWindSpeed < FIRST_LONG_BARB_SPEED_THRESHOLD) {
    currentY = SECOND_ELEMENT_Y
    svgPath.children.push({
      type: 'line',
      attr: {
        x1: HALF_WIDTH.toString(),
        y1: currentY.toString(),
        x2: LO_SPEED_SHORT_BARB_X.toString(),
        y2: (currentY - LO_SPEED_SHORT_BARB_Y).toString(),
        stroke: color,
        strokeWidth: STROKE_WIDTH,
      },
    })

    return svgPath
  }

  // Add 50 knots flags
  while (remainingSpeed >= FLAG_SPEED) {
    svgPath.children.push({
      type: 'path',
      attr: {
        d: `M${HALF_WIDTH},${currentY} 
            L${FLAG_TIP_X},${currentY + FLAG_TIP_Y_SCALAR} 
            L${HALF_WIDTH},${currentY + FLAG_BOTTOM_Y_SCALAR} 
            Z`,
        fill: color,
        stroke: color,
        strokeWidth: STROKE_WIDTH,
      },
    })

    remainingSpeed -= FLAG_SPEED
    currentY += remainingSpeed >= FLAG_SPEED ? FLAG_NEXT_FLAG_Y_SCALAR : FLAG_NEXT_ELEM_Y_SCALAR
  }

  // Add 10 knots flags
  while (remainingSpeed >= LONG_BARB_SPEED && currentY !== START_Y) {
    svgPath.children.push({
      type: 'line',
      attr: {
        x1: HALF_WIDTH.toString(),
        y1: currentY.toString(),
        x2: FIRST_LONG_BARB_TIP_X.toString(),
        y2: (currentY - START_Y).toString(),
        stroke: color,
        strokeWidth: STROKE_WIDTH,
      },
    })
    remainingSpeed -= 10
    currentY = currentY == START_Y ? SECOND_ELEMENT_Y : currentY + 3
  }

  // Add 5 knots flags
  while (remainingSpeed >= 5) {
    svgPath.children.push({
      type: 'line',
      attr: {
        x1: HALF_WIDTH.toString(),
        y1: currentY.toString(),
        x2: LO_SPEED_SHORT_BARB_X.toString(),
        y2: (currentY - LO_SPEED_SHORT_BARB_Y).toString(),
        stroke: color,
        strokeWidth: STROKE_WIDTH,
      },
    })
    remainingSpeed -= SHORT_BARB_SPEED
    currentY = currentY + 3
  }

  return svgPath
}

export { generateWindBarbSvgAst }

export * from './types'
