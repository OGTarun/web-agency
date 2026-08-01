import * as THREE from "three";

export const MONOLITH = {
  width: 3.0,
  height: 1.7,
  cornerRadius: 0.34,
  depth: 0.28,
  bevel: 0.05,
};

export const PLINTH = {
  width: 3.3,
  height: 1.95,
  cornerRadius: 0.36,
  depth: 0.1,
};

export const WINDOW = {
  oCenter: -0.75,
  gCenter: 0.75,
  radius: 0.68,
};

export const GLYPH = {
  outerRadius: 0.56,
  innerRadius: 0.32,
  gOpening: 0.62,
  depth: 0.22,
};

function createRoundedRectShape(width: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.absarc(x + width - radius, y + radius, radius, -Math.PI / 2, 0, false);
  shape.lineTo(x + width, y + height - radius);
  shape.absarc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2, false);
  shape.lineTo(x + radius, y + height);
  shape.absarc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI, false);
  shape.lineTo(x, y + radius);
  shape.absarc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5, false);
  shape.closePath();

  return shape;
}

function createCirclePath(centerX: number, radius: number) {
  const path = new THREE.Path();
  path.absarc(centerX, 0, radius, 0, Math.PI * 2, false);
  return path;
}

export function createMonolithGeometry() {
  const shape = createRoundedRectShape(MONOLITH.width, MONOLITH.height, MONOLITH.cornerRadius);

  shape.holes.push(
    createCirclePath(WINDOW.oCenter, WINDOW.radius),
    createCirclePath(WINDOW.gCenter, WINDOW.radius),
  );

  return new THREE.ExtrudeGeometry(shape, {
    bevelEnabled: true,
    bevelSegments: 5,
    bevelSize: MONOLITH.bevel,
    bevelThickness: MONOLITH.bevel,
    curveSegments: 64,
    depth: MONOLITH.depth,
  });
}

export function createPlinthGeometry() {
  const shape = createRoundedRectShape(PLINTH.width, PLINTH.height, PLINTH.cornerRadius);

  return new THREE.ExtrudeGeometry(shape, {
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.02,
    bevelThickness: 0.02,
    curveSegments: 64,
    depth: PLINTH.depth,
  });
}

export function createOGlyphGeometry() {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, GLYPH.outerRadius, 0, Math.PI * 2, false);
  shape.holes.push(createCirclePath(0, GLYPH.innerRadius));

  return new THREE.ExtrudeGeometry(shape, {
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.02,
    bevelThickness: 0.02,
    curveSegments: 48,
    depth: GLYPH.depth,
  });
}

export function createGGlyphGeometry() {
  const { outerRadius: outer, innerRadius: inner, gOpening: opening } = GLYPH;
  const shape = new THREE.Shape();

  shape.moveTo(Math.cos(opening) * outer, Math.sin(opening) * outer);
  shape.absarc(0, 0, outer, opening, Math.PI * 2 - opening, false);
  shape.lineTo(
    Math.cos(Math.PI * 2 - opening) * inner,
    Math.sin(Math.PI * 2 - opening) * inner,
  );
  shape.absarc(0, 0, inner, Math.PI * 2 - opening, opening, true);
  shape.closePath();

  return new THREE.ExtrudeGeometry(shape, {
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.02,
    bevelThickness: 0.02,
    curveSegments: 48,
    depth: GLYPH.depth,
  });
}

export function createChamberShape(width: number, height: number, radius: number) {
  return createRoundedRectShape(width, height, radius);
}
