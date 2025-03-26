export interface WindBarbSvgOptions {
  color?: string
  rotationPoint?: 'stem' | 'center'
}

export interface SvgElement {
  attr: {
    viewBox: string
    xmlns: string
    style: {
      transform: string
      transformOrigin: string
      height: string
    }
  }
  children: (CircleNode | LineNode | PolylineNode | PathNode)[]
}

export interface SvgNode {
  type: 'line' | 'circle' | 'polyline' | 'path'
  attr: {
    stroke: string
    strokeWidth: string
  }
}

export interface CircleNode extends SvgNode {
  type: 'circle'
  attr: {
    cx: string
    cy: string
    r: string
    stroke: string
    strokeWidth: string
    fill: string
  }
}

export interface LineNode extends SvgNode {
  type: 'line'
  attr: {
    x1: string
    y1: string
    x2: string
    y2: string
    stroke: string
    strokeWidth: string
  }
}

export interface PolylineNode extends SvgNode {
  type: 'polyline'
  attr: {
    points: string
    fill: string
    stroke: string
    strokeWidth: string
  }
}

export interface PathNode extends SvgNode {
  type: 'path'
  attr: {
    d: string
    fill: string
    stroke: string
    strokeWidth: string
  }
}
