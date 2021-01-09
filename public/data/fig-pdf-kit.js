//SCHAARTJE
doc.circle(345, 55, 5).stroke();
doc.circle(355, 55, 5).stroke();
doc.moveTo(350, 56).lineTo(343, 80).stroke();
doc.moveTo(350, 56).lineTo(357, 80).stroke();

//pijl
doc
  .moveTo(box.x + 150, box.y + 5)
  .lineTo(box.x + 200, box.y + 5)
  .stroke();
doc
  .moveTo(box.x + 200, box.y + 5)
  .lineTo(box.x + 200, box.y + 100)
  .stroke();
doc
  .moveTo(box.x + 200, box.y + 100)
  .lineTo(box.x + 185, box.y + 35)
  .stroke();
doc
  .moveTo(box.x + 200, box.y + 100)
  .lineTo(box.x + 215, box.y + 35)
  .stroke();
