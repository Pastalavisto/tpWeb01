function Drawing() {
  this.shapes = Array();
}

function Shape(color, thickness) {
  this.color = color;
  this.thickness = thickness;
}

function Rectangle(leftPointX, leftPointY, width, height, color, thickness) {
  Shape.call(this, color, thickness);
  this.leftPointX = leftPointX;
  this.leftPointY = leftPointY;
  this.width = width;
  this.height = height;
}

function Line(
  leftPointX,
  leftPointY,
  rightPointX,
  rightPointY,
  color,
  thickness
) {
  Shape.call(this, color, thickness);
  this.leftPointX = leftPointX;
  this.leftPointY = leftPointY;
  this.rightPointX = rightPointX;
  this.rightPointY = rightPointY;
}
Rectangle.prototype = Object.create(Shape.prototype);
Line.prototype = Object.create(Shape.prototype);
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !
