import { WindBarbSvgOptions, SvgNode } from '../index'
import generateWindBarbSvgAst from '../index'

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
  const svgNodes = generateWindBarbSvgAst(windSpeed, windDirection, options)
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
