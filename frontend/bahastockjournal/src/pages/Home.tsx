import { Link } from "react-router-dom";
import moment from "moment";
import { Sunwithface, NewMoonFace } from "../components/icons/ThemeIcons/ThemeIcons";
import { useTheme } from "../contexts/ThemeContext";

const Home = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex flex-col min-h-screen">

            {/* Header */}
            <header className="p-4  text-LD bg-LD ">
                <div className='flex justify-between items-center px-5'>
                    <div>
                        <Link to="/" className="font-bold text-lg hover:text-yellow-300 transition-all">Bahaa Abbas</Link>
                    </div>
                    <button className="cursor-pointer" onClick={toggleTheme}>

                        {
                            theme === 'light' ?
                                <Sunwithface /> :
                                <NewMoonFace />
                        }
                    </button>
                </div>
            </header>

            {/* Main content */}
            <main className="p-6 flex flex-col items-center justify-center flex-grow text-LD bg-secondaryBg-light dark:bg-secondaryBg-dark ">
                <p className="text-3xl font-bold">Welcome to Bahaa Stock Journal</p>
                <Link className='bg-cyan-400 p-2 rounded font-bold mt-2 inline-block hover:text-yellow-300 transition-all hover:bg-slate-400' to='dashboard'>Go</Link>
                <Link className='bg-cyan-400 p-2 rounded font-bold mt-2 inline-block hover:text-yellow-300 transition-all hover:bg-slate-400' to='login'>Login</Link>
            </main>

            {/* Footer */}
            <footer className="p-4 text-LD bg-LD  text-center mt-auto">
                <p className="text-3xl font-bold">Bahaa Stock Journal - Bahaa Abbas @{`${moment().format('YYYY')}`}</p>
            </footer>

        </div>
    );
}

export default Home;
