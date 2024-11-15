export interface TodoInfo{
    text: string,
    status: 'active' | 'completed',
}

export interface TodoBoxPropsType{
    type: 'input' | 'text',
    status?: 'active' | 'completed',
    text?: string,
    index?: number,
    onDelete?: (index:number)=>void,
    onChangeStatus?: (index:number)=>void,
    onCreateTodo?: (text:string)=>void,
}

export interface TodoFooterPropsType{
    count: number,
    onChangeMode: (e:ModeType) => void,
    onDeleteAll: () => void,
    mode: ModeType,
}

export interface ThemeType {
    theme: 'dark' | 'light';
}

export interface ThemeContextType extends ThemeType{
  toggleTheme: () => void;
}

export type ModeType = 'all' | 'active' | 'completed';