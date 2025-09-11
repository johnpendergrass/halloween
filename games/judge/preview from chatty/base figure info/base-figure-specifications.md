# Base Figure Specifications (for Costume Generation)

**Base image:** `Base figure MAIN transparent w green 242x350.png`  
**Base figure size:** 242 × 350 px (exact from head top to feet, finger to finger)  
**Canvas size (with margins):** 342 × 450 px  
**Base position in canvas:** Placed at (50,50). All coordinates below are given in **canvas space**.  
**Overhang allowance:** Costume parts may extend up to 50 px beyond the base figure in any direction (use full 342 × 450 area).  

---

## Global Axes
- **Canvas origin (0,0):** Top-left corner.  
- **X axis:** Increases left → right.  
- **Y axis:** Increases top → bottom.  
- **Base offset:** (50,50) inside canvas.  
- **Center line of body (approx):** X = 177 (canvas).  

---

## Head and Neck
- **Top of head:** y = 51  
- **Head center:** (177, ~90)  
- **Eye line:** y ≈ 90 (centered at x=177)  
- **Chin:** y ≈ 141  
- **Neck base:** y ≈ 151  
- **Head tilt:** Neutral, upright (no rotation).  
- **Hat anchor:** Centered at (177, 51) — can safely extend 50 px upward (into y ≈ 0).  
- **Scarf anchor:** Centered at (177, 151).  

---

## Torso
- **Shoulders (line):** y ≈ 155, spanning x ≈ 117 → 237  
- **Waist (narrowest point):** y ≈ 249  
- **Hips:** y ≈ 267  
- **Torso angle:** Neutral/upright.  
- **Belt anchor:** Horizontal center at (177, 249).  
- **Top clothing anchor:** Span from shoulders (y=155) to waist (y=249).  

---

## Arms
- **Raised hand (subject’s right / image-left):** (52, 128)  
  - Arm bent at ~45° outward, elbow below shoulder.  
  - Suitable for **wand, staff, raised glove**.  
- **Hanging hand (subject’s left / image-right):** (290, 243)  
  - Arm relaxed, slight outward angle from body.  
  - Suitable for **glove, broom grip, accessory**.  

---

## Legs
- **Knees:** y ≈ 323 (centered under hips at x ≈ 177 ± 30)  
- **Ankles:** y ≈ 372  
- **Feet/ground contact:** y ≈ 395 (±5)  
- **Boot anchor:** Centered at ankles (y=372), extend into margin down to y=420.  

---

## Anchors Summary (Canvas Space)
- Head top: (177, 51)  
- Eye line: (177, 90)  
- Chin: (177, 141)  
- Neck: (177, 151)  
- Shoulders: (177, 155), span ~120 px wide  
- Waist: (177, 249)  
- Hips: (177, 267)  
- Knees: (177, 323)  
- Ankles: (177, 372)  
- Raised hand: (52, 128)  
- Hanging hand: (290, 243)  

---

## Design Guidelines for Costumes
- **Hats:** Start at head top (177,51). Extend up to 50 px above canvas (safe). Width may exceed head width by ±60 px.  
- **Makeup / masks:** Center on eye line (177,90) and chin (177,141).  
- **Scarves / collars:** Wrap around neck base (177,151).  
- **Tops / robes / armor:** Between shoulders (y=155) and waist (y=249). Width up to ±70 px from center.  
- **Belts:** Horizontal at waist line (y=249), spanning hips.  
- **Bottoms (skirts, pants, robes):** From waist (y=249) to knees (y=323).  
- **Boots / footwear:** From ankles (y=372) down to margin (y=420). Width up to ±80 px from center.  
- **Gloves (hands):** Raised hand at (52,128), hanging hand at (290,243). Radius ~10 px.  
- **Weapons / wands:** Attach to raised hand (52,128), angle outward (≈ -50° from horizontal). May extend to top margin.  
- **Accessories (brooms, shields, bags):** Can span both hand anchors or align to one hand. Safe to extend outside figure by up to 50 px.  

---

## Costume Layer Order
1. Base PNG (skeleton figure)  
2. Bottom (pants/skirt)  
3. Top (shirt/robe/armor)  
4. Belt  
5. Boots  
6. Scarf / collar  
7. Gloves  
8. Weapon  
9. Accessory  
10. Hat / headgear  
11. Makeup / masks (overlay on face)  

---

This specification ensures **pixel-accurate alignment** for generating new costume sets. Any image generator or LLM can use these anchors and guidelines to consistently place costume parts relative to the base figure.


---

## Visual Reference

![Annotated Base Figure](sandbox:/mnt/data/base_figure_annotated.png)

- Blue lines mark vertical anchors (head → ground).  
- Magenta line marks `CENTER_X`.  
- Green label = subject’s **right** (raised) hand; red label = subject’s **left** (hanging) hand.  
- Orange rectangle shows the **base image bounds** within the 342×450 canvas.  
- The base PNG is positioned at (50,50) with size 242×350.



---

## High-Resolution Visual Reference

![Annotated Base Figure 3×](sandbox:/mnt/data/base_figure_annotated_3x.png)

This enlarged version (3× scale → 1026×1350 px) makes it easier to read labels and verify anchor positions.  
All coordinates in the specification are still based on the **original 342×450 canvas space**.


---

## Wide Visual References

![Annotated Base Figure – Wide](sandbox:/mnt/data/base_figure_annotated_wide.png)  
*Standard resolution with extended canvas to prevent clipping.*

![Annotated Base Figure 3× – Wide](sandbox:/mnt/data/base_figure_annotated_wide_3x.png)  
*High-resolution version (3× scale) with extended canvas for maximum clarity.*

These wide versions are the canonical references. They ensure all labels are visible and non-overlapping.  
