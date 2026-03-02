import type { PredictionRow, PredictionRowForm } from "../types/prediction";

const toNumber = (value: string): number => {
  if (value.trim() === "") {
    return NaN;
  }
  return Number(value);
};

const numberOrNull = (value: string): number | null => {
  const trimmed = value.trim();
  if (trimmed === "") {
    return null;
  }
  return Number(trimmed);
};

const stringOrNull = (value: string): string | null => {
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
};


export function buildRequestRow(form: PredictionRowForm): PredictionRow {
  return {
    BaseOfCode: toNumber(form.BaseOfCode),
    BaseOfData: toNumber(form.BaseOfData),
    Characteristics: toNumber(form.Characteristics),
    DllCharacteristics: toNumber(form.DllCharacteristics),
    Entropy: toNumber(form.Entropy),
    FileAlignment: toNumber(form.FileAlignment),
    FirstSeenDate: form.FirstSeenDate,
    Identify: stringOrNull(form.Identify),
    ImageBase: toNumber(form.ImageBase),
    ImportedDlls: stringOrNull(form.ImportedDlls),
    ImportedSymbols: stringOrNull(form.ImportedSymbols),
    Machine: toNumber(form.Machine),
    Magic: numberOrNull(form.Magic),
    NumberOfRvaAndSizes: toNumber(form.NumberOfRvaAndSizes),
    NumberOfSections: toNumber(form.NumberOfSections),
    NumberOfSymbols: toNumber(form.NumberOfSymbols),
    PE_TYPE: numberOrNull(form.PE_TYPE),
    PointerToSymbolTable: toNumber(form.PointerToSymbolTable),
    SHA1: stringOrNull(form.SHA1),
    Size: toNumber(form.Size),
    SizeOfCode: toNumber(form.SizeOfCode),
    SizeOfHeaders: toNumber(form.SizeOfHeaders),
    SizeOfImage: toNumber(form.SizeOfImage),
    SizeOfInitializedData: toNumber(form.SizeOfInitializedData),
    SizeOfOptionalHeader: numberOrNull(form.SizeOfOptionalHeader),
    SizeOfUninitializedData: toNumber(form.SizeOfUninitializedData),
    TimeDateStamp: toNumber(form.TimeDateStamp),
    Label: null
  };
}
