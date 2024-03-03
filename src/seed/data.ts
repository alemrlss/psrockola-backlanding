// seed.js

import { stat } from "fs";

export const countries = [
  {
    name: "Afghanistan",
    isoCode: "AF",
    phoneCode: "+93",
  },
  {
    name: "Albania",
    isoCode: "AL",
    phoneCode: "+355",
  },
  {
    name: "Algeria",
    isoCode: "DZ",
    phoneCode: "+213",
  },
  {
    name: "American Samoa",
    isoCode: "AS",
    phoneCode: "+1684",
  },
  {
    name: "Andorra",
    isoCode: "AD",
    phoneCode: "+376",
  },
  {
    name: "Angola",
    isoCode: "AO",
    phoneCode: "+244",
  },
  {
    name: "Anguilla",
    isoCode: "AI",
    phoneCode: "+1264",
  },
  {
    name: "Antarctica",
    isoCode: "AQ",
    phoneCode: "+0",
  },
  {
    name: "Antigua And Barbuda",
    isoCode: "AG",
    phoneCode: "+1268",
  },
  {
    name: "Argentina",
    isoCode: "AR",
    phoneCode: "+54",
  },
  {
    name: "Armenia",
    isoCode: "AM",
    phoneCode: "+374",
  },
  {
    name: "Aruba",
    isoCode: "AW",
    phoneCode: "+297",
  },
  {
    name: "Australia",
    isoCode: "AU",
    phoneCode: "+61",
  },
  {
    name: "Austria",
    isoCode: "AT",
    phoneCode: "+43",
  },
  {
    name: "Azerbaijan",
    isoCode: "AZ",
    phoneCode: "+994",
  },
  {
    name: "Bahamas The",
    isoCode: "BS",
    phoneCode: "+1242",
  },
  {
    name: "Bahrain",
    isoCode: "BH",
    phoneCode: "+973",
  },
  {
    name: "Bangladesh",
    isoCode: "BD",
    phoneCode: "+880",
  },
  {
    name: "Barbados",
    isoCode: "BB",
    phoneCode: "+1246",
  },
  {
    name: "Belarus",
    isoCode: "BY",
    phoneCode: "+375",
  },
  {
    name: "Belgium",
    isoCode: "BE",
    phoneCode: "+32",
  },
  {
    name: "Belize",
    isoCode: "BZ",
    phoneCode: "+501",
  },
  {
    name: "Benin",
    isoCode: "BJ",
    phoneCode: "+229",
  },
  {
    name: "Bermuda",
    isoCode: "BM",
    phoneCode: "+1441",
  },
  {
    name: "Bhutan",
    isoCode: "BT",
    phoneCode: "+975",
  },
  {
    name: "Bolivia",
    isoCode: "BO",
    phoneCode: "+591",
  },
  {
    name: "Bosnia and Herzegovina",
    isoCode: "BA",
    phoneCode: "+387",
  },
  {
    name: "Botswana",
    isoCode: "BW",
    phoneCode: "+267",
  },
  {
    name: "Bouvet Island",
    isoCode: "BV",
    phoneCode: "+0",
  },
  {
    name: "Brazil",
    isoCode: "BR",
    phoneCode: "+55",
  },
  {
    name: "British Indian Ocean Territory",
    isoCode: "IO",
    phoneCode: "+246",
  },
  {
    name: "Brunei",
    isoCode: "BN",
    phoneCode: "+673",
  },
  {
    name: "Bulgaria",
    isoCode: "BG",
    phoneCode: "+359",
  },
  {
    name: "Burkina Faso",
    isoCode: "BF",
    phoneCode: "+226",
  },
  {
    name: "Burundi",
    isoCode: "BI",
    phoneCode: "+257",
  },
  {
    name: "Cambodia",
    isoCode: "KH",
    phoneCode: "+855",
  },
  {
    name: "Cameroon",
    isoCode: "CM",
    phoneCode: "+237",
  },
  {
    name: "Canada",
    isoCode: "CA",
    phoneCode: "+1",
  },
  {
    name: "Cape Verde",
    isoCode: "CV",
    phoneCode: "+238",
  },
  {
    name: "Cayman Islands",
    isoCode: "KY",
    phoneCode: "+1345",
  },
  {
    name: "Central African Republic",
    isoCode: "CF",
    phoneCode: "+236",
  },
  {
    name: "Chad",
    isoCode: "TD",
    phoneCode: "+235",
  },
  {
    name: "Chile",
    isoCode: "CL",
    phoneCode: "+56",
  },
  {
    name: "China",
    isoCode: "CN",
    phoneCode: "+86",
  },
  {
    name: "Christmas Island",
    isoCode: "CX",
    phoneCode: "+61",
  },
  {
    name: "Cocos (Keeling) Islands",
    isoCode: "CC",
    phoneCode: "+672",
  },
  {
    name: "Colombia",
    isoCode: "CO",
    phoneCode: "+57",
  },
  {
    name: "Comoros",
    isoCode: "KM",
    phoneCode: "+269",
  },
  {
    name: "Cook Islands",
    isoCode: "CK",
    phoneCode: "+682",
  },
  {
    name: "Costa Rica",
    isoCode: "CR",
    phoneCode: "+506",
  },
  {
    name: "Cote D'Ivoire (Ivory Coast)",
    isoCode: "CI",
    phoneCode: "+225",
  },
  {
    name: "Croatia (Hrvatska)",
    isoCode: "HR",
    phoneCode: "+385",
  },
  {
    name: "Cuba",
    isoCode: "CU",
    phoneCode: "+53",
  },
  {
    name: "Cyprus",
    isoCode: "CY",
    phoneCode: "+357",
  },
  {
    name: "Czech Republic",
    isoCode: "CZ",
    phoneCode: "+420",
  },
  {
    name: "Democratic Republic Of The Congo",
    isoCode: "CD",
    phoneCode: "+243",
  },
  {
    name: "Denmark",
    isoCode: "DK",
    phoneCode: "+45",
  },
  {
    name: "Djibouti",
    isoCode: "DJ",
    phoneCode: "+253",
  },
  {
    name: "Dominica",
    isoCode: "DM",
    phoneCode: "+1767",
  },
  {
    name: "Dominican Republic",
    isoCode: "DO",
    phoneCode: "+1809",
  },
  {
    name: "East Timor",
    isoCode: "TP",
    phoneCode: "+670",
  },
  {
    name: "Ecuador",
    isoCode: "EC",
    phoneCode: "+593",
  },
  {
    name: "Egypt",
    isoCode: "EG",
    phoneCode: "+20",
  },
  {
    name: "El Salvador",
    isoCode: "SV",
    phoneCode: "+503",
  },
  {
    name: "Equatorial Guinea",
    isoCode: "GQ",
    phoneCode: "+240",
  },
  {
    name: "Eritrea",
    isoCode: "ER",
    phoneCode: "+291",
  },
  {
    name: "Estonia",
    isoCode: "EE",
    phoneCode: "+372",
  },
  {
    name: "Ethiopia",
    isoCode: "ET",
    phoneCode: "+251",
  },
  {
    name: "Falkland Islands",
    isoCode: "FK",
    phoneCode: "+500",
  },
  {
    name: "Faroe Islands",
    isoCode: "FO",
    phoneCode: "+298",
  },
  {
    name: "Fiji Islands",
    isoCode: "FJ",
    phoneCode: "+679",
  },
  {
    name: "Finland",
    isoCode: "FI",
    phoneCode: "+358",
  },
  {
    name: "France",
    isoCode: "FR",
    phoneCode: "+33",
  },
  {
    name: "French Guiana",
    isoCode: "GF",
    phoneCode: "+594",
  },
  {
    name: "French Polynesia",
    isoCode: "PF",
    phoneCode: "+689",
  },
  {
    name: "French Southern Territories",
    isoCode: "TF",
    phoneCode: "+0",
  },
  {
    name: "Gabon",
    isoCode: "GA",
    phoneCode: "+241",
  },
  {
    name: "Gambia The",
    isoCode: "GM",
    phoneCode: "+220",
  },
  {
    name: "Georgia",
    isoCode: "GE",
    phoneCode: "+995",
  },
  {
    name: "Germany",
    isoCode: "DE",
    phoneCode: "+49",
  },
  {
    name: "Ghana",
    isoCode: "GH",
    phoneCode: "+233",
  },
  {
    name: "Gibraltar",
    isoCode: "GI",
    phoneCode: "+350",
  },
  {
    name: "Greece",
    isoCode: "GR",
    phoneCode: "+30",
  },
  {
    name: "Greenland",
    isoCode: "GL",
    phoneCode: "+299",
  },
  {
    name: "Grenada",
    isoCode: "GD",
    phoneCode: "+1473",
  },
  {
    name: "Guadeloupe",
    isoCode: "GP",
    phoneCode: "+590",
  },
  {
    name: "Guam",
    isoCode: "GU",
    phoneCode: "+1671",
  },
  {
    name: "Guatemala",
    isoCode: "GT",
    phoneCode: "+502",
  },
  {
    name: "Guernsey and Alderney",
    isoCode: "XU",
    phoneCode: "+44",
  },
  {
    name: "Guinea",
    isoCode: "GN",
    phoneCode: "+224",
  },
  {
    name: "Guinea-Bissau",
    isoCode: "GW",
    phoneCode: "+245",
  },
  {
    name: "Guyana",
    isoCode: "GY",
    phoneCode: "+592",
  },
  {
    name: "Haiti",
    isoCode: "HT",
    phoneCode: "+509",
  },
  {
    name: "Heard and McDonald Islands",
    isoCode: "HM",
    phoneCode: "+0",
  },
  {
    name: "Honduras",
    isoCode: "HN",
    phoneCode: "+504",
  },
  {
    name: "Hong Kong S.A.R.",
    isoCode: "HK",
    phoneCode: "+852",
  },
  {
    name: "Hungary",
    isoCode: "HU",
    phoneCode: "+36",
  },
  {
    name: "Iceland",
    isoCode: "IS",
    phoneCode: "+354",
  },
  {
    name: "India",
    isoCode: "IN",
    phoneCode: "+91",
  },
  {
    name: "Indonesia",
    isoCode: "ID",
    phoneCode: "+62",
  },
  {
    name: "Iran",
    isoCode: "IR",
    phoneCode: "+98",
  },
  {
    name: "Iraq",
    isoCode: "IQ",
    phoneCode: "+964",
  },
  {
    name: "Ireland",
    isoCode: "IE",
    phoneCode: "+353",
  },
  {
    name: "Israel",
    isoCode: "IL",
    phoneCode: "+972",
  },
  {
    name: "Italy",
    isoCode: "IT",
    phoneCode: "+39",
  },
  {
    name: "Jamaica",
    isoCode: "JM",
    phoneCode: "+1876",
  },
  {
    name: "Japan",
    isoCode: "JP",
    phoneCode: "+81",
  },
  {
    name: "Jersey",
    isoCode: "XJ",
    phoneCode: "+44",
  },
  {
    name: "Jordan",
    isoCode: "JO",
    phoneCode: "+962",
  },
  {
    name: "Kazakhstan",
    isoCode: "KZ",
    phoneCode: "+7",
  },
  {
    name: "Kenya",
    isoCode: "KE",
    phoneCode: "+254",
  },
  {
    name: "Kiribati",
    isoCode: "KI",
    phoneCode: "+686",
  },
  {
    name: "Korea North",
    isoCode: "KP",
    phoneCode: "+850",
  },
  {
    name: "Korea South",
    isoCode: "KR",
    phoneCode: "+82",
  },
  {
    name: "Kuwait",
    isoCode: "KW",
    phoneCode: "+965",
  },
  {
    name: "Kyrgyzstan",
    isoCode: "KG",
    phoneCode: "+996",
  },
  {
    name: "Laos",
    isoCode: "LA",
    phoneCode: "+856",
  },
  {
    name: "Latvia",
    isoCode: "LV",
    phoneCode: "+371",
  },
  {
    name: "Lebanon",
    isoCode: "LB",
    phoneCode: "+961",
  },
  {
    name: "Lesotho",
    isoCode: "LS",
    phoneCode: "+266",
  },
  {
    name: "Liberia",
    isoCode: "LR",
    phoneCode: "+231",
  },
  {
    name: "Libya",
    isoCode: "LY",
    phoneCode: "+218",
  },
  {
    name: "Liechtenstein",
    isoCode: "LI",
    phoneCode: "+423",
  },
  {
    name: "Lithuania",
    isoCode: "LT",
    phoneCode: "+370",
  },
  {
    name: "Luxembourg",
    isoCode: "LU",
    phoneCode: "+352",
  },
  {
    name: "Macau S.A.R.",
    isoCode: "MO",
    phoneCode: "+853",
  },
  {
    name: "Macedonia",
    isoCode: "MK",
    phoneCode: "+389",
  },
  {
    name: "Madagascar",
    isoCode: "MG",
    phoneCode: "+261",
  },
  {
    name: "Malawi",
    isoCode: "MW",
    phoneCode: "+265",
  },
  {
    name: "Malaysia",
    isoCode: "MY",
    phoneCode: "+60",
  },
  {
    name: "Maldives",
    isoCode: "MV",
    phoneCode: "+960",
  },
  {
    name: "Mali",
    isoCode: "ML",
    phoneCode: "+223",
  },
  {
    name: "Malta",
    isoCode: "MT",
    phoneCode: "+356",
  },
  {
    name: "Man (Isle of)",
    isoCode: "XM",
    phoneCode: "+44",
  },
  {
    name: "Marshall Islands",
    isoCode: "MH",
    phoneCode: "+692",
  },
  {
    name: "Martinique",
    isoCode: "MQ",
    phoneCode: "+596",
  },
  {
    name: "Mauritania",
    isoCode: "MR",
    phoneCode: "+222",
  },
  {
    name: "Mauritius",
    isoCode: "MU",
    phoneCode: "+230",
  },
  {
    name: "Mayotte",
    isoCode: "YT",
    phoneCode: "+269",
  },
  {
    name: "Mexico",
    isoCode: "MX",
    phoneCode: "+52",
  },
  {
    name: "Micronesia",
    isoCode: "FM",
    phoneCode: "+691",
  },
  {
    name: "Moldova",
    isoCode: "MD",
    phoneCode: "+373",
  },
  {
    name: "Monaco",
    isoCode: "MC",
    phoneCode: "+377",
  },
  {
    name: "Mongolia",
    isoCode: "MN",
    phoneCode: "+976",
  },
  {
    name: "Montserrat",
    isoCode: "MS",
    phoneCode: "+1664",
  },
  {
    name: "Morocco",
    isoCode: "MA",
    phoneCode: "+212",
  },
  {
    name: "Mozambique",
    isoCode: "MZ",
    phoneCode: "+258",
  },
  {
    name: "Myanmar",
    isoCode: "MM",
    phoneCode: "+95",
  },
  {
    name: "Namibia",
    isoCode: "NA",
    phoneCode: "+264",
  },
  {
    name: "Nauru",
    isoCode: "NR",
    phoneCode: "+674",
  },
  {
    name: "Nepal",
    isoCode: "NP",
    phoneCode: "+977",
  },
  {
    name: "Netherlands Antilles",
    isoCode: "AN",
    phoneCode: "+599",
  },
  {
    name: "Netherlands The",
    isoCode: "NL",
    phoneCode: "+31",
  },
  {
    name: "New Caledonia",
    isoCode: "NC",
    phoneCode: "+687",
  },
  {
    name: "New Zealand",
    isoCode: "NZ",
    phoneCode: "+64",
  },
  {
    name: "Nicaragua",
    isoCode: "NI",
    phoneCode: "+505",
  },
  {
    name: "Niger",
    isoCode: "NE",
    phoneCode: "+227",
  },
  {
    name: "Nigeria",
    isoCode: "NG",
    phoneCode: "+234",
  },
  {
    name: "Niue",
    isoCode: "NU",
    phoneCode: "+683",
  },
  {
    name: "Norfolk Island",
    isoCode: "NF",
    phoneCode: "+672",
  },
  {
    name: "Northern Mariana Islands",
    isoCode: "MP",
    phoneCode: "+1670",
  },
  {
    name: "Norway",
    isoCode: "NO",
    phoneCode: "+47",
  },
  {
    name: "Oman",
    isoCode: "OM",
    phoneCode: "+968",
  },
  {
    name: "Pakistan",
    isoCode: "PK",
    phoneCode: "+92",
  },
  {
    name: "Palau",
    isoCode: "PW",
    phoneCode: "+680",
  },
  {
    name: "Palestinian Territory Occupied",
    isoCode: "PS",
    phoneCode: "+970",
  },
  {
    name: "Panama",
    isoCode: "PA",
    phoneCode: "+507",
  },
  {
    name: "Papua new Guinea",
    isoCode: "PG",
    phoneCode: "+675",
  },
  {
    name: "Paraguay",
    isoCode: "PY",
    phoneCode: "+595",
  },
  {
    name: "Peru",
    isoCode: "PE",
    phoneCode: "+51",
  },
  {
    name: "Philippines",
    isoCode: "PH",
    phoneCode: "+63",
  },
  {
    name: "Pitcairn Island",
    isoCode: "PN",
    phoneCode: "+0",
  },
  {
    name: "Poland",
    isoCode: "PL",
    phoneCode: "+48",
  },
  {
    name: "Portugal",
    isoCode: "PT",
    phoneCode: "+351",
  },
  {
    name: "Puerto Rico",
    isoCode: "PR",
    phoneCode: "+1787",
  },
  {
    name: "Qatar",
    isoCode: "QA",
    phoneCode: "+974",
  },
  {
    name: "Republic Of The Congo",
    isoCode: "CG",
    phoneCode: "+242",
  },
  {
    name: "Reunion",
    isoCode: "RE",
    phoneCode: "+262",
  },
  {
    name: "Romania",
    isoCode: "RO",
    phoneCode: "+40",
  },
  {
    name: "Russia",
    isoCode: "RU",
    phoneCode: "+70",
  },
  {
    name: "Rwanda",
    isoCode: "RW",
    phoneCode: "+250",
  },
  {
    name: "Saint Helena",
    isoCode: "SH",
    phoneCode: "+290",
  },
  {
    name: "Saint Kitts And Nevis",
    isoCode: "KN",
    phoneCode: "+1869",
  },
  {
    name: "Saint Lucia",
    isoCode: "LC",
    phoneCode: "+1758",
  },
  {
    name: "Saint Pierre and Miquelon",
    isoCode: "PM",
    phoneCode: "+508",
  },
  {
    name: "Saint Vincent And The Grenadines",
    isoCode: "VC",
    phoneCode: "+1784",
  },
  {
    name: "Samoa",
    isoCode: "WS",
    phoneCode: "+684",
  },
  {
    name: "San Marino",
    isoCode: "SM",
    phoneCode: "+378",
  },
  {
    name: "Sao Tome and Principe",
    isoCode: "ST",
    phoneCode: "+239",
  },
  {
    name: "Saudi Arabia",
    isoCode: "SA",
    phoneCode: "+966",
  },
  {
    name: "Senegal",
    isoCode: "SN",
    phoneCode: "+221",
  },
  {
    name: "Serbia",
    isoCode: "RS",
    phoneCode: "+381",
  },
  {
    name: "Seychelles",
    isoCode: "SC",
    phoneCode: "+248",
  },
  {
    name: "Sierra Leone",
    isoCode: "SL",
    phoneCode: "+232",
  },
  {
    name: "Singapore",
    isoCode: "SG",
    phoneCode: "+65",
  },
  {
    name: "Slovakia",
    isoCode: "SK",
    phoneCode: "+421",
  },
  {
    name: "Slovenia",
    isoCode: "SI",
    phoneCode: "+386",
  },
  {
    name: "Smaller Territories of the UK",
    isoCode: "XG",
    phoneCode: "+44",
  },
  {
    name: "Solomon Islands",
    isoCode: "SB",
    phoneCode: "+677",
  },
  {
    name: "Somalia",
    isoCode: "SO",
    phoneCode: "+252",
  },
  {
    name: "South Africa",
    isoCode: "ZA",
    phoneCode: "+27",
  },
  {
    name: "South Georgia",
    isoCode: "GS",
    phoneCode: "+0",
  },
  {
    name: "South Sudan",
    isoCode: "SS",
    phoneCode: "+211",
  },
  {
    name: "Spain",
    isoCode: "ES",
    phoneCode: "+34",
  },
  {
    name: "Sri Lanka",
    isoCode: "LK",
    phoneCode: "+94",
  },
  {
    name: "Sudan",
    isoCode: "SD",
    phoneCode: "+249",
  },
  {
    name: "Suriname",
    isoCode: "SR",
    phoneCode: "+597",
  },
  {
    name: "Svalbard And Jan Mayen Islands",
    isoCode: "SJ",
    phoneCode: "+47",
  },
  {
    name: "Swaziland",
    isoCode: "SZ",
    phoneCode: "+268",
  },
  {
    name: "Sweden",
    isoCode: "SE",
    phoneCode: "+46",
  },
  {
    name: "Switzerland",
    isoCode: "CH",
    phoneCode: "+41",
  },
  {
    name: "Syria",
    isoCode: "SY",
    phoneCode: "+963",
  },
  {
    name: "Taiwan",
    isoCode: "TW",
    phoneCode: "+886",
  },
  {
    name: "Tajikistan",
    isoCode: "TJ",
    phoneCode: "+992",
  },
  {
    name: "Tanzania",
    isoCode: "TZ",
    phoneCode: "+255",
  },
  {
    name: "Thailand",
    isoCode: "TH",
    phoneCode: "+66",
  },
  {
    name: "Togo",
    isoCode: "TG",
    phoneCode: "+228",
  },
  {
    name: "Tokelau",
    isoCode: "TK",
    phoneCode: "+690",
  },
  {
    name: "Tonga",
    isoCode: "TO",
    phoneCode: "+676",
  },
  {
    name: "Trinidad And Tobago",
    isoCode: "TT",
    phoneCode: "+1868",
  },
  {
    name: "Tunisia",
    isoCode: "TN",
    phoneCode: "+216",
  },
  {
    name: "Turkey",
    isoCode: "TR",
    phoneCode: "+90",
  },
  {
    name: "Turkmenistan",
    isoCode: "TM",
    phoneCode: "+7370",
  },
  {
    name: "Turks And Caicos Islands",
    isoCode: "TC",
    phoneCode: "+1649",
  },
  {
    name: "Tuvalu",
    isoCode: "TV",
    phoneCode: "+688",
  },
  {
    name: "Uganda",
    isoCode: "UG",
    phoneCode: "+256",
  },
  {
    name: "Ukraine",
    isoCode: "UA",
    phoneCode: "+380",
  },
  {
    name: "United Arab Emirates",
    isoCode: "AE",
    phoneCode: "+971",
  },
  {
    name: "United Kingdom",
    isoCode: "GB",
    phoneCode: "+44",
  },
  {
    name: "United States",
    isoCode: "US",
    phoneCode: "+1",
  },
  {
    name: "United States Minor Outlying Islands",
    isoCode: "UM",
    phoneCode: "+1",
  },
  {
    name: "Uruguay",
    isoCode: "UY",
    phoneCode: "+598",
  },
  {
    name: "Uzbekistan",
    isoCode: "UZ",
    phoneCode: "+998",
  },
  {
    name: "Vanuatu",
    isoCode: "VU",
    phoneCode: "+678",
  },
  {
    name: "Vatican City State (Holy See)",
    isoCode: "VA",
    phoneCode: "+39",
  },
  {
    name: "Venezuela",
    isoCode: "VE",
    phoneCode: "+58",
  },
  {
    name: "Vietnam",
    isoCode: "VN",
    phoneCode: "+84",
  },
  {
    name: "Virgin Islands (British)",
    isoCode: "VG",
    phoneCode: "+1284",
  },
  {
    name: "Virgin Islands (US)",
    isoCode: "VI",
    phoneCode: "+1340",
  },
  {
    name: "Wallis And Futuna Islands",
    isoCode: "WF",
    phoneCode: "+681",
  },
  {
    name: "Western Sahara",
    isoCode: "EH",
    phoneCode: "+212",
  },
  {
    name: "Yemen",
    isoCode: "YE",
    phoneCode: "+967",
  },
  {
    name: "Yugoslavia",
    isoCode: "YU",
    phoneCode: "+38",
  },
  {
    name: "Zambia",
    isoCode: "ZM",
    phoneCode: "+260",
  },
  {
    name: "Zimbabwe",
    isoCode: "ZW",
    phoneCode: "+263",
  },
];

const indexVenezuela = countries.findIndex(
  (country) => country.isoCode === "VE"
);
const indexEcuador = countries.findIndex((country) => country.isoCode === "EC");
const indexNicaragua = countries.findIndex(
  (country) => country.isoCode === "NI"
);
const indexUnitedStates = countries.findIndex(
  (country) => country.isoCode === "US"
);
export const states = [
  {
    name: "Amazonas",
    country: countries[indexVenezuela],
  },
  {
    name: "Anzoategui",
    country: countries[indexVenezuela],
  },
  {
    name: "Apure",
    country: countries[indexVenezuela],
  },
  {
    name: "Aragua",
    country: countries[indexVenezuela],
  },
  {
    name: "Barinas",
    country: countries[indexVenezuela],
  },
  {
    name: "Bolivar",
    country: countries[indexVenezuela],
  },
  {
    name: "Carabobo",
    country: countries[indexVenezuela],
  },
  {
    name: "Cojedes",
    country: countries[indexVenezuela],
  },
  {
    name: "Delta Amacuro",
    country: countries[indexVenezuela],
  },
  {
    name: "Distrito Federal",
    country: countries[indexVenezuela],
  },
  {
    name: "Falcon",
    country: countries[indexVenezuela],
  },
  {
    name: "Guarico",
    country: countries[indexVenezuela],
  },
  {
    name: "Lara",
    country: countries[indexVenezuela],
  },
  {
    name: "Merida",
    country: countries[indexVenezuela],
  },
  {
    name: "Miranda",
    country: countries[indexVenezuela],
  },
  {
    name: "Monagas",
    country: countries[indexVenezuela],
  },
  {
    name: "Nueva Esparta",
    country: countries[indexVenezuela],
  },
  {
    name: "Portuguesa",
    country: countries[indexVenezuela],
  },
  {
    name: "Sucre",
    country: countries[indexVenezuela],
  },
  {
    name: "Tachira",
    country: countries[indexVenezuela],
  },
  {
    name: "Trujillo",
    country: countries[indexVenezuela],
  },
  {
    name: "Vargas",
    country: countries[indexVenezuela],
  },
  {
    name: "Yaracuy",
    country: countries[indexVenezuela],
  },
  {
    name: "Zulia",
    country: countries[indexVenezuela],
  },

  {
    name: "Azuay",
    country: countries[indexEcuador],
  },
  {
    name: "Bolivar",
    country: countries[indexEcuador],
  },
  {
    name: "Canar",
    country: countries[indexEcuador],
  },
  {
    name: "Carchi",
    country: countries[indexEcuador],
  },
  {
    name: "Chimborazo",
    country: countries[indexEcuador],
  },
  {
    name: "Cotopaxi",
    country: countries[indexEcuador],
  },
  {
    name: "El Oro",
    country: countries[indexEcuador],
  },
  {
    name: "Esmeraldas",
    country: countries[indexEcuador],
  },
  {
    name: "Galapagos",
    country: countries[indexEcuador],
  },
  {
    name: "Guayas",
    country: countries[indexEcuador],
  },
  {
    name: "Imbabura",
    country: countries[indexEcuador],
  },
  {
    name: "Loja",
    country: countries[indexEcuador],
  },
  {
    name: "Los Rios",
    country: countries[indexEcuador],
  },
  {
    name: "Manabi",
    country: countries[indexEcuador],
  },
  {
    name: "Morona Santiago",
    country: countries[indexEcuador],
  },
  {
    name: "Napo",
    country: countries[indexEcuador],
  },
  {
    name: "Orellana",
    country: countries[indexEcuador],
  },
  {
    name: "Pastaza",
    country: countries[indexEcuador],
  },
  {
    name: "Pichincha",
    country: countries[indexEcuador],
  },
  {
    name: "Sucumbios",
    country: countries[indexEcuador],
  },
  {
    name: "Tungurahua",
    country: countries[indexEcuador],
  },
  {
    name: "Zamora Chinchipe",
    country: countries[indexEcuador],
  },

  {
    name: "Atlantico Norte",
    country: countries[indexNicaragua],
  },
  {
    name: "Atlantico Sur",
    country: countries[indexNicaragua],
  },
  {
    name: "Boaco",
    country: countries[indexNicaragua],
  },
  {
    name: "Carazo",
    country: countries[indexNicaragua],
  },
  {
    name: "Chinandega",
    country: countries[indexNicaragua],
  },
  {
    name: "Chontales",
    country: countries[indexNicaragua],
  },
  {
    name: "Esteli",
    country: countries[indexNicaragua],
  },
  {
    name: "Granada",
    country: countries[indexNicaragua],
  },
  {
    name: "Jinotega",
    country: countries[indexNicaragua],
  },
  {
    name: "Leon",
    country: countries[indexNicaragua],
  },
  {
    name: "Madriz",
    country: countries[indexNicaragua],
  },
  {
    name: "Managua",
    country: countries[indexNicaragua],
  },
  {
    name: "Masaya",
    country: countries[indexNicaragua],
  },
  {
    name: "Matagalpa",
    country: countries[indexNicaragua],
  },
  {
    name: "Nueva Segovia",
    country: countries[indexNicaragua],
  },
  {
    name: "Rio San Juan",
    country: countries[indexNicaragua],
  },
  {
    name: "Rivas",
    country: countries[indexNicaragua],
  },

  {
    name: "Alabama",
    country: countries[indexUnitedStates],
  },
  {
    name: "Alaska",
    country: countries[indexUnitedStates],
  },
  {
    name: "Arizona",
    country: countries[indexUnitedStates],
  },
  {
    name: "Arkansas",
    country: countries[indexUnitedStates],
  },
  {
    name: "California",
    country: countries[indexUnitedStates],
  },
  {
    name: "Colorado",
    country: countries[indexUnitedStates],
  },
  {
    name: "Connecticut",
    country: countries[indexUnitedStates],
  },
  {
    name: "Delaware",
    country: countries[indexUnitedStates],
  },
  {
    name: "District of Columbia",
    country: countries[indexUnitedStates],
  },
  {
    name: "Florida",
    country: countries[indexUnitedStates],
  },
  {
    name: "Georgia",
    country: countries[indexUnitedStates],
  },
  {
    name: "Hawaii",
    country: countries[indexUnitedStates],
  },
  {
    name: "Idaho",
    country: countries[indexUnitedStates],
  },
  {
    name: "Illinois",
    country: countries[indexUnitedStates],
  },
  {
    name: "Indiana",
    country: countries[indexUnitedStates],
  },
  {
    name: "Iowa",
    country: countries[indexUnitedStates],
  },
  {
    name: "Kansas",
    country: countries[indexUnitedStates],
  },
  {
    name: "Kentucky",
    country: countries[indexUnitedStates],
  },
  {
    name: "Louisiana",
    country: countries[indexUnitedStates],
  },
  {
    name: "Maine",
    country: countries[indexUnitedStates],
  },
  {
    name: "Maryland",
    country: countries[indexUnitedStates],
  },
  {
    name: "Massachusetts",
    country: countries[indexUnitedStates],
  },
  {
    name: "Michigan",
    country: countries[indexUnitedStates],
  },
  {
    name: "Minnesota",
    country: countries[indexUnitedStates],
  },
  {
    name: "Mississippi",
    country: countries[indexUnitedStates],
  },
  {
    name: "Missouri",
    country: countries[indexUnitedStates],
  },
  {
    name: "Montana",
    country: countries[indexUnitedStates],
  },
  {
    name: "Nebraska",
    country: countries[indexUnitedStates],
  },
  {
    name: "Nevada",
    country: countries[indexUnitedStates],
  },
  {
    name: "New Hampshire",
    country: countries[indexUnitedStates],
  },
  {
    name: "New Jersey",
    country: countries[indexUnitedStates],
  },
  {
    name: "New Mexico",
    country: countries[indexUnitedStates],
  },
  {
    name: "New York",
    country: countries[indexUnitedStates],
  },
  {
    name: "North Carolina",
    country: countries[indexUnitedStates],
  },
  {
    name: "North Dakota",
    country: countries[indexUnitedStates],
  },
  {
    name: "Ohio",
    country: countries[indexUnitedStates],
  },
  {
    name: "Oklahoma",
    country: countries[indexUnitedStates],
  },
  {
    name: "Ontario",
    country: countries[indexUnitedStates],
  },
  {
    name: "Oregon",
    country: countries[indexUnitedStates],
  },
  {
    name: "Pennsylvania",
    country: countries[indexUnitedStates],
  },
  {
    name: "Ramey",
    country: countries[indexUnitedStates],
  },
  {
    name: "Rhode Island",
    country: countries[indexUnitedStates],
  },
  {
    name: "South Carolina",
    country: countries[indexUnitedStates],
  },
  {
    name: "South Dakota",
    country: countries[indexUnitedStates],
  },
  {
    name: "Sublimity",
    country: countries[indexUnitedStates],
  },
  {
    name: "Tennessee",
    country: countries[indexUnitedStates],
  },
  {
    name: "Texas",
    country: countries[indexUnitedStates],
  },
  {
    name: "Trimble",
    country: countries[indexUnitedStates],
  },
  {
    name: "Utah",
    country: countries[indexUnitedStates],
  },
  {
    name: "Vermont",
    country: countries[indexUnitedStates],
  },
  {
    name: "Virginia",
    country: countries[indexUnitedStates],
  },
  {
    name: "Washington",
    country: countries[indexUnitedStates],
  },
  {
    name: "West Virginia",
    country: countries[indexUnitedStates],
  },
  {
    name: "Wisconsin",
    country: countries[indexUnitedStates],
  },
  {
    name: "Wyoming",
    country: countries[indexUnitedStates],
  },
];

const indexZulia = states.findIndex((state) => state.name === "Zulia");
const indexAmazonas = states.findIndex((state) => state.name === "Amazonas");
const indexAnzoategui = states.findIndex(
  (state) => state.name === "Anzoategui"
);
const indexApure = states.findIndex((state) => state.name === "Apure");
const indexAragua = states.findIndex((state) => state.name === "Aragua");
const indexBarinas = states.findIndex((state) => state.name === "Barinas");
const indexBolivar = states.findIndex((state) => state.name === "Bolivar");
const indexCarabobo = states.findIndex((state) => state.name === "Carabobo");
const indexCojedes = states.findIndex((state) => state.name === "Cojedes");
const indexDeltaAmacuro = states.findIndex(
  (state) => state.name === "Delta Amacuro"
);
const indexDistritoFederal = states.findIndex(
  (state) => state.name === "Distrito Federal"
);
const indexFalcon = states.findIndex((state) => state.name === "Falcon");
const indexGuarico = states.findIndex((state) => state.name === "Guarico");
const indexLara = states.findIndex((state) => state.name === "Lara");
const indexMerida = states.findIndex((state) => state.name === "Merida");
const indexMiranda = states.findIndex((state) => state.name === "Miranda");
const indexMonagas = states.findIndex((state) => state.name === "Monagas");
const indexNuevaEsparta = states.findIndex(
  (state) => state.name === "Nueva Esparta"
);
const indexPortuguesa = states.findIndex(
  (state) => state.name === "Portuguesa"
);
const indexSucre = states.findIndex((state) => state.name === "Sucre");
const indexTachira = states.findIndex((state) => state.name === "Tachira");
const indexTrujillo = states.findIndex((state) => state.name === "Trujillo");
const indexVargas = states.findIndex((state) => state.name === "Vargas");
const indexYaracuy = states.findIndex((state) => state.name === "Yaracuy");

export const cities = [
  {
    name: "Bachaquero",
    state: states[indexZulia],
  },
  {
    name: "Cabimas",
    state: states[indexZulia],
  },
  {
    name: "Ciudad Ojeda",
    state: states[indexZulia],
  },
  {
    name: "Lagunillas",
    state: states[indexZulia],
  },
  {
    name: "Machiques",
    state: states[indexZulia],
  },
  {
    name: "Maracaibo",
    state: states[indexZulia],
  },
  {
    name: "San Carlos del Zulia",
    state: states[indexZulia],
  },
  {
    name: "Santa Rita",
    state: states[indexZulia],
  },
  {
    name: "Villa del Rosario",
    state: states[indexZulia],
  },

  {
    name: "Alvaraes",
    state: states[indexAmazonas],
  },
  {
    name: "Anori",
    state: states[indexAmazonas],
  },
  {
    name: "Apui",
    state: states[indexAmazonas],
  },
  {
    name: "Autazes",
    state: states[indexAmazonas],
  },
  {
    name: "Bagua Grande",
    state: states[indexAmazonas],
  },
  {
    name: "Barcelos",
    state: states[indexAmazonas],
  },
  {
    name: "Barreirinha",
    state: states[indexAmazonas],
  },
  {
    name: "Benjamin Constant",
    state: states[indexAmazonas],
  },
  {
    name: "Boca do Acre",
    state: states[indexAmazonas],
  },
  {
    name: "Borba",
    state: states[indexAmazonas],
  },
  {
    name: "Cajaruro",
    state: states[indexAmazonas],
  },
  {
    name: "Canutama",
    state: states[indexAmazonas],
  },
  {
    name: "Carauari",
    state: states[indexAmazonas],
  },
  {
    name: "Careiro",
    state: states[indexAmazonas],
  },
  {
    name: "Careiro da Varzea",
    state: states[indexAmazonas],
  },
  {
    name: "Chachapoyas",
    state: states[indexAmazonas],
  },
  {
    name: "Coari",
    state: states[indexAmazonas],
  },
  {
    name: "Codajas",
    state: states[indexAmazonas],
  },
  {
    name: "Eirunepe",
    state: states[indexAmazonas],
  },
  {
    name: "Envira",
    state: states[indexAmazonas],
  },
  {
    name: "Fonte Boa",
    state: states[indexAmazonas],
  },
  {
    name: "Guajara",
    state: states[indexAmazonas],
  },
  {
    name: "Humaita",
    state: states[indexAmazonas],
  },
  {
    name: "Ipixuna",
    state: states[indexAmazonas],
  },
  {
    name: "Iranduba",
    state: states[indexAmazonas],
  },
  {
    name: "Itacoatiara",
    state: states[indexAmazonas],
  },
  {
    name: "Japura",
    state: states[indexAmazonas],
  },
  {
    name: "Jazan",
    state: states[indexAmazonas],
  },
  {
    name: "Jutai",
    state: states[indexAmazonas],
  },
  {
    name: "La Peca",
    state: states[indexAmazonas],
  },
  {
    name: "Labrea",
    state: states[indexAmazonas],
  },
  {
    name: "Leticia",
    state: states[indexAmazonas],
  },
  {
    name: "Manacapuru",
    state: states[indexAmazonas],
  },
  {
    name: "Manaquiri",
    state: states[indexAmazonas],
  },
  {
    name: "Manaus",
    state: states[indexAmazonas],
  },
  {
    name: "Manicore",
    state: states[indexAmazonas],
  },
  {
    name: "Maraa",
    state: states[indexAmazonas],
  },
  {
    name: "Maues",
    state: states[indexAmazonas],
  },
  {
    name: "Nhamunda",
    state: states[indexAmazonas],
  },
  {
    name: "Nova Olinda do Norte",
    state: states[indexAmazonas],
  },
  {
    name: "Novo Airao",
    state: states[indexAmazonas],
  },
  {
    name: "Novo Aripuana",
    state: states[indexAmazonas],
  },
  {
    name: "Parintins",
    state: states[indexAmazonas],
  },
  {
    name: "Pauini",
    state: states[indexAmazonas],
  },
  {
    name: "Puerto Ayacucho",
    state: states[indexAmazonas],
  },
  {
    name: "Puerto Narino",
    state: states[indexAmazonas],
  },
  {
    name: "Rio Preto da Eva",
    state: states[indexAmazonas],
  },
  {
    name: "Santa Isabel do Rio Negro",
    state: states[indexAmazonas],
  },
  {
    name: "Santo Antonio do Ica",
    state: states[indexAmazonas],
  },
  {
    name: "Sao Gabriel da Cachoeira",
    state: states[indexAmazonas],
  },
  {
    name: "Sao Paulo de Olivenca",
    state: states[indexAmazonas],
  },
  {
    name: "Tabatinga",
    state: states[indexAmazonas],
  },
  {
    name: "Tapaua",
    state: states[indexAmazonas],
  },
  {
    name: "Tefe",
    state: states[indexAmazonas],
  },
  {
    name: "Tonantins",
    state: states[indexAmazonas],
  },
  {
    name: "Uarini",
    state: states[indexAmazonas],
  },
  {
    name: "Urucara",
    state: states[indexAmazonas],
  },
  {
    name: "Urucurituba",
    state: states[indexAmazonas],
  },

  {
    name: "Anaco",
    state: states[indexAnzoategui],
  },
  {
    name: "Barcelona",
    state: states[indexAnzoategui],
  },
  {
    name: "Cantaura",
    state: states[indexAnzoategui],
  },
  {
    name: "El Tigre",
    state: states[indexAnzoategui],
  },
  {
    name: "Puerto la Cruz",
    state: states[indexAnzoategui],
  },
  {
    name: "San Jose de Guanipa",
    state: states[indexAnzoategui],
  },
  {
    name: "Guasdualito",
    state: states[indexApure],
  },
  {
    name: "San Fernando",
    state: states[indexApure],
  },

  {
    name: "Cagua",
    state: states[indexAragua],
  },
  {
    name: "El Limon",
    state: states[indexAragua],
  },
  {
    name: "La Victoria",
    state: states[indexAragua],
  },
  {
    name: "Las Teyerias",
    state: states[indexAragua],
  },
  {
    name: "Maracay",
    state: states[indexAragua],
  },
  {
    name: "Palo Negro",
    state: states[indexAragua],
  },
  {
    name: "San Mateo",
    state: states[indexAragua],
  },
  {
    name: "Turmero",
    state: states[indexAragua],
  },
  {
    name: "Villa de Cura",
    state: states[indexAragua],
  },
  {
    name: "Barinas",
    state: states[indexBarinas],
  },
  {
    name: "Barinitas",
    state: states[indexBarinas],
  },
  {
    name: "Achi",
    state: states[indexBolivar],
  },
  {
    name: "Altos del Rosario",
    state: states[indexBolivar],
  },
  {
    name: "Arenal",
    state: states[indexBolivar],
  },
  {
    name: "Arjona",
    state: states[indexBolivar],
  },
  {
    name: "Arroyohondo",
    state: states[indexBolivar],
  },
  {
    name: "Barranco de Loba",
    state: states[indexBolivar],
  },
  {
    name: "Calamar",
    state: states[indexBolivar],
  },
  {
    name: "Cantagallo",
    state: states[indexBolivar],
  },
  {
    name: "Cartagena",
    state: states[indexBolivar],
  },
  {
    name: "Cicuco",
    state: states[indexBolivar],
  },
  {
    name: "Ciudad Bolivar",
    state: states[indexBolivar],
  },
  {
    name: "Ciudad Guayana",
    state: states[indexBolivar],
  },
  {
    name: "Clemencia",
    state: states[indexBolivar],
  },
  {
    name: "Cordoba",
    state: states[indexBolivar],
  },
  {
    name: "El Carmen de Bolivar",
    state: states[indexBolivar],
  },
  {
    name: "El Guamo",
    state: states[indexBolivar],
  },
  {
    name: "El Penon",
    state: states[indexBolivar],
  },
  {
    name: "Guaranda",
    state: states[indexBolivar],
  },
  {
    name: "Hatillo de Loba",
    state: states[indexBolivar],
  },
  {
    name: "Magangue",
    state: states[indexBolivar],
  },
  {
    name: "Mahates",
    state: states[indexBolivar],
  },
  {
    name: "Margarita",
    state: states[indexBolivar],
  },
  {
    name: "Maria la Baja",
    state: states[indexBolivar],
  },
  {
    name: "Mompos",
    state: states[indexBolivar],
  },
  {
    name: "Montecristo",
    state: states[indexBolivar],
  },
  {
    name: "Morales",
    state: states[indexBolivar],
  },
  {
    name: "Pinillos",
    state: states[indexBolivar],
  },
  {
    name: "Regidor",
    state: states[indexBolivar],
  },
  {
    name: "Rio Viejo",
    state: states[indexBolivar],
  },
  {
    name: "San Cristobal",
    state: states[indexBolivar],
  },
  {
    name: "San Estanislao",
    state: states[indexBolivar],
  },
  {
    name: "San Fernando",
    state: states[indexBolivar],
  },
  {
    name: "San Jacinto",
    state: states[indexBolivar],
  },
  {
    name: "San Jacinto del Cauca",
    state: states[indexBolivar],
  },
  {
    name: "San Juan Nepomuceno",
    state: states[indexBolivar],
  },
  {
    name: "San Martin de Loba",
    state: states[indexBolivar],
  },
  {
    name: "San Miguel",
    state: states[indexBolivar],
  },
  {
    name: "San Pablo",
    state: states[indexBolivar],
  },
  {
    name: "Santa Catalina",
    state: states[indexBolivar],
  },
  {
    name: "Santa Rosa",
    state: states[indexBolivar],
  },
  {
    name: "Santa Rosa del Sur",
    state: states[indexBolivar],
  },
  {
    name: "Simiti",
    state: states[indexBolivar],
  },
  {
    name: "Soplaviento",
    state: states[indexBolivar],
  },
  {
    name: "Talaigua Nuevo",
    state: states[indexBolivar],
  },
  {
    name: "Tiquisio",
    state: states[indexBolivar],
  },
  {
    name: "Turbaco",
    state: states[indexBolivar],
  },
  {
    name: "Turbana",
    state: states[indexBolivar],
  },
  {
    name: "Upata",
    state: states[indexBolivar],
  },
  {
    name: "Villanueva",
    state: states[indexBolivar],
  },
  {
    name: "Zambrano",
    state: states[indexBolivar],
  },

  {
    name: "Goaigoaza",
    state: states[indexCarabobo],
  },
  {
    name: "Guacara",
    state: states[indexCarabobo],
  },
  {
    name: "Guigue",
    state: states[indexCarabobo],
  },
  {
    name: "Mariara",
    state: states[indexCarabobo],
  },
  {
    name: "Moron",
    state: states[indexCarabobo],
  },
  {
    name: "Puerto Cabello",
    state: states[indexCarabobo],
  },
  {
    name: "San Joaquin",
    state: states[indexCarabobo],
  },
  {
    name: "Tacarigua",
    state: states[indexCarabobo],
  },
  {
    name: "Valencia",
    state: states[indexCarabobo],
  },

  {
    name: "San Carlos",
    state: states[indexCojedes],
  },
  {
    name: "Tinaquillo",
    state: states[indexCojedes],
  },
  {
    name: "Tinaco",
    state: states[indexCojedes],
  },
  {
    name: "El Tigre",
    state: states[indexDeltaAmacuro],
  },
  {
    name: "Tucupita",
    state: states[indexDeltaAmacuro],
  },
  {
    name: "Caracas",
    state: states[indexDistritoFederal],
  },
  {
    name: "Coro",
    state: states[indexFalcon],
  },
  {
    name: "Punto Fijo",
    state: states[indexFalcon],
  },
  {
    name: "San Juan de los Cayos",
    state: states[indexFalcon],
  },
  {
    name: "San Luis",
    state: states[indexFalcon],
  },
  {
    name: "Tucacas",
    state: states[indexFalcon],
  },
  {
    name: "Valle de la Pascua",
    state: states[indexGuarico],
  },
  {
    name: "Zaraza",
    state: states[indexGuarico],
  },
  {
    name: "San juan de los morros",
    state: states[indexGuarico],
  },
  ,
  {
    name: "Valle de la pascua",
    state: states[indexGuarico],
  },

  {
    name: "Barquisimeto",
    state: states[indexLara],
  },
  {
    name: "Carora",
    state: states[indexLara],
  },
  {
    name: "El Tocuyo",
    state: states[indexLara],
  },
  {
    name: "Quibor",
    state: states[indexLara],
  },
  {
    name: "Cabudare",
    state: states[indexLara],
  },
  {
    name: "Los Rastrojos",
    state: states[indexLara],
  },
  {
    name: "Arapuey",
    state: states[indexMerida],
  },
  {
    name: "Ejido",
    state: states[indexMerida],
  },
  {
    name: "El Vigia",
    state: states[indexMerida],
  },
  {
    name: "Merida",
    state: states[indexMerida],
  },
  {
    name: "Mucuchies",
    state: states[indexMerida],
  },
  {
    name: "Santa Barbara",
    state: states[indexMerida],
  },
  {
    name: "Tovar",
    state: states[indexMerida],
  },
  {
    name: "Zea",
    state: states[indexMerida],
  },
  {
    name: "Carrizal",
    state: states[indexMiranda],
  },

  {
    name: "Baruta",
    state: states[indexMiranda],
  },
  {
    name: "Carrizal",
    state: states[indexMiranda],
  },
  {
    name: "Catia La Mar",
    state: states[indexMiranda],
  },
  {
    name: "Caucaguita",
    state: states[indexMiranda],
  },
  {
    name: "Chacao",
    state: states[indexMiranda],
  },
  {
    name: "Charallave",
    state: states[indexMiranda],
  },
  {
    name: "Cua",
    state: states[indexMiranda],
  },
  {
    name: "El Cafetal",
    state: states[indexMiranda],
  },
  {
    name: "El Hatillo",
    state: states[indexMiranda],
  },
  {
    name: "Filas de Mariche",
    state: states[indexMiranda],
  },
  {
    name: "Guarenas",
    state: states[indexMiranda],
  },
  {
    name: "Guatire",
    state: states[indexMiranda],
  },
  {
    name: "La Dolorita",
    state: states[indexMiranda],
  },
  {
    name: "Los Dos Caminos",
    state: states[indexMiranda],
  },
  {
    name: "Los Teques",
    state: states[indexMiranda],
  },
  {
    name: "Ocumare del Tuy",
    state: states[indexMiranda],
  },
  {
    name: "Petare",
    state: states[indexMiranda],
  },
  {
    name: "San Antonio de los Altos",
    state: states[indexMiranda],
  },
  {
    name: "Santa Teresa",
    state: states[indexMiranda],
  },
];
