import React from 'react'
import { Svg, Circle, Line, Polyline, Path } from 'react-native-svg'
import { WindBarbSvgOptions, SvgNode } from '../types'
import { generateWindBarbSvg } from '../generator'

const getSvgJsx = (svgElement: SvgNode): React.JSX.Element => {
  switch (svgElement.type) {
    case 'line':
      return <Line {...svgElement.attr} />
    case 'circle':
      return <Circle {...svgElement.attr} />
    case 'polyline':
      return <Polyline {...svgElement.attr} />
    case 'path':
      return <Path {...svgElement.attr} />
  }
}

const generateSvg = (windSpeed: number, windDirection: number = 0, options?: WindBarbSvgOptions) => {
  const svgNodes = generateWindBarbSvg(windSpeed, windDirection, options)
  const svgElements = svgNodes.children.map(getSvgJsx)
  return (
    <Svg
      viewBox={svgNodes.attr.viewBox}
      style={{
        transform: svgNodes.attr.style.transform,
        transformOrigin: svgNodes.attr.style.transformOrigin,
      }}
      height={svgNodes.attr.style.height}
    >
      {svgElements}
    </Svg>
  )
}

export default generateSvg
