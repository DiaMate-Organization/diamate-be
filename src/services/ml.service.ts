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
  return features.map((f) => f / 10);
}

function padFeatures(x: number[], targetDim: number): tf.Tensor4D {
  const targetLength = targetDim * targetDim;
  if (x.length > targetLength) {
    throw new Error('Target dimension terlalu kecil untuk jumlah fitur');
  }
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
    HighBP: 1,              
    HighChol: 1,             
    BMI: 24,                 
    Stroke: 1,               
    HeartDiseaseorAttack: 1,
    PhysActivity: 1,        
    HvyAlcoholConsump: 1,    
    AnyHealthcare: 0,        
    GenHlth: 5,             
    PhysHlth: 5,             
    DiffWalk: 1,             
    Sex: 1,                  
    Age: 50,                  
    Education: 2,           
    Income: 1                
  };

  const targetDim = 4;

  const prob = await predictDiabetes(model, dummyInput, targetDim);

  console.log(`Prediksi risiko diabetes (probabilitas): ${prob.toFixed(4)}`);

  if (prob > 0.5) {
    console.log('Risiko diabetes: Sedang/Tinggi');
  } else {
    console.log('Risiko diabetes: Rendah');
  }
}