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
  { key: "Entropy", label: "Entropy", type: "number"},
  { key: "FileAlignment", label: "File Alignment", type: "number" },
  { key: "FirstSeenDate", label: "First Seen Date", type: "date" },
  { key: "Identify", label: "Identify", type: "text" },
  { key: "ImageBase", label: "Image Base", type: "number" },
  { key: "ImportedDlls", label: "Imported DLLs", type: "text" },
  { key: "ImportedSymbols", label: "Imported Symbols", type: "text" },
  { key: "Machine", label: "Machine", type: "number" },
  { key: "Magic", label: "Magic", type: "number" },
  { key: "NumberOfRvaAndSizes", label: "Number of RVA and Sizes", type: "number" },
  { key: "NumberOfSections", label: "Number of Sections", type: "number" },
  { key: "NumberOfSymbols", label: "Number of Symbols", type: "number" },
  { key: "PE_TYPE", label: "PE Type", type: "number" },
  { key: "PointerToSymbolTable", label: "Pointer to Symbol Table", type: "number" },
  { key: "SHA1", label: "SHA1", type: "text" },
  { key: "Size", label: "Size", type: "number" },
  { key: "SizeOfCode", label: "Size of Code", type: "number" },
  { key: "SizeOfHeaders", label: "Size of Headers", type: "number" },
  { key: "SizeOfImage", label: "Size of Image", type: "number" },
  { key: "SizeOfInitializedData", label: "Size of Initialized Data", type: "number" },
  { key: "SizeOfOptionalHeader", label: "Size of Optional Header", type: "number" },
  { key: "SizeOfUninitializedData", label: "Size of Uninitialized Data", type: "number" },
  { key: "TimeDateStamp", label: "Time Date Stamp", type: "number" }
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
    TimeDateStamp: defaultNumber(12345)
  };
}

export function createEmptyPredictionRowForm(): PredictionRowForm {
  return predictionFieldDefinitions.reduce<PredictionRowForm>((acc, field) => {
    acc[field.key] = "";
    return acc;
  }, {} as PredictionRowForm);
}

type PrefilledRowValues = Partial<Record<PredictionFieldKey, string | number | null>>;

const prefilledRowValues: PrefilledRowValues[] = [
  {
    BaseOfCode: 4096,
    BaseOfData: 98304,
    Characteristics: 259,
    DllCharacteristics: 0,
    Entropy: 7.99205009491185,
    FileAlignment: 512,
    FirstSeenDate: "2012-12-30",
    Identify:
      "microsoft visual c++ v6.0 microsoft visual c++ 5.0 microsoft visual c++ microsoft visual c++ v6.0",
    ImageBase: 4194304,
    ImportedDlls:
      "comctl32.dll shell32.dll gdi32.dll advapi32.dll user32.dll ole32.dll oleaut32.dll kernel32.dll msvcrt.dll",
    ImportedSymbols:
      "shgetspecialfolderpathw shellexecutew shgetmalloc shgetpathfromidlistw shbrowseforfolderw shgetfileinfow shellexecuteexw createcompatibledc createfontindirectw deleteobject deletedc getcurrentobject stretchblt getdevicecaps createcompatiblebitmap selectobject setstretchbltmode getobjectw freesid allocateandinitializesid checktokenmembership getmenu setwindowpos getwindowdc releasedc copyimage getkeystate getwindowrect screentoclient getwindowlongw settimer getmessagew dispatchmessagew killtimer destroywindow enddialog sendmessagew wsprintfw getclassnamea getwindowtextw getwindowtextlengthw getsyscolor wsprintfa setwindowtextw createwindowexw getdlgitem getclientrect setwindowlongw unhookwindowshookex setfocus getsystemmetrics systemparametersinfow showwindow drawtextw getdc clienttoscreen getwindow dialogboxindirectparamw drawiconex callwindowprocw defwindowprocw callnexthookex ptinrect setwindowshookexw loadimagew loadiconw messagebeep enablewindow iswindow enablemenuitem getsystemmenu wvsprintfw charupperw messageboxa getparent createstreamonhglobal cocreateinstance coinitialize setfiletime setendoffile entercriticalsection deletecriticalsection getmodulehandlea leavecriticalsection waitformultipleobjects readfile setfilepointer getfilesize formatmessagew lstrcpyw localfree isbadreadptr getsystemdirectoryw getcurrentthreadid suspendthread terminatethread initializecriticalsection resetevent setevent createeventw getversionexw getmodulefilenamew getcurrentprocess setprocessworkingsetsize setcurrentdirectoryw getdrivetypew createfilew getcommandlinew getstartupinfow createprocessw createjobobjectw resumethread assignprocesstojobobject createiocompletionport setinformationjobobject getqueuedcompletionstatus getexitcodeprocess closehandle setenvironmentvariablew gettemppathw getsystemtimeasfiletime lstrlenw comparefiletime setthreadlocale findfirstfilew deletefilew findnextfilew findclose removedirectoryw expandenvironmentstringsw widechartomultibyte virtualalloc globalmemorystatusex lstrcmpw getenvironmentvariablew lstrcmpiw lstrlena getlocaleinfow multibytetowidechar getuserdefaultuilanguage getsystemdefaultuilanguage getsystemdefaultlcid lstrcmpia globalalloc globalfree muldiv findresourceexa sizeofresource loadresource lockresource loadlibrarya exitprocess lstrcatw getdiskfreespaceexw setfileattributesw setlasterror sleep getexitcodethread waitforsingleobject createthread getlasterror systemtimetofiletime getlocaltime getfileattributesw createdirectoryw writefile getstdhandle virtualfree getmodulehandlew getprocaddress getstartupinfoa ??3@yaxpax@z ??2@yapaxi@z memcmp free memcpy _controlfp _except_handler3 __set_app_type __p__fmode __p__commode _adjust_fdiv __setusermatherr _initterm __getmainargs _acmdln exit _xcptfilter _exit ??1type_info@@uae@xz _onexit __dllonexit _cxxthrowexception _beginthreadex _eh_prolog ?_set_new_handler@@yap6ahi@zp6ahi@z@z memset _wcsnicmp strncmp wcsncmp malloc memmove _wtol _purecall",
    Machine: 332,
    Magic: 267,
    NumberOfRvaAndSizes: 16,
    NumberOfSections: 5,
    NumberOfSymbols: 0,
    PE_TYPE: 267,
    PointerToSymbolTable: 0,
    SHA1: "a35d11d9d318c43495a545d7b9e01d2acce44496",
    Size: 14624536,
    SizeOfCode: 90624,
    SizeOfHeaders: 512,
    SizeOfImage: 344064,
    SizeOfInitializedData: 230912,
    SizeOfOptionalHeader: 224,
    SizeOfUninitializedData: 0,
    TimeDateStamp: 1356857402
  },
  {
    BaseOfCode: 4096,
    BaseOfData: 86016,
    Characteristics: 259,
    DllCharacteristics: 0,
    Entropy: 7.99900359263664,
    FileAlignment: 512,
    FirstSeenDate: "2012-12-30",
    Identify:
      "microsoft visual c++ v6.0 microsoft visual c++ 5.0 microsoft visual c++ microsoft visual c++ v6.0",
    ImageBase: 4194304,
    ImportedDlls:
      "comctl32.dll shell32.dll gdi32.dll advapi32.dll user32.dll ole32.dll oleaut32.dll kernel32.dll msvcrt.dll",
    ImportedSymbols:
      "shgetspecialfolderpathw shellexecutew shgetmalloc shgetpathfromidlistw shbrowseforfolderw shgetfileinfow shellexecuteexw createcompatibledc createfontindirectw deleteobject deletedc getcurrentobject stretchblt getdevicecaps createcompatiblebitmap selectobject setstretchbltmode getobjectw freesid allocateandinitializesid checktokenmembership getmenu setwindowpos getwindowdc releasedc copyimage getkeystate getwindowrect screentoclient getwindowlongw settimer getmessagew dispatchmessagew killtimer destroywindow enddialog sendmessagew wsprintfw getclassnamea getwindowtextw getwindowtextlengthw getsyscolor wsprintfa setwindowtextw createwindowexw getdlgitem getclientrect setwindowlongw unhookwindowshookex setfocus getsystemmetrics systemparametersinfow showwindow drawtextw getdc clienttoscreen getwindow dialogboxindirectparamw drawiconex callwindowprocw defwindowprocw callnexthookex ptinrect setwindowshookexw loadimagew loadiconw messagebeep enablewindow iswindow enablemenuitem getsystemmenu wvsprintfw charupperw messageboxa getparent createstreamonhglobal cocreateinstance coinitialize setfiletime setendoffile entercriticalsection deletecriticalsection getmodulehandlea leavecriticalsection waitformultipleobjects readfile setfilepointer getfilesize formatmessagew lstrcpyw localfree isbadreadptr getsystemdirectoryw getcurrentthreadid suspendthread terminatethread initializecriticalsection resetevent setevent createeventw getversionexw getmodulefilenamew getcurrentprocess setprocessworkingsetsize setcurrentdirectoryw getdrivetypew createfilew getcommandlinew getstartupinfow createprocessw createjobobjectw resumethread assignprocesstojobobject createiocompletionport setinformationjobobject getqueuedcompletionstatus getexitcodeprocess closehandle setenvironmentvariablew gettemppathw getsystemtimeasfiletime lstrlenw comparefiletime setthreadlocale findfirstfilew deletefilew findnextfilew findclose removedirectoryw expandenvironmentstringsw widechartomultibyte virtualalloc globalmemorystatusex lstrcmpw getenvironmentvariablew lstrcmpiw lstrlena getlocaleinfow multibytetowidechar getuserdefaultuilanguage getsystemdefaultuilanguage getsystemdefaultlcid lstrcmpia globalalloc globalfree muldiv findresourceexa sizeofresource loadresource lockresource loadlibrarya exitprocess lstrcatw getdiskfreespaceexw setfileattributesw setlasterror sleep getexitcodethread waitforsingleobject createthread getlasterror systemtimetofiletime getlocaltime getfileattributesw createdirectoryw writefile getstdhandle virtualfree getmodulehandlew getprocaddress getstartupinfoa ??3@yaxpax@z ??2@yapaxi@z memcmp free memcpy _controlfp _except_handler3 __set_app_type __p__fmode __p__commode _adjust_fdiv __setusermatherr _initterm __getmainargs _acmdln exit _xcptfilter _exit ??1type_info@@uae@xz _onexit __dllonexit _cxxthrowexception _beginthreadex _eh_prolog ?_set_new_handler@@yap6ahi@zp6ahi@z@z memset _wcsnicmp strncmp wcsncmp malloc memmove _wtol _purecall",
    Machine: 332,
    Magic: 267,
    NumberOfRvaAndSizes: 16,
    NumberOfSections: 5,
    NumberOfSymbols: 0,
    PE_TYPE: 267,
    PointerToSymbolTable: 0,
    SHA1: "0f790d7fa02744ac6325b32fb5e90a0d9eee45bf",
    Size: 9177240,
    SizeOfCode: 78336,
    SizeOfHeaders: 512,
    SizeOfImage: 176128,
    SizeOfInitializedData: 74240,
    SizeOfOptionalHeader: 224,
    SizeOfUninitializedData: 0,
    TimeDateStamp: 1356857389
  },
  {
    BaseOfCode: 77824,
    BaseOfData: 98304,
    Characteristics: 271,
    DllCharacteristics: 0,
    Entropy: 7.02792848914217,
    FileAlignment: 512,
    FirstSeenDate: "2013-01-02",
    Identify:
      "upx v0.89.6 - v1.02 / v1.05 - v1.22 upx v0.80 - v0.84 upx 2.90 [lzma] -> markus oberhumer, laszlo molnar & john reiser upx 2.90 (lzma) upx -> www.upx.sourceforge.net upx v1.25 (delphi) stub",
    ImageBase: 4194304,
    ImportedDlls: "kernel32.dll msvbvm60.dll",
    ImportedSymbols: "loadlibrarya getprocaddress virtualprotect virtualalloc virtualfree exitprocess",
    Machine: 332,
    Magic: 267,
    NumberOfRvaAndSizes: 16,
    NumberOfSections: 3,
    NumberOfSymbols: 0,
    PE_TYPE: 267,
    PointerToSymbolTable: 0,
    SHA1: "c92aca2465bde82b8dc528fd515513a832b64b93",
    Size: 28672,
    SizeOfCode: 20480,
    SizeOfHeaders: 4096,
    SizeOfImage: 106496,
    SizeOfInitializedData: 8192,
    SizeOfOptionalHeader: 224,
    SizeOfUninitializedData: 73728,
    TimeDateStamp: 1357143643
  }
];

const buildPrefilledRowForm = (values: PrefilledRowValues): PredictionRowForm =>
  predictionFieldDefinitions.reduce<PredictionRowForm>((acc, field) => {
    const value = values[field.key];
    acc[field.key] = value === undefined || value === null ? "" : String(value);
    return acc;
  }, {} as PredictionRowForm);

export const prefilledPredictionRows = prefilledRowValues.map(buildPrefilledRowForm);
