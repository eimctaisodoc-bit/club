import React, { memo, useState } from 'react';
import { 
  Flame, 
  GlassWater, 
  Cigarette, 
  Wine, 
  Beer, 
  Utensils, 
  Coffee, 
  Pizza, 
  IceCream 
} from 'lucide-react';

const menuData = [
  {
    category: "SHOOTER",
    items: [
      { name: "TNT", desc: "Whisky, sambuca", prices: { "Bottle Price": "1650" } },
      { name: "B-52", desc: "Baileys, Cointreau, Kahlua", prices: { "Bottle Price": "2200" } },
      { name: "Jagerbomb", desc: "Jagermeister, Red Bull", prices: { "Bottle Price": "2200" } },
      { name: "Blue Kamikaze", desc: "Vodka, triple sec, lemon juice, blue curacao", prices: { "Bottle Price": "1650" } },
      { name: "Flaming Lamborghini", desc: "Baileys, sambuca, kahlua, blue curacao", prices: { "Bottle Price": "3850" } },
      { name: "Brain Hemorrhage", desc: "Baileys, peach schnapps, grenadine", prices: { "Bottle Price": "1650" } },
      { name: "Java Jack", desc: "—", prices: { "Bottle Price": "2200" } },
      { name: "Gas Chamber", desc: "—", prices: { "Bottle Price": "2800" } }
    ]
  },
  {
    category: "MOCKTAILS",
    items: [
      { name: "Virgin Mojito", desc: "Fresh mint leaves, fresh lime wedges, soda, sugar", prices: { "Bottle": "1450" } },
      { name: "Virgin Colada", desc: "Pineapple juice, coconut cream, coconut syrup", prices: { "Bottle": "1450" } },
      { name: "Blue Angel", desc: "Lemonade, lemon juice, simple syrup, blue curacao", prices: { "Bottle": "1450" } },
      { name: "Fruits Punch", desc: "Orange juice, pineapple juice, grenadine syrup, ice cream", prices: { "Bottle": "1450" } },
      { name: "Cinderella", desc: "Orange juice, lemon juice, grenadine syrup, lemonade", prices: { "Bottle": "1450" } },
      { name: "Sunset Cooler", desc: "Cranberry juice, orange juice, lemon juice & ginger ale", prices: { "Bottle": "1450" } },
      { name: "Mocktail Juice", desc: "—", prices: { "Bottle": "1450" } }
    ]
  },
  {
    category: "TOBACCO",
    items: [
      { name: "Surya (Red Light)", prices: { "Half": "440", "Full": "825" } },
      { name: "Hookah (Any Flavour)", prices: { "Half": "—", "Full": "1595" } },
      { name: "Top Durbar Special", prices: { "Half": "—", "Full": "2000" } },
      { name: "Extra Coal", prices: { "Half": "150", "Full": "—" } }
    ]
  },
  {
    category: "DOMESTIC SPIRITS",
    items: [
      { name: "Old Durbar Regular", prices: { "60ml": "950", "Quarter": "2595", "Half": "5195", "Bottle": "10195" } },
      { name: "Old Durbar Black", prices: { "60ml": "1200", "Quarter": "3495", "Half": "6795", "Bottle": "12995" } },
      { name: "Antiquity Blue", prices: { "60ml": "750", "Quarter": "2195", "Half": "4095", "Bottle": "7995" } },
      { name: "Signature Premium", prices: { "60ml": "800", "Quarter": "2395", "Half": "4595", "Bottle": "8995" } },
      { name: "Signature Rare", prices: { "60ml": "750", "Quarter": "2195", "Half": "4095", "Bottle": "7995" } },
      { name: "Bandipur", prices: { "60ml": "1200", "Quarter": "3495", "Half": "6795", "Bottle": "12995" } },
      { name: "Gurkhas & Guns", prices: { "60ml": "1210", "Quarter": "3630", "Half": "6820", "Bottle": "13200" } },
      { name: "Khukri Rum", prices: { "60ml": "715", "Quarter": "2090", "Half": "3960", "Bottle": "7700" } },
      { name: "Blue Riband Gin", prices: { "60ml": "605", "Quarter": "1650", "Half": "3850", "Bottle": "8250" } },
      { name: "8848 Vodka", prices: { "60ml": "770", "Quarter": "2200", "Half": "4180", "Bottle": "8250" } },
      { name: "Ruslan Vodka", prices: { "60ml": "715", "Quarter": "2090", "Half": "3960", "Bottle": "7700" } },
      { name: "Yarchagumba", prices: { "60ml": "2600", "Quarter": "7495", "Half": "19495", "Bottle": "37995" } }
    ]
  },
  {
    category: "BEER",
    items: [
      { name: "Carlsberg", prices: { "650ml": "1250", "Tower": "6050" } },
      { name: "Tuborg", prices: { "650ml": "1195", "Tower": "5500" } },
      { name: "Gorkha", prices: { "650ml": "1195", "Tower": "5500" } },
      { name: "Somersby (250ml)", prices: { "650ml": "1045", "Tower": "—" } },
      { name: "Corona (330ml)", prices: { "650ml": "1250", "Tower": "—" } }
    ]
  },
  {
    category: "WINE (Red/White)",
    items: [
      { name: "J.P. Chenet - France", prices: { "Glass": "1750", "Bottle": "9000" } },
      { name: "Hardys VR - Australia", prices: { "Glass": "1750", "Bottle": "8000" } },
      { name: "Jacobs Creek (Moscoto)", prices: { "Glass": "1700", "Bottle": "7500" } },
      { name: "Robertson", prices: { "Glass": "1700", "Bottle": "8000" } },
      { name: "Medinet", prices: { "Glass": "1600", "Bottle": "7000" } },
      { name: "Gossips (R/W)", prices: { "Glass": "1700", "Bottle": "7500" } }
    ]
  },
  {
    category: "SPARKLING WINE",
    items: [
      { name: "Calvet Celebration (Rose/White)", prices: { "Bottle": "13000" } },
      { name: "Calvet Ice Chardonnay", prices: { "Bottle": "15000" } },
      { name: "Bottega (Mascoto Petalo)", prices: { "Bottle": "22000" } },
      { name: "Bottega (Cold/White Cold/Star)", prices: { "Bottle": "28000" } }
    ]
  },
  {
    category: "CHAMPAGNE",
    items: [
      { name: "Prince Laurent", prices: { "Bottle": "28500" } },
      { name: "Moet & Chandon", prices: { "Bottle": "28500" } }
    ]
  },
  {
    category: "COCKTAILS",
    items: [
      { name: "Long Island Iced Tea", desc: "Vodka, gin, rum, tequila, triple sec, lemon juice", prices: { "Price": "1950" } },
      { name: "Mojito", desc: "White rum, lime chunk, mint leaves, caster sugar", prices: { "Price": "1650" } },
      { name: "Blue Hawaiian", desc: "White rum, coconut cream, blue curacao, pineapple", prices: { "Price": "1650" } },
      { name: "Hot Rum Punch", desc: "Rum, spices, herbs, honey, lemon juice, hot water", prices: { "Price": "1650" } },
      { name: "Sex On The Beach", desc: "Vodka, peach schnapps, cranberry juice", prices: { "Price": "1650" } },
      { name: "Cosmopolitan", desc: "Vodka, triple sec, lemon juice, cranberry juice", prices: { "Price": "1650" } },
      { name: "Tequalita Sunrise", desc: "Tequila, orange juice, grenadine syrup", prices: { "Price": "1650" } },
      { name: "Margarita", desc: "Tequila, triple sec, lime juice", prices: { "Price": "1650" } },
      { name: "Dry Martini", desc: "Gin mixed with dry vermouth & olives", prices: { "Price": "1650" } },
      { name: "Expresso Martini", desc: "Freshly brewed espresso mixed with vodka, Kahlua & sugar", prices: { "Price": "1650" } },
      { name: "Hurricane", desc: "Rum, triple sec, strawberry puree, lemon juice, orange juice", prices: { "Price": "1550" } },
      { name: "Daiquiri", desc: "Rum, lemon juice & sugar", prices: { "Price": "1950" } },
      { name: "Mai Tai Vintage", desc: "White rum, dark rum, triple sec, lime & orgeat syrup", prices: { "Price": "2050" } },
      { name: "The New Trail", desc: "Rum, gin, vodka, triple sec, pineapple juice & grenadine", prices: { "Price": "1850" } },
      { name: "Singapore Sling", desc: "Gin, triple sec, cherry heering, benedictive, D.D.M, pineapple, grenadine, angostura bitters & lime juice", prices: { "Price": "—" } }
    ]
  },
  {
    category: "CHOPSUEY",
    items: [
      { name: "Veg. Chopsuey", prices: { "Rate": "650" } },
      { name: "Chinese Chopsuey", prices: { "Rate": "700" } },
      { name: "American Chopsuey", prices: { "Rate": "700" } }
    ]
  },
  {
    category: "FRIED RICE",
    items: [
      { name: "Veg. Fried Rice", prices: { "Rate": "650" } },
      { name: "Egg Fried Rice", prices: { "Rate": "750" } },
      { name: "Chicken Fried Rice", prices: { "Rate": "800" } },
      { name: "Buff Fried Rice", prices: { "Rate": "800" } },
      { name: "Mixed Fried Rice", prices: { "Rate": "900" } }
    ]
  },
  {
    category: "NOODLES",
    items: [
      { name: "Veg. Noodles", prices: { "Rate": "650" } },
      { name: "Egg Noodles", prices: { "Rate": "750" } },
      { name: "Chicken Noodles", prices: { "Rate": "800" } },
      { name: "Buff Noodles", prices: { "Rate": "800" } },
      { name: "Mixed Noodles", prices: { "Rate": "900" } }
    ]
  },
  {
    category: "MOMO",
    items: [
      { name: "Steam", prices: { "Veg": "450", "Buff": "650", "Chicken": "700" } },
      { name: "Kothey", prices: { "Veg": "475", "Buff": "675", "Chicken": "725" } },
      { name: "Fried", prices: { "Veg": "500", "Buff": "600", "Chicken": "750" } },
      { name: "Chilly", prices: { "Veg": "525", "Buff": "625", "Chicken": "775" } },
      { name: "Sadeko", prices: { "Veg": "550", "Buff": "650", "Chicken": "800" } }
    ]
  },
  {
    category: "PASTA & SPAGHETTI",
    items: [
      { name: "Carbonara", desc: "White sauce, cheese, chicken", prices: { "Rate": "900" } },
      { name: "Spaghetti With Bologness", desc: "Red sauce, boneless chicken", prices: { "Rate": "900" } },
      { name: "Allallio", desc: "Garlic chilli, flakes, peppers, cheese", prices: { "Rate": "850" } },
      { name: "Spaghetti Meatball", desc: "Red sauce, boneless chicken", prices: { "Rate": "800" } }
    ]
  },
  {
    category: "PIZZA",
    items: [
      { name: "Margarita Pizza", prices: { "Rate": "900" } },
      { name: "Cheese Pizza", prices: { "Rate": "1050" } },
      { name: "Chicken Pizza", prices: { "Rate": "950" } },
      { name: "Veg Lover Pizza", prices: { "Rate": "1000" } },
      { name: "Meat Lover Pizza", prices: { "Rate": "1200" } }
    ]
  },
  {
    category: "KHANA SET",
    items: [
      { name: "Mutton", prices: { "Rate": "1075" } },
      { name: "Buff / Pork / Chicken", prices: { "Rate": "900" } }
    ]
  },
  {
    category: "SPECIAL KHAJA SET",
    items: [
      { name: "Veg Khaja Set", prices: { "Rate": "1050" } },
      { name: "Non Veg Chicken Khaja Set", prices: { "Rate": "1250" } },
      { name: "Non Veg Mutton Khaja Set", prices: { "Rate": "1450" } },
      { name: "Non Veg Buff/Pork Khaja Set", prices: { "Rate": "1250" } }
    ]
  },
  {
    category: "MAIN COURSE (NON VEG)",
    items: [
      { name: "Chicken Biryani", prices: { "Rate": "1200" } },
      { name: "Mutton Biryani", prices: { "Rate": "1450" } },
      { name: "Chop Chop Pork", prices: { "Rate": "1575" } },
      { name: "Chicken Butter Masala With Rice", prices: { "Rate": "1000" } },
      { name: "Egg Curry With Rice", prices: { "Rate": "950" } },
      { name: "Grilled Chicken With Noodles", prices: { "Rate": "1475" } },
      { name: "Mutton Curry With Rice", prices: { "Rate": "1250" } },
      { name: "Chicken Cutlet", prices: { "Rate": "1200" } }
    ]
  },
  {
    category: "SPAGHETTI & PASTA",
    items: [
      { name: "Alfred Do Pasta – White Sauce", prices: { "Rate": "700" } },
      { name: "Arabbitta – Red Sauce", prices: { "Rate": "750" } },
      { name: "Veg Burrito", prices: { "Rate": "900" } }
    ]
  },
  {
    category: "SIZZLER",
    items: [
      { name: "Veg. Sizzler", desc: "Served with veg potage, salted noodles, grilled veg & brown sauce", prices: { "Rate": "950" } },
      { name: "Chicken Sizzler", desc: "Served with leg piece, chicken, salted noodles, grilled veg & brown sauce", prices: { "Rate": "1250" } },
      { name: "Fish Sizzler", desc: "Served with grilled fish, salted noodles, grilled veg & brown sauce", prices: { "Rate": "1250" } }
    ]
  },
  {
    category: "SOUP",
    items: [
      { name: "Veg. Clear Soup", prices: { "Rate": "450" } },
      { name: "Chicken Clear Soup", prices: { "Rate": "550" } },
      { name: "Hot & Sour Soup", prices: { "Rate": "550" } },
      { name: "Cream Of Chicken", prices: { "Rate": "550" } },
      { name: "Mushroom Soup", prices: { "Rate": "500" } }
    ]
  },
  {
    category: "SALAD",
    items: [
      { name: "Green Salad", desc: "Seasonable Nepali salad", prices: { "Rate": "550" } },
      { name: "Fresh Fruits Salad", desc: "Seasonable mix fresh fruit", prices: { "Rate": "1290" } },
      { name: "Greek Salad", desc: "Lettuce, black olive, cucumber, carrot, tomato, onion, paneer, thyme, marinate olive oil, lemon juice", prices: { "Rate": "800" } },
      { name: "Chicken Sizzler Salad", desc: "Chicken 180gm, lettuce, mayo cocktail dressing, olive oil, dry peanut, honey, lemon juice, rosemary, oregano", prices: { "Rate": "990" } },
      { name: "Avacado Salad", desc: "Avocado, grilled chicken, lettuce, boiled sweet corn, boiled egg", prices: { "Rate": "1100" } },
      { name: "Nepali Salad", desc: "Cucumber, carrot, tomato, onion, chilly, radish lemon", prices: { "Rate": "500" } }
    ]
  },
  {
    category: "THUKPA",
    items: [
      { name: "Veg. Thukpa", prices: { "Rate": "600" } },
      { name: "Chicken Thukpa", prices: { "Rate": "650" } },
      { name: "Buff Thukpa", prices: { "Rate": "650" } },
      { name: "Egg Thukpa", prices: { "Rate": "650" } },
      { name: "Mix Thukpa", prices: { "Rate": "700" } }
    ]
  },
  {
    category: "NON ALCOHOL BEVERAGE",
    items: [
      { name: "Coke / Fanta / Sprite / Soda", prices: { "Glass": "495", "Bottle": "1320" } },
      { name: "Real Juice", prices: { "Glass": "605", "Bottle": "1870" } },
      { name: "Red Bull", prices: { "Glass": "—", "Bottle": "990" } },
      { name: "Tonic Water", prices: { "Glass": "—", "Bottle": "550" } },
      { name: "Ginger Ale", prices: { "Glass": "—", "Bottle": "550" } },
      { name: "Mineral Water", prices: { "Glass": "—", "Bottle": "220" } },
      { name: "Fresh Lemon Soda", prices: { "Glass": "495", "Bottle": "—" } },
      { name: "Fresh Juice", prices: { "Glass": "960", "Bottle": "—" } }
    ]
  },
  {
    category: "HOT BEVERAGE",
    items: [
      { name: "Hot Chocolate", prices: { "Rate": "1275" } },
      { name: "Black Tea", prices: { "Rate": "275" } },
      { name: "Milk Tea", prices: { "Rate": "330" } },
      { name: "Hot Lemon", prices: { "Rate": "385" } },
      { name: "Hot Lemon with Honey", prices: { "Rate": "495" } },
      { name: "Black Coffee", prices: { "Rate": "385" } },
      { name: "Milk Coffee", prices: { "Rate": "495" } }
    ]
  },
  {
    category: "VEG APPETIZERS",
    items: [
      { name: "French Fries", prices: { "Rate": "500" } },
      { name: "Veg Pakoda", prices: { "Rate": "600" } },
      { name: "Cheese Pakoda", prices: { "Rate": "750" } },
      { name: "Paneer Tawa", prices: { "Rate": "750" } },
      { name: "Peanut Sadeko", prices: { "Rate": "500" } },
      { name: "Cheese Balls", prices: { "Rate": "900" } },
      { name: "Masala Papad", prices: { "Rate": "500" } },
      { name: "Crispy Mushroom", prices: { "Rate": "750" } },
      { name: "Aalu Sadeko", prices: { "Rate": "550" } },
      { name: "Aalu Jeera", prices: { "Rate": "550" } },
      { name: "Chips Chilly", prices: { "Rate": "650" } },
      { name: "Kaju Fry", prices: { "Rate": "1050" } },
      { name: "Metang Aalu", prices: { "Rate": "700" } },
      { name: "Mix Veg Saute", prices: { "Rate": "750" } },
      { name: "Papad Dry", prices: { "Rate": "500" } },
      { name: "Wai Wai Sadeko", prices: { "Rate": "500" } },
      { name: "Paneer Chilly", prices: { "Rate": "800" } }
    ]
  },
  {
    category: "CHEF’S SPECIAL DISH",
    items: [
      { name: "Dry Fruits Set", prices: { "Rate": "1875" } },
      { name: "Mutton Tauko Fried", prices: { "Rate": "1550" } },
      { name: "Whole Fish Fry", prices: { "Rate": "3000" } },
      { name: "Garlic Prawn", prices: { "Rate": "1800" } },
      { name: "Mutton Poleko", prices: { "Rate": "1800" } }
    ]
  },
  {
    category: "SPECIAL PLATTER",
    items: [
      { name: "Buff Momo Platter", desc: "Steam, fry, kothey, sadeko, chilly, jhol", prices: { "Rate": "1550" } },
      { name: "Chicken Platter", desc: "Steam, fry, kothey, sadeko, chilly, jhol", prices: { "Rate": "1550" } },
      { name: "Top Durbar Veg Platter", desc: "—", prices: { "Rate": "3500" } },
      { name: "Top Durbar Non Veg Platter", desc: "—", prices: { "Rate": "7500" } }
    ]
  },
  {
    category: "TOP DURBAR CLUB SPECIAL",
    items: [
      { name: "Khaja Set", prices: { "Rate": "1775" } }
    ]
  },
  {
    category: "MAIN COURSE (VEG)",
    items: [
      { name: "Veg. Biryani", prices: { "Rate": "750" } },
      { name: "Veg. Manchurian With Rice", prices: { "Rate": "800" } },
      { name: "Veg. Curry With Rice", prices: { "Rate": "800" } },
      { name: "Paneer Butter Masala with Rice", prices: { "Rate": "975" } },
      { name: "Grilled Vegetable With Noodles", prices: { "Rate": "1275" } },
      { name: "Veg. Tempura", prices: { "Rate": "1175" } },
      { name: "Vegetable Cutlet", prices: { "Rate": "800" } },
      { name: "Cheese Stuffed Chicken", prices: { "Rate": "1200" } },
      { name: "Chicken Cordon Bleu", prices: { "Rate": "1300" } },
      { name: "Chicken Parma-In Mexican", prices: { "Rate": "1260" } },
      { name: "Popcorn Chicken", prices: { "Rate": "1100" } },
      { name: "Chicken Tacos", prices: { "Rate": "1250" } },
      { name: "Veg. Inchilara (Chilla Veg.)", prices: { "Rate": "1000" } }
    ]
  },
  {
    category: "NON VEG APPETIZERS",
    items: [
      { name: "Chicken Chilly", prices: { "Rate": "875" } },
      { name: "Chicken Sandeko", prices: { "Rate": "875" } },
      { name: "Chicken Boiled", prices: { "Rate": "775" } },
      { name: "Meat Balls", prices: { "Rate": "975" } },
      { name: "Chicken Lollipop", prices: { "Rate": "1300" } },
      { name: "Chicken Drumstick", prices: { "Rate": "1275" } },
      { name: "Hot Garlic Chicken Wings", prices: { "Rate": "1375" } },
      { name: "Chicken Tass", prices: { "Rate": "1200" } },
      { name: "Chicken Tawa", prices: { "Rate": "1200" } },
      { name: "Chicken Choila", prices: { "Rate": "1175" } },
      { name: "Timmur Chicken", prices: { "Rate": "1750" } },
      { name: "Chicken 65", prices: { "Rate": "1575" } },
      { name: "Chicken Roast", prices: { "Rate": "2175" } },
      { name: "Chicken Curcure", prices: { "Rate": "1375" } },
      { name: "Mutton Tass", prices: { "Rate": "1550" } },
      { name: "Mutton Boiled", prices: { "Rate": "1450" } },
      { name: "Mutton Chilly", prices: { "Rate": "1450" } },
      { name: "Mutton Sandeko", prices: { "Rate": "1450" } },
      { name: "Mutton Janeko Sekuwa", prices: { "Rate": "1875" } },
      { name: "Fish And Chips", prices: { "Rate": "1250" } },
      { name: "Fish Finger", prices: { "Rate": "1300" } },
      { name: "Chicken Sausage Fry", prices: { "Rate": "825" } },
      { name: "Buff Sausage Fry", prices: { "Rate": "825" } },
      { name: "Buff Chilly", prices: { "Rate": "800" } },
      { name: "Sukuti Sadeko", prices: { "Rate": "950" } },
      { name: "Buff Choila", prices: { "Rate": "950" } },
      { name: "Pork Chilly", prices: { "Rate": "950" } },
      { name: "Pork Tawa", prices: { "Rate": "1275" } },
      { name: "Pork Sekuwa", prices: { "Rate": "1275" } },
      { name: "Prown Chilly", prices: { "Rate": "1675" } },
      { name: "Grilled Prown", prices: { "Rate": "1775" } },
      { name: "Chrispy Prown", prices: { "Rate": "1800" } }
    ]
  },
  {
    category: "PREMIUM WHISKY",
    items: [
      { name: "Johnnie Walker Blue Label", prices: { "30ml": "3500", "60ml": "6500", "Quarter": "22000", "Half": "60000", "Bottle": "119000" } },
      { name: "Johnnie Walker 18Yrs", prices: { "30ml": "2400", "60ml": "4500", "Quarter": "13495", "Half": "27995", "Bottle": "53995" } },
      { name: "Johnnie Walker G/L Reserve", prices: { "30ml": "1250", "60ml": "2350", "Quarter": "6495", "Half": "13495", "Bottle": "34995" } },
      { name: "Johnnie Walker Double Black", prices: { "30ml": "1100", "60ml": "2100", "Quarter": "5995", "Half": "13495", "Bottle": "27995" } },
      { name: "Johnnie Walker B/L 12Yrs", prices: { "30ml": "1000", "60ml": "1900", "Quarter": "5495", "Half": "12995", "Bottle": "25995" } },
      { name: "Johnnie Walker Blond (700ml)", prices: { "30ml": "950", "60ml": "1850", "Quarter": "5295", "Half": "9495", "Bottle": "17995" } },
      { name: "Chivas 12", prices: { "30ml": "1000", "60ml": "1900", "Quarter": "5495", "Half": "12995", "Bottle": "25995" } },
      { name: "Chivas 18", prices: { "30ml": "2500", "60ml": "5000", "Quarter": "14495", "Half": "28995", "Bottle": "53995" } },
      { name: "Royal Salute (21)", prices: { "30ml": "3500", "60ml": "6500", "Quarter": "22000", "Half": "60000", "Bottle": "119000" } },
      { name: "Maker’s Mark", prices: { "30ml": "1100", "60ml": "2100", "Quarter": "5995", "Half": "13495", "Bottle": "27995" } }
    ]
  },
  {
    category: "REGULAR WHISKY",
    items: [
      { name: "Johnnie Walker Red Label", prices: { "30ml": "900", "60ml": "1750", "Quarter": "4995", "Half": "11995", "Bottle": "22995" } },
      { name: "Vat 69", prices: { "30ml": "850", "60ml": "1650", "Quarter": "4495", "Half": "10995", "Bottle": "22495" } },
      { name: "Teachers", prices: { "30ml": "900", "60ml": "1760", "Quarter": "4995", "Half": "11995", "Bottle": "22995" } }
    ]
  },
  {
    category: "SINGLE MALT",
    items: [
      { name: "The Singleton 18Yrs", prices: { "30ml": "2400", "60ml": "4500", "Quarter": "13495", "Half": "27995", "Bottle": "53995" } },
      { name: "The Singleton 15Yrs", prices: { "30ml": "1750", "60ml": "2700", "Quarter": "7995", "Half": "17995", "Bottle": "32995" } },
      { name: "The Singleton 12Yrs", prices: { "30ml": "1250", "60ml": "2700", "Quarter": "6995", "Half": "12495", "Bottle": "22995" } },
      { name: "Glenfiddich 12Yrs", prices: { "30ml": "1350", "60ml": "2600", "Quarter": "7495", "Half": "19495", "Bottle": "37995" } },
      { name: "Glenfiddich 15Yrs", prices: { "30ml": "1500", "60ml": "2900", "Quarter": "8495", "Half": "22995", "Bottle": "44995" } },
      { name: "Glenfiddich 18Yrs", prices: { "30ml": "2400", "60ml": "4500", "Quarter": "13495", "Half": "27995", "Bottle": "53995" } },
      { name: "Glenlivet 12Yrs", prices: { "30ml": "1350", "60ml": "2600", "Quarter": "7495", "Half": "19495", "Bottle": "37995" } },
      { name: "Glenlivet 15Yrs", prices: { "30ml": "1500", "60ml": "2900", "Quarter": "8495", "Half": "22995", "Bottle": "44995" } }
    ]
  },
  {
    category: "EXTRA SINGLE MALTS",
    items: [
      { name: "Glenlivet 18 Yrs", prices: { "30ml": "2400", "60ml": "4500", "Quarter": "13495", "Half": "27995", "Bottle": "53995" } },
      { name: "Laphroaid 10 Yrs", prices: { "30ml": "1750", "60ml": "2700", "Quarter": "7995", "Half": "17995", "Bottle": "53995" } }
    ]
  },
  {
    category: "BOURBON WHISKY",
    items: [
      { name: "Jack Daniels", prices: { "30ml": "1000", "60ml": "1900", "Quarter": "5495", "Half": "12995", "Bottle": "23995" } },
      { name: "Jim Beam", prices: { "30ml": "1000", "60ml": "1900", "Quarter": "5495", "Half": "12995", "Bottle": "23995" } }
    ]
  },
  {
    category: "VODKA",
    items: [
      { name: "Ciroc Ultra Premium", prices: { "30ml": "1155", "60ml": "2200", "Quarter": "6995", "Half": "14495", "Bottle": "27995" } },
      { name: "Ketel One", prices: { "30ml": "1000", "60ml": "1950", "Quarter": "6995", "Half": "13495", "Bottle": "24995" } },
      { name: "Grey Goose", prices: { "30ml": "1500", "60ml": "2950", "Quarter": "8495", "Half": "22995", "Bottle": "44995" } },
      { name: "ABSOLUT", prices: { "30ml": "950", "60ml": "1800", "Quarter": "5295", "Half": "12495", "Bottle": "23495" } },
      { name: "Smirnoff", prices: { "30ml": "850", "60ml": "1600", "Quarter": "4495", "Half": "11995", "Bottle": "22995" } },
      { name: "Alexander", prices: { "30ml": "1000", "60ml": "1950", "Quarter": "5995", "Half": "13495", "Bottle": "24995" } }
    ]
  },
  {
    category: "GIN",
    items: [
      { name: "Tanqueray London Dry", prices: { "30ml": "1000", "60ml": "1950", "Quarter": "5795", "Half": "13495", "Bottle": "24995" } },
      { name: "Gordon’s London Dry", prices: { "30ml": "850", "60ml": "1600", "Quarter": "4495", "Half": "11995", "Bottle": "22995" } },
      { name: "Bombay Sapphire", prices: { "30ml": "1155", "60ml": "2200", "Quarter": "5995", "Half": "14495", "Bottle": "27995" } },
      { name: "Beefeater", prices: { "30ml": "850", "60ml": "1600", "Quarter": "4495", "Half": "11995", "Bottle": "22995" } }
    ]
  },
  {
    category: "RUM",
    items: [
      { name: "Captain Morgan (Black/Spiced Gold)", prices: { "30ml": "950", "60ml": "1800", "Quarter": "5295", "Half": "12495", "Bottle": "23495" } },
      { name: "Malibu", prices: { "30ml": "1000", "60ml": "1900", "Quarter": "5495", "Half": "12995", "Bottle": "23995" } },
      { name: "Bacardi", prices: { "30ml": "1000", "60ml": "1900", "Quarter": "5495", "Half": "12995", "Bottle": "23995" } }
    ]
  },
  {
    category: "TEQUILA",
    items: [
      { name: "Agavita (Gold/Silver)", prices: { "Shot": "1600", "1 Set": "5000" } }
    ]
  },
  {
    category: "LIQUEUR",
    items: [
      { name: "Baileys Original Irish Cream", prices: { "60ml": "1800", "Quarter": "8995", "Half": "18495", "Bottle": "35995" } },
      { name: "Sambuca", prices: { "60ml": "1850", "Quarter": "1995", "Half": "18995", "Bottle": "36495" } },
      { name: "Kahlua", prices: { "60ml": "1850", "Quarter": "9495", "Half": "18995", "Bottle": "36495" } },
      { name: "Martini (Rosso Sweets / EXtradrv)", prices: { "60ml": "1850", "Quarter": "9495", "Half": "18995", "Bottle": "36495" } }
    ]
  },
  {
    category: "DESSERTS",
    items: [
      { name: "Ice Cream Vanilla", prices: { "Rate": "550" } },
      { name: "Ice Cream Chocolate", prices: { "Rate": "550" } },
      { name: "Ice Cream Strawberry", prices: { "Rate": "550" } },
      { name: "Sweet Curd", prices: { "Rate": "350" } },
      { name: "Fruits Cut With Ice Cream", prices: { "Rate": "750" } }
    ]
  }
];

const getIconForCategory = (categoryName) => {
  const upperCat = categoryName.toUpperCase();
  if (upperCat.includes('WINE') || upperCat.includes('CHAMPAGNE') || upperCat.includes('COCKTAIL')) return <Wine className="w-[18px] h-[18px] sm:w-5 sm:h-5" />;
  if (upperCat.includes('BEER')) return <Beer className="w-[18px] h-[18px] sm:w-5 sm:h-5" />;
  if (upperCat.includes('BEVERAGE') || upperCat.includes('MOCKTAIL') || upperCat.includes('WATER')) return <GlassWater className="w-[18px] h-[18px] sm:w-5 sm:h-5" />;
  if (upperCat.includes('COFFEE') || upperCat.includes('TEA') || upperCat.includes('HOT')) return <Coffee className="w-[18px] h-[18px] sm:w-5 sm:h-5" />;
  if (upperCat.includes('TOBACCO')) return <Cigarette className="w-[18px] h-[18px] sm:w-5 sm:h-5" />;
  if (upperCat.includes('PIZZA')) return <Pizza className="w-[18px] h-[18px] sm:w-5 sm:h-5" />;
  if (upperCat.includes('DESSERT') || upperCat.includes('ICE CREAM')) return <IceCream className="w-[18px] h-[18px] sm:w-5 sm:h-5" />;
  if (upperCat.includes('SHOOTER') || upperCat.includes('SPIRIT') || upperCat.includes('WHISKY') || upperCat.includes('VODKA') || upperCat.includes('RUM') || upperCat.includes('GIN') || upperCat.includes('TEQUILA') || upperCat.includes('LIQUEUR') || upperCat.includes('MALT')) return <Flame className="w-[18px] h-[18px] sm:w-5 sm:h-5" />;
  return <Utensils className="w-[18px] h-[18px] sm:w-5 sm:h-5" />;
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(menuData[0].category);

  // Get the data block for the active tab
  const activeData = menuData.find(c => c.category === activeCategory) || menuData[0];

  return (
    <section 
      id="menu" 
      className="relative overflow-hidden font-['DM_Sans'] bg-[#02040a] bg-[radial-gradient(ellipse_at_center,_#0a1128_0%,_#02040a_80%)] min-h-screen py-16 sm:py-24 lg:py-32 text-white"
      aria-labelledby="menu-heading"
    >
      {/* ─── GLOBAL STYLES FOR SCROLLBAR & BORDER ANIMATION ─── */}
      <style>{`
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @property --card-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spinAngle {
          to { --card-angle: 360deg; }
        }
      `}</style>

      {/* Decorative Blur Orbs for depth */}
      <div className="pointer-events-none absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-[#1e3a8a]/20 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#c49d52]/10 blur-[100px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12">
        
        {/* SEO FIX: Use <header> for the section's introduction */}
        <header className="mx-auto max-w-3xl text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="mb-5 sm:mb-6 inline-flex items-center gap-2 rounded-[2px] border border-[#c49d52]/50 px-3 py-1.5 backdrop-blur-sm bg-black/40">
            <span className="block h-1.5 w-1.5 rounded-full bg-[#c49d52] animate-pulse" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-[#c49d52]">
              Explore Our Offerings
            </span>
          </div>

          <h2
            id="menu-heading"
            className="font-['Cormorant_Garamond'] text-[clamp(36px,7vw,64px)] font-bold leading-[1.05] text-white tracking-[-0.01em]"
          >
            Traditional Tastes
            <br />
            <span className="text-[#e8c97a]">Modern Mixology</span>
          </h2>

          <div className="flex items-center justify-center gap-3 my-6 sm:my-7" aria-hidden="true">
            <div className="h-px w-10 sm:w-14 bg-[#c49d52]/40" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] text-[#c49d52]">✦</span>
            <div className="h-px w-10 sm:w-14 bg-[#c49d52]/40" />
          </div>
        </header>

        {/* ─── LAYOUT WRAPPER ─── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* ─── MOBILE: HORIZONTAL FILTER ROW ─── */}
          <nav className="w-full lg:hidden relative" aria-label="Mobile Menu Categories">
            {/* Fade effect edges for horizontal scroll */}
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#02040a] to-transparent pointer-events-none z-10" />
            
            <ul className="flex overflow-x-auto hide-scroll gap-3 pb-2 snap-x w-full">
              {menuData.map((cat) => {
                const isActive = activeCategory === cat.category;
                return (
                  <li key={cat.category} className="snap-center shrink-0">
                    <button
                      onClick={() => setActiveCategory(cat.category)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300 border ${
                        isActive
                          ? 'bg-gradient-to-r from-[#c49d52] to-[#e8c97a] text-[#02040a] border-transparent shadow-[0_0_15px_rgba(196,157,82,0.4)] scale-105'
                          : 'bg-white/[0.03] text-white/70 border-white/[0.05] hover:border-[#c49d52]/50 hover:text-[#c49d52]'
                      }`}
                    >
                      <span className={isActive ? "text-[#02040a]" : "text-[#c49d52]"}>{getIconForCategory(cat.category)}</span>
                      <span className="tracking-wide whitespace-nowrap">{cat.category}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ─── DESKTOP: VERTICAL SIDEBAR FILTER ─── */}
          <nav className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24" aria-label="Desktop Menu Categories">
            <ul className="flex flex-col gap-2.5 max-h-[75vh] overflow-y-auto hide-scroll pr-4 pb-12"
                style={{ maskImage: "linear-gradient(to bottom, black 90%, transparent)" }}
            >
              {menuData.map((cat) => {
                const isActive = activeCategory === cat.category;
                return (
                  <li key={cat.category} className="relative">
                    {/* Active State Gold Highlight Indicator */}
                    {isActive && (
                      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-[3px] h-3/5 bg-gradient-to-b from-[#e8c97a] to-[#c49d52] rounded-full shadow-[0_0_8px_rgba(196,157,82,0.6)]" />
                    )}
                    
                    <button
                      onClick={() => setActiveCategory(cat.category)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 border text-left ${
                        isActive
                          ? 'bg-gradient-to-r from-[#c49d52] to-[#e8c97a] text-[#02040a] border-transparent shadow-[0_0_20px_rgba(196,157,82,0.25)] translate-x-1'
                          : 'bg-white/[0.02] text-white/60 border-white/[0.05] hover:bg-white/[0.05] hover:border-[#c49d52]/40 hover:text-[#c49d52]'
                      }`}
                    >
                      <span className={`shrink-0 transition-colors ${isActive ? "text-[#02040a]" : "text-[#c49d52]"}`}>
                        {getIconForCategory(cat.category)}
                      </span>
                      <span className="tracking-wide">{cat.category}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ─── MAIN CONTENT AREA (ANIMATED BORDER CARD) ─── */}
          <main className="flex-1 w-full">
            <article className="relative p-[1.5px] rounded-[24px] h-full flex flex-col group/card shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
              
              {/* Animated Conic Border */}
              <span
                className="pointer-events-none absolute inset-0 rounded-[24px] z-0 opacity-100"
                style={{
                  padding: "1.5px",
                  background:
                    "conic-gradient(from var(--card-angle, 0deg), transparent 0deg, transparent 200deg, rgba(196,157,82,0.1) 260deg, rgba(196,157,82,0.7) 320deg, rgba(232,201,122,1) 346deg, rgba(196,157,82,0.4) 355deg, transparent 360deg)",
                  animation: "spinAngle 4.5s linear infinite",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col h-full rounded-[22px] border border-white/[0.05] bg-[#080C18]/85 backdrop-blur-xl p-4 sm:p-8 md:p-10">
                
                {/* Internal Card Header */}
                <header className="flex flex-col mb-6 sm:mb-8 px-2 sm:px-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl border border-[#c49d52]/30 bg-gradient-to-br from-[#c49d52]/15 to-transparent text-[#c49d52] shrink-0">
                      {getIconForCategory(activeData.category)}
                    </div>
                    <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-[#e8c97a] tracking-wide">
                      {activeData.category}
                    </h3>
                  </div>
                  {/* Subtle Ethereal Header Divider */}
                  <div className="mt-6 sm:mt-8 h-px w-full bg-gradient-to-r from-[#c49d52]/40 via-[#c49d52]/10 to-transparent" aria-hidden="true" />
                </header>
                
                {/* Menu Items List */}
                <ul className="flex flex-col" role="list">
                  {activeData.items.map((item, itemIdx) => (
                    <li 
                      key={itemIdx} 
                      className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-5 sm:py-6 px-4 sm:px-6 rounded-2xl transition-all duration-300 hover:bg-white/[0.02] group"
                    >
                      {/* Inner Row Divider */}
                      <div className="absolute bottom-0 left-4 sm:left-6 right-4 sm:right-6 h-px bg-gradient-to-r from-[#c49d52]/20 via-[#c49d52]/5 to-transparent group-last:hidden transition-opacity duration-300 group-hover:opacity-50" aria-hidden="true" />
                      
                      <div className="flex-1 pr-4">
                        <h4 className="font-['Cormorant_Garamond'] font-bold text-[22px] sm:text-2xl text-white group-hover:text-[#e8c97a] transition-colors duration-300">
                          {item.name}
                        </h4>
                        {item.desc && item.desc !== "—" && (
                          <p className="text-[13px] sm:text-[14px] text-white/50 mt-1.5 leading-relaxed font-light">
                            {item.desc}
                          </p>
                        )}
                      </div>
                      
                      {/* Pricing Block */}
                      <div className="flex flex-wrap gap-x-6 gap-y-3 mt-2 sm:mt-0 justify-start sm:justify-end shrink-0">
                        {Object.entries(item.prices).map(([key, value], pIdx) => (
                          <div key={pIdx} className="flex flex-col items-start sm:items-end">
                            {key !== "Rate" && key !== "Price" && key !== "Bottle Price" && (
                              <span className="text-[10px] uppercase tracking-[0.2em] text-[#c49d52]/70 mb-1">
                                {key}
                              </span>
                            )}
                            <span className="font-['DM_Sans'] text-[15px] sm:text-[17px] font-medium text-[#e8c97a] tabular-nums tracking-wide">
                              {value !== "—" ? `Rs. ${value}` : "-"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>

              </div>
            </article>
          </main>

        </div>
      </div>
    </section>
  );
};

export default memo(Menu);