import { useTheme } from "../../context/theme";
import { TodoFooterPropsType } from "../../types/type";
import './style.scss';

export const TodoFooter = ({count, mode, onChangeMode, onDeleteAll}:TodoFooterPropsType) => {
    const { theme, toggleTheme } = useTheme();

    return ( 
        <div className={`flex justify-between items-center w-full px-7 py-3 select-none ${theme == 'dark' ? 'bg-todo-dark text-color-dark': 'bg-todo-light text-color-light'} font-medium rounded-b text-color-dark capitalize`}>
            <div>{`${count != undefined || count != 0 ? count + ' items left': count == 1 ? count + ' item left':''} `}</div>
            <div className="flex justify-between items-center footer-list">
                <div onClick={()=>{onChangeMode('all')}} className={`px-1 mx-1 cursor-pointer ${ mode == 'all' && 'text-active'}`}>all</div>
                <div onClick={()=>{onChangeMode('active')}} className={`px-1 mx-1 cursor-pointer ${ mode == 'active' && 'text-active'}`}>active</div>
                <div onClick={()=>{onChangeMode('completed')}} className={`px-1 mx-1 cursor-pointer ${ mode == 'completed' && 'text-active'}`}>completed</div>
            </div>
            <div onClick={onDeleteAll} className="cursor-pointer select-none">clear completed</div>
        </div>
     );
}