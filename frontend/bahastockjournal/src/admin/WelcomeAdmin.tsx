import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'

const WelcomeAdmin = () => {
    return (
        <div className=' h-screen flex justify-center items-center   '>
            <div className=''>
                <div className=''>
                    <div className="flex items-center justify-center h-[200px] border-none">
                        <img onContextMenu={e => e.preventDefault()} src={Logo} alt='' className='h-[200px]' aria-placeholder='blur' />
                    </div>
                    <h1 className='text-center text-4xl capitalize font-bold'>Hi, <span className='text-blue-400 items-stretch'></span>Welcome to  Admin Dashboard</h1>

                    <div className='text-center'>
                        <div className='flex items-center justify-center my-4 gap-3 flex-wrap'>
                            <div className='border border-blue-400 rounded-lg hover:bg-blue-400 hover:text-white duration-200 px-2 py-1'>
                                <Link to='/admin/users'>Manage Users</Link>

                            </div>

                            <div className='border border-blue-400 rounded-lg hover:bg-blue-400 hover:text-white duration-200 px-2 py-1'>
                                <Link to='/admin'>Summary</Link>

                            </div>

                            <div className='border border-blue-400 rounded-lg hover:bg-blue-400 hover:text-white duration-200 px-2 py-1'>
                                <Link to='/admin'>Applications</Link>

                            </div>


                        </div>

                    </div>

                </div>

            </div>



        </div>
    )
}

export default WelcomeAdmin

