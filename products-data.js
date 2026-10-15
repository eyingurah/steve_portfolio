/* ==========================================================================
   PRODUCT CATALOGUE  (add a product = add one block + its photos)
   - image: file name (without .webp) in assets/img/products and assets/img/thumbs
   - collection: "funeral" | "chiefs" | "queens"
   - Leave symbolism/sizes/leadTime empty ("") to show a placeholder.
   - Names, collections and descriptions below are WORKING DRAFTS written from
     the photos. The designer should confirm or replace them.
   ========================================================================== */
window.COLLECTIONS = {
  funeral: { title: "Funeral Wear",            page: "collections/funeral.html" },
  chiefs:  { title: "Chiefs' Collection",      page: "collections/chiefs.html" },
  queens:  { title: "Queen Mothers' Collection", page: "collections/queens.html" }
};

window.PRODUCTS = [
  /* ---------------------------- FUNERAL ---------------------------- */
  { id: "funeral-gye-nyame-toe-loop", name: "Black Gye Nyame Toe-Loop", collection: "funeral", featured: true,
    image: "funeral-gye-nyame-toe-loop",
    alt: "Black leather toe-loop slipper with a gold Gye Nyame emblem and white cross-stitching, worn on the foot",
    description: "A dignified black leather slipper with a gold-tone emblem on the strap and hand-stitched white detailing.",
    materials: ["Leather", "Gold-tone emblem", "Contrast stitching"], colours: ["Black", "Gold", "White"],
    symbolism: "", sizes: "", price: "", availability: "made-to-order", leadTime: "" },

  { id: "funeral-beaded-thong", name: "Black Beaded Thong", collection: "funeral",
    image: "funeral-beaded-thong",
    alt: "Pair of black thong slippers with rows of white beads and a round emblem on the toe post, on artificial grass",
    description: "Understated black thong slippers with rows of white beads along the strap.",
    materials: ["Leather", "Beads"], colours: ["Black", "White"],
    symbolism: "", sizes: "", price: "", availability: "made-to-order", leadTime: "" },

  { id: "funeral-gold-plaque-thong", name: "Black Gold-Plaque Thong", collection: "funeral",
    image: "funeral-gold-plaque-thong",
    alt: "Pair of black leather thong slippers with a gold-tone Adinkra plaque and a leather knot at the toe",
    description: "Black leather thong slippers with a gold-tone Adinkra-style plaque and a sculpted toe knot.",
    materials: ["Leather", "Gold-tone plaque"], colours: ["Black", "Gold"],
    symbolism: "", sizes: "", price: "", availability: "made-to-order", leadTime: "" },

  { id: "funeral-red-cowrie", name: "Red & Black Cowrie Thong", collection: "funeral", featured: true,
    image: "funeral-red-cowrie",
    alt: "Black and red leather thong slippers decorated with a cowrie shell on each strap, worn on the feet",
    description: "Black and red leather thong slippers, each strap finished with a cowrie shell.",
    materials: ["Leather", "Cowrie shell"], colours: ["Red", "Black"],
    symbolism: "", sizes: "", price: "", availability: "made-to-order", leadTime: "" },

  { id: "funeral-red-python-knob", name: "Red Patterned Knob Thong", collection: "funeral",
    image: "funeral-red-python-knob",
    alt: "Black thong slippers with red patterned leather panels, gold-tone emblems and a round black toe knob, worn on the feet",
    description: "Black thong slippers with red patterned panels, gold-tone emblems and a bold round toe knob.",
    materials: ["Leather", "Patterned leather panel", "Gold-tone emblem"], colours: ["Red", "Black", "Gold"],
    symbolism: "", sizes: "", price: "", availability: "made-to-order", leadTime: "" },

  /* ---------------------------- CHIEFS ---------------------------- */
  { id: "chiefs-leopard-print", name: "Leopard-Print Royal Thong", collection: "chiefs", featured: true,
    image: "chiefs-leopard-print",
    alt: "Pair of black leather thong slippers with leopard-print pom details and red accents on a marble surface",
    description: "Black leather thong slippers with leopard-print details and red accent panels. Stitched soles and a sculpted footbed.",
    materials: ["Leather", "Leopard-print detail"], colours: ["Black", "Red", "Gold"],
    symbolism: "", sizes: "", price: "", availability: "made-to-order", leadTime: "" },

  { id: "chiefs-green-croc-slide", name: "Green Croc-Embossed Slide", collection: "chiefs",
    image: "chiefs-green-croc-slide",
    alt: "Pair of dark green croc-embossed leather slides with gold-tone emblems",
    description: "A deep green croc-embossed leather slide with a gold-tone emblem on the side of the strap.",
    materials: ["Croc-embossed leather", "Gold-tone emblem"], colours: ["Green", "Gold"],
    symbolism: "", sizes: "", price: "", availability: "made-to-order", leadTime: "" },

  { id: "chiefs-textured-thong", name: "Textured Black Thong", collection: "chiefs",
    image: "chiefs-textured-thong",
    alt: "Pair of black textured-leather thong slippers with a gold-tone emblem",
    description: "Black textured-leather thong slippers with a gold-tone emblem and a broad, square-toe sole.",
    materials: ["Textured leather", "Gold-tone emblem"], colours: ["Black", "Gold"],
    symbolism: "", sizes: "", price: "", availability: "made-to-order", leadTime: "" },

  { id: "chiefs-crossed-swords", name: "Crossed-Swords Woven Thong", collection: "chiefs",
    image: "chiefs-crossed-swords",
    alt: "Black leather thong slipper with a woven strap, a gold crossed-swords emblem and a square toe cover, held in a hand",
    description: "A black thong slipper with a woven leather strap, a gold-tone crossed-swords emblem and a square leather toe cover.",
    materials: ["Leather", "Woven leather strap", "Gold-tone emblem"], colours: ["Black", "Gold"],
    symbolism: "", sizes: "", price: "", availability: "made-to-order", leadTime: "" },

  { id: "chiefs-red-black-set", name: "Red & Black Ceremonial Set", collection: "chiefs", featured: true,
    image: "chiefs-red-black-set",
    alt: "Two pairs of red and black thong slippers with gold crossed swords and decorated round toe balls, one in leather and one in red patterned fabric",
    description: "Two ceremonial styles in red and black, each with gold-tone crossed swords and a decorated round toe ball: one in leather, one in red patterned fabric.",
    materials: ["Leather", "Patterned fabric", "Gold-tone emblem"], colours: ["Red", "Black", "Gold"],
    symbolism: "", sizes: "", price: "", availability: "made-to-order", leadTime: "" },

  /* ---------------------------- QUEENS ---------------------------- */
  { id: "queens-fringe-cross-strap", name: "Fringed Cross-Strap Sandal", collection: "queens",
    image: "queens-fringe-cross-strap",
    alt: "Pair of black cross-strap sandals with white fringe and a gold emblem on a pale panel",
    description: "A black cross-strap sandal with white fringe, a gold-tone emblem on a pale panel and fine white stitching.",
    materials: ["Leather", "Fringe trim", "Gold-tone emblem"], colours: ["Black", "White", "Gold"],
    symbolism: "", sizes: "", price: "", availability: "made-to-order", leadTime: "" },

  { id: "queens-orange-croc-cross", name: "Black & Tan Cross-Strap Slide", collection: "queens",
    image: "queens-orange-croc-cross",
    alt: "Black leather cross-strap slides with tan croc-embossed panels, white stitching and gold emblems",
    description: "Soft black cross-strap slides with tan croc-embossed panels, white hand-stitching and a gold-tone emblem.",
    materials: ["Leather", "Croc-embossed leather", "Gold-tone emblem"], colours: ["Black", "Tan", "Gold"],
    symbolism: "", sizes: "", price: "", availability: "made-to-order", leadTime: "" },

  { id: "queens-tan-panel-thong", name: "Tan-Panel Stitched Thong", collection: "queens",
    image: "queens-tan-panel-thong",
    alt: "Top view of a black thong sandal with a tan leather panel, a gold motif and white stitching",
    description: "A black thong sandal with a tan leather panel, gold embroidered motif and decorative white stitching.",
    materials: ["Leather", "Embroidered motif"], colours: ["Black", "Tan", "Gold"],
    symbolism: "", sizes: "", price: "", availability: "made-to-order", leadTime: "" },

  { id: "queens-white-navy-gold", name: "White & Navy Gold-Emblem Thong", collection: "queens", featured: true,
    image: "queens-white-navy-gold",
    alt: "Pair of white and navy leather thong slippers with gold-tone emblems",
    description: "A fresh white and navy leather thong with gold-tone emblems and navy stitched edges.",
    materials: ["Leather", "Gold-tone emblems"], colours: ["White", "Navy", "Gold"],
    symbolism: "", sizes: "", price: "", availability: "made-to-order", leadTime: "" },

  { id: "queens-orange-leather", name: "Golden-Orange Leather Thong", collection: "queens", featured: true,
    image: "queens-orange-leather",
    alt: "Pair of orange leather T-strap thong sandals with gold embroidered motifs and white zig-zag stitching",
    description: "Golden-orange leather T-strap thong sandals with gold embroidered motifs and white zig-zag stitching.",
    materials: ["Leather", "Embroidered motifs"], colours: ["Orange", "Gold", "White"],
    symbolism: "", sizes: "", price: "", availability: "made-to-order", leadTime: "" }
];
