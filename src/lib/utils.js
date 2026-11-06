export const UNIT_MAP = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "টি",
};

export function toBengaliNumber(num) {
  if (num === null || num === undefined || isNaN(Number(num))) {
    return "০";
  }
  return Number(num).toLocaleString("bn-BD");
}

export function getBengaliDate(date = new Date()) {
  try {
    return new Date(date).toLocaleDateString("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export function getUnitLabelBn(unit) {
  const mapped = UNIT_MAP[unit] || unit || "একক";
  return `প্রতি ${mapped}`;
}

export function calculateMarketStats(markets = []) {
  if (!markets || !Array.isArray(markets) || markets.length === 0) {
    return {
      min: 0,
      max: 0,
      avg: 0,
      lowestMarket: null,
    };
  }

  const mins = markets.map((m) => Number(m.min) || 0);
  const maxs = markets.map((m) => Number(m.max) || 0);

  const minPrice = Math.min(...mins);
  const maxPrice = Math.max(...maxs);

  const sumMin = mins.reduce((sum, v) => sum + v, 0);
  const sumMax = maxs.reduce((sum, v) => sum + v, 0);
  const avgPrice = Math.round((sumMin + sumMax) / (2 * markets.length));

  const lowestMarket =
    markets.find((m) => Number(m.min) === minPrice) || markets[0];

  return {
    min: minPrice,
    max: maxPrice,
    avg: avgPrice,
    lowestMarket,
  };
}

