export interface PredictionRow {
  BaseOfCode: number;
  BaseOfData: number;
  Characteristics: number;
  DllCharacteristics: number;
  Entropy: number;
  FileAlignment: number;
  FirstSeenDate: string;
  Identify: string | null;
  ImageBase: number;
  ImportedDlls: string | null;
  ImportedSymbols: string | null;
  Machine: number;
  Magic: number | null;
  NumberOfRvaAndSizes: number;
  NumberOfSections: number;
  NumberOfSymbols: number;
  PE_TYPE: number | null;
  PointerToSymbolTable: number;
  SHA1: string | null;
  Size: number;
  SizeOfCode: number;
  SizeOfHeaders: number;
  SizeOfImage: number;
  SizeOfInitializedData: number;
  SizeOfOptionalHeader: number | null;
  SizeOfUninitializedData: number;
  TimeDateStamp: number;
  Label?: 0 | 1 | null;
}

export type PredictionRowForm = {
  [K in keyof PredictionRow]-?: string;
};
