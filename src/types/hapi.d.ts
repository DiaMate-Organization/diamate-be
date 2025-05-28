import * as tf from "@tensorflow/tfjs-node";

declare module "@hapi/hapi" {
  interface ServerApplicationState {
    model?: tf.LayersModel;
  }
}
