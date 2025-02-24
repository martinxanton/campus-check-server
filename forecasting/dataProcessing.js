import { readJSON } from "../utils/utils.js";

export const loadDataset = async (relativePath, feature) => {
  try {
    const data = await readJSON(relativePath);
    return data.map((row) => row[feature]);
  } catch (error) {
    console.error("Error loading the dataset:", error);
  }
};

export const normalize = (dataset, min, max) => {
  return dataset.map((value) => (value - min) / (max - min));
};

export const denormalize = (dataset, min, max) => {
  return dataset.map((value) => value * (max - min) + min);
};

export const transformData = (dataset) => {
  return dataset.map((value) => {
    if (value < 0) {
      return 0;
    }
    return Math.round(value);
  });
};
