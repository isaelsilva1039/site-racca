import { Link } from 'react-router-dom';
import './Header.css';
import { AccountCircle } from '@mui/icons-material'; 

function Header() {
  return (
    <header className="header-container">
      <div className="logo-container">
        <img src="/img/logo-racca.png" alt="Racca Saúde Logo" className="racca-logo" />
      </div>
      <nav className="nav-container">
        <Link to="/" className="nav-link">Início</Link>
        <Link to="/benefits" className="nav-link">Benefícios</Link>
        <Link to="/plans" className="nav-link">Planos</Link>
        <Link to="/contact" className="nav-link">Contato</Link>
      </nav>
      <Link to="/admin" className="user-icon">
        <AccountCircle className="icon" />
      </Link>
    </header>
  );
}

export default Header;
