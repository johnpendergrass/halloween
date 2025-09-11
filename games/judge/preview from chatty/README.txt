Halloween Costume Builder – SVG Asset Spec (v1)

Canvas & Coordinates
- All assets use viewBox="0 0 200 350". Height is exactly 350 units (px when rendered 1:1).
- Width is 200 units to give horizontal margin. The base figure is centered.
- Y reference lines (for alignment across pieces):
  HEAD_TOP = 35
  EYE_LINE = 60
  CHIN = 85
  NECK = 95
  SHOULDERS = 110
  CHEST = 140
  WAIST = 200
  HIPS = 210
  KNEES = 280
  ANKLES = 330
  GROUND = 340

Layering Order (bottom → top)
1) base_figure.svg
2) bottom (pants/skirt) – e.g. witch_bottom.svg
3) top (shirt/robe) – e.g. witch_top.svg
4) belt – e.g. witch_belt.svg
5) footwear – e.g. witch_boots.svg
6) accessories – e.g. accessory_broom.svg
7) hat – e.g. witch_hat.svg
8) makeup – e.g. witch_makeup.svg (sits on top to keep lines crisp)

Guides
- Each file includes a hidden <g id="guides" style="display:none"> with the alignment lines so you can toggle them on for authoring/debug. Do not show them in production.

Style
- Simple vector shapes, minimal color. Recolor by editing fill/stroke on top-level groups.
- Stroke widths chosen to be readable at ~350px tall. Adjust as needed.

License
- You may use and modify these assets freely for your project.