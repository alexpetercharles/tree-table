/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import {
  p5, Image,
} from 'p5';

// textures
import earthTextureSrc from '@/assets/sketches/earth-texture-night.jpg';
import cloudTextureSrc from '@/assets/sketches/cloud-texture.png';

import pointOfInterests from './pointOfInterests';

// import addScreenPosition from '@/helpers/addScreenPosition';

const defaultSketch = (height: number, width: number) => ((p: p5) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let easyCam: any;
  const viewDistance = 1500;

  // earth
  const earthRadius = 600;
  let earthTexture: Image;
  let cloudTexture: Image;

  // point of interests
  const { drawPointOfInterests } = pointOfInterests(p, earthRadius);

  p.preload = () => {
    earthTexture = p.loadImage(earthTextureSrc);
    cloudTexture = p.loadImage(cloudTextureSrc);
  };

  p.setup = () => {
    // init
    p.createCanvas(width, height, p.WEBGL);
    p.pixelDensity(0.25); // 0.25 is 1080p
    p.setAttributes('antialias', true);
    document.oncontextmenu = () => false;

    // camera
    easyCam = p.createEasyCam({ distance: viewDistance });
    easyCam.setDistanceMin(viewDistance);
    easyCam.setDistanceMax(viewDistance);
  };

  p.draw = () => {
    p.background(0);
    p.noStroke();
    drawEarth();
    drawPointOfInterests();
  };

  let rotation = 1;
  const drawEarth = () => {
    p.rotateY(rotation);
    rotation += 0.001;

    p.push();
    // rotate the earth so that texture matches coordinates
    p.texture(earthTexture);
    p.rotateY(4.7);
    p.sphere(earthRadius, 50, 50);
    p.pop();

    p.push();
    p.texture(cloudTexture);
    p.rotateY(4.7);
    p.sphere(earthRadius + 5);
    p.pop();
  };
});

export default defaultSketch;