export interface ApiEnvelope<Data> {
  success: boolean;
  message: string;
  errors: Record<string, unknown> | null;
  data: Data | null;
}

export interface PredictionResult {
  row_index: number;
  prediction: 0 | 1;
  probability: number;
}

export interface InsertResponseData {
  count: number;
  results: PredictionResult[];
}

export interface UploadEvaluation {
  available: boolean;
  accuracy?: number;
  auc?: number;
  confusion_matrix?: {
    tp: number;
    tn: number;
    fp: number;
    fn: number;
  };
  message?: string;
}

export interface UploadResponseData {
  count: number;
  results: PredictionResult[];
  evaluation?: UploadEvaluation;
}

export async function parseEnvelope<Data>(response: Response): Promise<ApiEnvelope<Data>> {
  const text = await response.text();
  if (!text) {
    return {
      success: false,
      message: "Server responded with empty payload",
      errors: { server: "No body" },
      data: null
    };
  }

  try {
    return JSON.parse(text) as ApiEnvelope<Data>;
  } catch (error) {
    return {
      success: false,
      message: "Unable to parse server response",
      errors: { server: text, parseError: (error as Error).message },
      data: null
    };
  }
}
