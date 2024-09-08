import { NavLink } from "react-router-dom";
import logo from '../../../assets/icons/chat.png'
const Footer = () => {
  return (
    <footer className="footer flex lg:flex-row
     flex-col lg:justify-between lg:items-center bg-black text-white  p-10">
      <nav>
        <img src={logo} className="w-32" alt="" />
        <p className="text-lg">
          Mechanical Keyboard Shop
          <br />
          Providing reliable tech since 1992
        </p>
      </nav>

      <nav className="text-lg">
        <h6 className="footer-title">Company</h6>
        <NavLink className="text-white hover:text-violet-500" to='/'>Home</NavLink>
        <NavLink className="text-white hover:text-violet-500" to='/product'>Products</NavLink>
        <NavLink className="text-white hover:text-violet-500" to='/about-us'>About Us</NavLink>
        <NavLink className="text-white hover:text-violet-500" to='/contact-us'>Contact Us</NavLink>
      </nav>
      <nav className="text-lg">
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
      {/* only show in pc  */}
      <form className="text-lg lg:block hidden">
        <h6 className="footer-title">Newsletter</h6>
        <fieldset className="form-control w-64">
          <label className="label">
            <span className="label-text text-white">Enter your email address</span>
          </label>
          <div className="join">
            <input
              type="text"
              placeholder="username@site.com"
              className="input input-bordered join-item" />
            <button className="btn bg-violet-500 hover:bg-violet-600 text-white join-item">Subscribe</button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
};

export default Footer;
