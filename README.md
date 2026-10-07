# Evermine Jewels - Catalogue

 ## Drive folder structure
Main folder (link config me set hai): https://drive.google.com/drive/folders/1L-0suSqFlLoCzJ_-HBBTau5Q72yQTNQk
Is folder ko Share > **"Anyone with the link: Viewer"** karo (sub-folders apne aap share ho jate hain). Andar ye folders banao:
```
Evermine (main folder)
 |- Rings
 |- Earrings
 |- Pendants & Necklaces
 |- Bangles & Bracelets
 |- Banner   (home banner ki photos)
 `- Films    (videos)
```
Photo ka naam = design ID + naam: `R-101 - Solitaire Promise Ring.jpg`
Same design ki 2nd photo: `R-101 - Solitaire Promise Ring (2).jpg`. Category folders me video bhi daal sakte ho (same naming).
Banner ki video Drive se background me nahi chalti, usse GitHub `assets/` me rakh ke `HERO` me path do.

## Ek baar ka setup: Drive API key (free)
console.cloud.google.com > New project > "Google Drive API" Enable > Credentials > Create API key >
key ko "HTTP referrers" se apni github.io site tak restrict karo > `CONFIG.driveApiKey` (js/products.js) me paste karo.

## GitHub Pages
Repo me files upload > Settings > Pages > main / root. Link clients ko share karo.
