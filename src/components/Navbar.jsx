import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from './../constants/index';

const Navbar = () => {
  return (
    <header className="flex items-center justify-between w-full px-5 py-5 sm:px-10">
      <nav className="flex w-full screen-max-width">
        <img src={appleImg} alt="Apple-icon" width={14} height={18} />

        <div className="flex justify-center flex-1 max-sm:hidden">
          {navLists.map((nav, i) => (
            <div
              key={i}
              className="px-5 text-sm transition-all cursor-pointer text-gray hover:text-white"
            >
              {nav}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img src={searchImg} alt="Search-icon" width={18} height={18} />
          <img src={bagImg} alt="Purchase-icon" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
