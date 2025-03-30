
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-wood-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Spirit Vault</h3>
            <p className="text-sm text-gray-300">
              Premium liquor store with a wide selection of spirits, wines, and craft beers.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-300 hover:text-primary">Home</Link></li>
              <li><Link to="/shop" className="text-sm text-gray-300 hover:text-primary">Shop</Link></li>
              <li><Link to="/prebook" className="text-sm text-gray-300 hover:text-primary">Pre-book</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-sm text-gray-300 hover:text-primary">FAQ</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-300 hover:text-primary">Contact Us</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-300 hover:text-primary">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Contact Info</h4>
            <address className="not-italic text-sm text-gray-300">
              <p>123 Bourbon Street</p>
              <p>Spiritville, SP 12345</p>
              <p className="mt-2">Phone: (555) 123-4567</p>
              <p>Email: info@spiritvault.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-wood-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Spirit Vault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
