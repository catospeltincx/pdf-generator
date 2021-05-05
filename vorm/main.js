var canvas = new fabric.Canvas("c", {
  backgroundColor: "rgb(255, 255, 255)",
  width: "595",
  height: "841",
});

document.querySelectorAll(".library img").forEach((el) => {
  el.addEventListener("click", () => {
    fabric.Image.fromURL(el.src, (img) => {
      canvas.add(img);
    });
  });
});

// create a rectangle object
// var rect = new fabric.Rect({
//   left: 100,
//   top: 100,
//   fill: "black",
//   width: 20,
//   height: 20,
// });

// "add" rectangle onto canvas
//canvas.add(rect);

window.addEventListener("keydown", (e) => {
  if (e.key === "Delete" || e.key === "Backspace") {
    canvas.remove(canvas.getActiveObject());
  }
});

//save as png
function onSave() {
  c.toBlob((blob) => {
    const timestamp = Date.now().toString();
    const a = document.createElement("a");
    document.body.append(a);
    a.download = `schets-${timestamp}.png`;
    a.href = URL.createObjectURL(blob);
    a.click();
    a.remove();
  });
}

//delete & copy & paste
window.addEventListener("keydown", (e) => {
  if (e.key === "Delete" || e.key === "Backspace") {
    canvas.remove(canvas.getActiveObject());
  }

  //"copy and paste"-key
  if (e.key === "c") {
    console.log(e);
    canvas.getActiveObject().clone(function (cloned) {
      _clipboard = cloned;
    });
  }

  if (e.key === "v") {
    console.log(e);
    _clipboard.clone(function (clonedObj) {
      canvas.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      });
      if (clonedObj.type === "activeSelection") {
        // active selection needs a reference to the canvas.
        clonedObj.canvas = canvas;
        clonedObj.forEachObject(function (obj) {
          canvas.add(obj);
        });
        // this should solve the unselectability
        clonedObj.setCoords();
      } else {
        canvas.add(clonedObj);
      }
      _clipboard.top += 10;
      _clipboard.left += 10;
      canvas.setActiveObject(clonedObj);
    });
  }
});

document.querySelector("#save").addEventListener("click", onSave);
