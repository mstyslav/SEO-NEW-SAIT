"""Glass element drawing: 743 x 1399 mm, 6 mm clear, polished edges, R100 on top-right corner.
Outputs glass_689x1399_R100.dxf and glass_689x1399_R100.pdf next to this script."""
import math
import os
import ezdxf
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

W, H, R = 689.0, 1399.0, 100.0
BULGE = math.tan(math.radians(90) / 4)
OUT = os.path.dirname(os.path.abspath(__file__))
NAME = "glass_689x1399_R100"
NOTES = [
    "Скло 6 мм, прозоре",
    "Євро-кромка, полірування",
    "Не клеймити",
]
TITLE = "Елемент"

# ---------------- DXF ----------------
doc = ezdxf.new("R2010", setup=True)
doc.units = ezdxf.units.MM
doc.styles.add("UA", font="arial.ttf")
for n, c in (("CONTOUR", 7), ("DIM", 3), ("TEXT", 2), ("CENTER", 1)):
    doc.layers.add(n, color=c)
doc.layers.get("CENTER").linetype = "CENTER" if "CENTER" in doc.linetypes else "Continuous"
doc.dimstyles.new("SG", dxfattribs={"dimtxsty": "UA", "dimtxt": 30, "dimasz": 25, "dimexe": 10,
                                    "dimexo": 10, "dimgap": 8, "dimdec": 0})
msp = doc.modelspace()
msp.add_lwpolyline([(0, 0, 0, 0, 0), (W, 0, 0, 0, 0), (W, H - R, 0, 0, BULGE), (W - R, H, 0, 0, 0), (0, H, 0, 0, 0)],
                   format="xyseb", close=True, dxfattribs={"layer": "CONTOUR", "lineweight": 50})
msp.add_linear_dim(base=(0, -120), p1=(0, 0), p2=(W, 0), dimstyle="SG", dxfattribs={"layer": "DIM"}).render()
msp.add_linear_dim(base=(-120, 0), p1=(0, 0), p2=(0, H), angle=90, dimstyle="SG", dxfattribs={"layer": "DIM"}).render()
msp.add_radius_dim(center=(W - R, H - R), radius=R, angle=45, dimstyle="SG", dxfattribs={"layer": "DIM"}).render()
tx = W + 150
msp.add_text(TITLE, height=40, dxfattribs={"layer": "TEXT", "style": "UA", "insert": (tx, H - 40)})
y = H - 120
for line in NOTES + [f"{int(W)} x {int(H)} мм, R{int(R)} (верхній кут)"]:
    msp.add_text(line, height=30, dxfattribs={"layer": "TEXT", "style": "UA", "insert": (tx, y)})
    y -= 60
doc.saveas(os.path.join(OUT, NAME + ".dxf"))

# ---------------- PDF (A4 landscape, 1:8) ----------------
pdfmetrics.registerFont(TTFont("DV", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DVB", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
mm = 72 / 25.4
S = 1 / 8
pw, ph = landscape(A4)
c = canvas.Canvas(os.path.join(OUT, NAME + ".pdf"), pagesize=(pw, ph))
c.setTitle("Елемент 689x1399 R100")
ox, oy = 45 * mm, 17 * mm  # glass origin on page
w, h, r = W * S * mm, H * S * mm, R * S * mm
c.setLineWidth(1.4)
p = c.beginPath()
p.moveTo(ox, oy); p.lineTo(ox + w, oy); p.lineTo(ox + w, oy + h - r)
p.arcTo(ox + w - 2 * r, oy + h - 2 * r, ox + w, oy + h, startAng=0, extent=90)
p.lineTo(ox, oy + h); p.close()
c.drawPath(p, stroke=1, fill=0)
c.setLineWidth(0.5)


def arrow(x, y, dx, dy):
    a = 2.2 * mm
    ang = math.atan2(dy, dx)
    pts = [(x, y)] + [(x - a * math.cos(ang + s * 0.25), y - a * math.sin(ang + s * 0.25)) for s in (1, -1)]
    q = c.beginPath(); q.moveTo(*pts[0]); q.lineTo(*pts[1]); q.lineTo(*pts[2]); q.close()
    c.drawPath(q, stroke=0, fill=1)


c.setFont("DV", 10)
# width dim
yd = oy - 9 * mm
c.line(ox, oy - 2 * mm, ox, yd - 2 * mm); c.line(ox + w, oy - 2 * mm, ox + w, yd - 2 * mm)
c.line(ox, yd, ox + w, yd); arrow(ox, yd, -1, 0); arrow(ox + w, yd, 1, 0)
c.drawCentredString(ox + w / 2, yd - 4.5 * mm, f"{int(W)}")
# height dim
xd = ox - 11 * mm
c.line(ox - 2 * mm, oy, xd - 2 * mm, oy); c.line(ox - 2 * mm, oy + h, xd - 2 * mm, oy + h)
c.line(xd, oy, xd, oy + h); arrow(xd, oy, 0, -1); arrow(xd, oy + h, 0, 1)
c.saveState(); c.translate(xd - 2 * mm, oy + h / 2); c.rotate(90); c.drawCentredString(0, 0, f"{int(H)}"); c.restoreState()
# radius leader
cx, cy = ox + w - r, oy + h - r
ex, ey = cx + r * math.cos(math.radians(45)), cy + r * math.sin(math.radians(45))
c.line(cx, cy, ex + 8 * mm, ey + 8 * mm); arrow(ex, ey, 1, 1)
c.drawString(ex + 9 * mm, ey + 8 * mm, f"R{int(R)}")
# spec block
bx = ox + w + 28 * mm
c.setFont("DVB", 15); c.drawString(bx, oy + h - 8 * mm, TITLE)
c.setFont("DV", 11)
yy = oy + h - 20 * mm
for line in NOTES + [f"Розмір: {int(W)} × {int(H)} мм", f"Радіус верхнього кута: R{int(R)}"]:
    c.drawString(bx, yy, line); yy -= 7 * mm
c.setFont("DV", 8); c.drawString(bx, oy, "Масштаб 1:8 · розміри в мм · Space Glass")
c.save()
print("ok")
