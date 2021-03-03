var canvas = new fabric.Canvas("c", {
  backgroundColor: "rgb(255, 255, 255)",
});

document.querySelectorAll(".library img").forEach((el) => {
  el.addEventListener("click", () => {
    fabric.Image.fromURL(el.src, (img) => {
      canvas.add(img);
    });
  });
});

// create a rectangle object
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: "black",
  width: 20,
  height: 20,
});

// "add" rectangle onto canvas
canvas.add(rect);

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

document.querySelector("#save").addEventListener("click", onSave);
