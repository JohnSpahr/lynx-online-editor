var option = document.getElementById('selection');

function txtChange1(e) {
    if (e.keyCode == 13) {
        document.getElementById("Y1").focus();
    }
}

function txtChange2(e) {
    if (e.keyCode == 13) {
        document.getElementById("X2").focus();
    }
}

function txtChange3(e) {
    if (e.keyCode == 13) {
        document.getElementById("Y2").focus();
    }
}

function txtChange4(e) {
    if (e.keyCode == 13) {
        draw();
    }
}

var isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
    //if mobile device, hide log
    document.getElementById("clearLogBtn").hidden = true;
    document.getElementById("log").hidden = true;
} else {
    //show log
    document.getElementById("clearLogBtn").hidden = false;
    document.getElementById("log").hidden = false;
}

function clearLog() {
    if (confirm("Clear log?")) {
        document.getElementById('log').value = "LOG";
    }
}

function setBackground() {
    if (confirm("Changing the background will erase your drawing. Are you sure you want to continue?")) {
        var c = document.getElementById('myCanvas');
        var ctx = c.getContext("2d");
        ctx.fillStyle = document.getElementById("backColor").value;
        ctx.beginPath();
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.stroke();
        document.getElementById('log').value = document.getElementById('log').value + "\nSet background to: " + document.getElementById('colorPicker').value + " \n";
    }
}

function mouse(e) {
    var rect = document.getElementById('myCanvas').getBoundingClientRect();
    x = e.clientX;
    y = e.clientY;
    x = x - rect.left;
    y = y - rect.top;
    x = Math.round(x);
    y = Math.round(y);

    if (x < 0) {
        x = 0;
    }
    if (y < 0) {
        y = 0;
    }

    if (x > 500) {
        x = 500;
    }
    if (y > 300) {
        y = 300;
    }

    document.getElementById('coordinateLbl').innerHTML = "Coordinates: (" + x + ", " + y + ")";
}

function about() {
    alert("Lynx Online Editor\nVersion 1.9\n\nCreated by John Spahr\nhttps://tectrasystems.org");
}

function onRun() {
    //when this loads...
}

function Erase() {
    if (confirm("Are you sure you want to erase your artwork?")) {
        var c = document.getElementById('myCanvas');
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        document.getElementById('log').value = document.getElementById('log').value + "\nErased drawing.\n";
    }
}

function SelectionChanged() {
    document.getElementById("Y2").hidden = false;
    document.getElementById("y2lbl").hidden = false;
    document.getElementById("x2lbl").innerText = "X:";

    if (option.value === "Arc") {
        document.getElementById("tempLbl").hidden = false;
        document.getElementById("eAngle").hidden = false;
        document.getElementById("tempLbl").innerText = "Ending Angle:";
        document.getElementById("y2lbl").innerText = "Starting Angle:";
        document.getElementById("x2lbl").innerText = "Radius:";
    } else {
        document.getElementById("tempLbl").hidden = true;
        document.getElementById("eAngle").hidden = true;
        document.getElementById("x2lbl").innerText = "X:"
        document.getElementById("y2lbl").innerText = "Y:"
    }

    if (option.value === "Line" || option.value === "Rectangle" || option.value === "Circle" || option.value === "Arc") {
        document.getElementById('thick').hidden = false;
        document.getElementById('thickLbl').hidden = false;
        document.getElementById('styleLbl').hidden = false;
        document.getElementById('styleSelect').hidden = false;

    } else {
        document.getElementById('thick').hidden = true;
        document.getElementById('thickLbl').hidden = true;
        document.getElementById('styleLbl').hidden = true;
        document.getElementById('styleSelect').hidden = true;
    }

    if (option.value === "Circle" || option.value === "FilledCircle") {
        document.getElementById("Y2").hidden = true;
        document.getElementById("y2lbl").hidden = true;
        document.getElementById("x2lbl").innerText = "Radius:   ";
    }
}

function draw() {
    var styleSelection = document.getElementById('styleSelect');
    var c = document.getElementById('myCanvas');
    var ctx = c.getContext("2d");
    var lineStyle = "Solid";

    if (styleSelection.value === "Dot") {
        ctx.setLineDash([1, 1]);
        lineStyle = "Dot";
    }
    if (styleSelection.value === "Dash") {
        ctx.setLineDash([10, 10]);
        lineStyle = "Dash";
    }
    if (styleSelection.value === "DashDot") {
        ctx.setLineDash([15, 3, 3, 3]);
        lineStyle = "Dash-Dot";
    }

    document.getElementById('X1').text = document.getElementById('X1').value;
    document.getElementById('Y1').text = document.getElementById('Y1').value;
    document.getElementById('X2').text = document.getElementById('X2').value;
    document.getElementById('Y2').text = document.getElementById('Y2').value;
    document.getElementById('thick').text = document.getElementById('thick').value;
    document.getElementById('log').text = document.getElementById('log').value;

    let xone = document.getElementById('X1').text;
    let yone = document.getElementById('Y1').text;
    let xtwo = document.getElementById('X2').text;
    let ytwo = document.getElementById('Y2').text;
    let thickness = document.getElementById('thick').text;

    if (option.value == "Line") {
        ctx.beginPath();
        if (thickness > 100) {
            thickness = 100;
        }
        if (thickness < 1) {
            thickness = 1;
        }
        ctx.strokeStyle = document.getElementById("colorPicker").value;
        ctx.lineWidth = thickness;
        ctx.moveTo(xone, yone);
        ctx.lineTo(xtwo, ytwo);
        ctx.stroke();
        document.getElementById('log').value = document.getElementById('log').value + "\n\nDraw line\nFrom: " + xone + ", " + yone + "\nTo: " + xtwo + ", " + ytwo + "\nThickness: " + document.getElementById('thick').value + "\nColor: " + document.getElementById('colorPicker').value + "\nStyle: " + lineStyle;
    }

    if (option.value == "Rectangle") {
        if (thickness > 100) {
            thickness = 100;
        }
        if (thickness < 1) {
            thickness = 1;
        }
        ctx.strokeStyle = document.getElementById("colorPicker").value;
        ctx.lineWidth = thickness;
        ctx.strokeRect(xone, yone, xtwo, ytwo);
        document.getElementById('log').value = document.getElementById('log').value + "\n\nDraw rectangle\nFrom: " + xone + ", " + yone + "\nTo: " + xtwo + ", " + ytwo + "\nThickness: " + document.getElementById('thick').value + "\nColor: " + document.getElementById('colorPicker').value + "\nStyle: " + lineStyle;
    }

    if (option.value == "FilledRect") {
        ctx.fillStyle = document.getElementById("colorPicker").value;
        ctx.beginPath();
        ctx.fillRect(xone, yone, xtwo, ytwo);
        ctx.stroke();
        document.getElementById('log').value = document.getElementById('log').value + "\n\nDraw filled rectangle\nFrom: " + xone + ", " + yone + "\nTo: " + xtwo + ", " + ytwo + "\nColor: " + document.getElementById('colorPicker').value;
    }

    if (option.value == "Circle") {
        ctx.beginPath();
        ctx.strokeStyle = document.getElementById("colorPicker").value;
        ctx.lineWidth = thickness;
        ctx.arc(xone, yone, xtwo, 0, 2 * Math.PI);
        ctx.stroke();
        document.getElementById('log').value = document.getElementById('log').value + "\n\nDraw circle\nFrom: " + xone + ", " + yone + "\nRadius: " + xtwo + "\nThickness: " + document.getElementById('thick').value + "\nColor: " + document.getElementById('colorPicker').value + "\nStyle: " + lineStyle;
    }

    if (option.value == "FilledCircle") {
        ctx.beginPath();
        ctx.arc(xone, yone, xtwo, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = document.getElementById('colorPicker').value;
        ctx.fill();
        document.getElementById('log').value = document.getElementById('log').value + "\n\nDraw filled circle\nFrom: " + xone + ", " + yone + "\nRadius: " + xtwo + "\nColor: " + document.getElementById('colorPicker').value;
    }

    if (option.value == "Arc") {
        ctx.beginPath();
        if (thickness > 100) {
            thickness = 100;
        }
        if (thickness < 1) {
            thickness = 1;
        }
        ctx.strokeStyle = document.getElementById("colorPicker").value;
        ctx.lineWidth = thickness;
        ctx.arc(xone, yone, xtwo, ytwo * Math.PI, document.getElementById("eAngle").value * Math.PI, false);
        ctx.stroke();
        document.getElementById('log').value = document.getElementById('log').value + "\n\nDraw arc\nFrom: " + xone + ", " + yone + "\nTo: " + xtwo + ", " + ytwo + "\nThickness: " + document.getElementById('thick').value + "\nColor: " + document.getElementById('colorPicker').value + "\nStyle: " + lineStyle;
    }
}
