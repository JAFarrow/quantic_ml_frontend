import type { PredictionResult } from "../types/api";

interface ResultFlagProps {
  result: PredictionResult;
}

const ResultFlag = ({ result }: ResultFlagProps) => {
  const label = result.prediction === 1 ? "Malware" : "Clearware";
  const styleClass = result.prediction === 1 ? "malware" : "clearware";
  return (
    <span className={`result-pill ${styleClass}`}>
      {label}
      <small>{(result.probability * 100).toFixed(1)}%</small>
    </span>
  );
};

export default ResultFlag;
