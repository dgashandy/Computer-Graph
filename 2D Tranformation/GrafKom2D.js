let btnReset, btnResetTitik;
let pRot, pRotSudut, inpRotSudut, btnRot;
let pTrans, pTransX, inpTransX, pTransY, inpTransY, btnTrans;
let pSkala, pSkalaX, inpSkalaX, pSkalaY, inpSkalaY, btnSkala;
let pShear, pShearX, inpShearX, pShearY, inpShearY, btnShear;

function setup() {
    createCanvas(600, 600);
    sudutRot = 0;
    vTrans = createVector(0, 0);
    vRef = createVector(width / 2, height / 2);
    vSkala = createVector(0, 0);
    vShear = createVector(0, 0);


    wmin = createVector(-5, -5);
    wmax = createVector(5, 5);
    vmin = createVector(0, 0);
    vmax = createVector(width, height);



    v = [
        createVector(2, 2),
        createVector(2, -2),
        createVector(-2, -2),
        createVector(-2, 2)
    ];

    btnReset = createButton('Reset Gambar');
    btnReset.position(600, 600);
    btnReset.mousePressed(resetGambar);
    btnRot = createButton('Terapkan Rotasi');
    btnRot.position(600, 140);
    btnRot.mousePressed(terapkanRotasi);
    btnSkala = createButton('Terapkan Skala');
    btnSkala.position(600, 240);
    btnSkala.mousePressed(terapkanSkala);
    btnShear = createButton('Terapkan Shear');
    btnShear.position(600, 340);
    btnShear.mousePressed(terapkanShear);
    btnTrans = createButton('Terapkan Translasi');
    btnTrans.position(600, 60);
    btnTrans.mousePressed(terapkanTranslasi);
    btnResetTitik = createButton('Reset Titik Acuan');
    btnResetTitik.position(600, 580);
    btnResetTitik.mousePressed(resetTitik);

    inpRotSudut = createInput('');
    inpRotSudut.position(675, 120);
    inpSkalaX = createInput('');
    inpSkalaX.position(675, 200);
    inpSkalaY = createInput('');
    inpSkalaY.position(675, 220);
    inpShearX = createInput('');
    inpShearX.position(675, 300);
    inpShearY = createInput('');
    inpShearY.position(675, 320);
    inpTransX = createInput('');
    inpTransX.position(675, 20);
    inpTransY = createInput('');
    inpTransY.position(675, 40);

    pTrans = createP('Translasi');
    pTrans.style('font-size', '16px');
    pTrans.position(600, 0);
    pTransX = createP('X');
    pTransX.style('font-size', '12px');
    pTransX.position(600, 20);
    pTransY = createP('Y');
    pTransY.style('font-size', '12px');
    pTransY.position(600, 40);
    pRot = createP('Rotasi');
    pRot.style('font-size', '16px');
    pRot.position(600, 100);
    pRotSudut = createP('Sudut (derajat)');
    pRotSudut.style('font-size', '12px');
    pRotSudut.position(600, 120);
    pSkala = createP('Skala');
    pSkala.style('font-size', '16px');
    pSkala.position(600, 180);
    pSkalaX = createP('X');
    pSkalaX.style('font-size', '12px');
    pSkalaX.position(600, 200);
    pSkalaY = createP('Y');
    pSkalaY.style('font-size', '12px');
    pSkalaY.position(600, 220);
    pShear = createP('Shear');
    pShear.style('font-size', '16px');
    pShear.position(600, 280);
    pShearX = createP('X');
    pShearX.style('font-size', '12px');
    pShearX.position(600, 300);
    pShearY = createP('Y');
    pShearY.style('font-size', '12px');
    pShearY.position(600, 320);
}

function draw() {
    background(0);
    push();
    strokeWeight(2);
    stroke('white');
    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);
    fill('white');
    circle(vRef.x, vRef.y, 10);
    pop();
    noFill();
    stroke('purple');
    strokeWeight(3);
    beginShape();
    for (let i = 0; i < v.length; i++) {
        let temp = win2view(v[i]);
        vertex(temp.x, temp.y);
    }
    endShape(CLOSE);
}

function win2view(w) {
    let vx = (w.x - wmin.x) / (wmax.x - wmin.x) * (vmax.x - vmin.x) + vmin.x;
    let vy = vmax.y - (w.y - wmin.y) / (wmax.y - wmin.y) * (vmax.y - vmin.y);
    return createVector(vx, vy);
}

function view2win(v) {
    let wx = (v.x - vmin.x) / (vmax.x - vmin.x) * (wmax.x - wmin.x) + wmin.x;
    let wy = (vmax.y - v.y) / (vmax.y - vmin.y) * (wmax.y - wmin.y) + wmin.y;
    return createVector(wx, wy);
}

function translasi(p, T) {
    let xT = p.x + T.x;
    let yT = p.y + T.y;
    return createVector(xT, yT);
}

function terapkanTranslasi() {
    vTrans.x = inpTransX.value() * 1;
    vTrans.y = inpTransY.value() * 1;
    for (let i = 0; i < v.length; i++) {
        v[i] = translasi(v[i], vTrans);
    }
}

function rotasi(p, sudut, ref) {
    let sudutRadian = sudut * PI / 180;
    let xR = ref.x + (p.x - ref.x) * cos(sudutRadian) - (p.y - ref.y) * sin(sudutRadian);
    let yR = ref.y + (p.x - ref.x) * sin(sudutRadian) + (p.y - ref.y) * cos(sudutRadian);
    return createVector(xR, yR);
}


function terapkanRotasi() {
    sudutRot = inpRotSudut.value() * 1;
    let ref = view2win(vRef);
    for (let i = 0; i < v.length; i++) {
        v[i] = rotasi(v[i], sudutRot, ref);
    }
}


function skala(p, S, ref) {
    let xS = S.x * (p.x - ref.x) + ref.x;
    let yS = S.y * (p.y - ref.y) + ref.y;
    return createVector(xS, yS);
}


function terapkanSkala() {
    vSkala.x = inpSkalaX.value() * 1;
    vSkala.y = inpSkalaY.value() * 1;
    let ref = view2win(vRef);
    for (let i = 0; i < v.length; i++) {
        v[i] = skala(v[i], vSkala, ref);
    }
}

function shear(p, S, ref) {
    let xS = (p.x - ref.x) + S.x * (p.y - ref.y) + ref.x;
    let yS = S.y * (p.x - ref.x) + (p.y - ref.y) + ref.y;
    return createVector(xS, yS);
}


function terapkanShear() {
    vShear.x = inpShearX.value() * 1;
    vShear.y = inpShearY.value() * 1;
    let ref = view2win(vRef);
    for (let i = 0; i < v.length; i++) {
        v[i] = shear(v[i], vShear, ref);
    }
}

function resetGambar(){
    createVector(2, 2),
    createVector(2, -2),
    createVector(-2, -2),
    createVector(-2, 2)
}

function resetTitik() {
    vRef = createVector(width / 2, height / 2);
}

function mousePressed() {
    if (0 <= mouseX && mouseX <= width && 0 <= mouseY && mouseY <= height) {
        vRef = createVector(mouseX, mouseY);
    }
}
