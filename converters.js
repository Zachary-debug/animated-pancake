export const CATEGORIES = {
  Length: {
    base: "m",
    units: {
      m: { name: "Meters", toBase: v => v, fromBase: v => v },
      km: { name: "Kilometers", toBase: v => v * 1000, fromBase: v => v / 1000 },
      cm: { name: "Centimeters", toBase: v => v / 100, fromBase: v => v * 100 },
      mm: { name: "Millimeters", toBase: v => v / 1000, fromBase: v => v * 1000 },
      in: { name: "Inches", toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
      ft: { name: "Feet", toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
    }
  },

  Weight: {
    base: "kg",
    units: {
      kg: { name: "Kilograms", toBase: v => v, fromBase: v => v },
      g: { name: "Grams", toBase: v => v / 1000, fromBase: v => v * 1000 },
      lb: { name: "Pounds", toBase: v => v * 0.45359237, fromBase: v => v / 0.45359237 },
      oz: { name: "Ounces", toBase: v => v * 0.0283495231, fromBase: v => v / 0.0283495231 },
    }
  },

  Temperature: {
    base: "K",
    units: {
      C: {
        name: "Celsius",
        toBase: v => v + 273.15,
        fromBase: v => v - 273.15
      },
      F: {
        name: "Fahrenheit",
        toBase: v => (v - 32) * (5/9) + 273.15,
        fromBase: v => (v - 273.15) * (9/5) + 32
      },
      K: {
        name: "Kelvin",
        toBase: v => v,
        fromBase: v => v
      }
    }
  },

  Volume: {
    base: "l",
    units: {
      l: { name: "Liters", toBase: v => v, fromBase: v => v },
      ml: { name: "Milliliters", toBase: v => v / 1000, fromBase: v => v * 1000 },
      m3: { name: "Cubic meters", toBase: v => v * 1000, fromBase: v => v / 1000 },
      gal: { name: "US Gallons", toBase: v => v * 3.785411784, fromBase: v => v / 3.785411784 },
    }
  },

  Mass: {
    // use grams as the base for Mass for fine-grained conversions
    base: "g",
    units: {
      mg: { name: "Milligrams", toBase: v => v / 1000, fromBase: v => v * 1000 },
      g:  { name: "Grams", toBase: v => v, fromBase: v => v },
      kg: { name: "Kilograms", toBase: v => v * 1000, fromBase: v => v / 1000 },
      t:  { name: "Metric tons", toBase: v => v * 1_000_000, fromBase: v => v / 1_000_000 },
      lb: { name: "Pounds", toBase: v => v * 453.59237, fromBase: v => v / 453.59237 },
      oz: { name: "Ounces", toBase: v => v * 28.349523125, fromBase: v => v / 28.349523125 },
    }
  }
};

export function convert(categoryKey, fromKey, toKey, value){
  const cat = CATEGORIES[categoryKey];
  if (!cat) return NaN;
  const from = cat.units[fromKey];
  const to = cat.units[toKey];
  if (!from || !to) return NaN;
  const base = from.toBase(value);
  return to.fromBase(base);
}