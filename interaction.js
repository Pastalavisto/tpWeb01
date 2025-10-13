
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
  this.xInit = 0;
  this.yInit = 0;
  this.xFinal = 0;
  this.yFinal = 0;
	// Developper les 3 fonctions gérant les événements
   this.mousedownFunction = (evt) => {
    this.xInit = getMousePosition(canvas, evt).x;
    this.yInit = getMousePosition(canvas, evt).y;
    interactor.onInteractionStart(this);
  }
  this.mousemoveFunction = (evt) => {
    this.xFinal = getMousePosition(canvas, evt).x;
    this.yFinal = getMousePosition(canvas, evt).y;
    interactor.onInteractionUpdate(this);
  }
  this.mouseupFunction = (evt) => {
    this.xFinal = getMousePosition(canvas, evt).x;
    this.yFinal = getMousePosition(canvas, evt).y;
    interactor.onInteractionEnd(this);
  }
	// Associer les fonctions précédentes aux évènements du canvas.
  canvas.addEventListener('mousedown', this.mousedownFunction, false);
  canvas.addEventListener('mousemove', this.mousemoveFunction, false);
  canvas.addEventListener('mouseup', this.mouseupFunction, false);
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



