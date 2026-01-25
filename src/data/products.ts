export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
    link?: string;
}

export const PRODUCTS: Product[] = [
    // HANDGUNS
    {
        id: 'hg-1',
        name: 'Girsan MC1911S Influencer X 10mm',
        category: 'Handguns',
        price: 724.09,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/125988/243303/girsan-girsanmc1911s-391520__64049.1733516411.png?c=2',
        description: '5" Barrel, Tungsten Frame, Black Slide/Grip, Optic Ready, 9rd'
    },
    {
        id: 'hg-2',
        name: 'Springfield 1911 TRP 45 ACP 5"',
        category: 'Handguns',
        price: 1397.79,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/88340/208169/springfield-pc9125__03896.1705551749.jpg?c=2',
        description: '5" Barrel, Black Cerakote, G10 Grips, 3x8rd Mags'
    },
    {
        id: 'hg-3',
        name: 'CZ P-10 9mm FDE/Black',
        category: 'Handguns',
        price: 589.99,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/71471/171333/cz-czp10-91561-1__81091.1724869367.jpg?c=2',
        description: '3.5" Barrel, Flat Dark Earth Frame, Black Slide, 12rd'
    },
    {
        id: 'hg-4',
        name: 'Springfield 1911 TRP 45 ACP 4.25"',
        category: 'Handguns',
        price: 1548.99,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/88341/208184/springfield-springfieldtrp-pc9124__79884.1705551933.jpg?c=2',
        description: '4.25" Barrel, Black Cerakote, G10 Grips, 3x8rd Mags'
    },
    {
        id: 'hg-5',
        name: 'Springfield 1911 TRP 45 ACP Coyote',
        category: 'Handguns',
        price: 1585.99,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/88339/208152/springfield-springfieldtrp-pc9124lrcbcc-2__86854.1705551802.jpg?c=2',
        description: '4.25" Barrel, Coyote Brown Cerakote, G10 Grips, 3x7rd Mags'
    },
    {
        id: 'hg-6',
        name: 'ATI Alpha Maxx AR15 Pistol 5.56',
        category: 'Handguns',
        price: 389.99,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/126189/243804/SSI173337__90685.1760650836.png?c=2',
        description: '7.5" Barrel, Black, Flip Up Sights, Pro 2A Blade Brace, M-Lok, 60rd'
    },
    {
        id: 'hg-7',
        name: 'Smith & Wesson M&P Shield EZ 9mm',
        category: 'Handguns',
        price: 572.69,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/64334/238514/smithwesson-smithwessonmpshieldezm20-12438__40997.1724872858.jpg?c=2',
        description: '3.675" Barrel, Black, Crimson Trace Laserguard, Manual Safety, 8rd'
    },
    {
        id: 'hg-8',
        name: 'Diamondback DB15 Combo AR15 Pistol',
        category: 'Handguns',
        price: 814.99,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/126830/245439/SSI171643__80952.1762526240.png?c=2',
        description: '5.56 7" / 300 BO 10" Barrel, FDE, M-Lok Handguard, 30rd'
    },
    {
        id: 'hg-9',
        name: 'Smith & Wesson 648 22 WMR',
        category: 'Handguns',
        price: 829.00,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/61501/239037/smithwesson-smithwesson648-12460__22912.1725898898.jpg?c=2',
        description: '6" Barrel, Stainless Steel, Black Synthetic Grip, 8rd'
    },
    {
        id: 'hg-10',
        name: 'Walther PDP 9mm',
        category: 'Handguns',
        price: 649.00,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/71724/172900/walther-waltherpdp-2851237-1__36941.1724882775.jpg?c=2',
        description: '4" Barrel, Black Polymer, Optic Ready, 18rd'
    },

    // RIFLES
    {
        id: 'rf-1',
        name: 'Battle Arms AR-15 Receiver Set',
        category: 'Rifles',
        price: 466.99,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/150851/275095/battlearms-ar15-bad556ambiset__41067.1766679541.jpg?c=2',
        description: 'Combo Light Weight Cal Multi, Aluminum Black Anodized'
    },
    {
        id: 'rf-2',
        name: 'Ruger Mini-14 Tactical Folder',
        category: 'Rifles',
        price: 1361.29,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/96567/213808/ruger-5895__80547.1759179054.png?c=2',
        description: '223/5.56, 18.5" Threaded Barrel, Walnut Stainless Folding Stock, 20rd'
    },
    {
        id: 'rf-3',
        name: 'Springfield Hellion Bullpup 5.56',
        category: 'Rifles',
        price: 1663.89,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/74491/180563/springfield-hl916556b__00705.1692804130.jpg?c=2',
        description: '16" Barrel, Flip-Up Sights, Mod3 Grip, Black, 30rd'
    },
    {
        id: 'rf-4',
        name: 'Rock River Arms LAR-15 CAR A4',
        category: 'Rifles',
        price: 639.99,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/35310/170907/rockriver-ar15-ar1850__61607.1608153565.png?c=2',
        description: 'Flat Top AR-15 5.56/223 16" Barrel Optic Ready, 30rd'
    },
    {
        id: 'rf-5',
        name: 'Ruger PC Carbine M-Lok 9mm',
        category: 'Rifles',
        price: 629.99,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/57439/87952/736676191154__01640.1724267720.jpg?c=2',
        description: '16" Threaded Barrel, M-Lok Handguard, Ghost Ring Sight, 17rd'
    },
    {
        id: 'rf-6',
        name: 'Riley RAK Classical AK47',
        category: 'Rifles',
        price: 799.09,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/56402/275149/riley-rileydefenserak47-rak101__21056.1766776910.jpg?c=2',
        description: '7.62x39mm 16.25" Barrel, Teak Butt Stock, Bakelite Grip, 30rd'
    },
    {
        id: 'rf-7',
        name: 'ZRO Delta Ready Series ZR01',
        category: 'Rifles',
        price: 369.99,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/125163/241263/SSI170988__12961.1744399403.png?c=2',
        description: '223/5.56 16" Threaded Barrel, 15" M-Lok, MilSpec Stock, 30rd'
    },
    {
        id: 'rf-8',
        name: 'Diamondback DB15 Combo AR15',
        category: 'Rifles',
        price: 814.99,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/126830/245439/SSI171643__80952.1762526240.png?c=2',
        description: 'Pistol 5.56 7" / 300 BO 10" Barrel, FDE, M-Lok, 30rd'
    },
    {
        id: 'rf-9',
        name: 'Romania Under Folder AK-47',
        category: 'Rifles',
        price: 989.99,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/57947/144054/787450515994__79520.1589836136.jpg?c=2',
        description: '762X39, 16.25", Wood Grip, Metal Folding Stock, 30rd'
    },
    {
        id: 'rf-10',
        name: 'Hammerli Tac R1 .22 LR',
        category: 'Rifles',
        price: 421.09,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/57331/144738/723364212994__98182.1635190097.jpg?c=2',
        description: '16" TB, MFT Stock, M-LOK, Black, 20rd'
    },

    // AMMO
    {
        id: 'am-1',
        name: 'Barnes VOR-TX .243 Win 80gr',
        category: 'Ammo',
        price: 43.49,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/16942/109980/716876024384__03182.1584731736.jpg?c=2',
        description: 'Tipped Triple Shock X-Bullet Boattail, 20rd Box'
    },
    {
        id: 'am-2',
        name: 'Federal American Eagle .224 Valkyrie',
        category: 'Ammo',
        price: 18.21,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/50457/141055/604544630299__34404.1595950150.jpg?c=2',
        description: '75gr, Total Metal Jacket 20rd Box'
    },
    {
        id: 'am-3',
        name: 'Hornady Subsonic 450 BM 395gr',
        category: 'Ammo',
        price: 34.69,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/65996/157373/BHCHORN%2082247__26508.1594657653.jpg?c=2',
        description: 'Sub-X, 20rd Box'
    },
    {
        id: 'am-4',
        name: 'Aguila 308 Win 150gr',
        category: 'Ammo',
        price: 24.49,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/52135/139173/640420003306__32899.1596212191.jpg?c=2',
        description: 'Full Metal Jacket Boat Tail 20rd Box'
    },
    {
        id: 'am-5',
        name: 'Aguila Interceptor 22 LR 40gr',
        category: 'Ammo',
        price: 8.14,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/23979/118580/640420001432__92905.1596213050.jpg?c=2',
        description: 'Soft Point, 50rd Box'
    },
    {
        id: 'am-6',
        name: 'PPU Handgun Defense 38 S&W',
        category: 'Ammo',
        price: 28.49,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/85269/200591/SSI57067__32419.1695659649.png?c=2',
        description: '145gr, Lead Round Nose, 50rd Box'
    },
    {
        id: 'am-7',
        name: 'Federal Standard 10mm FMJ',
        category: 'Ammo',
        price: 29.79,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/20093/113880/029465096397__76708.1717612481.jpg?c=2',
        description: '180gr, Full Metal Jacket, 50Rd Box'
    },
    {
        id: 'am-8',
        name: 'Sig Sauer 10mm 180gr',
        category: 'Ammo',
        price: 37.29,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/3234/93321/798681516988__93683.1692714852.jpg?c=2',
        description: 'Full Metal Jacket, 50rd Box'
    },
    {
        id: 'am-9',
        name: 'IGMAN 223 Rem 55gr',
        category: 'Ammo',
        price: 15.42,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/71842/173577/igman-iggman223a20-6__47769.1695390899.jpg?c=2',
        description: 'FMJ, 20rd Box'
    },
    {
        id: 'am-10',
        name: 'Federal Varmint & Predator 223',
        category: 'Ammo',
        price: 24.19,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/59656/145257/604544647891__79990.1596211911.jpg?c=2',
        description: '5.56mm 53gr, Hornady V-Max, 20rd Box'
    },

    // GEAR
    {
        id: 'gr-1',
        name: 'Walkers Foam Ear Plugs 32 dB',
        category: 'Gear',
        price: 3.49,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/62214/148809/888151014608__42821.1575706906.jpg?c=2',
        description: 'Orange with Black Canister'
    },
    {
        id: 'gr-2',
        name: '3M Peltor Disposable Earplugs',
        category: 'Gear',
        price: 0.58,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/17539/84652/078371905811__65048.1570558049.jpg?c=2',
        description: '29 dB, Each'
    },
    {
        id: 'gr-3',
        name: 'Evan Sports Folding Knife',
        category: 'Gear',
        price: 9.99,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/59722/148064/025554400083__79566.1575706300.jpg?c=2',
        description: '3.5" Blade, Camo'
    },
    {
        id: 'gr-4',
        name: 'Real Avid Gun Tool 4-in-1',
        category: 'Gear',
        price: 34.99,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/59755/145437/813119012709__85513.1579346024.jpg?c=2',
        description: 'Compatible with Glock'
    },
    {
        id: 'gr-5',
        name: 'REAL AVID AR-15 ARMORERS KIT',
        category: 'Gear',
        price: 299.99,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/59291/87388/813119012631__46745.1575306284.jpg?c=2',
        description: 'MASTER KIT, HARD TRAVEL CASE'
    },

    // ACCESSORIES
    {
        id: 'ac-1',
        name: 'Mission First Tactical Mag',
        category: 'Accessories',
        price: 14.95,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/155923/276138/missionfirsttactical-20exd762x51tc__08209.1768772905.jpg?c=2',
        description: 'Extreme Duty, 308 Win, 20 Rounds, Translucent Clear'
    },
    {
        id: 'ac-2',
        name: 'FN Five-Seven Magazine',
        category: 'Accessories',
        price: 39.39,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/18970/173177/fn-3866100030__93219.1614276042.jpg?c=2',
        description: '5.7x28mm, Polymer, Black, 20rd'
    },
    {
        id: 'ac-3',
        name: 'GSG FireFly Magazine 22LR',
        category: 'Accessories',
        price: 20.99,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/52327/95631/813393019579__59136.1588691108.jpg?c=2',
        description: 'Stainless, 10rd'
    },
    {
        id: 'ac-4',
        name: 'CMMG FN FiveseveN Mag Ext',
        category: 'Accessories',
        price: 11.99,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/18044/111382/852005002028__70157.1575674727.jpg?c=2',
        description: 'Adds 10 Rounds'
    },
    {
        id: 'ac-5',
        name: 'ProMag AK-47 Magazine',
        category: 'Accessories',
        price: 11.78,
        image: 'https://cdn11.bigcommerce.com/s-1kqh9qmybo/images/stencil/1280x1280/products/20548/114372/708279006258__69188.1765089635.jpg?c=2',
        description: 'Standard 30rd 7.62x39mm, Black Polymer'
    }
];
