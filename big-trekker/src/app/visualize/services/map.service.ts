import { Injectable } from '@angular/core';

import { lineString } from '@turf/helpers';
import * as bezier from '@turf/bezier-spline';

import { Step } from '../models';

@Injectable()
export class MapService {

  getLine(points: Array<Step>) {
    const line = points.map((step) => ([step.longitude, step.latitude]));
    return bezier.default(lineString(line));
  }
}
