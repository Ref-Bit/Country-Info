import { Footer } from '.';

const Layout = ({ children }) => {
  return (
    <div className="dark:bg-gray-900 bg-white">
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
