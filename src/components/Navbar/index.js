import React from 'react';

export default function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <p className="logo">
          <a
            className="nav-link"
            href="#"
          >
            Time-Clock
          </a>
        </p>
        <ul>
          <li>
            <a
              href="#"
              className="nav-link"
            >
              Home
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
