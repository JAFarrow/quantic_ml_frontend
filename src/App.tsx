import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import CsvResultsDialog from "./components/CsvResultsDialog";
import RowFieldInput from "./components/RowFieldInput";
import ResultFlag from "./components/ResultFlag";
import {
  predictionFieldDefinitions,
  createEmptyPredictionRowForm,
  PredictionFieldKey,
  prefilledPredictionRows
} from "./data/predictionFields";
import { buildRequestRow } from "./utils/rows";
import {
  parseEnvelope,
  PredictionResult,
  InsertResponseData,
  UploadResponseData
} from "./types/api";
import { insertEndpoint, uploadEndpoint } from "./config/api";
import type { PredictionRowForm } from "./types/prediction";

type AsyncState = {
  state: "idle" | "loading" | "success" | "error";
  message?: string;
};

const App = () => {
  const [rows, setRows] = useState<PredictionRowForm[]>(() =>
    prefilledPredictionRows.map((row) => ({ ...row }))
  );
  const [rowResults, setRowResults] = useState<Record<number, PredictionResult>>({});
  const [rowStatus, setRowStatus] = useState<AsyncState>({ state: "idle" });
  const [isRowSubmitting, setIsRowSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<AsyncState>({ state: "idle" });
  const [isUploadSubmitting, setIsUploadSubmitting] = useState(false);
  const [csvDialog, setCsvDialog] = useState<{ data: UploadResponseData; message: string } | null>(null);

  const resetRowFeedback = () => {
    setRowResults({});
    setRowStatus({ state: "idle" });
  };

  const updateRowValue = (index: number, key: PredictionFieldKey, value: string) => {
    setRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
    resetRowFeedback();
  };

  const addRow = () => {
    setRows((prev) => [...prev, createEmptyPredictionRowForm()]);
    resetRowFeedback();
  };

  const removeRow = (index: number) => {
    if (rows.length === 1) {
      return;
    }
    setRows((prev) => prev.filter((_, idx) => idx !== index));
    resetRowFeedback();
  };

  const handleSubmitRows = async () => {
    setIsRowSubmitting(true);
    setRowStatus({ state: "loading", message: "Submitting rows..." });
    const payloadRows = rows.map(buildRequestRow);

    try {
      const response = await fetch(insertEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ rows: payloadRows })
      });
      const envelope = await parseEnvelope<InsertResponseData>(response);
      if (!response.ok || !envelope.success || !envelope.data) {
        const detail = envelope.errors ? JSON.stringify(envelope.errors) : undefined;
        setRowStatus({
          state: "error",
          message: detail ? `${envelope.message} — ${detail}` : envelope.message || "Submission failed"
        });
        setRowResults({});
        return;
      }

      const resultsMap: Record<number, PredictionResult> = {};
      envelope.data.results.forEach((result) => {
        resultsMap[result.row_index] = result;
      });
      setRowResults(resultsMap);
      setRowStatus({ state: "success", message: envelope.message || "Inference succeeded" });
    } catch (error) {
      setRowStatus({ state: "error", message: (error as Error).message });
      setRowResults({});
    } finally {
      setIsRowSubmitting(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setUploadStatus({ state: "idle" });
  };

  const handleCsvUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      setUploadStatus({ state: "error", message: "Attach a .csv file before uploading." });
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      setUploadStatus({ state: "error", message: "File must have a .csv extension." });
      return;
    }

    setIsUploadSubmitting(true);
    setUploadStatus({ state: "loading", message: "Uploading CSV..." });

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(uploadEndpoint, {
        method: "POST",
        body: formData
      });
      const envelope = await parseEnvelope<UploadResponseData>(response);

      if (!response.ok || !envelope.success || !envelope.data) {
        const detail = envelope.errors ? JSON.stringify(envelope.errors) : undefined;
        setUploadStatus({
          state: "error",
          message: detail ? `${envelope.message} — ${detail}` : envelope.message || "Upload failed"
        });
        return;
      }

      setUploadStatus({ state: "success", message: envelope.message || "Batch inference complete" });
      setCsvDialog({ data: envelope.data, message: envelope.message || "Batch inference complete" });
    } catch (error) {
      setUploadStatus({ state: "error", message: (error as Error).message });
    } finally {
      setIsUploadSubmitting(false);
    }
  };

  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Executable Metadata Ingestion</p>
      </header>

      <section className="row-submission">
        <div className="section-header">
          <h2>Manual Entry</h2>
        </div>
        <div className="status-row">
          <span className={`status-pill ${rowStatus.state}`}>{rowStatus.message || "Ready"}</span>
          <div className="row-actions">
            <button type="button" className="ghost" onClick={addRow}>
              + Add row
            </button>
            <button type="button" className="primary" onClick={handleSubmitRows} disabled={isRowSubmitting}>
              {isRowSubmitting ? "Submitting…" : "Submit rows"}
            </button>
          </div>
        </div>

        <div className="row-list">
          {rows.map((row, index) => (
            <article className="row-card" key={`row-${index}`}>
              <header className="row-card-header">
                <div>
                  <p className="row-title">Record {index + 1}</p>
                </div>
                <div className="row-card-meta">
                  {rowResults[index] && <ResultFlag result={rowResults[index]} />}
                  {rows.length > 1 && (
                    <button
                      type="button"
                      className="ghost"
                      onClick={() => removeRow(index)}
                      aria-label={`Remove row ${index + 1}`}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </header>
              <div className="field-grid">
                {predictionFieldDefinitions.map((field) => (
                  <RowFieldInput
                    key={`${field.key}-${index}`}
                    field={field}
                    value={row[field.key]}
                    onChange={(value) => updateRowValue(index, field.key, value)}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="csv-panel">
        <div className="section-header">
          <h2>CSV batch upload</h2>
        </div>
        <form className="csv-form" onSubmit={handleCsvUpload}>
          <label className="file-input">
            <input type="file" accept=".csv,text/csv" onChange={handleFileChange} />
            <span>{selectedFile ? selectedFile.name : "Choose CSV file"}</span>
          </label>
          <button type="submit" className="primary" disabled={isUploadSubmitting}>
            {isUploadSubmitting ? "Uploading…" : "Upload CSV"}
          </button>
        </form>
        <p className={`status-pill ${uploadStatus.state}`}>{uploadStatus.message || "No file uploaded"}</p>
      </section>

      {csvDialog && (
        <CsvResultsDialog data={csvDialog.data} message={csvDialog.message} onClose={() => setCsvDialog(null)} />
      )}
    </main>
  );
};

export default App;
