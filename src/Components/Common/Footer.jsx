import React from 'react';
import { Link } from "react-router-dom";
function Footer() {
    return (
        <footer className="border-t px-4  md:px-6 md:py-6 shadow font-poppins">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm">
            {/* <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
              Blog
            </Link>
            <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
              Community
            </Link>
            <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
              Contact
            </Link> */}
          </nav>
          <p className="text-xs text-muted-foreground">&copy; 2024 Mapospace. All rights reserved.</p>
        </div>
      </footer>
    );
}

export default Footer;
