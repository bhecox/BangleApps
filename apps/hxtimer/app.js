var counter = 1800;
var counterInterval;

function outOfTime() {
  if (counterInterval) return;
  E.showMessage("Out of Time", "HX Timer");
  Bangle.buzz();
  Bangle.buzz();
  Bangle.buzz();
  Bangle.beep(200, 8000)
    .then(() => new Promise(resolve => setTimeout(resolve,200)))
    .then(() => Bangle.beep(200, 3000));
  // again, 10 secs later
  setTimeout(outOfTime, 10000);
}

function countDown() {
  counter--;
  // Out of time
  if (counter<=0) {
    clearInterval(counterInterval);
    counterInterval = undefined;
    setWatch(startTimer, BTN2);
    outOfTime();
    return;
  }

  g.clear();
  g.setFontAlign(0,0); // center font
  g.setFont("Vector",80); // vector font, 80px  
  // draw the current counter value

  var counterStr = (counter/60).toString();
  var split = counterStr.split('.');
  g.drawString(split[0]+"."+split[1].slice(0,2),120,120);
  // optional - this keeps the watch LCD lit up
  //Bangle.setLCDPower(1);
}

function startTimer() {
  counter = 1800;
  countDown();
  if (!counterInterval)
    counterInterval = setInterval(countDown, 1000);
}

startTimer();
