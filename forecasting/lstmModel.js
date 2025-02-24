import * as tf from "@tensorflow/tfjs-node";
import {
  loadDataset,
  normalize,
  denormalize,
  transformData,
} from "./dataProcessing.js";

export class LSTMModel {
  static sequenceLength = 24;

  constructor(gate) {
    this.gate = gate;
  }

  createModel() {
    const model = tf.sequential();
    model.add(
      tf.layers.lstm({
        units: 64,
        inputShape: [LSTMModel.sequenceLength, 1],
      })
    );
    model.add(tf.layers.dense({ units: LSTMModel.sequenceLength }));

    model.compile({
      optimizer: tf.train.adam(0.01),
      loss: tf.losses.meanSquaredError,
    });

    this.model = model;
  }

  async loadTensors() {
    const hoursPerDay = 24;

    const dataset = await loadDataset(
      `./forecasting/datasets/puerta${this.gate}.json`,
      "people"
    );

    // Normalize the dataset
    this.maxVal = Math.max(...dataset);
    this.minVal = Math.min(...dataset);
    const normalizedDataset = normalize(dataset, this.minVal, this.maxVal);
    this.lastSequence = normalizedDataset
      .slice(-LSTMModel.sequenceLength)
      .map((value) => [value]);

    // Prepare data for LSTM model
    const data = [];
    const labels = [];

    // Generate input and output sequences
    for (
      let i = 0;
      i < normalizedDataset.length - LSTMModel.sequenceLength - hoursPerDay;
      i++
    ) {
      const inputSequence = normalizedDataset.slice(
        i,
        i + LSTMModel.sequenceLength
      );
      const outputSequence = normalizedDataset.slice(
        i + LSTMModel.sequenceLength,
        i + LSTMModel.sequenceLength + hoursPerDay
      );
      data.push(inputSequence.map((value) => [value]));
      labels.push(outputSequence);
    }

    // Convert data and labels to tensors
    this.inputTensor = tf.tensor3d(data);
    this.outputTensor = tf.tensor2d(labels);
  }

  async trainModel() {
    await this.model.fit(this.inputTensor, this.outputTensor, {
      epochs: 64,
      batchSize: 24,
    });
  }

  predictNextDay() {
    const input = tf.tensor3d([this.lastSequence]);
    const predictions = this.model.predict(input).arraySync()[0];

    // Denormalize predictions
    const denormalizedPredictions = denormalize(
      predictions,
      this.minVal,
      this.maxVal
    );

    return transformData(denormalizedPredictions);
  }

  predict(input) {
    if (input.length !== LSTMModel.sequenceLength) {
      console.log(
        `Input must have exactly ${LSTMModel.sequenceLength} elements`
      );
      return;
    }
    const normalizedInput = normalize(input, this.minVal, this.maxVal);
    const sequence = normalizedInput.map((value) => [value]);
    const inputTensor = tf.tensor3d([sequence]); // Wrap in an extra array for batch size
    const predictions = this.model.predict(inputTensor).arraySync()[0];

    // Denormalize predictions
    const denormalizedPredictions = denormalize(
      predictions,
      this.minVal,
      this.maxVal
    );

    return transformData(denormalizedPredictions);
  }

  async saveModel() {
    const saveResult = await this.model.save(
      `file://./forecasting/trainedModels/puerta${this.gate}`
    );
    console.log("Model saved successfully:", saveResult);
  }

  async loadModel() {
    const dataset = await loadDataset(
      `./forecasting/datasets/puerta${this.gate}.json`,
      "people"
    );
    this.maxVal = Math.max(...dataset);
    this.minVal = Math.min(...dataset);
    const normalizedDataset = normalize(dataset, this.minVal, this.maxVal);
    this.lastSequence = normalizedDataset
      .slice(-LSTMModel.sequenceLength)
      .map((value) => [value]);
    this.model = await tf.loadLayersModel(
      `file://./forecasting/trainedModels/puerta${this.gate}/model.json`
    );
  }
}
