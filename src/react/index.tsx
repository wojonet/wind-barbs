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
  const finalOptions = { ...defaultOptions, ...options }

  if (windSpeed === 0) {
    // Light and calm winds: render a circle
    return (
      <svg viewBox="0 0 18 25" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="12.5" r="5" stroke={finalOptions.color} strokeWidth="2" fill="none" />
      </svg>
    )
  }

  let currentY = 2.9
  if (windSpeed >= 3 && windSpeed < 8) {
    currentY = 6.85
  }

  const flags: React.JSX.Element[] = []
  let remainingSpeed = windSpeed

  // Add 50 knots flags
  while (remainingSpeed >= 50) {
    flags.push(
      <path
        key={`flag-50-${currentY}`}
        fill={finalOptions.color}
        stroke={finalOptions.color}
        strokeWidth="2"
        d={`M9,${currentY} L15,${currentY + 2} L9,${currentY + 4} Z`}
      />,
    )
    remainingSpeed -= 50
    currentY += remainingSpeed >= 50 ? 5.5 : 7
  }

  // Add 10 knots flags
  while (remainingSpeed >= 10 && currentY !== 2.9) {
    flags.push(
      <line
        key={`flag-10-${currentY}`}
        x1="9"
        y1={currentY.toString()}
        x2="17.7"
        y2={(currentY - 2.9).toString()}
        stroke={finalOptions.color}
        strokeWidth="2"
      />,
    )
    remainingSpeed -= 10
    currentY = currentY === 2.9 ? 6.85 : currentY + 3
  }

  // Add 5 knots flags
  while (remainingSpeed >= 5) {
    flags.push(
      <line
        key={`flag-5-${currentY}`}
        x1="9"
        y1={currentY.toString()}
        x2="13.35"
        y2={(currentY - 1.45).toString()}
        stroke={finalOptions.color}
        strokeWidth="2"
      />,
    )
    remainingSpeed -= 5
    currentY += 3
  }

  return (
    <svg
      viewBox="0 0 18 25"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `rotate(${windDirection}deg)`,
        transformOrigin: 'bottom center',
      }}
    >
      <polyline points="9,25 9,2.9" fill="none" stroke={finalOptions.color} strokeWidth="2" />
      {flags}
    </svg>
  )
}

export { generateWindBarbSvg }
