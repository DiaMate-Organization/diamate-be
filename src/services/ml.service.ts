import * as tf from '@tensorflow/tfjs-node';

export async function loadModel() {
  try {
    const model = await tf.loadLayersModel('file://ml_model/model.json');
    console.log('\nModel loaded successfully!');
    return model;
  } catch (error) {
    console.error('Error loading or using the model:', error);
    throw error;
  }
}

function dummyScaler(features: number[]): number[] {
  const maxValues = [1, 1, 50, 1, 1, 1, 1, 1, 5, 30, 1, 1, 13, 6, 8];
  return features.map((f, i) => f / maxValues[i]);
}

function padFeatures(x: number[], targetDim: number): tf.Tensor4D {
  const targetLength = targetDim * targetDim;
  if (x.length > targetLength) throw new Error("Target dimension terlalu kecil");

  const padded = new Array(targetLength).fill(0);
  for (let i = 0; i < x.length; i++) {
    padded[i] = x[i];
  }

  return tf.tensor4d(padded, [1, targetDim, targetDim, 1]);
}

export async function predictDiabetes(
  model: tf.LayersModel,
  features: Record<string, number>,
  targetImageDim: number
): Promise<number> {
  const featureOrder = [
    'HighBP', 'HighChol', 'BMI', 'Stroke', 'HeartDiseaseorAttack',
    'PhysActivity', 'HvyAlcoholConsump', 'AnyHealthcare',
    'GenHlth', 'PhysHlth', 'DiffWalk', 'Sex', 'Age', 'Education', 'Income'
  ];

  const featureArray = featureOrder.map((key) => {
    if (!(key in features)) throw new Error(`Missing feature: ${key}`);
    return features[key];
  });

  const scaled = dummyScaler(featureArray);

  const inputTensor = padFeatures(scaled, targetImageDim);

  const predictionTensor = model.predict(inputTensor) as tf.Tensor;
  const predictionProbability = (await predictionTensor.data())[0];

  return predictionProbability;
}

export async function mainPredict() {
  const model = await loadModel();

  const dummyInput = {
    "HighBP": 1,               // tekanan darah tinggi
    "HighChol": 0,            // kolesterol normal
    "BMI": 29,                // BMI sedang (berisiko tapi tidak ekstrem)
    "Stroke": 0,              // tidak pernah stroke
    "HeartDiseaseorAttack": 0, // tidak punya riwayat jantung
    "PhysActivity": 1,        // rutin aktif fisik
    "HvyAlcoholConsump": 0,   // tidak konsumsi alkohol berlebihan
    "AnyHealthcare": 1,       // akses layanan kesehatan
    "GenHlth": 3,             // kondisi kesehatan cukup
    "PhysHlth": 5,            // hari masalah fisik sedikit
    "DiffWalk": 0,            // tidak kesulitan jalan
    "Sex": 1,                 // jenis kelamin laki-laki (atau perempuan, tergantung data)
    "Age": 8,                 // kelompok usia sekitar 35-39 (sesuaikan skala)
    "Education": 4,           // pendidikan menengah ke atas
    "Income": 4               // pendapatan sedang
  };

  const targetDim = 4;

  const prob = await predictDiabetes(model, dummyInput, targetDim);

  console.log(`Prediksi risiko diabetes (probabilitas): ${prob.toFixed(4)}`);

  if (prob < 0.3) {
    console.log('Risiko diabetes: Rendah');
  } else if (prob < 0.6) {
    console.log('Risiko diabetes: Sedang');
  } else {
    console.log('Risiko diabetes: Tinggi');
  }
}