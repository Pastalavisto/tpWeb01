Rectangle.prototype.paint = function (ctx) {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = this.thickness;
  ctx.rect(this.leftPointX, this.leftPointY, this.width, this.height);
  ctx.stroke();
};

Line.prototype.paint = function (ctx) {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = this.thickness;
  ctx.moveTo(this.leftPointX, this.leftPointY);
  ctx.lineTo(this.rightPointX, this.rightPointY);
  ctx.stroke();
};

Drawing.prototype.paint = function (ctx, canvas) {
  ctx.fillStyle = "#F0F0F0"; // set canvas' background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  this.shapes.forEach(function (shape) {
    shape.paint(ctx);
  });
};

Drawing.prototype.updateShapeList = function(){
  const listContainer = document.getElementById("shapeList");
  listContainer.innerHTML = ""; 
    drawing.shapes.forEach((shape, index) => {
    const item = document.createElement("li");

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn-default";
    deleteBtn.innerHTML = `<span class="glyphicon glyphicon-remove-sign"></span>`;

    deleteBtn.addEventListener("click", () => {
      drawing.shapes.splice(index, 1);  // Supprimer la forme du tableau
      drawing.paint(ctx, canvas);       // Rafraîchir le canvas
      this.updateShapeList(); // Rafraîchir la liste
    });

    // Style général
    item.style.padding = "6px 10px";
    item.style.borderBottom = "1px solid #ccc";
    item.style.fontFamily = "monospace";

    // Déterminer le type de forme
    if (shape instanceof Rectangle) {
      item.textContent = `🟥 Rectangle ${index + 1} — x:${shape.leftPointX}, y:${shape.leftPointY}, w:${shape.width}, h:${shape.height}, color:${shape.color}, ép:${shape.thickness}`;
    } else if (shape instanceof Line) {
      item.textContent = `📏 Ligne ${index + 1} — (${shape.leftPointX},${shape.leftPointY}) → (${shape.rightPointX},${shape.rightPointY}), color:${shape.color}, ép:${shape.thickness}`;
    } else {
      item.textContent = `❓ Forme ${index + 1}`;
    }

    listContainer.appendChild(deleteBtn);
    listContainer.appendChild(item);
  });

}

// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
