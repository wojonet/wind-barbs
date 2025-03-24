import React from 'react'

interface WindBarbSvgOptions {
  color?: string
}

const defaultOptions = {
  color: '#000000',
}

/**
 * Generate a wind barb SVG element
 * @param {number} windSpeed - The wind speed in knots
 * @param {number} windDirection - The wind direction in degrees
 * @param {WindBarbSvgOptions} options - Options for customizing the SVG
 * @returns {React.JSX.Element} The SVG element representing the wind barb
 */
const generateWindBarbSvg = (
  windSpeed: number,
  windDirection: number,
  options: WindBarbSvgOptions = defaultOptions,
): React.JSX.Element => {
  const opts = { ...defaultOptions, ...options }
  const svgNS = 'http://www.w3.org/2000/svg'

  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('viewBox', '0 0 18 25')
  svg.setAttribute('xmlns', svgNS)
  svg.style.transform = `rotate(${windDirection}deg)`
  svg.style.transformOrigin = 'bottom center'

  if (windSpeed < 3) {
    const circle = document.createElementNS(svgNS, 'circle')
    circle.setAttribute('cx', '9')
    circle.setAttribute('cy', '12.5')
    circle.setAttribute('r', '5')
    circle.setAttribute('stroke', opts.color)
    circle.setAttribute('stroke-width', '2')
    circle.setAttribute('fill', 'none')
    svg.appendChild(circle)
    return <>{svg.outerHTML}</>
  }

  let currentY = 2.9
  if (windSpeed >= 3 && windSpeed < 8) {
    currentY = 6.85
  }

  const stem = document.createElementNS(svgNS, 'polyline')
  stem.setAttribute('points', '9,25 9,2.9')
  stem.setAttribute('fill', 'none')
  stem.setAttribute('stroke', opts.color)
  stem.setAttribute('stroke-width', '2')
  svg.appendChild(stem)

  let remainingSpeed = windSpeed

  while (remainingSpeed >= 50) {
    const flag = document.createElementNS(svgNS, 'path')
    flag.setAttribute('fill', opts.color)
    flag.setAttribute('stroke', opts.color)
    flag.setAttribute('stroke-width', '2')
    flag.setAttribute('d', `M9,${currentY} L15,${currentY + 2} L9,${currentY + 4} Z`)
    svg.appendChild(flag)
    remainingSpeed -= 50
    currentY += remainingSpeed >= 50 ? 5.5 : 7
  }

  while (remainingSpeed >= 10) {
    const flag = document.createElementNS(svgNS, 'line')
    flag.setAttribute('x1', '9')
    flag.setAttribute('y1', currentY.toString())
    flag.setAttribute('x2', '17.7')
    flag.setAttribute('y2', (currentY - 2.9).toString())
    flag.setAttribute('stroke', opts.color)
    flag.setAttribute('stroke-width', '2')
    svg.appendChild(flag)
    remainingSpeed -= 10
    currentY += 3
  }

  while (remainingSpeed >= 5) {
    const flag = document.createElementNS(svgNS, 'line')
    flag.setAttribute('x1', '9')
    flag.setAttribute('y1', currentY.toString())
    flag.setAttribute('x2', '13.35')
    flag.setAttribute('y2', (currentY - 1.45).toString())
    flag.setAttribute('stroke', opts.color)
    flag.setAttribute('stroke-width', '2')
    svg.appendChild(flag)
    remainingSpeed -= 5
    currentY += 3
  }

  return <>{svg.outerHTML}</>
}

export { generateWindBarbSvg }
