import { WindBarbSvgOptions, SvgNode } from '../types'
import { generateWindBarbSvg } from '../generator'

const propsToAttributes = {
  x1: 'x1',
  x2: 'x2',
  y1: 'y1',
  y2: 'y2',
  stroke: 'stroke',
  strokeWidth: 'stroke-width',
  fill: 'fill',
  d: 'd',
  cx: 'cx',
  cy: 'cy',
  r: 'r',
  points: 'points',
  style: 'style',
  viewBox: 'viewBox',
  xmlns: 'xmlns',
  transform: 'transform',
  transformOrigin: 'transform-origin',
  height: 'height',
} as { [key: string]: string }

const getSvgNode = (svgElement: SvgNode, xmlns: string) => {
  const newElem = document.createElementNS(xmlns, svgElement.type)
  const attributes = svgElement.attr
  Object.entries(attributes).map(([key, value]) => {
    newElem.setAttribute(propsToAttributes[key], value.toString())
  })
  return newElem
}

const generateSvg = (windSpeed: number, windDirection: number = 0, options?: WindBarbSvgOptions) => {
  const svgNodes = generateWindBarbSvg(windSpeed, windDirection, options)
  const svgElements = svgNodes.children.map(e => getSvgNode(e, svgNodes.attr.xmlns))
  const svg = document.createElementNS(svgNodes.attr.xmlns, 'svg')
  const attributes = svgNodes.attr
  Object.entries(attributes).map(([key, value]) => {
    if (key === 'style') {
      // build style string
      let styleString = ''
      Object.entries(value).map(([styleKey, styleValue]) => {
        styleString += `${styleKey}: ${styleValue}; `
      })
      svg.setAttribute(key, styleString)
    } else {
      svg.setAttribute(propsToAttributes[key], value.toString())
    }
  })
  svgElements.forEach(elem => svg.appendChild(elem))
  return svg
}

export default generateSvg

// export interface WindBarbSvgOptions {
//   color?: string
//   rotationPoint?: 'stem' | 'center'
// }

// const defaultOptions = {
//   color: '#000000',
//   rotationPoint: 'stem',
// }

// /**
//  * Generate a wind barb SVG element
//  * @param {number} windSpeed - The wind speed in knots
//  * @param {number?} windDirection - The wind direction in degrees
//  * @param {WindBarbSvgOptions?} options - Options for customizing the SVG
//  * @returns {SVGSVGElement} The SVG element representing the wind barb
//  */
// const generateWindBarbSvg = (windSpeed: number, windDirection = 0, options = defaultOptions): SVGSVGElement => {
//   const opts = { ...defaultOptions, ...options }
//   const roundedWindSpeed = Math.round(windSpeed / 5) * 5

//   const svgNS = 'http://www.w3.org/2000/svg'
//   const svg = document.createElementNS(svgNS, 'svg')
//   svg.setAttribute('viewBox', '0 0 18 25')
//   svg.setAttribute('xmlns', svgNS)
//   // Rotate the SVG to match the wind direction
//   svg.style.transform = `rotate(${windDirection}deg)`
//   svg.style.transformOrigin = opts.rotationPoint === 'stem' ? 'bottom center' : 'center center'
//   // make height 100%
//   svg.setAttribute('height', '100%')

//   if (roundedWindSpeed < 3) {
//     // Add a circle for light and calm winds
//     const circle = document.createElementNS(svgNS, 'circle')
//     circle.setAttribute('cx', '9')
//     circle.setAttribute('cy', '12.5')
//     circle.setAttribute('r', '5')
//     circle.setAttribute('stroke', opts.color)
//     circle.setAttribute('stroke-width', '2')
//     circle.setAttribute('fill', 'none')
//     svg.appendChild(circle)
//     return svg
//   }

//   let currentY = 2.9

//   // Add flags based on wind speed
//   let remainingSpeed = roundedWindSpeed

//   // Create the stem
//   if (roundedWindSpeed >= 50 || roundedWindSpeed < 8) {
//     const stem = document.createElementNS(svgNS, 'polyline')
//     stem.setAttribute('points', '9,25 9,2.9')
//     stem.setAttribute('fill', 'none')
//     stem.setAttribute('stroke', opts.color)
//     stem.setAttribute('stroke-width', '2')
//     svg.appendChild(stem)
//     svg.appendChild(stem)
//   } else {
//     // create polyline for stem
//     const stem = document.createElementNS(svgNS, 'polyline')
//     stem.setAttribute('points', '9,25 9,3.9 17.7,0.95')
//     stem.setAttribute('fill', 'none')
//     stem.setAttribute('stroke', opts.color)
//     stem.setAttribute('stroke-width', '2')
//     svg.appendChild(stem)
//     remainingSpeed -= 10
//     currentY = 6.85
//   }

//   if (roundedWindSpeed >= 3 && roundedWindSpeed < 8) {
//     currentY = 6.85
//     const flag = document.createElementNS(svgNS, 'line')
//     flag.setAttribute('x1', '9')
//     flag.setAttribute('y1', currentY.toString())
//     flag.setAttribute('x2', '13.35')
//     flag.setAttribute('y2', (currentY - 1.45).toString())
//     flag.setAttribute('stroke', opts.color)
//     flag.setAttribute('stroke-width', '2')
//     svg.appendChild(flag)
//     return svg
//   }

//   // Add 50 knots flags
//   while (remainingSpeed >= 50) {
//     const flag = document.createElementNS(svgNS, 'path')
//     flag.setAttribute('fill', opts.color)
//     flag.setAttribute('stroke', opts.color)
//     flag.setAttribute('stroke-width', '2')
//     flag.setAttribute(
//       'd',
//       `
//         M9,${currentY}
//         L15,${currentY + 2}
//         L9,${currentY + 4}
//         Z
//       `,
//     )
//     svg.appendChild(flag)
//     remainingSpeed -= 50
//     if (remainingSpeed >= 50) {
//       currentY += 5.5
//     } else {
//       currentY += 7
//     }
//   }

//   // Add 10 knots flags
//   while (remainingSpeed >= 10 && currentY !== 2.9) {
//     const flag = document.createElementNS(svgNS, 'line')
//     flag.setAttribute('x1', '9')
//     flag.setAttribute('y1', currentY.toString())
//     flag.setAttribute('x2', '17.7')
//     flag.setAttribute('y2', (currentY - 2.9).toString())
//     flag.setAttribute('stroke', opts.color)
//     flag.setAttribute('stroke-width', '2')
//     svg.appendChild(flag)
//     remainingSpeed -= 10
//     currentY = currentY == 2.9 ? 6.85 : currentY + 3
//   }

//   // Add 5 knots flags
//   while (remainingSpeed >= 5) {
//     const flag = document.createElementNS(svgNS, 'line')
//     flag.setAttribute('x1', '9')
//     flag.setAttribute('y1', currentY.toString())
//     flag.setAttribute('x2', '13.35')
//     flag.setAttribute('y2', (currentY - 1.45).toString())
//     flag.setAttribute('stroke', opts.color)
//     flag.setAttribute('stroke-width', '2')
//     svg.appendChild(flag)
//     remainingSpeed -= 5
//     currentY += 3
//   }

//   return svg
// }

// export { generateWindBarbSvg }
