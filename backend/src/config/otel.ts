import { NodeSDK } from "@opentelemetry/sdk-node";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { JsonFileExporter } from "./jsonExporter";
import { PrismaInstrumentation } from "@prisma/instrumentation";


export function setupOpenTelemetry() {
  // initialize exporter
  const exporter = new JsonFileExporter();

  // initialize SDK
  const sdk = new NodeSDK({
    traceExporter: exporter,
    spanProcessor: new SimpleSpanProcessor(exporter),
    instrumentations: [
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
      new PrismaInstrumentation(),
    ]
  });

  // start sdk
  sdk.start();
}
