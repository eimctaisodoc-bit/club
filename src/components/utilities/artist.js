// import balika from '../../assets/staffs/'
const imageMap = import.meta.glob(
  "../../assets/staffs/*.{jpg,jpeg,webp,png}",
  { eager: true, import: "default" }
);

const img = (name) => imageMap[`../../assets/staffs/${name}`] ?? "";

export const artists = [
  {
    name: "BALIKA TAMANG",
    position: "Singer",
    address: "Chitwan",
    dob: "2054-02-23",
    contact: "9865247743",
    img: img("BALIKA TAMANG.jpeg")
  },
  {
    name: "HUM BAHADUR BHANDARI",
    position: "Singer",
    address: "Kapilvastu",
    dob: "2052-01-13",
    contact: "9867525045",
    img: img("HUM BAHADUR BHANDARI.jpeg")
  },
  {
    name: "ELECTION SUNAR",
    position: "Rydhem",
    address: "Dhading",
    dob: "2048-10-16",
    contact: "9849212075",
    img: img("ELECTION SUNAR.jpeg")
  },
  {
    name: "GOBINDA PARIYAR",
    position: "Rydhem",
    address: "Rolpa",
    dob: "2052-09-29",
    contact: "9863354958",
    img: img("GOBINDA PARIYAR.jpeg")
  },
  {
    name: "SUDIP SINJALI",
    position: "Singer",
    address: "Gulmi",
    dob: "2055-06-17",
    contact: "9769774610",
    img: img("SUDIP SINJALI.jpeg")
  },
  {
    name: "BABIN SING THAKURI",
    position: "Dancer",
    address: "",
    dob: "2053-11-15",
    contact: "9803409099",
    img: img("BABIN SING THAKURI.jpeg")
  },
  {
    name: "RABIN PARIYAR",
    position: "Rydhem",
    address: "Kapilvastu",
    dob: "2049-05-17",
    contact: "9867300674",
    img: img("RABIN PARIYAR.jpeg")
  },
  {
    name: "REKHA STRI",
    position: "Dancer",
    address: "",
    dob: "2059-07-12",
    contact: "9813983239",
    img: img("REKHA STRI.jpeg")
  },
  {
    name: "BANDANA PARIYAR",
    position: "Dancer",
    address: "Chitwan",
    dob: "2056-03-16",
    contact: "9821139587",
    img: img("BANDANA PARIYAR.jpeg")
  },
  {
    name: "NIRMALA PAKHRIN",
    position: "Dancer",
    address: "Sarlai",
    dob: "2057/02/31",
    contact: "9849097394",
    img: img("NIRMALA PAKHRIN.jpeg")
  },
  {
    name: "DHAN KUMARI GHARTI",
    position: "Dancer",
    address: "Rukum",
    dob: "2062-08-29",
    contact: "9764362187",
    img: img("DHAN KUMARI GHARTI.jpeg")
  },
  {
    name: "SAMJHANA HARMEL",
    position: "Dancer",
    address: "Baglung",
    dob: "2063-06-10",
    contact: "9748807879",
    img: img("SAMJHANA HARMEL.jpeg")
  },
  {
    name: "SANGINA MAGAR",
    position: "Dancer",
    address: "Dhading",
    dob: "2050-06-16",
    contact: "9841859395",
    img: img("SANGINA MAGAR.jpeg")
  },
  {
    name: "SURESH MAGAR",
    position: "Dancer",
    address: "Pyuthan",
    dob: "2051-06-16",
    contact: "9868611939",
    img: img("SURESH MAGAR.jpeg")
  },
  {
    name: "KABITA ARYAL",
    position: "Singer",
    address: "Dhading",
    dob: "2056-01-03",
    contact: "9769352378",
    img: img("KABITA ARYAL.jpeg")
  },
  {
    name: "AARADHYA AAGRI",
    position: "Singer",
    address: "Rolpa",
    dob: "2058-11-01",
    contact: "9849448756",
    img: img("AARADHYA AAGRI.jpeg")
  },
  {
    name: "GITA SENCHURI",
    position: "Singer",
    address: "Dhading",
    dob: "2049-07-10",
    contact: "9851158782",
    img: img("GITA SENCHURI.jpeg")
  },
  {
    name: "SAMBHU SHRESTHA",
    position: "Rydhem",
    address: "Ramechhap",
    dob: "2051-04-27",
    contact: "9843303130",
    img: img("SAMBHU SHRESTHA.jpeg")
  },
  {
    name: "LOK KUMARI GIRI",
    position: "Singer",
    address: "Udayapur",
    dob: "2048-06-11",
    contact: "9860739706",
    img: img("LOK KUMARI GIRI.jpeg")
  },
  {
    name: "RAJU RD",
    position: "Singer",
    address: "Lamjung",
    dob: "2052-04-28",
    contact: "9806664054",
    img: img("RAJU RD.jpeg")
  },
  {
    name: "SHREESHA PARIYAR",
    position: "Dancer",
    address: "Dang",
    dob: "2063-07-29",
    contact: "9703421988",
    img: img("SHREESHA PARIYAR.jpeg")
  },
  {
    name: "ASHISH PARIYAR",
    position: "Dancer",
    address: "Baglung",
    dob: "2003-07-27",
    contact: "9860602764",
    img: img("ASHISH PARIYAR.jpeg")
  },
  {
    name: "BIRENDRA SING",
    position: "Rydhem",
    address: "",
    dob: "2053-11-15",
    contact: "9803409699",
    img: img("BIRENDRA SING.jpeg")
  },
  {
    name: "PRATIMA OLI",
    position: "Dancer",
    address: "Dang",
    dob: "2056-09-05",
    contact: "9810855054",
    img: img("PRATIMA OLI.jpeg")
  },
  {
    name: "ALIJA MAGAR",
    position: "Dancer",
    address: "Kavre",
    dob: "2059-06-12",
    contact: "9838147181",
    img: img("ALIJA MAGAR.jpeg")
  },
  {
    name: "URMILA SHAHI",
    position: "Singer",
    address: "Dailekh",
    dob: "2057-09-21",
    contact: "9767289350",
    img: img("URMILA SHAHI.jpeg")
  },
  {
    name: "KHUSBU SUNAR",
    position: "Singer",
    address: "Syangja",
    dob: "2053-06-24",
    contact: "9851338273",
    img: img("KHUSBU SUNAR.jpeg")
  },
  {
    name: "MAN BAHADUR RAWAT",
    position: "Singer",
    address: "Banke",
    dob: "2048-12-01",
    contact: "9843564434",
    img: img("MAN BAHADUR RAWAT.jpeg")
  },
  {
    name: "MANIKALA PUN MAGAR",
    position: "Singer",
    address: "Pyuthan",
    dob: "2050-05-12",
    contact: "9860657071",
    img: img("MANIKALA PUN MAGAR.jpeg")
  },
  {
    name: "GHANASHYAM KUNWAR",
    position: "Singer",
    address: "Gulmi",
    dob: "2052-06-28",
    contact: "984673921",
    img: img("GHANASHYAM KUNWAR.jpeg")
  },
  {
    name: "SABITA PARIYAR",
    position: "Singer",
    address: "Tanahu",
    dob: "1991-02-15",
    contact: "9843728945",
    img: img("SABITA PARIYAR.jpeg")
  },
  {
    name: "ASHRAM GURUNG",
    position: "Singer",
    address: "Lamjung",
    dob: "1985-07-01",
    contact: "9849060755",
    img: img("ASHRAM GURUNG.jpeg")
  },
  {
    name: "DINESH CHHETRI",
    position: "Singer",
    address: "Syangja",
    dob: "1989-01-09",
    contact: "9849069355",
    img: img("DINESH CHHETRI.jpeg")
  },
  {
    name: "SHANTI THAPA PUN",
    position: "Singer",
    address: "Pokhara",
    dob: "2050-12-08",
    contact: "9824322606",
    img: img("SHANTI THAPA PUN.jpeg")
  },
  {
    name: "KAMAL BISTA",
    position: "Singer",
    address: "Kailali",
    dob: "2050-03-13",
    contact: "9761855668",
    img: img("KAMAL BISTA.jpeg")
  },
  {
    name: "NISHA LAMA",
    position: "Singer",
    address: "Dolakha",
    dob: "2048-09-03",
    contact: "9803103650",
    img: img("NISHA LAMA.jpeg")
  },
  {
    name: "SHANKAR SUNAR",
    position: "Singer",
    address: "Syangja",
    dob: "2054-03-03",
    contact: "9844594385",
    img: img("SHANKAR SUNAR.jpeg")
  },
  {
    name: "KAUSHILA CHHETRI",
    position: "Dancer",
    address: "",
    dob: "2065-06-16",
    contact: "9707322453",
    img: img("KAUSHILA CHHETRI.jpeg")
  },
  {
    name: "MINA BHUDHATHOKI",
    position: "Singer",
    address: "Dang",
    dob: "",
    contact: "",
    img: img("MINA BHUDHATHOKI.jpeg")
  },
  {
    name: "SEDRINA THAKURI",
    position: "Dancer",
    address: "Kohalpur",
    dob: "2000-04-18",
    contact: "9766661923",
    img: img("SEDRINA THAKURI.jpeg")
  },
  {
    name: "KRISHNA BAHADUR KHADKA",
    position: "Rydhem",
    address: "Okhaldhunga",
    dob: "2050-12-14",
    contact: "9860303543",
    img: img("KRISHNA BAHADUR KHADKA.jpeg")
  },
  {
    name: "NISHANT BK",
    position: "Singer",
    address: "Dang",
    dob: "2059-04-27",
    contact: "9864730866",
    img: img("NISHANT BK.jpeg")
  },
  {
    name: "REJINA KARKI",
    position: "Waiter",
    address: "Darchila",
    dob: "2064-09-18",
    contact: "9748877554",
    img: img("REJINA KARKI.jpeg")
  },
  {
    name: "TULASA TAMANG",
    position: "Waiter",
    address: "Udayapur",
    dob: "2064-07-18",
    contact: "9744422684",
    img: img("TULASA TAMANG.jpeg")
  },
  {
    name: "ALINA GURUNG",
    position: "Waiter",
    address: "Sindhupalchowk",
    dob: "2060-10-23",
    contact: "9803964246",
    img: img("ALINA GURUNG.jpeg")
  },
  {
    name: "KUSUM MAGAR",
    position: "Waiter",
    address: "Nuwakot",
    dob: "2062-04-19",
    contact: "9768712162",
    img: img("KUSUM MAGAR.jpeg")
  },
  {
    name: "BHAWANA MAGAR",
    position: "Waiter",
    address: "Pyuthan",
    dob: "2061-05-14",
    contact: "9768870074",
    img: img("BHAWANA MAGAR.jpeg")
  },
  {
    name: "GITA SHRESTHA",
    position: "Waiter",
    address: "Ramechhap",
    dob: "2048-02-10",
    contact: "9766460203",
    img: img("GITA SHRESTHA.jpeg")
  },
  {
    name: "PURNIMA KHATRI",
    position: "Captain",
    address: "Kathnandu",
    dob: "2059-06-05",
    contact: "9863494339",
    img: img("PURNIMA KHATRI.jpeg")
  },
  {
    name: "YAM BAHADUR KHATRI",
    position: "Captain",
    address: "Bardiya",
    dob: "2059-03-09",
    contact: "9808207289",
    img: img("YAM BAHADUR KHATRI.jpeg")
  },
  {
    name: "AJIT RANA MAGAR",
    position: "Captain",
    address: "Makwanpur",
    dob: "2061-07-25",
    contact: "9762414808",
    img: img("AJIT RANA MAGAR.jpeg")
  },
  {
    name: "SARISMA TAMANG",
    position: "Waiter",
    address: "Nuwakot",
    dob: "2058-07-22",
    contact: "9702713472",
    img: img("SARISMA TAMANG.jpeg")
  },
  {
    name: "YOGENDRA BIKRAM CHAND",
    position: "Barman",
    address: "Kailali",
    dob: "2056-08-09",
    contact: "9767415451",
    img: img("YOGENDRA BIKRAM CHAND.jpeg")
  },
  {
    name: "SWORUP LAKHE",
    position: "Captain",
    address: "Dhalekwar",
    dob: "2063-05-24",
    contact: "9709164533",
    img: img("SWORUP LAKHE.jpeg")
  },
  {
    name: "BHABITA SUNUWAR",
    position: "Waiter",
    address: "Okhaldhunga",
    dob: "2062-03-10",
    contact: "9767410163",
    img: img("BHABITA SUNUWAR.jpeg")
  },
  {
    name: "AMRITA BOHORA",
    position: "Waiter",
    address: "Baglung",
    dob: "2061-04-24",
    contact: "9745300534",
    img: img("AMRITA BOHORA.jpeg")
  },
  {
    name: "SOBITA ADHIKARI",
    position: "Waiter",
    address: "Lamgung",
    dob: "2053-06-26",
    contact: "9745665995",
    img: img("SOBITA ADHIKARI.jpeg")
  },
  {
    name: "ASMITA GURUNG",
    position: "Waiter",
    address: "Sindhupalchowk",
    dob: "",
    contact: "",
    img: img("ASMITA GURUNG.jpeg")
  }
];