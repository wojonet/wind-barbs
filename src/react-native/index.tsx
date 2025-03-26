import React from 'react'
import * as RN from 'react-native-svg'
import { WindBarbSvgOptions, SvgNode } from '../types'
import { generateWindBarbSvg } from '../generator'

const getSvgJsx = (svgElement: SvgNode): React.JSX.Element => {
  switch (svgElement.type) {
    case 'line':
      return <RN.Line {...svgElement.attr} />
    case 'circle':
      return <RN.Circle {...svgElement.attr} />
    case 'polyline':
      return <RN.Polyline {...svgElement.attr} />
    case 'path':
      return <RN.Path {...svgElement.attr} />
  }
}

const generateSvg = (windSpeed: number, windDirection: number = 0, options?: WindBarbSvgOptions) => {
  const svgNodes = generateWindBarbSvg(windSpeed, windDirection, options)
  const svgElements = svgNodes.children.map(getSvgJsx)
  return (
    <RN.Svg
      viewBox={svgNodes.attr.viewBox}
      style={{
        transform: svgNodes.attr.style.transform,
        transformOrigin: svgNodes.attr.style.transformOrigin,
      }}
      height={svgNodes.attr.style.height}
    >
      {svgElements}
    </RN.Svg>
  )
}

export default generateSvg
