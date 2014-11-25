var trigonometry = {
            degreesToRadians: function(value){
                return value * Math.PI / 180;
            },
            radiansToDegrees: function(value){
                return value * 180 / Math.PI
            },
            calculateBearingTo: function(x1, y1, x2, y2){
                var vekX = x2 - x1,
                    vekY = y2 - y1,
                    len = Math.sqrt(Math.pow(vekY, 2) + Math.pow(vekX, 2)),
                    sign = vekX < 0 ? -1 : 1,
                    angel = this.radiansToDegrees(Math.acos(Math.abs(vekY/len)));

                if (vekY === 0){
                    return sign > 0 ? 90 : -90;
                } else {
                    return sign * (vekY < 0 ? angel : (180 - angel));
                }
            },
            distanceBetweenLineAndPoint: function(point, arrLinePoints) {
                var buildResult = function(distance, point) {
                        return {
                            point: point,
                            distance: distance
                        }
                    },
                    closestPoint,
                    xa = arrLinePoints[0].x,ya = arrLinePoints[0].y,xb = arrLinePoints[1].x,yb = arrLinePoints[1].y,
                    x0 = point.x, y0 = point.y,
                    lx = xb - xa,
                    ly = yb - ya,
                    dx = xa - x0,
                    dy = ya - y0,
                    denominator = lx * lx + ly * ly,
                    t = denominator ? -(dx * lx + dy * ly) / denominator : -1;// if line consist of two points with the same coordinates

                if (t < 0) {
                    return buildResult(this.distanceBetweenPoints(point, arrLinePoints[0]), arrLinePoints[0]);
                } else if (t > 1) {
                    return buildResult(this.distanceBetweenPoints(point, arrLinePoints[1]), arrLinePoints[1]);
                } else {
                    closestPoint = {x: xa + t * lx, y: ya + t * ly};
                    return buildResult(this.distanceBetweenPoints(point, closestPoint), closestPoint);
                }
            },
            distanceBetweenPoints: function(point1, point2) {
                return this.distanceBetween(point1.x, point1.y, point2.x, point2.y);
            },
            distanceBetween: function(x1, y1, x2, y2){
                return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            },
            distanceBetweenLatLng: function(lat1, lng1, lat2, lng2){
                var R = 6371,
                    dLat = this.degreesToRadians(lat2-lat1),
                    dLon = this.degreesToRadians(lng2-lng1),
                    a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)),
                    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                return R * c;
            },
            bearingInitial : function (lat1, long1, lat2, long2) {
                return (this.bearingDegrees(lat1, long1, lat2, long2) + 360) % 360;
            },
            bearingFinal: function(lat1, long1, lat2, long2) {
                return (this.bearingDegrees(lat2, long2, lat1, long1) + 180) % 360;
            },
            bearingDegrees: function(lat1, long1, lat2, long2){
                var degToRad= Math.PI/180.0,
                    phi1= lat1 * degToRad,
                    phi2= lat2 * degToRad,
                    lam1= long1 * degToRad,
                    lam2= long2 * degToRad;

                return Math.atan2(Math.sin(lam2-lam1) * Math.cos(phi2),
                    Math.cos(phi1)*Math.sin(phi2) - Math.sin(phi1)*Math.cos(phi2)*Math.cos(lam2-lam1)
                ) * 180/Math.PI;
            },
            /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
            /* Vincenty Direct Solution of Geodesics on the Ellipsoid (c) Chris Veness 2005-2012              */
            /*                                                                                                */
            /* from: Vincenty direct formula - T Vincenty, "Direct and Inverse Solutions of Geodesics on the  */
            /*       Ellipsoid with application of nested equations", Survey Review, vol XXII no 176, 1975    */
            /*       http://www.ngs.noaa.gov/PUBS_LIB/inverse.pdf                                             */
            /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

            /**
             * Calculates destination point given start point lat/long, bearing & distance,
             * using Vincenty inverse formula for ellipsoids
             *
             * @param   {Number} lat1, lon1: first point in decimal degrees
             * @param   {Number} brng: initial bearing in decimal degrees
             * @param   {Number} dist: distance along bearing in metres
             * @returns (LatLon} destination point
             */
            destVincenty : function(lat1, lon1, brng, dist) {
                var a = 6378137, b = 6356752.3142,  f = 1/298.257223563,  // WGS-84 ellipsiod
                    s = dist,
                    alpha1 = this.degreesToRadians(brng),
                    sinAlpha1 = Math.sin(alpha1),
                    cosAlpha1 = Math.cos(alpha1),

                    tanU1 = (1-f) * Math.tan(this.degreesToRadians(lat1)),
                    cosU1 = 1 / Math.sqrt((1 + tanU1*tanU1)), sinU1 = tanU1*cosU1,
                    sigma1 = Math.atan2(tanU1, cosAlpha1),
                    sinAlpha = cosU1 * sinAlpha1,
                    cosSqAlpha = 1 - sinAlpha*sinAlpha,
                    uSq = cosSqAlpha * (a*a - b*b) / (b*b),
                    A = 1 + uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq))),
                    B = uSq/1024 * (256+uSq*(-128+uSq*(74-47*uSq))),

                    sigma = s / (b*A), sigmaP = 2*Math.PI,
                    cos2SigmaM, sinSigma, cosSigma, deltaSigma,
                    tmp, lat2, lambda, C, L, lon2, revAz;
                while (Math.abs(sigma-sigmaP) > 1e-12) {
                    cos2SigmaM = Math.cos(2*sigma1 + sigma);
                    sinSigma = Math.sin(sigma);
                    cosSigma = Math.cos(sigma);
                    deltaSigma = B*sinSigma*(cos2SigmaM+B/4*(cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)-
                        B/6*cos2SigmaM*(-3+4*sinSigma*sinSigma)*(-3+4*cos2SigmaM*cos2SigmaM)));
                    sigmaP = sigma;
                    sigma = s / (b*A) + deltaSigma;
                }

                tmp = sinU1*sinSigma - cosU1*cosSigma*cosAlpha1;
                lat2 = Math.atan2(sinU1*cosSigma + cosU1*sinSigma*cosAlpha1,
                    (1-f)*Math.sqrt(sinAlpha*sinAlpha + tmp*tmp));
                lambda = Math.atan2(sinSigma*sinAlpha1, cosU1*cosSigma - sinU1*sinSigma*cosAlpha1);
                C = f/16*cosSqAlpha*(4+f*(4-3*cosSqAlpha));
                L = lambda - (1-C) * f * sinAlpha *
                    (sigma + C*sinSigma*(cos2SigmaM+C*cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)));
                lon2 = (this.degreesToRadians(lon1)+L+3*Math.PI)%(2*Math.PI) - Math.PI;  // normalise to -180...+180

                revAz = Math.atan2(sinAlpha, -tmp);  // final bearing, if required

                return { lat: this.radiansToDegrees(lat2), lon: this.radiansToDegrees(lon2), finalBearing: this.radiansToDegrees(revAz)};
            },

            /**
             * if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
             * @param startPoint1 {x,y}
             * @param endPoint1 {x,y}
             * @param startPoint2 {x,y}
             * @param endPoint2 {x,y}
             * @returns {{x: float or null, y: float or null, onLine1: boolean, onLine2: boolean}}
             */
            getIntersectionPoint : function(startPoint1, endPoint1, startPoint2, endPoint2) {
                var denominator, a, b, numerator1, numerator2, result = {
                    x: null,
                    y: null,
                    onLine1: false,
                    onLine2: false
                };
                denominator = ((endPoint2.y - startPoint2.y) * (endPoint1.x - startPoint1.x)) - ((endPoint2.x - startPoint2.x) * (endPoint1.y -startPoint1.y));
                if (denominator == 0) {
                    return result;
                }
                a = startPoint1.y - startPoint2.y;
                b = startPoint1.x - startPoint2.x;
                numerator1 = ((endPoint2.x - startPoint2.x) * a) - ((endPoint2.y - startPoint2.y) * b);
                numerator2 = ((endPoint1.x - startPoint1.x) * a) - ((endPoint1.y - startPoint1.y) * b);
                a = numerator1 / denominator;
                b = numerator2 / denominator;

                // if we cast these lines infinitely in both directions, they intersect here:
                result.x = startPoint1.x + (a * (endPoint1.x - startPoint1.x));
                result.y = startPoint1.y + (a * (endPoint1.y - startPoint1.y));

                // if line1 is a segment and line2 is infinite, they intersect if:
                if (a > 0 && a < 1) {
                    result.onLine1 = true;
                }
                // if line2 is a segment and line1 is infinite, they intersect if:
                if (b > 0 && b < 1) {
                    result.onLine2 = true;
                }
                // if line1 and line2 are segments, they intersect if both of the above are true
                return result;
            },
            getSecondPoint : function(startPoint, bearing, distance) {
                var point = {};
                point.x = startPoint.x + distance* Math.sin(this.degreesToRadians(bearing));
                point.y = startPoint.y - distance* Math.cos(this.degreesToRadians(bearing));

              return point;
            }
        };
