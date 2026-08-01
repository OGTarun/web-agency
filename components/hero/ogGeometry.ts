import * as THREE from "three";

const GLYPH = {
  outerRadius: 0.46,
  innerRadius: 0.28,
  gapHalfAngle: 0.42,
  depth: 0.24,
  bevel: 0.05,
};

const LAYOUT = {
  oCenter: -0.55,
  gCenter: 0.55,
};

const BAR = {
  xLeft: -0.34,
  xRight: 0.4,
  yBottom: -0.02,
  yTop: 0.2,
  radius: 0.04,
};

function extrude(shapes: THREE.Shape[]) {
  return new THREE.ExtrudeGeometry(shapes, {
    bevelEnabled: true,
    bevelSegments: 6,
    bevelSize: GLYPH.bevel,
    bevelThickness: GLYPH.bevel,
    curveSegments: 64,
    depth: GLYPH.depth,
  });
}

function createOGlyphShape() {
  const { outerRadius: outer, innerRadius: inner } = GLYPH;
  const shape = new THREE.Shape();
  shape.absarc(LAYOUT.oCenter, 0, outer, 0, Math.PI * 2, false);

  const hole = new THREE.Path();
  hole.absarc(LAYOUT.oCenter, 0, inner, 0, Math.PI * 2, false);
  shape.holes.push(hole);

  return shape;
}

function createGGlyphShape() {
  const { outerRadius: outer, innerRadius: inner, gapHalfAngle: opening } = GLYPH;
  const shape = new THREE.Shape();

  shape.moveTo(
    LAYOUT.gCenter + Math.cos(opening) * outer,
    Math.sin(opening) * outer,
  );
  shape.absarc(
    LAYOUT.gCenter,
    0,
    outer,
    opening,
    Math.PI * 2 - opening,
    false,
  );
  shape.lineTo(
    LAYOUT.gCenter + Math.cos(Math.PI * 2 - opening) * inner,
    Math.sin(Math.PI * 2 - opening) * inner,
  );
  shape.absarc(
    LAYOUT.gCenter,
    0,
    inner,
    Math.PI * 2 - opening,
    opening,
    true,
  );
  shape.closePath();

  return shape;
}

function createGBarShape() {
  const { xLeft, xRight, yBottom, yTop, radius } = BAR;
  const shape = new THREE.Shape();

  shape.moveTo(xLeft + radius, yBottom);
  shape.lineTo(xRight - radius, yBottom);
  shape.absarc(xRight - radius, yBottom + radius, radius, -Math.PI / 2, 0, false);
  shape.lineTo(xRight, yTop - radius);
  shape.absarc(xRight - radius, yTop - radius, radius, 0, Math.PI / 2, false);
  shape.lineTo(xLeft + radius, yTop);
  shape.absarc(xLeft + radius, yTop - radius, radius, Math.PI / 2, Math.PI, false);
  shape.lineTo(xLeft, yBottom + radius);
  shape.absarc(xLeft + radius, yBottom + radius, radius, Math.PI, Math.PI * 1.5, false);
  shape.closePath();

  return shape;
}

export function createOGGeometry() {
  return extrude([createOGlyphShape(), createGGlyphShape(), createGBarShape()]);
}
