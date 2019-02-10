import { Injectable } from '@angular/core';

import { lineString } from '@turf/helpers';
import { getGeom } from '@turf/invariant';

import { Step } from '../step/step';

// below spline + bezier code has been taken from @turf/bezier-spline module (but it doesn't work here so had to take it out)
// TODO: move this somewhere else in Utils?
function Spline(options) {
  this.points = options.points || [];
  this.duration = options.duration || 10000;
  this.sharpness = options.sharpness || 0.85;
  this.centers = [];
  this.controls = [];
  this.stepLength = options.stepLength || 60;
  this.length = this.points.length;
  this.delay = 0;
  // this is to ensure compatibility with the 2d version
  for (var i = 0; i < this.length; i++) {
      this.points[i].z = this.points[i].z || 0;
  }
  for (var i = 0; i < this.length - 1; i++) {
      var p1 = this.points[i];
      var p2 = this.points[i + 1];
      this.centers.push({
          x: (p1.x + p2.x) / 2,
          y: (p1.y + p2.y) / 2,
          z: (p1.z + p2.z) / 2,
      });
  }
  this.controls.push([this.points[0], this.points[0]]);
  for (var i = 0; i < this.centers.length - 1; i++) {
      var p1 = this.centers[i];
      var p2 = this.centers[i + 1];
      var dx = this.points[i + 1].x - (this.centers[i].x + this.centers[i + 1].x) / 2;
      var dy = this.points[i + 1].y - (this.centers[i].y + this.centers[i + 1].y) / 2;
      var dz = this.points[i + 1].z - (this.centers[i].y + this.centers[i + 1].z) / 2;
      this.controls.push([{
              x: (1.0 - this.sharpness) * this.points[i + 1].x + this.sharpness * (this.centers[i].x + dx),
              y: (1.0 - this.sharpness) * this.points[i + 1].y + this.sharpness * (this.centers[i].y + dy),
              z: (1.0 - this.sharpness) * this.points[i + 1].z + this.sharpness * (this.centers[i].z + dz)
          },
          {
              x: (1.0 - this.sharpness) * this.points[i + 1].x + this.sharpness * (this.centers[i + 1].x + dx),
              y: (1.0 - this.sharpness) * this.points[i + 1].y + this.sharpness * (this.centers[i + 1].y + dy),
              z: (1.0 - this.sharpness) * this.points[i + 1].z + this.sharpness * (this.centers[i + 1].z + dz)
          }]);
  }
  this.controls.push([this.points[this.length - 1], this.points[this.length - 1]]);
  this.steps = this.cacheSteps(this.stepLength);
}
/**
 * Caches an array of equidistant (more or less) points on the curve.
 */
Spline.prototype.cacheSteps = function (mindist) {
    var steps = [];
    var laststep = this.pos(0);
    steps.push(0);
    for (var t = 0; t < this.duration; t += 10) {
        var step = this.pos(t);
        var dist = Math.sqrt((step.x - laststep.x) * (step.x - laststep.x) +
            (step.y - laststep.y) * (step.y - laststep.y) +
            (step.z - laststep.z) * (step.z - laststep.z));
        if (dist > mindist) {
            steps.push(t);
            laststep = step;
        }
    }
    return steps;
};
/**
 * returns angle and speed in the given point in the curve
 */
Spline.prototype.vector = function (t) {
    var p1 = this.pos(t + 10);
    var p2 = this.pos(t - 10);
    return {
        angle: 180 * Math.atan2(p1.y - p2.y, p1.x - p2.x) / 3.14,
        speed: Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) +
            (p2.y - p1.y) * (p2.y - p1.y) +
            (p2.z - p1.z) * (p2.z - p1.z)),
    };
};
/**
 * Gets the position of the point, given time.
 *
 * WARNING: The speed is not constant. The time it takes between control points is constant.
 *
 * For constant speed, use Spline.steps[i];
 */
Spline.prototype.pos = function (time) {
    var t = time - this.delay;
    if (t < 0) {
        t = 0;
    }
    if (t > this.duration) {
        t = this.duration - 1;
    }
    // t = t-this.delay;
    var t2 = (t) / this.duration;
    if (t2 >= 1) {
        return this.points[this.length - 1];
    }
    var n = Math.floor((this.points.length - 1) * t2);
    var t1 = (this.length - 1) * t2 - n;
    return _bezier(t1, this.points[n], this.controls[n][1], this.controls[n + 1][0], this.points[n + 1]);
};

function _bezier(t, p1, c1, c2, p2) {
  var b = B(t);
  var pos = {
      x: p2.x * b[0] + c2.x * b[1] + c1.x * b[2] + p1.x * b[3],
      y: p2.y * b[0] + c2.y * b[1] + c1.y * b[2] + p1.y * b[3],
      z: p2.z * b[0] + c2.z * b[1] + c1.z * b[2] + p1.z * b[3],
  };
  return pos;
}
function B(t) {
  var t2 = t * t;
  var t3 = t2 * t;
  return [(t3), (3 * t2 * (1 - t)), (3 * t * (1 - t) * (1 - t)), ((1 - t) * (1 - t) * (1 - t))];
}

function bezier(line, options) {
  if (options === void 0) { options = {}; }
  // Optional params
  var resolution = options.resolution || 10000;
  var sharpness = options.sharpness || 0.85;
  var coords = [];
  var points = getGeom(line).coordinates.map(function (pt) {
      return { x: pt[0], y: pt[1] };
  });
  var spline = new Spline({
      duration: resolution,
      points: points,
      sharpness: sharpness,
  });
  for (var i = 0; i < spline.duration; i += 10) {
      var pos = spline.pos(i);
      if (Math.floor(i / 100) % 2 === 0) {
          coords.push([pos.x, pos.y]);
      }
  }
  return lineString(coords, options.properties);
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  getLine(points: Array<Step>) {
    let line = [];
    for (let idx in points) {
      let step = points[idx];
      line.push([step.longitude, step.latitude]);
    }
    let ls = lineString(line);
    let bz = bezier(ls, undefined);
    console.log(bz);
    return bz;
  }
}
