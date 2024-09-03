import logo from '../../../assets/icons/chat.png';
import { IoIosLogIn } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
const Header = () => {
    return (
        <div className="navbar bg-black px-5 lg:px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost g-violet-500 text-white lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a href="/" className='font-bold text-black hover:text-blue-600'>Home</a></li>
                        <li><a href="/product" className='font-bold text-black hover:underline'>Product</a></li>
                        <li><a href="/product/management" className='font-bold text-black hover:underline'>Dashboard</a></li>
                        <li><a href="/about-us" className='font-bold text-black hover:underline'>About Us</a></li>
                        <li><a href="/contact-us" className='font-bold text-black hover:underline'>Contact Us</a></li>
                    </ul>
                </div>
                <a href="/"><img src={logo} className="lg:w-[50px] w-20" alt="" /></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a href="/" className='font-bold text-white  hover:underline'>Home</a></li>
                    <li><a href="/product" className='font-bold text-white hover:underline'>Product</a></li>
                    <li><a href="/product/management" className='font-bold text-white hover:underline'>Dashboard</a></li>
                    <li><a href="/about-us" className='font-bold text-white hover:underline'>About Us</a></li>
                    <li><a href="/contact-us" className='font-bold text-white hover:underline'>Contact Us</a></li>
                </ul>
            </div>
            <div className="navbar-end">
            <button className='btn bg-white border-white font-semibold lg:px-4 btn-sm lg:text-lg hover:bg-black hover:text-white  border-2  hover:border-white text-black '>Login <IoIosLogIn className='text-2xl' /></button>
            </div>
        </div>
    );
};

export default Header;
