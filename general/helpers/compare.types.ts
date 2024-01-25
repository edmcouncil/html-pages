export type DiffSymbol = ' ' | '+' | '-' | '~';

export type LineDiff = [DiffSymbol, { '__old': any, '__new': any } | string];

export interface DataChunk {
  type?: string;
  fullRenderedString?: string;
  entityLabel?: { label: string };
  value?: any;
  id?: number;
}

export interface Data {
  label: string;
  iri: string;
  qName?: string;
  taxonomy?: any;
  locationInModules?: string[];
  graph?: any;
  maturityLevel?: {
    label: string;
    iri: string;
  };
  deprecated?: boolean;
  versionIri?: string;
  properties?: {
    [section: string]: {
      [title: string]: DataChunk[];
    };
  };
}

export interface Header {
  label: string;
  iri: string;
  qName: string | undefined;
  maturityLevel: {
    label: string;
    iri: string;
  } | undefined;
  versionIri: string | undefined;
}

export interface LinesChunk {
  type: string;
  lines: string[] | LineDiff[];
  originalData?: DataChunk;
}

export type ChangeChunk = [
  DiffSymbol,
  LinesChunk
]

export interface LeftRightChange {
  changeType: 'added' | 'removed' | 'changed' | 'unchanged';
  left: DataChunk | EmptyData;
  right: LinesChunk;
}

export interface EmptyData {
  type: 'EMPTY';
  value: string;
}

export interface TempDataProperties {
  [section: string]: {
    [title: string]: ChangeChunk[];
  };
}

export interface TitleNameChange {
  oldName: string,
  newName: string
}

export interface MergedData {
  headerLeft: Header,
  headerRight: Header,
  titleNameChanges: TitleNameChange[],
  properties: {
    [section: string]: {
      [title: string]: LeftRightChange[];
    };
  }
}
