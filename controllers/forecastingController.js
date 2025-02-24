import { LSTMModel } from "../forecasting/lstmModel.js";

const GATES = [1, 2, 3, 7];

export const trainModel = async (req, res) => {
  const { gate } = req.query;
  if (gate && !GATES.includes(parseInt(gate, 10))) {
    return res.status(400).json({ message: "Invalid gate" });
  }

  try {
    if (gate) {
      const modelo = new LSTMModel(gate);
      modelo.createModel();
      await modelo.loadTensors();
      await modelo.trainModel();
      await modelo.saveModel();

      return res.status(200).json({ message: "Model trained" });
    }

    for (const gate of GATES) {
      const modelo = new LSTMModel(gate);
      modelo.createModel();
      await modelo.loadTensors();
      await modelo.trainModel();
      await modelo.saveModel();
    }

    res.status(200).json({ message: "Models trained" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const predictNextDay = async (req, res) => {
  const { gate } = req.query;
  if (gate && !GATES.includes(parseInt(gate, 10))) {
    return res.status(400).json({ message: "Invalid gate" });
  }

  try {
    if (gate) {
      const modelo = new LSTMModel(gate);
      await modelo.loadModel();
      const predictions = modelo.predictNextDay();

      return res.status(200).json({ predictions });
    }

    const predictions = {};
    for (const gate of GATES) {
      const modelo = new LSTMModel(gate);
      await modelo.loadModel();
      predictions[gate] = modelo.predictNextDay();
    }

    res.status(200).json({ predictions });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
