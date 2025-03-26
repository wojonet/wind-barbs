import React from 'react'
import { WindBarbSvgOptions, SvgNode } from '../types'
import { generateWindBarbSvg } from '../generator'

const getSvgJsx = (svgElement: SvgNode): React.JSX.Element => {
  switch (svgElement.type) {
    case 'line':
      return <line {...svgElement.attr} />
    case 'circle':
      return <circle {...svgElement.attr} />
    case 'polyline':
      return <polyline {...svgElement.attr} />
    case 'path':
      return <path {...svgElement.attr} />
  }
}

const generateSvg = (windSpeed: number, windDirection: number = 0, options?: WindBarbSvgOptions) => {
  const svgNodes = generateWindBarbSvg(windSpeed, windDirection, options)
  const svgElements = svgNodes.children.map(getSvgJsx)
  return <svg {...svgNodes.attr}>{svgElements}</svg>
}

export default generateSvg
