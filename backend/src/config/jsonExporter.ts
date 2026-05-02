import {
  SpanExporter,
  ReadableSpan
} from "@opentelemetry/sdk-trace-base";
import {
  ExportResult,
  ExportResultCode
} from "@opentelemetry/core";
import fs from "fs";
import path from "path";


export class JsonFileExporter implements SpanExporter {
  export(
    spans: ReadableSpan[],
    resultCallback: (result: ExportResult) => void
  ): void {
    const data = spans.map(span => ({
      name: span.name,
      durationMs: span.duration[ 0 ] / 1e6,
      startTime: span.startTime,
      attributes: span.attributes
    }));

    // the path to the logs/traces.json file
    const logsDir = path.join(__dirname, "../../logs");
    const filePath = path.join(logsDir, "traces.json");

    // if the logs folder doesn't exist, create a new one
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    // append data to the traces.json file
    fs.appendFileSync(
      filePath,
      JSON.stringify(data) + "\n"
    );

    resultCallback({ code: ExportResultCode.SUCCESS });
  }

  shutdown(): Promise<void> {
    return Promise.resolve();
  }
}
