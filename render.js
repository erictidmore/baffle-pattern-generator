const { writeFileSync } = require('fs');

const PALETTES = [
  { name:"Sage",      bg:"#dde0d8", fg:"#3a5040" },
  { name:"Onyx",      bg:"#1c1c1a", fg:"#c8c4b8" },
  { name:"Clay",      bg:"#e4d4c0", fg:"#5a3420" },
  { name:"Slate",     bg:"#ccd0d4", fg:"#28363e" },
  { name:"Ochre",     bg:"#eedea0", fg:"#6a4010" },
  { name:"Forest",    bg:"#20281c", fg:"#8a9a6a" },
  { name:"Ink",       bg:"#16202e", fg:"#8aaabb" },
  { name:"Rust",      bg:"#e8d8cc", fg:"#7a3020" },
  { name:"Dusk",      bg:"#2a2038", fg:"#c8a8d8" },
  { name:"Fern",      bg:"#e0e8d8", fg:"#2a4030" },
  { name:"Sand",      bg:"#f0e8d8", fg:"#786040" },
  { name:"Charcoal",  bg:"#d8d4ce", fg:"#282420" },
  { name:"Teal",      bg:"#d0e4e0", fg:"#1a4040" },
  { name:"Terracotta",bg:"#e8cfc0", fg:"#602818" },
  { name:"Stone",     bg:"#e4e0d8", fg:"#504840" },
  { name:"Midnight",  bg:"#0e1420", fg:"#a0b8c8" },
];

const pt = (x, y) => ({ x: x.toFixed(2), y: y.toFixed(2) });

function leafD(cx, cy, size, angle, shapeType) {
  const cosA = Math.cos(angle), sinA = Math.sin(angle);
  const t = (x, y) => {
    const rx = x * cosA - y * sinA + cx, ry = x * sinA + y * cosA + cy;
    return pt(rx, ry);
  };
  if (shapeType==='palm') {
    const w=size*.36,h=size;
    const a=t(0,h*.22),b1=t(-w*.9,h*.05),b2=t(-w,-h*.32),b3=t(0,-h*.85),c1=t(w,-h*.32),c2=t(w*.9,h*.05);
    return `M${a.x},${a.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${a.x},${a.y} Z`;
  } else if (shapeType==='banana') {
    const bw=size*.48,bh=size;
    const a=t(0,bh*.22),b1=t(-bw*.6,bh*.1),b2=t(-bw*.9,-bh*.1),b3=t(-bw*.3,-bh*.85),c1=t(-bw*.05,-bh*.95),c2=t(bw*.15,-bh*.9),c3=t(bw*.4,-bh*.75),d1=t(bw*.85,-bh*.1),d2=t(bw*.55,bh*.1);
    return `M${a.x},${a.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} C${d1.x},${d1.y} ${d2.x},${d2.y} ${a.x},${a.y} Z`;
  } else if (shapeType==='monstera') {
    const mw=size*.36,mh=size,sw=mw*1.15;
    const a2=t(0,mh*.15),b1=t(-mw*.7,0),b2=t(-mw,-mh*.35),b3=t(-mw*.45,-mh*.78),c1=t(-mw*1.2,-mh*.5),c2=t(-sw*.7,-mh*.2),c3=t(-sw*.15,-mh*.65),d1=t(-sw*.55,-mh*1.05),d2=t(-sw*.25,-mh*1.12),d3=t(-mw*.2,-mh*1.02),e1=t(0,-mh*1.08),f1=t(mw*.2,-mh*1.02),f2=t(sw*.25,-mh*1.12),f3=t(sw*.55,-mh*1.05),g1=t(sw*.15,-mh*.65),g2=t(sw*.7,-mh*.2),g3=t(mw*1.2,-mh*.5),h1=t(mw*.45,-mh*.78),h2=t(mw,-mh*.35),h3=t(mw*.7,0);
    return `M${a2.x},${a2.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} C${d1.x},${d1.y} ${d2.x},${d2.y} ${d3.x},${d3.y} C${e1.x},${e1.y} ${d3.x},${d3.y} ${f1.x},${f1.y} C${f2.x},${f2.y} ${f3.x},${f3.y} ${g1.x},${g1.y} C${g2.x},${g2.y} ${g3.x},${g3.y} ${h1.x},${h1.y} C${h2.x},${h2.y} ${h3.x},${h3.y} ${a2.x},${a2.y} Z`;
  } else if (shapeType==='needle') {
    const nw=size*.36;
    const a=t(0,-size*.95),b1=t(-nw*.4,-size*.2),b2=t(-nw*1.1,size*.4),b3=t(-nw*.3,size*.5),c1=t(-nw*.15,size*.35),c2=t(nw*.15,size*.35),c3=t(nw*.3,size*.5),d1=t(nw*1.1,size*.4),d2=t(nw*.4,-size*.2);
    return `M${a.x},${a.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} C${d1.x},${d1.y} ${d2.x},${d2.y} ${a.x},${a.y} Z`;
  } else if (shapeType==='oak') {
    const ow=size*.38;
    const a=t(0,size*.22),b1=t(-ow*1.1,size*.12),b2=t(-ow*1.25,-size*.1),b3=t(-ow*.85,-size*.35),c1=t(-ow*1.1,-size*.5),c2=t(-ow*.5,-size*.82),c3=t(-ow*.15,-size*.82),d1=t(-ow*.4,-size*1.05),d2=t(0,-size*.95),d3=t(ow*.4,-size*1.05),e1=t(ow*.15,-size*.82),e2=t(ow*.5,-size*.82),e3=t(ow*1.1,-size*.5),f1=t(ow*.85,-size*.35),f2=t(ow*1.25,-size*.1),f3=t(ow*1.1,size*.12);
    return `M${a.x},${a.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} C${d1.x},${d1.y} ${d2.x},${d2.y} ${d3.x},${d3.y} C${e1.x},${e1.y} ${e2.x},${e2.y} ${e3.x},${e3.y} C${f1.x},${f1.y} ${f2.x},${f2.y} ${f3.x},${f3.y} ${a.x},${a.y} Z`;
  } else if (shapeType==='maple') {
    const mw=size*.34;
    const a=t(0,size*.35),b1=t(-mw*.55,size*.15),b2=t(-mw*1.1,size*.2),b3=t(-mw*.85,-size*.05),c1=t(-mw*1.4,-size*.05),c2=t(-mw*1.25,-size*.3),c3=t(-mw*.8,-size*.35),d1=t(-mw*1.1,-size*.55),d2=t(-mw*.5,-size*.85),d3=t(-mw*.25,-size*.65),e1=t(-mw*.3,-size*1.1),e2=t(0,-size*.85),e3=t(mw*.3,-size*1.1),f1=t(mw*.25,-size*.65),f2=t(mw*.5,-size*.85),f3=t(mw*1.1,-size*.55),g1=t(mw*.8,-size*.35),g2=t(mw*1.25,-size*.3),g3=t(mw*1.4,-size*.05),h1=t(mw*.85,-size*.05),h2=t(mw*1.1,size*.2),h3=t(mw*.55,size*.15);
    return `M${a.x},${a.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} C${d1.x},${d1.y} ${d2.x},${d2.y} ${d3.x},${d3.y} C${e1.x},${e1.y} ${e2.x},${e2.y} ${e3.x},${e3.y} C${f1.x},${f1.y} ${f2.x},${f2.y} ${f3.x},${f3.y} C${g1.x},${g1.y} ${g2.x},${g2.y} ${g3.x},${g3.y} C${h1.x},${h1.y} ${h2.x},${h2.y} ${h3.x},${h3.y} ${a.x},${a.y} Z`;
  } else if (shapeType==='fern') {
    const fw=size*.36,fh=size;
    const a=t(0,fh*.2),b1=t(-fw*.85,fh*.1),b2=t(-fw*1.1,-fh*.3),b3=t(-fw*.55,-fh*.65),c1=t(-fw*1.15,-fh*.7),c2=t(-fw*1.2,-fh*1.05),c3=t(-fw*.5,-fh*1.08),d1=t(-fw*.1,-fh*1.05),d2=t(fw*.1,-fh*1.05),d3=t(fw*.5,-fh*1.08),e1=t(fw*1.2,-fh*1.05),e2=t(fw*1.15,-fh*.7),e3=t(fw*.55,-fh*.65),f1=t(fw*1.1,-fh*.3),f2=t(fw*.85,fh*.1);
    return `M${a.x},${a.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} C${d1.x},${d1.y} ${d2.x},${d2.y} ${d3.x},${d3.y} C${e1.x},${e1.y} ${e2.x},${e2.y} ${e3.x},${e3.y} C${f1.x},${f1.y} ${f2.x},${f2.y} ${a.x},${a.y} Z`;
  } else if (shapeType==='willow') {
    const ww=size*.18;
    const a=t(0,size*.28),b1=t(-ww*1.2,size*.2),b2=t(-ww*1.8,-size*.2),b3=t(-ww*.4,-size*.95),c1=t(-ww*.1,-size*1.0),c2=t(ww*.1,-size*1.0),c3=t(ww*.4,-size*.95),d1=t(ww*1.8,-size*.2),d2=t(ww*1.2,size*.2);
    return `M${a.x},${a.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} C${d1.x},${d1.y} ${d2.x},${d2.y} ${a.x},${a.y} Z`;
  } else if (shapeType==='aloe') {
    const aw=size*.38;
    const a=t(0,size*.45),b1=t(-aw*1.1,size*.3),b2=t(-aw*1.3,-size*.1),b3=t(-aw*.85,-size*.5),c1=t(-aw*1.05,-size*.7),c2=t(-aw*.7,-size*.95),c3=t(-aw*.3,-size*.85),d1=t(-aw*.15,-size*.98),d2=t(0,-size*.9),d3=t(aw*.15,-size*.98),e1=t(aw*.3,-size*.85),e2=t(aw*.7,-size*.95),e3=t(aw*1.05,-size*.7),f1=t(aw*.85,-size*.5),f2=t(aw*1.3,-size*.1),f3=t(aw*1.1,size*.3);
    return `M${a.x},${a.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} C${d1.x},${d1.y} ${d2.x},${d2.y} ${d3.x},${d3.y} C${e1.x},${e1.y} ${e2.x},${e2.y} ${e3.x},${e3.y} C${f1.x},${f1.y} ${f2.x},${f2.y} ${f3.x},${f3.y} ${a.x},${a.y} Z`;
  } else if (shapeType==='hemp') {
    const hw=size*.32;
    const a=t(0,size*.28),b1=t(-hw*.65,size*.2),b2=t(-hw*1.2,-size*.1),b3=t(-hw*.75,-size*.5),c1=t(-hw*1.0,-size*.7),c2=t(-hw*.7,-size*.95),c3=t(0,-size*.82),d1=t(hw*.7,-size*.95),d2=t(hw*1.0,-size*.7),d3=t(hw*.75,-size*.5),e1=t(hw*1.2,-size*.1),e2=t(hw*.65,size*.2);
    return `M${a.x},${a.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} C${d1.x},${d1.y} ${d2.x},${d2.y} ${d3.x},${d3.y} C${e1.x},${e1.y} ${e2.x},${e2.y} ${a.x},${a.y} Z`;
  } else if (shapeType==='arrow') {
    const aw=size*.44,h=size;
    const a=t(0,h*.22),b1=t(-aw*.8,h*.08),b2=t(-aw*.9,-h*.05),b3=t(-aw*.55,-h*.15),c1=t(-aw*.3,-h*.2),c2=t(-aw*.2,-h*.25),c3=t(-aw*.12,-h*.35),d1=t(-aw*.08,-h*.6),d2=t(-aw*.04,-h*.78),tip=t(0,-h*.9),e1=t(aw*.04,-h*.78),e2=t(aw*.08,-h*.6),e3=t(aw*.12,-h*.35),f1=t(aw*.2,-h*.25),f2=t(aw*.3,-h*.2),f3=t(aw*.55,-h*.15),g1=t(aw*.9,-h*.05),g2=t(aw*.8,h*.08);
    return `M${a.x},${a.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} C${d1.x},${d1.y} ${d2.x},${d2.y} ${tip.x},${tip.y} C${e1.x},${e1.y} ${e2.x},${e2.y} ${e3.x},${e3.y} C${f1.x},${f1.y} ${f2.x},${f2.y} ${f3.x},${f3.y} C${g1.x},${g1.y} ${g2.x},${g2.y} ${a.x},${a.y} Z`;
  } else if (shapeType==='circle') {
    const r=size*0.4,cpx=r*0.552;
    const a=t(0,-r),b1=t(cpx,-r),b2=t(r,-cpx),b3=t(r,0),c1=t(r,cpx),c2=t(cpx,r),c3=t(0,r),d1=t(-cpx,r),d2=t(-r,cpx),d3=t(-r,0),e1=t(-r,-cpx),e2=t(-cpx,-r);
    return `M${a.x},${a.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} C${d1.x},${d1.y} ${d2.x},${d2.y} ${d3.x},${d3.y} C${e1.x},${e1.y} ${e2.x},${e2.y} ${a.x},${a.y} Z`;
  } else if (shapeType==='diamond') {
    const dw=size*0.4;
    const a=t(0,-size*0.5),b=t(dw,0),c=t(0,size*0.5),d=t(-dw,0);
    return `M${a.x},${a.y} L${b.x},${b.y} L${c.x},${c.y} L${d.x},${d.y} Z`;
  } else if (shapeType==='triangle') {
    const tw=size*0.42;
    const a=t(0,-size*0.55),b=t(tw,size*0.45),c=t(-tw,size*0.45);
    return `M${a.x},${a.y} L${b.x},${b.y} L${c.x},${c.y} Z`;
  } else if (shapeType==='hexagon') {
    const hx=size*0.36;
    let d='';
    for(let i=0;i<6;i++){const a2=i/6*Math.PI*2-Math.PI/2;const pp=t(Math.cos(a2)*hx,Math.sin(a2)*hx);d+=(i===0?'M':'L')+`${pp.x},${pp.y}`;}
    return d+' Z';
  } else if (shapeType==='star') {
    const sr=size*0.48,ir=size*0.2;
    let d='';
    for(let i=0;i<5;i++){const a1=(i*2)/5*Math.PI-Math.PI/2,a2=(i*2+1)/5*Math.PI-Math.PI/2;const o=t(Math.cos(a1)*sr,Math.sin(a1)*sr),inn=t(Math.cos(a2)*ir,Math.sin(a2)*ir);d+=(i===0?'M':'L')+`${o.x},${o.y} L${inn.x},${inn.y}`;}
    return d+' Z';
  } else if (shapeType==='heart') {
    const hw=size*0.4;
    const a=t(0,size*.1),b1=t(-hw*1.1,-size*.45),b2=t(-hw*.6,-size*.65),b3=t(0,-size*.3),c1=t(hw*.6,-size*.65),c2=t(hw*1.1,-size*.45),c3=t(0,size*.1),c4=t(0,size*.5);
    return `M${a.x},${a.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} L${c4.x},${c4.y} Z`;
  } else if (shapeType==='drop') {
    const dw=size*0.34;
    const a=t(0,-size*.55),b1=t(-dw*1.1,-size*.1),b2=t(-dw*1.1,size*.25),b3=t(0,size*.4),c1=t(dw*1.1,size*.25),c2=t(dw*1.1,-size*.1);
    return `M${a.x},${a.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${a.x},${a.y} Z`;
  } else if (shapeType==='crescent') {
    const cw=size*0.38;
    const a=t(0,size*.35),b1=t(-cw*.8,size*.15),b2=t(-cw*.9,-size*.2),b3=t(-cw*.15,-size*.55),c1=t(cw*.25,-size*.75),c2=t(cw*.55,-size*.6),c3=t(cw*.38,-size*.45),d1=t(cw*.1,-size*.3),d2=t(cw*.15,0);
    return `M${a.x},${a.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} C${d1.x},${d1.y} ${d2.x},${d2.y} ${a.x},${a.y} Z`;
  } else if (shapeType==='cross') {
    const cw=size*0.18,cl=size*0.5;
    const a=t(-cw,-cl),b=t(cw,-cl),c=t(cw,-cw),d=t(cl,-cw),e=t(cl,cw),f=t(cw,cw),g=t(cw,cl),h=t(-cw,cl),i=t(-cw,cw),j=t(-cl,cw),k=t(-cl,-cw),l=t(-cw,-cw);
    return `M${a.x},${a.y} L${b.x},${b.y} L${c.x},${c.y} L${d.x},${d.y} L${e.x},${e.y} L${f.x},${f.y} L${g.x},${g.y} L${h.x},${h.y} L${i.x},${i.y} L${j.x},${j.y} L${k.x},${k.y} L${l.x},${l.y} Z`;
  } else if (shapeType==='spike') {
    const sw=size*0.3;
    const a=t(0,size*.4),b=t(-sw*.3,-size*.05),c=t(sw*.15,-size*.05),d=t(-sw*.15,-size*.4),e=t(sw*.35,-size*.4),f=t(sw*.1,-size*.65),g=t(0,-size*.55);
    return `M${a.x},${a.y} L${b.x},${b.y} L${c.x},${c.y} L${d.x},${d.y} L${e.x},${e.y} L${f.x},${f.y} L${g.x},${g.y} Z`;
  } else if (shapeType==='ring') {
    const ro=size*0.38,ri=size*0.22,cpr=ro*0.552,cpi=ri*0.552;
    const a=t(0,-ro),b1=t(cpr,-ro),b2=t(ro,-cpr),b3=t(ro,0),c1=t(ro,cpr),c2=t(cpr,ro),c3=t(0,ro),d1=t(-cpr,ro),d2=t(-ro,cpr),d3=t(-ro,0),e1=t(-ro,-cpr),e2=t(-cpr,-ro),f=t(ri,0),g1=t(ri,-cpi),g2=t(cpi,-ri),g3=t(0,-ri),h1=t(-cpi,-ri),h2=t(-ri,-cpi),h3=t(-ri,0),i1=t(-ri,cpi),i2=t(-cpi,ri),i3=t(0,ri),j1=t(cpi,ri),j2=t(ri,cpi),j3=t(ri,0);
    return `M${a.x},${a.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} C${d1.x},${d1.y} ${d2.x},${d2.y} ${d3.x},${d3.y} C${e1.x},${e1.y} ${e2.x},${e2.y} ${a.x},${a.y} Z M${f.x},${f.y} C${g1.x},${g1.y} ${g2.x},${g2.y} ${g3.x},${g3.y} C${h1.x},${h1.y} ${h2.x},${h2.y} ${h3.x},${h3.y} C${i1.x},${i1.y} ${i2.x},${i2.y} ${i3.x},${i3.y} C${j1.x},${j1.y} ${j2.x},${j2.y} ${j3.x},${j3.y} Z`;
  } else if (shapeType==='petal') {
    const pw=size*0.34;
    const a=t(0,size*.2),b1=t(-pw,size*.1),b2=t(-pw*1.1,-size*.4),b3=t(0,-size*.6),c1=t(pw*1.1,-size*.4),c2=t(pw,size*.1);
    return `M${a.x},${a.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${a.x},${a.y} Z`;
  } else {
    const mw=size*.44,mh=size;
    const a=t(0,mh*.22),b1=t(-mw,mh*.05),b2=t(-mw*1.1,-mh*.3),b3=t(-mw*.5,-mh*.85),c1=t(-mw*.1,-mh*.98),c2=t(mw*.1,-mh*.98),c3=t(mw*.5,-mh*.85),d1=t(mw*1.1,-mh*.3),d2=t(mw,mh*.05);
    return `M${a.x},${a.y} C${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} C${d1.x},${d1.y} ${d2.x},${d2.y} ${a.x},${a.y} Z`;
  }
}

function seededRand(seed) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}

function rebuildSeeds(numRows, numCols, lcount) {
  const seeds = [];
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      const rand = seededRand((r * 97 + c) * 31337 + 42);
      const leaves = [];
      for (let l = 0; l < lcount; l++) {
        leaves.push({ ox: (rand() - 0.5) * 0.28, oy: (rand() - 0.5) * 0.28, baseAngle: rand() * Math.PI * 2, sizeScale: 0.7 + rand() * 0.35 });
      }
      seeds.push(leaves);
    }
  }
  return seeds;
}

function render(config) {
  const { cols, rows, sz, gap, offsetRows, lcount, mode, shape, frame, paletteIdx } = config;
  const W = 2400, H = 1350;
  const cellW = W / cols, cellH = H / rows;
  const p = PALETTES[paletteIdx % PALETTES.length];
  const scatterSeeds = rebuildSeeds(rows, cols, lcount);

  const s = [`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`,
    `<rect width="${W}" height="${H}" fill="${p.bg}"/>`];

  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const offX = offsetRows && r % 2 === 1 ? cellW * 0.5 : 0;
      const cx = col * cellW + cellW * 0.5 + offX, cy = r * cellH + cellH * 0.5;
      const pw = cellW - gap, ph = cellH - gap, px = cx - pw / 2, py = cy - ph / 2;
      const cellIdx = r * cols + col;
      const cid = `cl${cellIdx}`;
      s.push(`<rect x="${px.toFixed(1)}" y="${py.toFixed(1)}" width="${pw.toFixed(1)}" height="${ph.toFixed(1)}" rx="3" fill="${p.fg}"/>`);
      s.push(`<clipPath id="${cid}"><rect x="${px.toFixed(1)}" y="${py.toFixed(1)}" width="${pw.toFixed(1)}" height="${ph.toFixed(1)}" rx="3"/></clipPath>`);
      s.push(`<g clip-path="url(#${cid})">`);
      const leaves = scatterSeeds[cellIdx] || [];
      const addL = (lx, ly, lsz, ang) => s.push(`<path d="${leafD(lx, ly, lsz, ang, shape)}" fill="${p.bg}"/>`);
      if (mode === 'scatter') leaves.forEach(l => addL(cx + l.ox * pw, cy + l.oy * ph, sz * l.sizeScale, l.baseAngle));
      else if (mode === 'grid') { const c2 = lcount <= 2 ? 2 : 3, r2 = lcount <= 3 ? 1 : 2; for (let i = 0; i < lcount; i++) { const gc = i % c2, gr = Math.floor(i / c2); addL(cx + (gc - (c2 - 1) / 2) * pw * .38, cy + (gr - (r2 - 1) / 2) * ph * .38, sz * .82, -Math.PI / 2); } }
      else if (mode === 'radial') { for (let i = 0; i < lcount; i++) { const a = (i / lcount) * Math.PI * 2 - Math.PI / 2; addL(cx + Math.cos(a) * sz * .28, cy + Math.sin(a) * sz * .28, sz * .78, a); } }
      else if (mode === 'wave') { for (let i = 0; i < lcount; i++) { const frac = lcount === 1 ? .5 : i / (lcount - 1); addL(cx + (frac - .5) * pw * .8, cy + Math.sin(frac * Math.PI * 3 + cellIdx * .5) * ph * .3, sz * .85, -Math.PI / 2 + Math.sin(frac * Math.PI * 2) * .3); } }
      else if (mode === 'spiral') { for (let i = 0; i < lcount; i++) { const a = (i / lcount) * Math.PI * 2 + cellIdx * .5, r = (i / lcount) * Math.min(pw, ph) * .4; addL(cx + Math.cos(a) * r, cy + Math.sin(a) * r, sz * .8, a + Math.PI / 2); } }
      else if (mode === 'diagonal') { for (let i = 0; i < lcount; i++) { const frac = (i + .5) / lcount; addL(cx + (frac - .5) * pw * .7, cy + (frac - .5) * ph * .7, sz * .85, -Math.PI / 4 + (frac - .5) * .6); } }
      else { for (let i = 0; i < lcount; i++) { const frac = lcount === 1 ? .5 : i / (lcount - 1); addL(cx + (frac - .5) * pw * .55, cy + Math.sin(frac * Math.PI + cellIdx) * ph * .18, sz * .85, -Math.PI / 2 + (frac - .5) * .5); } }
      if (frame !== 'none') {
        const i1 = frame === 'double' ? 3 : 5, i2 = frame === 'double' ? 7 : 8, op = frame === 'thin' ? .5 : .4;
        s.push(`<rect x="${(px + i1).toFixed(1)}" y="${(py + i1).toFixed(1)}" width="${(pw - i1 * 2).toFixed(1)}" height="${(ph - i1 * 2).toFixed(1)}" rx="2" fill="none" stroke="${p.bg}" stroke-width="1" opacity="${op}"/>`);
        if (frame !== 'thin') s.push(`<rect x="${(px + i2).toFixed(1)}" y="${(py + i2).toFixed(1)}" width="${(pw - i2 * 2).toFixed(1)}" height="${(ph - i2 * 2).toFixed(1)}" rx="1" fill="none" stroke="${p.bg}" stroke-width="0.5" opacity="0.25"/>`);
      }
      s.push('</g>');
    }
  }
  s.push('</svg>');
  return s.join('\n');
}

const renders = [
  { cols:3, rows:2, sz:160, gap:16, offsetRows:false, lcount:5, mode:'radial',   shape:'fern',     frame:'thin',   paletteIdx:8,  file:'render-fern-radial.svg' },
  { cols:4, rows:3, sz:130, gap:14, offsetRows:false, lcount:3, mode:'diagonal', shape:'oak',      frame:'none',   paletteIdx:4,  file:'render-oak-diagonal.svg' },
  { cols:4, rows:2, sz:170, gap:12, offsetRows:false, lcount:4, mode:'wave',     shape:'willow',   frame:'inset',  paletteIdx:6,  file:'render-willow-wave.svg' },
  { cols:3, rows:2, sz:180, gap:14, offsetRows:true,  lcount:4, mode:'scatter',  shape:'monstera', frame:'none',   paletteIdx:11, file:'render-monstera-scatter.svg' },
  { cols:3, rows:3, sz:160, gap:16, offsetRows:true,  lcount:4, mode:'spiral',   shape:'palm',     frame:'double', paletteIdx:7,  file:'render-palm-spiral.svg' },
];

renders.forEach(r => {
  const svg = render(r);
  writeFileSync(r.file, svg);
  console.log(`Wrote ${r.file}`);
});
