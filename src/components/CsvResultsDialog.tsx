import type { UploadResponseData } from "../types/api";

interface Props {
  data: UploadResponseData;
  message: string;
  onClose: () => void;
}

const CsvResultsDialog = ({ data, message, onClose }: Props) => (
  <div className="dialog-backdrop" role="dialog" aria-modal="true">
    <div className="dialog-card">
      <header className="dialog-header">
        <div>
          <p className="eyebrow">CSV upload</p>
          <h3>Batch results</h3>
        </div>
        <button type="button" className="ghost" onClick={onClose}>
          Close
        </button>
      </header>
      <p className="dialog-message">{message}</p>
      <section className="dialog-section">
        <h4>Row predictions</h4>
        <ul>
          {data.results.map((result) => (
            <li key={`row-${result.row_index}`}>
              Row {result.row_index + 1}: {result.prediction === 1 ? "Malware" : "Clearware"} ({(
                result.probability * 100
              ).toFixed(1)}%)
            </li>
          ))}
        </ul>
      </section>
      {data.evaluation && (
        <section className="dialog-section">
          <h4>Evaluation</h4>
          {data.evaluation.available ? (
            <ul>
              {data.evaluation.accuracy !== undefined && <li>Accuracy: {data.evaluation.accuracy}</li>}
              {data.evaluation.auc !== undefined && <li>AUC: {data.evaluation.auc}</li>}
              {data.evaluation.confusion_matrix && (
                <li>
                  Confusion: TN {data.evaluation.confusion_matrix.tn} · FP {data.evaluation.confusion_matrix.fp} · FN {data.evaluation.confusion_matrix.fn} · TP {data.evaluation.confusion_matrix.tp}
                </li>
              )}
            </ul>
          ) : (
            <p>{data.evaluation.message ?? "Evaluation is unavailable for this upload."}</p>
          )}
        </section>
      )}
      <footer className="dialog-footer">
        <span>{data.count} rows processed</span>
        <button type="button" className="primary" onClick={onClose}>
          Done
        </button>
      </footer>
    </div>
  </div>
);

export default CsvResultsDialog;
