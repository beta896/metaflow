import * as tf from '@tensorflow/tfjs-node';

console.log('✅ TensorFlow.js Native Binding Check');
console.log('Version:', tf.version.tfjs);
console.log('Backend:', tf.getBackend());

const tensor = tf.tensor([1, 2, 3, 4]);
tensor.print();