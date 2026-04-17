import type { ProductDetail } from "@/components/ui/ProductModal";

const MADE_IN = "Novi Sad, Srbija — ručni rad Sanja Krstić";
const CARE = "Ručno pranje ili blago površinsko čišćenje. Sušiti položeno, bez direktne topline.";
const PACKAGING =
  "Dolazi spremno za poklon — pažljivo zapakirano s karticom atelijera i porukom po dogovoru.";

export const FALLBACK_PRODUCTS: ProductDetail[] = [
  {
    id: 1,
    crochetMorph: "teddyWarm",
    displayMode: "image",
    imageFit: "cover",
    name: "Medvjedić Rozi",
    desc: "Topli smeđi medo u puder-rozoj haljinici s cvijetom uz uho.",
    storyLine:
      "Klasična teddy silueta, ali nježnija — mali komad koji izgleda kao da je već nekome obećan.",
    longDesc:
      "Medvjedić Rozi spaja mekani chenille volumen s romantičnom haljinicom koja odmah daje dojam poklona za posebnu priliku. Lice je jednostavno, blago i prijateljsko, pa komad djeluje i kao dekor i kao plišani pratitelj za svakodnevno maženje.",
    exteriorLuxury:
      "Puder-roza haljinica i cvjetić na uhu daju meku, nježnu siluetu koja se lijepo uklapa u dječju sobu, gift box ili proljetnu kolekciju objava.\n\nTopli ton tijela i tamne oči čine kontrast koji ostaje čitljiv i na videu i na fotografiji.",
    interiorLuxury:
      "Punjena je tako da ostane meka pod rukom, ali dovoljno stabilna da sjedi ili se nasloni bez gubitka oblika.\n\nSvaki spoj je ručno zatvoren i prilagođen malim količinama, ne serijskoj proizvodnji.",
    luxuryTeaser: "Puder roza haljinica i klasična teddy toplina",
    highlights: ["Ručni rad", "Chenille tekstura", "Poklon favorit"],
    packaging: PACKAGING,
    price: 0,
    tag: "Novo",
    img: "/catalog/bear-rose-dress.webp",
    materials: "Plišani chenille konac, antialergijsko punjenje, sigurnosne oči",
    dimensions: "Mjere na upit",
    care: CARE,
    madeIn: MADE_IN,
  },
  {
    id: 2,
    crochetMorph: "bunny",
    displayMode: "image",
    imageFit: "cover",
    name: "Zeko Denim",
    desc: "Viseouhi zeko u plavom kombinezonu sa sitnim bijelim gumbićima.",
    storyLine:
      "Mekan, razigran i vrlo fotogeničan — komad koji izgleda kao omiljena dječja igračka iz prve sekunde.",
    longDesc:
      "Zeko Denim ima dugu, prepoznatljivu siluetu i kombinezon koji mu daje retro, gotovo ilustrirani karakter. Upravo taj kontrast toplog bež tona i plavog outfita čini ga idealnim za personalizirane narudžbe, objave na društvenim mrežama i poklone za dječake ili djevojčice.",
    exteriorLuxury:
      "Kombinezon vizualno strukturira cijeli komad i daje mu 'gotovu' modnu priču, umjesto da djeluje kao obična plišana figura.\n\nDuge uši ostaju zaštitni detalj i stvaraju meku liniju pri držanju u ruci ili snimanju za reel.",
    interiorLuxury:
      "Tijelo je punjeno tako da ostane gipko, a da kombinezon i držanje šapa zadrže urednu formu.\n\nRučno zatvaranje i završna obrada omogućuju da svaki primjerak zadrži isti karakter uz male, šarmantne razlike.",
    luxuryTeaser: "Plavi kombinezon, duge uši i meka retro vibra",
    highlights: ["Live Made", "Dugi floppy ears", "Gift ready"],
    packaging: PACKAGING,
    price: 0,
    tag: "Live Made",
    img: "/catalog/bunny-blue-overalls.webp",
    materials: "Chenille konac, antialergijsko punjenje, sigurnosne oči, ukrasni gumbi",
    dimensions: "Mjere na upit",
    care: CARE,
    madeIn: MADE_IN,
  },
  {
    id: 3,
    crochetMorph: "teddyDust",
    displayMode: "image",
    imageFit: "cover",
    name: "Majmunčić Sandi",
    desc: "Razigrani majmunčić u pješčanom kombinezonu s mekanim pramenovima.",
    storyLine:
      "Jedan od onih likova koji odmah djeluju živo — nasmiješeno lice i razbarušena kosa nose cijelu priču.",
    longDesc:
      "Majmunčić Sandi je karakterni komad za kolekciju koja traži više od klasičnog mede ili zeca. Topli tonovi, mekana kosa i veseli izraz čine ga posebno zahvalnim za personalizirane narudžbe i dječje poklone koji trebaju ostaviti 'wow' dojam već na prvoj fotografiji.",
    exteriorLuxury:
      "Naglašeni pramenovi na glavi odmah mu daju ručno rađen identitet i razlikuju ga od standardnih amigurumi likova.\n\nJednostavan kombinezon smiruje siluetu i pušta da lice i tekstura ostanu glavni fokus.",
    interiorLuxury:
      "Punjenje je raspoređeno tako da glava zadrži izražajan oblik, a tijelo ostane dovoljno meko za svakodnevnu upotrebu.\n\nSastavljanje više dijelova ručno je usklađeno kako bi lice ostalo simetrično i čitljivo.",
    luxuryTeaser: "Lik s karakterom, mekanom kosom i razigranim osmijehom",
    highlights: ["Karakterni dizajn", "Mekani pramenovi", "Ručna izrada"],
    packaging: PACKAGING,
    price: 0,
    tag: "Novo",
    img: "/catalog/monkey-sand-overalls.webp",
    materials: "Chenille konac, antialergijsko punjenje, sigurnosne oči",
    dimensions: "Mjere na upit",
    care: CARE,
    madeIn: MADE_IN,
  },
  {
    id: 4,
    crochetMorph: "teddyWarm",
    displayMode: "image",
    imageFit: "cover",
    name: "Pilić Muffin",
    desc: "Mali žuti pilić u cupcake silueti s roza valovitom suknjicom.",
    storyLine:
      "Veličinom sladak, oblikom potpuno drugačiji — više kolekcionarski mood piece nego običan dodatak.",
    longDesc:
      "Pilić Muffin je mali format s puno karaktera. Zaobljeni oblik i valovita donja linija daju mu dojam mini dekor-komada koji jednako dobro funkcionira za poklon, uskrsnu kolekciju ili kao nježan branded post za feed i story format.",
    exteriorLuxury:
      "Jednostavno lice i pastelna baza stvaraju čistu, lako prepoznatljivu siluetu čak i u manjim kadrovima.\n\nRoza rub dodaje slatki, desertni efekt zbog kojeg komad odmah ostaje u pamćenju.",
    interiorLuxury:
      "Kompaktno punjenje čuva zaobljeni oblik i omogućuje da komad ostane stabilan i uredan unatoč manjim dimenzijama.\n\nRučno završavanje rubova sprječava da se valoviti dio deformira pri korištenju ili pakiranju.",
    luxuryTeaser: "Mini format, cupcake forma i proljetni pastelni tonovi",
    highlights: ["Mini plush", "Proljetni motiv", "Pastel palette"],
    packaging: PACKAGING,
    price: 0,
    tag: "Proljeće",
    img: "/catalog/chick-cupcake.webp",
    materials: "Chenille konac, antialergijsko punjenje, sigurnosne oči",
    dimensions: "Mjere na upit",
    care: CARE,
    madeIn: MADE_IN,
  },
  {
    id: 5,
    crochetMorph: "bunny",
    displayMode: "image",
    imageFit: "cover",
    name: "Zečica Blush",
    desc: "Bijela zečica u nježnoj ružičastoj haljinici s cvijetom na uhu.",
    storyLine:
      "Mekana, čista i romantična — komad koji vrlo lako postaje prva omiljena igračka ili baby shower poklon.",
    longDesc:
      "Zečica Blush je tip proizvoda koji odmah komunicira nježnost. Kontrast bijelog tijela i roza detalja daje joj lagan, svjež izgled, a duga uha i jednostavno lice čine je bezvremenskom i lako uklopivom u različite kolekcije i prigode.",
    exteriorLuxury:
      "Roza rub haljinice i cvijet na uhu daju dovoljno detalja da komad izgleda dotjerano, ali bez vizualne prenatrpanosti.\n\nBijela baza pojačava dojam čistoće i mekoće na fotografiji i u prostoru.",
    interiorLuxury:
      "Punjenje ostaje podatno kako bi zečica zadržala cuddly karakter, ali šape i glava imaju dovoljno forme za uredan izgled pri prezentaciji.\n\nRučno zatvaranje detalja pomaže da haljinica i lice ostanu uredni iz blizine.",
    luxuryTeaser: "Bijela baza, blush detalji i nježna baby-gift atmosfera",
    highlights: ["Baby shower ready", "Soft palette", "Ručni detalji"],
    packaging: PACKAGING,
    price: 0,
    tag: "Live Made",
    img: "/catalog/bunny-blush-dress.webp",
    materials: "Chenille konac, antialergijsko punjenje, sigurnosne oči, dekorativni cvijet",
    dimensions: "Mjere na upit",
    care: CARE,
    madeIn: MADE_IN,
  },
  {
    id: 6,
    crochetMorph: "teddyDust",
    displayMode: "image",
    imageFit: "cover",
    name: "Lav Leo",
    desc: "Lav s bogatom grivom i plavim kombinezonom koji nosi cijelu figuru.",
    storyLine:
      "Griva daje volumen, kombinezon priču — jedan od komada koji na polici izgleda gotovo kao mali lik iz slikovnice.",
    longDesc:
      "Lav Leo je snažan vizualni komad i jedan od najkarakternijih proizvoda u kolekciji. Bogata griva i plavi kombinezon stvaraju odmah prepoznatljiv stil, pa je idealan za kupce koji traže posebnog lika, a ne generičnu plišanu formu.",
    exteriorLuxury:
      "Velika griva dodaje dubinu i ručno rađeni identitet kakav se teško postiže serijskom proizvodnjom.\n\nPlavi kombinezon uvodi kontrast i čini da cijeli lik izgleda dotjerano i spremno za poklon ili premium objavu.",
    interiorLuxury:
      "Punjenje je raspoređeno tako da tijelo zadrži kompaktan volumen, dok griva ostaje mekana i razigrana.\n\nKomad je ručno sastavljen s fokusom na lice, jer upravo izraz i proporcija nose njegov karakter.",
    luxuryTeaser: "Bogata griva, ilustrirani karakter i snažan gift appeal",
    highlights: ["Bestseller", "Velika griva", "Statement komad"],
    packaging: PACKAGING,
    price: 0,
    tag: "Bestseller",
    img: "/catalog/lion-blue-overalls.webp",
    materials: "Chenille konac, antialergijsko punjenje, sigurnosne oči, ukrasni gumbi",
    dimensions: "Mjere na upit",
    care: CARE,
    madeIn: MADE_IN,
  },
  {
    id: 7,
    crochetMorph: "bunny",
    displayMode: "image",
    imageFit: "cover",
    name: "Zečica Apron",
    desc: "Bež zečica u ružičastoj keceljici s bijelim srcem na prednjem dijelu.",
    storyLine:
      "Djeluje kao mali kućni helper iz bajke — nježna, topla i puna detalja koji dobro prolaze u close-up kadru.",
    longDesc:
      "Zečica Apron odiše domaćom, ručno rađenom toplinom. Keceljica sa srcem daje joj prepoznatljiv detalj, a nježni tonovi čine je odličnim izborom za poklon, seasonal kampanju ili katalog koji želi zadržati slatkoću bez prenapadne estetike.",
    exteriorLuxury:
      "Ružičasta keceljica sa srcem daje odmah čitljiv motiv i diferencira komad od klasičnih haljinica.\n\nDuge uši i neutralna baza pomažu da dodatak ostane glavni fokus bez vizualnog kaosa.",
    interiorLuxury:
      "Punjenje je mekano, ali dovoljno ujednačeno da lik zadrži urednu siluetu u sjedećem i naslonjenom položaju.\n\nRučno spajanje outfita i tijela zadržava čistu liniju i uredan prijelaz boja.",
    luxuryTeaser: "Keceljica sa srcem i cozy, handmade karakter",
    highlights: ["Srce detalj", "Cozy aesthetic", "Gift friendly"],
    packaging: PACKAGING,
    price: 0,
    tag: "Novo",
    img: "/catalog/bunny-pink-apron.webp",
    materials: "Chenille konac, antialergijsko punjenje, sigurnosne oči",
    dimensions: "Mjere na upit",
    care: CARE,
    madeIn: MADE_IN,
  },
  {
    id: 8,
    crochetMorph: "bunny",
    displayMode: "image",
    imageFit: "cover",
    name: "Zečica Buttercup",
    desc: "Bijelo-žuta zečica u sunčanoj haljinici s dva cvjetića na glavi.",
    storyLine:
      "Vedra i lagana, kao mali proljetni akcent koji odmah unese toplinu u kolekciju.",
    longDesc:
      "Zečica Buttercup je dizajnirana za kupce koji vole nježne, ali optimistične tonove. Kombinacija bijele i žute čini je svijetlom i toplom, a cvjetni detalji pojačavaju dojam sezonskog limited dropa ili uskrsne/prigodne kolekcije.",
    exteriorLuxury:
      "Cvjetići na glavi i valoviti rub haljinice daju gotov, pažljivo stiliziran izgled bez suvišnih elemenata.\n\nŽuta boja lijepo svijetli na fotografiji i stvara vedar mood već u prvom kadru.",
    interiorLuxury:
      "Tijelo ostaje mekano i nježno na dodir, a glava i lice dovoljno formirani da proizvod zadrži uredan expression look.\n\nSvaki primjerak se završava ručno pa sitni cvjetni detalji ostaju jedinstveni, ali usklađeni.",
    luxuryTeaser: "Sunčani tonovi, cvjetići i nježna proljetna priča",
    highlights: ["Proljetni drop", "Cvjetni detalji", "Pastel yellow"],
    packaging: PACKAGING,
    price: 0,
    tag: "Proljeće",
    img: "/catalog/bunny-buttercup-dress.webp",
    materials: "Chenille konac, antialergijsko punjenje, sigurnosne oči, dekorativni cvjetići",
    dimensions: "Mjere na upit",
    care: CARE,
    madeIn: MADE_IN,
  },
  {
    id: 9,
    crochetMorph: "teddyWarm",
    displayMode: "image",
    imageFit: "cover",
    name: "Janje Rosie",
    desc: "Bijelo janje u duboko ružičastom kombinezonu s ružicama na glavi.",
    storyLine:
      "Mekani kontrast bijelog tijela i jačeg roze outfita čini ga jednim od onih komada koji odmah privlače pogled.",
    longDesc:
      "Janje Rosie nosi romantičnu estetiku, ali s nešto jačim kontrastom nego klasične pastelne figure. Ružice na glavi i kombinezon daju mu gotov styling, pa je komad vrlo zahvalan za fotografiranje, kolekcijske objave i personalizirane poklone.",
    exteriorLuxury:
      "Ružice na glavi i snažnija boja outfita stvaraju premium, pomalo editorial dojam i izdvajaju proizvod u katalogu.\n\nBijelo lice i tamnije oči čuvaju mekoću izraza unatoč jačem outfitu.",
    interiorLuxury:
      "Punjenje ostavlja tijelo mekanim, ali dovoljno kompaktnim da outfiti i proporcije zadrže uredan izgled.\n\nRučno spajanje više dijelova važno je kako bi lice ostalo otvoreno i simetrično.",
    luxuryTeaser: "Ružice, snažniji roze ton i elegantna boutique estetika",
    highlights: ["TikTok favorite", "Ružice na glavi", "Statement pink"],
    packaging: PACKAGING,
    price: 0,
    tag: "TikTok Favorite",
    img: "/catalog/lamb-rose-overalls.webp",
    materials: "Chenille konac, antialergijsko punjenje, sigurnosne oči, dekorativni cvjetovi",
    dimensions: "Mjere na upit",
    care: CARE,
    madeIn: MADE_IN,
  },
  {
    id: 10,
    crochetMorph: "teddyWarm",
    displayMode: "image",
    imageFit: "cover",
    name: "Pilić Mint",
    desc: "Proljetni pilić s mint kapicom, mašnom i toplim krem tonovima.",
    storyLine:
      "Jedan od najslađih seasonal komada — izgleda kao mali uskrsni ili proljetni collectible.",
    longDesc:
      "Pilić Mint ima jaču sezonsku priču od klasičnih likova, ali ostaje dovoljno univerzalan da bude poklon ili dekor i izvan blagdanskog konteksta. Mint kapica i narančasti kljun daju mu živost, dok kremasto tijelo zadržava nježan, mekan karakter.",
    exteriorLuxury:
      "Kapica s cvjetnim detaljima uvodi craft-rich izgled koji se odlično čita i na videu i na fotografiji.\n\nKombinacija mint, krem i narančastih akcenata daje svjež i vrlo prepoznatljiv palette moment.",
    interiorLuxury:
      "Punjenje ostaje kompaktno kako bi okrugla forma i kapica zadržale uredan volumen.\n\nSvaki detalj se ručno ušiva, što omogućuje da proizvod zadrži kolekcionarski izgled čak i u malom formatu.",
    luxuryTeaser: "Mint kapica, proljetna paleta i collector appeal",
    highlights: ["Live Made", "Seasonal favorite", "Mint accents"],
    packaging: PACKAGING,
    price: 0,
    tag: "Live Made",
    img: "/catalog/chick-mint-bonnet.webp",
    materials: "Chenille konac, antialergijsko punjenje, sigurnosne oči, dekorativna kapica",
    dimensions: "Mjere na upit",
    care: CARE,
    madeIn: MADE_IN,
  },
  {
    id: 11,
    crochetMorph: "teddyMocha",
    displayMode: "image",
    imageFit: "cover",
    name: "Medo Bonnet",
    desc: "Krem teddy u rozoj haljinici i bonnet kapici s mekanim valovitim rubom.",
    storyLine:
      "Retro baby aesthetic u plush izvedbi — komad koji izgleda luksuzno i razigrano u istom trenutku.",
    longDesc:
      "Medo Bonnet nosi nešto uredniji, stiliziraniji vibe od klasičnih teddy modela. Bonnet kapica i haljinica stvaraju gotov look s puno šarma, pa je ovo odličan komad za premium gift ponudu, baby kolekciju ili feed koji traži meki vintage ton.",
    exteriorLuxury:
      "Valoviti rub kapice i haljinice unosi dodatni volumen i jasno ručno rađeni potpis.\n\nKrem baza s nježno roza detaljima daje nježan, almost-heirloom dojam.",
    interiorLuxury:
      "Punjenje prati klasičnu teddy formu: mekano na dodir, ali dovoljno stabilno da komad ostane reprezentativan za policu, gift box ili foto kadar.\n\nRučno sastavljanje outfita i lica zadržava toplinu izraza bez serijske uniformnosti.",
    luxuryTeaser: "Bonnet kapica i vintage-soft boutique estetika",
    highlights: ["Bestseller", "Vintage vibe", "Soft heirloom look"],
    packaging: PACKAGING,
    price: 0,
    tag: "Bestseller",
    img: "/catalog/teddy-bonnet-rose.webp",
    materials: "Chenille konac, antialergijsko punjenje, sigurnosne oči",
    dimensions: "Mjere na upit",
    care: CARE,
    madeIn: MADE_IN,
  },
  {
    id: 12,
    crochetMorph: "bear",
    displayMode: "image",
    imageFit: "cover",
    name: "Medvjedić Petal",
    desc: "Svijetli teddy u nježno rozoj haljinici s malim cvjetićem uz uho.",
    storyLine:
      "Čist, nježan i vrlo poklonjiv komad — idealan kad trebaš nešto slatko, ali elegantno.",
    longDesc:
      "Medvjedić Petal donosi klasičan teddy oblik u svjetlijoj, prozračnijoj paleti. Zbog toga djeluje sofisticiranije i mekše od tamnijih modela, a roza haljinica i cvjetić ga prirodno guraju prema boutique gift segmentu i curated social objavama.",
    exteriorLuxury:
      "Svijetla baza i roza haljinica čine siluetu nježnom i čistom, pa proizvod odlično funkcionira u feedu, katalogu i kao premium poklon.\n\nCvjetić uz uho daje završni detalj bez potrebe za dodatnim ukrasima.",
    interiorLuxury:
      "Punjenje je prilagođeno da zadrži volumen tijela, ali i da ostane mazivo i lagano u ruci.\n\nRučno zatvaranje detalja i mala serija čuvaju onaj važan osjećaj da komad nije generičan.",
    luxuryTeaser: "Svijetli teddy ton i roza boutique završnica",
    highlights: ["Novo", "Soft palette", "Elegant gift"],
    packaging: PACKAGING,
    price: 0,
    tag: "Novo",
    img: "/catalog/bear-petal-dress.webp",
    materials: "Chenille konac, antialergijsko punjenje, sigurnosne oči",
    dimensions: "Mjere na upit",
    care: CARE,
    madeIn: MADE_IN,
  },
];
