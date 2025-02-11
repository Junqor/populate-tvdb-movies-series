// https://thetvdb.github.io/v4-api/#/
export namespace TVDB {
  export namespace Series {
    // Extended tvdb series entries
    export namespace Extended {
      export interface Root {
        status: string;
        data: Data;
      }

      export interface Data {
        id: number;
        name: string;
        slug: string;
        image: string;
        nameTranslations: string[];
        overviewTranslations: string[];
        aliases: Alias[];
        firstAired: string;
        lastAired: string;
        nextAired: string;
        score: number;
        status: Status;
        originalCountry: string;
        originalLanguage: string;
        defaultSeasonType: number;
        isOrderRandomized: boolean;
        lastUpdated: string;
        averageRuntime: number;
        episodes: any;
        overview: string;
        year: string;
        artworks: Artwork[];
        companies: Company[];
        originalNetwork: OriginalNetwork;
        latestNetwork: LatestNetwork;
        genres: Genre[];
        trailers: any[];
        lists: List[];
        remoteIds: RemoteId[];
        characters: Character[];
        airsDays: AirsDays;
        airsTime: string;
        seasons: Season[];
        translations: Translations;
        tags: any;
        contentRatings: ContentRating[];
        seasonTypes: SeasonType[];
      }

      export interface Alias {
        language: string;
        name: string;
      }

      export interface Status {
        id: number;
        name: string;
        recordType: string;
        keepUpdated: boolean;
      }

      export interface Artwork {
        id: number;
        image: string;
        thumbnail: string;
        language?: string;
        type: number;
        score: number;
        width: number;
        height: number;
        includesText: boolean;
        thumbnailWidth: number;
        thumbnailHeight: number;
        updatedAt: number;
        status: Status2;
        tagOptions: any;
        seasonId?: number;
      }

      export interface Status2 {
        id: number;
        name: any;
      }

      export interface Company {
        id: number;
        name: string;
        slug: string;
        nameTranslations: string[];
        overviewTranslations: string[];
        aliases: any[];
        country?: string;
        primaryCompanyType: number;
        activeDate?: string;
        inactiveDate: any;
        companyType: CompanyType;
        parentCompany: ParentCompany;
        tagOptions: any;
      }

      export interface CompanyType {
        companyTypeId: number;
        companyTypeName: string;
      }

      export interface ParentCompany {
        id: any;
        name: any;
        relation: Relation;
      }

      export interface Relation {
        id: any;
        typeName: any;
      }

      export interface OriginalNetwork {
        id: number;
        name: string;
        slug: string;
        nameTranslations: string[];
        overviewTranslations: any[];
        aliases: any[];
        country: string;
        primaryCompanyType: number;
        activeDate: any;
        inactiveDate: any;
        companyType: CompanyType2;
        parentCompany: ParentCompany2;
        tagOptions: any;
      }

      export interface CompanyType2 {
        companyTypeId: number;
        companyTypeName: string;
      }

      export interface ParentCompany2 {
        id: any;
        name: any;
        relation: Relation2;
      }

      export interface Relation2 {
        id: any;
        typeName: any;
      }

      export interface LatestNetwork {
        id: number;
        name: string;
        slug: string;
        nameTranslations: string[];
        overviewTranslations: any[];
        aliases: any[];
        country: string;
        primaryCompanyType: number;
        activeDate: any;
        inactiveDate: any;
        companyType: CompanyType3;
        parentCompany: ParentCompany3;
        tagOptions: any;
      }

      export interface CompanyType3 {
        companyTypeId: number;
        companyTypeName: string;
      }

      export interface ParentCompany3 {
        id: any;
        name: any;
        relation: Relation3;
      }

      export interface Relation3 {
        id: any;
        typeName: any;
      }

      export interface Genre {
        id: number;
        name: string;
        slug: string;
      }

      export interface List {
        id: number;
        name: string;
        overview?: string;
        url: string;
        isOfficial: boolean;
        nameTranslations: string[];
        overviewTranslations?: string[];
        aliases: Alias2[];
        score: number;
        image: string;
        imageIsFallback: boolean;
        remoteIds: any;
        tags: any;
      }

      export interface Alias2 {
        language: string;
        name: string;
      }

      export interface RemoteId {
        id: string;
        type: number;
        sourceName: string;
      }

      export interface Character {
        id: number;
        name: string;
        peopleId: number;
        seriesId: number;
        series: any;
        movie: any;
        movieId: any;
        episodeId: any;
        type: number;
        image: string;
        sort: number;
        isFeatured: boolean;
        url: string;
        nameTranslations: any;
        overviewTranslations: any;
        aliases: any;
        peopleType: string;
        personName: string;
        tagOptions: any;
        personImgURL?: string;
      }

      export interface AirsDays {
        sunday: boolean;
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
      }

      export interface Season {
        id: number;
        seriesId: number;
        type: Type;
        number: number;
        nameTranslations: string[];
        overviewTranslations: string[];
        companies: Companies;
        lastUpdated: string;
        image?: string;
        imageType?: number;
        name?: string;
      }

      export interface Type {
        id: number;
        name: string;
        type: string;
        alternateName?: string;
      }

      export interface Companies {
        studio: any;
        network: any;
        production: any;
        distributor: any;
        special_effects: any;
      }

      export interface Translations {
        nameTranslations: NameTranslation[];
        overviewTranslations: OverviewTranslation[];
        aliases: string[];
      }

      export interface NameTranslation {
        name: string;
        language: string;
        isPrimary?: boolean;
        isAlias?: boolean;
      }

      export interface OverviewTranslation {
        overview: string;
        language: string;
        isPrimary?: boolean;
      }

      export interface ContentRating {
        id: number;
        name: string;
        country: string;
        description: string;
        contentType: string;
        order: number;
        fullname: any;
      }

      export interface SeasonType {
        id: number;
        name: string;
        type: string;
        alternateName?: string;
      }
    }

    // Short tvdb series entries
    export namespace Short {
      export interface Root {
        status: string;
        data: Series[];
        links: Links;
      }

      export interface Series {
        id: number;
        name: string;
        slug: string;
        image: string;
        nameTranslations: any;
        overviewTranslations: any;
        aliases: any;
        firstAired: string;
        lastAired: string;
        nextAired: string;
        score: number;
        status: Status;
        originalCountry: string;
        originalLanguage: string;
        defaultSeasonType: number;
        isOrderRandomized: boolean;
        lastUpdated: string;
        averageRuntime: number;
        episodes: any;
        overview: string;
        year: string;
      }

      export interface Status {
        id: number;
        name: string;
        recordType: string;
        keepUpdated: boolean;
      }

      export interface Links {
        prev: any;
        self: string;
        next: string;
        total_items: number;
        page_size: number;
      }
    }
  }

  export namespace Movies {
    export namespace Extended {
      export interface Root {
        status: string;
        data: Data;
      }

      export interface Data {
        id: number;
        name: string;
        slug: string;
        image: string;
        nameTranslations: string[];
        overviewTranslations: string[];
        aliases: Alias[];
        score: number;
        runtime: number;
        status: Status;
        lastUpdated: string;
        year: string;
        trailers: Trailer[];
        genres: Genre[];
        releases: Release[];
        artworks: Artwork[];
        remoteIds: RemoteId[];
        characters: Character[];
        budget: string;
        boxOffice: string;
        boxOfficeUS: string;
        originalCountry: string;
        originalLanguage: string;
        audioLanguages: any;
        subtitleLanguages: any;
        studios: Studio[];
        awards: any;
        tagOptions: TagOption[];
        lists: List[];
        translations: Translations;
        contentRatings: ContentRating[];
        companies: Companies;
        production_countries: ProductionCountry[];
        inspirations: any[];
        spoken_languages: string[];
        first_release: FirstRelease;
      }

      export interface Alias {
        language: string;
        name: string;
      }

      export interface Status {
        id: number;
        name: string;
        recordType: string;
        keepUpdated: boolean;
      }

      export interface Trailer {
        id: number;
        name: string;
        url: string;
        language: string;
        runtime: number;
      }

      export interface Genre {
        id: number;
        name: string;
        slug: string;
      }

      export interface Release {
        country: string;
        date: string;
        detail: any;
      }

      export interface Artwork {
        id: number;
        image: string;
        thumbnail: string;
        language?: string;
        type: number;
        score: number;
        width: number;
        height: number;
        includesText: boolean;
      }

      export interface RemoteId {
        id: string;
        type: number;
        sourceName: string;
      }

      export interface Character {
        id: number;
        name?: string;
        peopleId: number;
        seriesId: any;
        series: any;
        movie: any;
        movieId: number;
        episodeId: any;
        type: number;
        image: string;
        sort: number;
        isFeatured: boolean;
        url: string;
        nameTranslations: any;
        overviewTranslations: any;
        aliases: any;
        peopleType: string;
        personName: string;
        tagOptions: any;
        personImgURL: string;
      }

      export interface Studio {
        id: number;
        name: string;
        parentStudio: any;
      }

      export interface TagOption {
        id: number;
        tag: number;
        tagName: string;
        name: string;
        helpText: any;
      }

      export interface List {
        id: number;
        name: string;
        overview: string;
        url: string;
        isOfficial: boolean;
        nameTranslations: string[];
        overviewTranslations: string[];
        aliases: Alias2[];
        score: number;
        image: string;
        imageIsFallback: boolean;
        remoteIds: any;
        tags: any;
      }

      export interface Alias2 {
        language: string;
        name: string;
      }

      export interface Translations {
        nameTranslations: NameTranslation[] | null;
        overviewTranslations: OverviewTranslation[] | null;
        aliases: string[];
      }

      export interface NameTranslation {
        name: string;
        language: string;
        tagline?: string;
        isPrimary?: boolean;
      }

      export interface OverviewTranslation {
        overview: string;
        tagline?: string;
        language: string;
        isPrimary?: boolean;
      }

      export interface ContentRating {
        id: number;
        name: string;
        country: string;
        description: string;
        contentType: string;
        order: number;
        fullname: string;
      }

      export interface Companies {
        studio: Studio2[];
        network: any[];
        production: Production[];
        distributor: any[];
        special_effects: any[];
      }

      export interface Studio2 {
        id: number;
        name: string;
        slug: string;
        nameTranslations: any;
        overviewTranslations: any;
        aliases: any;
        country: any;
        primaryCompanyType: number;
        activeDate: any;
        inactiveDate: any;
        companyType: CompanyType;
        parentCompany: ParentCompany;
        tagOptions: any;
      }

      export interface CompanyType {
        companyTypeId: number;
        companyTypeName: string;
      }

      export interface ParentCompany {
        id: any;
        name: any;
        relation: Relation;
      }

      export interface Relation {
        id: any;
        typeName: any;
      }

      export interface Production {
        id: number;
        name: string;
        slug: string;
        nameTranslations: any;
        overviewTranslations: any;
        aliases: any;
        country: any;
        primaryCompanyType: number;
        activeDate: any;
        inactiveDate: any;
        companyType: CompanyType2;
        parentCompany: ParentCompany2;
        tagOptions: any;
      }

      export interface CompanyType2 {
        companyTypeId: number;
        companyTypeName: string;
      }

      export interface ParentCompany2 {
        id?: number;
        name?: string;
        relation: Relation2;
      }

      export interface Relation2 {
        id: any;
        typeName: any;
      }

      export interface ProductionCountry {
        id: number;
        country: string;
        name: string;
      }

      export interface FirstRelease {
        country: string;
        date: string;
        detail: any;
      }
    }

    export namespace Short {
      export interface Root {
        status: string;
        data: Movie[];
        links: Links;
      }

      export interface Movie {
        id: number;
        name: string;
        slug: string;
        image?: string;
        nameTranslations: any;
        overviewTranslations: any;
        aliases: any;
        score: number;
        runtime: number;
        status: Status;
        lastUpdated: string;
        year?: string;
      }

      export interface Status {
        id: number;
        name: string;
        recordType: string;
        keepUpdated: boolean;
      }

      export interface Links {
        prev: any;
        self: string;
        next: string;
        total_items: number;
        page_size: number;
      }
    }
  }

  // Search Params
  export namespace Params {
    // export enum Company {
    // }

    // export enum ContentRating {
    // }

    export enum Country {
      Aruba = "abw",
      Afghanistan = "afg",
      Angola = "ago",
      Anguilla = "aia",
      AlandIslands = "ala", // from "Åland Islands"
      Albania = "alb",
      Andorra = "and",
      UnitedArabEmirates = "are",
      Argentina = "arg",
      Armenia = "arm",
      AmericanSamoa = "asm",
      Antarctica = "ata",
      FrenchSouthernTerritories = "atf",
      AntiguaAndBarbuda = "atg",
      Australia = "aus",
      Austria = "aut",
      Azerbaijan = "aze",
      Burundi = "bdi",
      Belgium = "bel",
      Benin = "ben",
      BonaireSintEustatiusAndSaba = "bes",
      BurkinaFaso = "bfa",
      Bangladesh = "bgd",
      Bulgaria = "bgr",
      Bahrain = "bhr",
      Bahamas = "bhs",
      BosniaAndHerzegovina = "bih",
      SaintBarthelemy = "blm", // from "Saint Barthélemy"
      Belarus = "blr",
      Belize = "blz",
      Bermuda = "bmu",
      Bolivia = "bol",
      Brazil = "bra",
      Barbados = "brb",
      BruneiDarussalam = "brn",
      Bhutan = "btn",
      BouvetIsland = "bvt",
      Botswana = "bwa",
      CentralAfricanRepublic = "caf",
      Canada = "can",
      CocosKeelingIslands = "cck", // from "Cocos (Keeling) Islands"
      Switzerland = "che",
      Chile = "chl",
      China = "chn",
      IvoryCoast = "civ",
      Cameroon = "cmr",
      Congo = "cod",
      RepublicOfTheCongo = "cog",
      CookIslands = "cok",
      Colombia = "col",
      Comoros = "com",
      CapeVerde = "cpv",
      CostaRica = "cri",
      Cuba = "cub",
      Curacao = "cuw", // from "Curaçao"
      ChristmasIsland = "cxr",
      CaymanIslands = "cym",
      Cyprus = "cyp",
      CzechRepublic = "cze",
      Germany = "deu",
      Djibouti = "dji",
      Dominica = "dma",
      Denmark = "dnk",
      DominicanRepublic = "dom",
      Algeria = "dza",
      Ecuador = "ecu",
      Egypt = "egy",
      Eritrea = "eri",
      WesternSahara = "esh",
      Spain = "esp",
      Estonia = "est",
      Ethiopia = "eth",
      Finland = "fin",
      Fiji = "fji",
      TheFalklandIslands = "flk",
      France = "fra",
      TheFaroeIslands = "fro",
      Micronesia = "fsm",
      Gabon = "gab",
      GreatBritain = "gbr",
      Georgia = "geo",
      Guernsey = "ggy",
      Ghana = "gha",
      Gibraltar = "gib",
      Guinea = "gin",
      Guadeloupe = "glp",
      Gambia = "gmb",
      GuineaBissau = "gnb",
      EquatorialGuinea = "gnq",
      Greece = "grc",
      Grenada = "grd",
      Greenland = "grl",
      Guatemala = "gtm",
      FrenchGuiana = "guf",
      Guam = "gum",
      Guyana = "guy",
      HongKong = "hkg",
      HeardIslandAndMcDonaldIslands = "hmd",
      Honduras = "hnd",
      Croatia = "hrv",
      Haiti = "hti",
      Hungary = "hun",
      Indonesia = "idn",
      IsleOfMan = "imn",
      India = "ind",
      BritishIndianOceanTerritory = "iot",
      Ireland = "irl",
      Iran = "irn",
      Iraq = "irq",
      Iceland = "isl",
      Israel = "isr",
      Italy = "ita",
      Jamaica = "jam",
      Jersey = "jey",
      Jordan = "jor",
      Japan = "jpn",
      Kazakhstan = "kaz",
      Kenya = "ken",
      Kyrgyzstan = "kgz",
      Cambodia = "khm",
      Kiribati = "kir",
      SaintChristopherAndNevis = "kna",
      SouthKorea = "kor",
      Kuwait = "kwt",
      Laos = "lao",
      Lebanon = "lbn",
      Liberia = "lbr",
      Libya = "lby",
      SaintLucia = "lca",
      Liechtenstein = "lie",
      SriLanka = "lka",
      Lesotho = "lso",
      Lithuania = "ltu",
      Luxembourg = "lux",
      Latvia = "lva",
      Macao = "mac",
      SaintMartin = "maf",
      Morocco = "mar",
      Monaco = "mco",
      Moldova = "mda",
      Madagascar = "mdg",
      Maldives = "mdv",
      Mexico = "mex",
      MarshallIslands = "mhl",
      Macedonia = "mkd",
      Mali = "mli",
      Malta = "mlt",
      Myanmar = "mmr",
      Montenegro = "mne",
      Mongolia = "mng",
      NorthernMarianaIslands = "mnp",
      Mozambique = "moz",
      Mauritania = "mrt",
      Montserrat = "msr",
      Martinique = "mtq",
      Mauritius = "mus",
      Malawi = "mwi",
      Malaysia = "mys",
      Mayotte = "myt",
      Namibia = "nam",
      NewCaledonia = "ncl",
      Niger = "ner",
      NorfolkIsland = "nfk",
      Nigeria = "nga",
      Nicaragua = "nic",
      Niue = "niu",
      TheNetherlands = "nld",
      Norway = "nor",
      Nepal = "npl",
      Nauru = "nru",
      NewZealand = "nzl",
      Oman = "omn",
      Pakistan = "pak",
      Panama = "pan",
      Pitcairn = "pcn",
      Peru = "per",
      Philippines = "phl",
      RepublicOfPalau = "plw",
      PapuaNewGuinea = "png",
      Poland = "pol",
      PuertoRico = "pri",
      NorthKorea = "prk",
      Portugal = "prt",
      Paraguay = "pry",
      PalestineStateOf = "pse",
      FrenchPolynesia = "pyf",
      Qatar = "qat",
      Reunion = "reu", // from "Réunion"
      Romania = "rou",
      Russia = "rus",
      Rwanda = "rwa",
      SaudiArabia = "sau",
      Sudan = "sdn",
      Senegal = "sen",
      Singapore = "sgp",
      SouthGeorgia = "sgs",
      SaintHelenaAscensionAndTristanDaCunha = "shn",
      SvalbardAndJanMayen = "sjm",
      SolomonIslands = "slb",
      SierraLeone = "sle",
      ElSalvador = "slv",
      SanMarino = "smr",
      SomaliRepublic = "som",
      SaintPierreAndMiquelon = "spm",
      Serbia = "srb",
      SouthSudan = "ssd",
      SaoTomeAndPrincipe = "stp", // from "São Tomé and Príncipe"
      Suriname = "sur",
      Slovakia = "svk",
      Slovenia = "svn",
      Sweden = "swe",
      Swaziland = "swz",
      SintMaarten = "sxm",
      Seychelles = "syc",
      SyrianArabRepublic = "syr",
      TurksAndCaicosIslands = "tca",
      Chad = "tcd",
      Togo = "tgo",
      Thailand = "tha",
      Tajikistan = "tjk",
      Tokelau = "tkl",
      Turkmenistan = "tkm",
      TimorLeste = "tls",
      Tonga = "ton",
      TrinidadAndTobago = "tto",
      Tunisia = "tun",
      Turkey = "tur",
      Tuvalu = "tuv",
      Taiwan = "twn",
      Tanzania = "tza",
      Uganda = "uga",
      Ukraine = "ukr",
      UnitedStatesMinorOutlyingIslands = "umi",
      Kosovo = "unk",
      Uruguay = "ury",
      UnitedStatesOfAmerica = "usa",
      Uzbekistan = "uzb",
      VaticanCity = "vat",
      SaintVincentAndTheGrenadines = "vct",
      Venezuela = "ven",
      BritishVirginIslands = "vgb",
      VirginIslandsOfTheUnitedStates = "vir",
      Vietnam = "vnm",
      Vanuatu = "vut",
      WallisAndFutuna = "wlf",
      Samoa = "wsm",
      Yemen = "yem",
      Yugoslavia = "yug",
      SouthAfrica = "zaf",
      Zambia = "zmb",
      Zimbabwe = "zwe",
    }

    export enum Genres {
      Soap = "1",
      ScienceFiction = "2",
      Reality = "3",
      News = "4",
      MiniSeries = "5",
      Horror = "6",
      HomeAndGarden = "7",
      GameShow = "8",
      Food = "9",
      Fantasy = "10",
      Family = "11",
      Drama = "12",
      Documentary = "13",
      Crime = "14",
      Comedy = "15",
      Children = "16",
      Animation = "17",
      Adventure = "18",
      Action = "19",
      Sport = "21",
      Suspense = "22",
      TalkShow = "23",
      Thriller = "24",
      Travel = "25",
      Western = "26",
      Anime = "27",
      Romance = "28",
      Musical = "29",
      Podcast = "30",
      Mystery = "31",
      Indie = "32",
      History = "33",
      War = "34",
      MartialArts = "35",
      AwardsShow = "36",
    }

    export enum Language {
      Afar = "aar",
      Abkhaz = "abk",
      Afrikaans = "afr",
      Akan = "aka",
      Amharic = "amh",
      Arabic = "ara",
      Aragonese = "arg",
      Assamese = "asm",
      Avaric = "ava",
      Avestan = "ave",
      Aymara = "aym",
      Azerbaijani = "aze",
      Bashkir = "bak",
      Bambara = "bam",
      Belarusian = "bel",
      Bengali = "ben",
      Bihari = "bih",
      Bislama = "bis",
      TibetanStandard = "bod",
      Bosnian = "bos",
      Breton = "bre",
      Bulgarian = "bul",
      Catalan = "cat",
      Czech = "ces",
      Chamorro = "cha",
      Chechen = "che",
      OldChurchSlavonic = "chu",
      Chuvash = "chv",
      Cornish = "cor",
      Corsican = "cos",
      Cree = "cre",
      Welsh = "cym",
      Danish = "dan",
      German = "deu",
      Divehi = "div",
      Dzongkha = "dzo",
      Greek = "ell",
      English = "eng",
      Esperanto = "epo",
      Estonian = "est",
      Basque = "eus",
      Ewe = "ewe",
      Faroese = "fao",
      Persian = "fas",
      Fijian = "fij",
      Finnish = "fin",
      French = "fra",
      WesternFrisian = "fry",
      Fula = "ful",
      ScottishGaelic = "gla",
      Irish = "gle",
      Galician = "glg",
      Manx = "glv",
      Guaraní = "grn",
      Gujarati = "guj",
      Haitian = "hat",
      Hausa = "hau",
      Hebrew = "heb",
      Herero = "her",
      Hindi = "hin",
      HiriMotu = "hmo",
      Croatian = "hrv",
      Hungarian = "hun",
      Armenian = "hye",
      Igbo = "ibo",
      Ido = "ido",
      Nuosu = "iii",
      Inuktitut = "iku",
      Interlingue = "ile",
      Interlingua = "ina",
      Indonesian = "ind",
      Inupiaq = "ipk",
      Icelandic = "isl",
      Italian = "ita",
      Javanese = "jav",
      Japanese = "jpn",
      Kalaallisut = "kal",
      Kannada = "kan",
      Kashmiri = "kas",
      Georgian = "kat",
      Kanuri = "kau",
      Kazakh = "kaz",
      Khmer = "khm",
      Kikuyu = "kik",
      Kinyarwanda = "kin",
      Kirghiz = "kir",
      Komi = "kom",
      Kongo = "kon",
      Korean = "kor",
      Kwanyama = "kua",
      Kurdish = "kur",
      Lao = "lao",
      Latin = "lat",
      Latvian = "lav",
      Limburgish = "lim",
      Lingala = "lin",
      Lithuanian = "lit",
      Luxembourgish = "ltz",
      LubaKatanga = "lub",
      Luganda = "lug",
      Marshallese = "mah",
      Malayalam = "mal",
      Marathi = "mar",
      Macedonian = "mkd",
      Malagasy = "mlg",
      Maltese = "mlt",
      Mongolian = "mon",
      Māori = "mri",
      Malay = "msa",
      Burmese = "mya",
      Nauru = "nau",
      Navajo = "nav",
      SouthNdebele = "nbl",
      NorthNdebele = "nde",
      Ndonga = "ndo",
      Nepali = "nep",
      Dutch = "nld",
      Norwegian = "nor",
      Chewa = "nya",
      Occitan = "oci",
      Ojibwe = "oji",
      Oriya = "ori",
      Oromo = "orm",
      Ossetian = "oss",
      Panjabi = "pan",
      Pāli = "pli",
      Polish = "pol",
      PortuguesePortugal = "por",
      PortugueseBrazil = "pt",
      Pashto = "pus",
      Quechua = "que",
      Romansh = "roh",
      Romanian = "ron",
      Kirundi = "run",
      Russian = "rus",
      Sango = "sag",
      Sanskrit = "san",
      Sinhala = "sin",
      Slovak = "slk",
      Slovene = "slv",
      NorthernSami = "sme",
      Samoan = "smo",
      Shona = "sna",
      Sindhi = "snd",
      Somali = "som",
      SouthernSotho = "sot",
      Spanish = "spa",
      Albanian = "sqi",
      Sardinian = "srd",
      Serbian = "srp",
      Swati = "ssw",
      Sundanese = "sun",
      Swahili = "swa",
      Swedish = "swe",
      Tahitian = "tah",
      Tamil = "tam",
      Tatar = "tat",
      Telugu = "tel",
      Tajik = "tgk",
      Tagalog = "tgl",
      Thai = "tha",
      Tigrinya = "tir",
      Tonga = "ton",
      Tswana = "tsn",
      Tsonga = "tso",
      Turkmen = "tuk",
      Turkish = "tur",
      Twi = "twi",
      Uighur = "uig",
      Ukrainian = "ukr",
      Urdu = "urd",
      Uzbek = "uzb",
      Venda = "ven",
      Vietnamese = "vie",
      Volapük = "vol",
      Walloon = "wln",
      Wolof = "wol",
      Xhosa = "xho",
      Yiddish = "yid",
      Yoruba = "yor",
      ChineseCantonese = "yue",
      Zhuang = "zha",
      ChineseChina = "zho",
      ChineseTaiwan = "zhtw",
      Zulu = "zul",
    }

    export enum Sort {
      score = "score",
      firstAired = "firstAired",
      lastAired = "lastAired", // series only
      name = "name",
    }

    export enum SortType {
      desc = "desc",
      asc = "asc",
    }

    export enum Status {
      Continuing = "1",
      Ended = "2",
      Upcoming = "3",
    }

    // export enum Year {
    // }

    // For extended
    export enum Meta {
      translations = "translations",
      episodes = "episodes", // series only
    }
  }
}
