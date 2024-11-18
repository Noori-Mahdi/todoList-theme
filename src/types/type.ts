export interface TodoInfo {
  text: string;
  status: "active" | "completed";
}

export interface TodoBoxPropsType {
  type: "input" | "text";
  status?: "active" | "completed";
  text?: string;
  index?: number;
  dragMode?: { text: string; status: "active" | "completed" } | null;
  onDelete?: (index: number) => void;
  onChangeStatus?: (index: number) => void;
  onCreateTodo?: (text: string) => void;
  onDrag?: (index: number) => void;
  onDrop?: (index: number) => void;
  onHandleKeyDownEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface TodoFooterPropsType {
  count: number;
  onChangeMode: (e: ModeType) => void;
  onDeleteAll: () => void;
  mode: ModeType;
}

export interface ThemeType {
  theme: "dark" | "light";
}

export interface ThemeContextType extends ThemeType {
  toggleTheme: () => void;
}

export type ModeType = "all" | "active" | "completed";
