import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year}, Pritish Samal</p>
    </footer>
  );
}

export default Footer;
