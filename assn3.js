function myColorTriangle (x0, y0, r0, g0, b0,
                          x1, y1, r1, g1, b1,
                          x2, y2, r2, g2, b2)
{ 
  // insert your code here to draw a triangle with vertices (x0, y0), (x1, y1) and (x2, y2) 
  // with colors (r0, g0, b0), (r1, g1, b1) and (r2, g2, b2) attached to each vertex respectively.
  //
  // Your implementation should interpolate the colors accross the triangle.
  //
  // Only use calls to the function drawColorPoint() which is below the do not edit line
  // This function has the following signature
  
  // your code should be an extension of the myTrangle function from Assignment 2.
  var xa = Math.min(x0, x1, x2);
  var xb = Math.max(x0, x1, x2);
  var ya = Math.min(y0, y1, y2);
  var yb = Math.max(y0, y1, y2);

  var dy1, dy2, dy3, dx1, dx2, dx3, B1, B2, B3;
  dy1 = y1 - y0;
  dy2 = y2 - y1;
  dy3 = y0 - y2;
  dx1 = x1 - x0;
  dx2 = x2 - x1;
  dx3 = x0 - x2;
  B1 = x1*y0 - x0*y1;
  B2 = x2*y1 - x1*y2;
  B3 = x0*y2 - x2*y0;

  for (var y = ya; y < yb; ++y)
  {
    state = 0
    var c1 = 0;
    var c2 = 0;
    var c3 = 0;
    var prev_s1, prev_s2, prev_s3, w0, w1, w2, r, g, b;
    prev_s1 = dy1*(xa-1) - dx1*y + B1;
    prev_s2 = dy2*(xa-1) - dx2*y + B2;
    prev_s3 = dy3*(xa-1) - dx3*y + B3;
    var s1, s2, s3;
    for (var x = xa; x < xb; ++x)
    {
        s1 = dy1*x - dx1*y + B1;
        s2 = dy2*x - dx2*y + B2;
        s3 = dy3*x - dx3*y + B3;

        if (c1 != 1 && s1 * prev_s1 <= 0)
        {
            state += 1;
            c1 = 1
        }
        if (c2 != 1 && s2 * prev_s2 <= 0)
        {
            state += 1;
            c2 = 1;
        }
        if (c3 != 1 && s3 * prev_s3 <= 0)
        {
            state += 1;
            c3 = 1
        }
        state %= 2
        if (state == 1)
        {
            w0 = ((x-x1)*(y2-y1)-(x2-x1)*(y-y1)) / ((x0-x1)*(y2-y1)-(x2-x1)*(y0-y1));
            w1 = ((x-x2)*(y0-y2)-(x0-x1)*(y-y2)) / ((x0-x1)*(y2-y1)-(x2-x1)*(y0-y1));
            w2 = ((x-x0)*(y1-y0)-(x1-x0)*(y-y0)) / ((x0-x1)*(y2-y1)-(x2-x1)*(y0-y1));
            r = w0*r0 + w1*r1 + w2*r2;
            g = w0*g0 + w1*g1 + w2*g2;
            b = w0*b0 + w1*b1 + w2*b2;
            drawColorPoint(x, y, r, g, b);
        }

        prev_s1 = s1;
        prev_s2 = s2;
        prev_s3 = s3;
    }
  }
}


function transformTheHouse()
{
  // return a matrix that has all of the transformations of the highest level you reached in the 
  // transformation game of last week's online assignment
  //
  
  // start with the identity matrix
  let identityMatrix = [1, 0, 0, 1, 0, 0];
  
  //Note that in P5.js 2D transformation matrices are represented as (a, b, c, d, e, f) which corresponds to this matrix:
  
//  a c e
//  b d f
//  0 0 1
  
// since the last row is always 0 0 1 it is excluded when specifying the matrices  


  // Using translate(), rotate(), and scale() add your chain of matrices here. Remember the order of operation is from right to left
  
  // Also recall, in P5.js +y is down (in transformation game +y is up)
  // In P5.js +rotation is clockwise (and in radians by default)....in transformation game +rotation is counter-clockwise (and in degrees). 
  
  //angleMode() can be used to change the mode to degrees.
  
// For example, the solution to level 1 which required translating in y by 100, followed by a tranlation in x by 40 would be:
  
//  return translate(40,0) * translate(0,-100) * identityMatrix;
 
  return rotate(-135) * translate(-103, 0) * rotate(132) * identityMatrix;
}

// --------------------------------------------------------------------------------------------
//
//  Do not edit below this lne
//
// --------------------------------------------------------------------------------------------

let doMine;
let scene;
let backgroundColor;

function setup () 
{
  createCanvas (500, 500);
  doMine = true;
  scene = 1;
  backgroundColor = color(150, 150, 150);
  background (backgroundColor);
}

function draw ()
{
  if (scene == 1) doHouse();
  if (scene == 2) doTriangle();
}

//
// fills in the pixel (x, y) with the color (r,g,b)
//
function drawColorPoint (x, y, r, g, b)
{
  stroke (r, g, b);
  point (x,y);
}

function doHouse()
{
  stroke (0,0,0);
  line (0, 250, 500, 250);
  line (250, 0, 250, 500);
  
 
  //resetMatrix();
 translate (250, 250);  
 applyMatrix(transformTheHouse()); 
    
    fill (255, 0, 0);
    stroke (255,0,0);
    triangle (-25, 25, 25, -25, -25, -25);
    triangle (25, 25, 25, -25, -25, 25);
    
    fill (0, 255, 0);
    stroke (0,255,0);
    triangle (-25,-25, 25, -25, 0, -50);
    
    stroke (0,0,255);
    fill (0,0,255);
   triangle (10, 0, 10, 25, 20, 25);
   triangle (10, 0, 20, 25, 20, 0);
}

function doTriangle ()
{
  myColorTriangle (300, 400, 0, 0, 255,
                   400, 100, 0, 255, 0,
                   50, 50, 255, 0, 0);
}

function keyPressed()
{
  if (key == '1') 
  {
    background (backgroundColor);
    scene = 1;
  }
  
  if (key == '2') 
  {
    background (backgroundColor);
    scene = 2;
  }
}