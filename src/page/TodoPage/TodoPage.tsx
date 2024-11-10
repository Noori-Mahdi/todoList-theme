import { Todo } from '../../components/Todo/Todo';
import { useTheme } from '../../context/theme';
import bgDesktopDark from './../../assets/img/bg-desktop-dark.jpg';
import bgDesktopLight from './../../assets/img/bg-desktop-light.jpg';
import './../../sass/global.scss';

export const TodoPage = () => {
    const { theme, toggleTheme } = useTheme();

    return ( 
        <div className={`flex relative justify-center w-screen min-h-screen ${theme === 'dark' ? 'bg-main-dark': 'bg-main-light'}`} >
            <div className='absolute w-full h-48 z-0'> 
                <img className='w-full h-full' src={theme === 'dark' ? bgDesktopDark : bgDesktopLight}/>
            </div>
            <Todo />
        </div>
     );
}
 
