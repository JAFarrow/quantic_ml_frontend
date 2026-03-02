import type { PredictionRowForm } from "../types/prediction";

export type PredictionFieldKey = keyof PredictionRowForm;

export interface PredictionFieldDefinition {
  key: PredictionFieldKey;
  label: string;
  type: "number" | "text" | "date";
  optional?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

const defaultNumber = (value: number) => String(value);

export const predictionFieldDefinitions: PredictionFieldDefinition[] = [
  { key: "BaseOfCode", label: "Base of Code", type: "number" },
  { key: "BaseOfData", label: "Base of Data", type: "number" },
  { key: "Characteristics", label: "Characteristics", type: "number" },
  { key: "DllCharacteristics", label: "DLL Characteristics", type: "number" },
  { key: "Entropy", label: "Entropy", type: "number", step: 0.01, placeholder: "6.43" },
  { key: "FileAlignment", label: "File Alignment", type: "number" },
  { key: "FirstSeenDate", label: "First Seen Date", type: "date" },
  { key: "Identify", label: "Identify (hash)", type: "text", optional: true },
  { key: "ImageBase", label: "Image Base", type: "number" },
  { key: "ImportedDlls", label: "Imported DLLs", type: "text" },
  { key: "ImportedSymbols", label: "Imported Symbols", type: "text" },
  { key: "Machine", label: "Machine", type: "number" },
  { key: "Magic", label: "Magic", type: "number", optional: true },
  { key: "NumberOfRvaAndSizes", label: "Number of RVA and Sizes", type: "number" },
  { key: "NumberOfSections", label: "Number of Sections", type: "number" },
  { key: "NumberOfSymbols", label: "Number of Symbols", type: "number" },
  { key: "PE_TYPE", label: "PE Type", type: "number", optional: true },
  { key: "PointerToSymbolTable", label: "Pointer to Symbol Table", type: "number" },
  { key: "SHA1", label: "SHA1", type: "text", optional: true },
  { key: "Size", label: "Size", type: "number" },
  { key: "SizeOfCode", label: "Size of Code", type: "number" },
  { key: "SizeOfHeaders", label: "Size of Headers", type: "number" },
  { key: "SizeOfImage", label: "Size of Image", type: "number" },
  { key: "SizeOfInitializedData", label: "Size of Initialized Data", type: "number" },
  { key: "SizeOfOptionalHeader", label: "Size of Optional Header", type: "number", optional: true },
  { key: "SizeOfUninitializedData", label: "Size of Uninitialized Data", type: "number" },
  { key: "TimeDateStamp", label: "Time Date Stamp", type: "number" },
  { key: "Label", label: "Label (0=clearware, 1=malware)", type: "number", min: 0, max: 1, step: 1, optional: true }
];

export function createDefaultPredictionRowForm(): PredictionRowForm {
  return {
    BaseOfCode: defaultNumber(4096),
    BaseOfData: defaultNumber(69632),
    Characteristics: defaultNumber(783),
    DllCharacteristics: defaultNumber(0),
    Entropy: "5.981248597142612",
    FileAlignment: defaultNumber(512),
    FirstSeenDate: "1970-01-01",
    Identify: "powerbasic/win 8.00",
    ImageBase: defaultNumber(4194304),
    ImportedDlls:
      "comdlg32.dll gdi32.dll kernel32.dll ole32.dll oleaut32.dll user32.dll comctl32.dll libnodave.dll",
    ImportedSymbols:
      "printdlga getopenfilenamea getsavefilenamea bitblt createcompatiblebitmap createcompatibledc createfontindirecta createsolidbrush deletedc deleteobject getdevicecaps getstockobject gettextmetricsa movetoex selectobject setbkcolor setbkmode settextalign settextcolor closehandle createfilea enumresourcenamesa exitprocess getcommandlinea getcurrentdirectorya getlasterror getmodulehandlea getstartupinfoa getversionexa globalalloc globalfree multibytetowidechar readfile setcurrentdirectorya seterrormode setfilepointer setlasterror sleep tlsalloc tlsfree tlsgetvalue tlssetvalue widechartomultibyte writefile rtlmovememory clsidfromprogid cocreateinstance coinitialize couninitialize progidfromclsid getactiveobject safearraycreate sysallocstringbytelen sysfreestring sysstringbytelen variantclear variantcopy checkradiobutton clienttoscreen createdialogindirectparama createdialogparama createwindowexa destroyicon destroywindow dialogboxindirectparama dispatchmessagea enablewindow fillrect getclientrect getdc getdlgitem getmenu getmenuiteminfoa getsyscolor getsyscolorbrush getwindowlonga getwindowrect getwindowtexta getwindowtextlengtha isdialogmessagea iswindow loadimagea mapdialogrect peekmessagea postmessagea redrawwindow releasedc screentoclient sendmessagea setfocus setwindowlonga setwindowpos setwindowtexta showwindow systemparametersinfoa translatemessage dialogboxparama getfocus getwindow imagelist_replaceicon imagelist_remove imagelist_geticon imagelist_loadimagea davestrerror davestringcopy davenewinterface davenewconnection daveareaname daveblockname davegets32 davegetfloat davegetfloatat daveput32 daveputfloat daveconnectplc davereadbytes davewritebytes daveinitadapter davedisconnectplc davedisconnectadapter davegetname davefree setport closeport",
    Machine: defaultNumber(332),
    Magic: defaultNumber(267),
    NumberOfRvaAndSizes: defaultNumber(16),
    NumberOfSections: defaultNumber(5),
    NumberOfSymbols: defaultNumber(0),
    PE_TYPE: defaultNumber(267),
    PointerToSymbolTable: defaultNumber(0),
    SHA1: "b0068836a40e6a43c6b546fcb709237e5aa223d1",
    Size: defaultNumber(76288),
    SizeOfCode: defaultNumber(64855),
    SizeOfHeaders: defaultNumber(1024),
    SizeOfImage: defaultNumber(86016),
    SizeOfInitializedData: defaultNumber(2560),
    SizeOfOptionalHeader: defaultNumber(224),
    SizeOfUninitializedData: defaultNumber(1500),
    TimeDateStamp: defaultNumber(12345),
    Label: ""
  };
}

export function createEmptyPredictionRowForm(): PredictionRowForm {
  return predictionFieldDefinitions.reduce<PredictionRowForm>((acc, field) => {
    acc[field.key] = "";
    return acc;
  }, {} as PredictionRowForm);
}
