var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
  this.currLineWidth = 5;
  this.currColour = "#000000";
  this.currentShape = null;

  if (document.getElementById("butRect").checked) {
    this.currEditingMode = editingMode.rect;
  } else {
    this.currEditingMode = editingMode.line;
  }

  document.getElementById("butRect").addEventListener("change", () => {
    if (document.getElementById("butRect").checked) {
      this.currEditingMode = editingMode.rect;
    }
  });

  document.getElementById("butLine").addEventListener("change", () => {
    if (document.getElementById("butLine").checked) {
      this.currEditingMode = editingMode.line;
    }
  });

  document.getElementById("spinnerWidth").addEventListener("change", (evt) => {
    this.currLineWidth = evt.target.value
  });

  document.getElementById("colour").addEventListener("change", (evt) => {
    this.currColour = evt.target.value
  });

  new DnD(canvas, this);

  this.onInteractionStart = (dnd) => {
    if (this.currEditingMode === editingMode.line) {
      this.currentShape = new Line(
        dnd.xInit,
        dnd.yInit,
        dnd.xFinal,
        dnd.yFinal,
        this.currColour,
        this.currLineWidth
      );
    } else if (this.currEditingMode === editingMode.rect) {
      this.currentShape = new Rectangle(
        Math.min(dnd.xInit, dnd.xFinal),
        Math.min(dnd.yInit, dnd.yFinal),
        Math.abs(dnd.xFinal - dnd.xInit),
        Math.abs(dnd.yFinal - dnd.yInit),
        this.currColour,
        this.currLineWidth
      );
    }
  };

  this.onInteractionUpdate = (dnd) => {
    if (this.currentShape) {
      if (this.currEditingMode === editingMode.line) {
        this.currentShape.rightPointX = dnd.xFinal;
        this.currentShape.rightPointY = dnd.yFinal;
      } else if (this.currEditingMode === editingMode.rect) {
        this.currentShape.width = dnd.xFinal - dnd.xInit;
        this.currentShape.height = dnd.yFinal - dnd.yInit;
      }
      drawing.paint(ctx, canvas);
      this.currentShape.paint(ctx);
    }
  };

  this.onInteractionEnd = (dnd) => {
    if (this.currentShape) {
      drawing.shapes.push(this.currentShape);
      drawing.paint(ctx, canvas);
      this.currentShape = null;
      drawing.updateShapeList();
    }
  };
}
