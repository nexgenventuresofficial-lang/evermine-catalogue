/* ============ EVERMINE JEWELS - SETTINGS ============ */
const CONFIG = {
  phone: "+919327390939",
  phoneDisplay: "+91 93273 90939",
  address: "Surat, Gujarat, India",
  instagram: "",          // <-- Instagram link yaha daalo
  slideMs: 2000,          // product/tile photos har 2 second me badlengi
  heroMs: 4500,           // top banner slider speed
  rootFolder: "1L-0suSqFlLoCzJ_-HBBTau5Q72yQTNQk",   // Evermine Drive main folder
  driveApiKey: "AIzaSyAfEZAIr_-bPWQwAwvFUaGQ7DGNvX0tvRI"         // Google Drive API key (README me steps). Khali = neeche ITEMS list use hogi
};

/* Main Drive folder (rootFolder) ke andar ye sub-folders banao: Rings, Earrings, Pendants & Necklaces,
   Bangles & Bracelets, Banner, Films. Website naam se apne aap dhundh leti hai (match). */
const CATEGORIES = [
  { slug:"rings",              title:"Rings",                match:"^ring", folder:"", cover:"" },
  { slug:"earrings",           title:"Earrings",             match:"earring", folder:"", cover:"" },
  { slug:"pendants-necklaces", title:"Pendants & Necklaces", match:"pendant|necklace", folder:"", cover:"" },
  { slug:"bangles-bracelets",  title:"Bangles & Bracelets",  match:"bangle|bracelet", folder:"", cover:"" }
];

/* Top banner: type "image" ya "video". src = Drive FILE_ID (photo) ya repo path "assets/banner.mp4" (video) */
const HERO = [ { type:"image", src:"" }, { type:"video", src:"" } ];
const STORY_BG = "";

/* Videos page (Drive video FILE_ID) */
const FILMS = [ { title:"The Evermine collection", id:"" }, { title:"Behind the craft", id:"" } ];

/* Manual list (jab tak Drive auto-load on nahi karte). cat = category slug, images = Drive FILE_IDs */
const ITEMS = [
  { id:"R-101", name:"Solitaire Promise Ring",      cat:"rings",    tag:"Bestseller",  desc:"A brilliant-cut solitaire on a slim band with pavé shoulders.", spec:["18K gold","Certified natural diamond"], images:[], video:"" },
  { id:"R-102", name:"Signature Emerald Solitaire", cat:"rings",    tag:"",            desc:"Emerald centre stone framed by a fine diamond halo.", spec:["18K gold","Emerald and diamond"], images:[], video:"" },
  { id:"E-101", name:"Celeste Diamond Hoops",       cat:"earrings", tag:"Bestseller",  desc:"Sapphire-centred drops outlined in baguette diamonds.", spec:["18K gold","Sapphire and diamond"], images:[], video:"" },
  { id:"E-102", name:"Floral Chandelier Earrings",  cat:"earrings", tag:"",            desc:"Hand-finished floral drops in two-tone gold.", spec:["18K two-tone gold"], images:[], video:"" },
  { id:"P-101", name:"Luna Diamond Necklace",       cat:"pendants-necklaces", tag:"New arrival", desc:"A delicate chain with a floating diamond drop.", spec:["18K gold","Natural diamonds"], images:[], video:"" },
  { id:"P-102", name:"Seraphine Pendant",           cat:"pendants-necklaces", tag:"", desc:"A pear-shaped diamond pendant with a pavé halo.", spec:["18K white gold"], images:[], video:"" },
  { id:"B-101", name:"Tennis Diamond Bracelet",     cat:"bangles-bracelets",  tag:"", desc:"A continuous line of round diamonds.", spec:["18K gold","Natural diamonds"], images:[], video:"" },
  { id:"B-102", name:"Delicate Link Bracelet",      cat:"bangles-bracelets",  tag:"New arrival", desc:"A fine link bracelet with a diamond-set station.", spec:["18K rose gold"], images:[], video:"" }
];
