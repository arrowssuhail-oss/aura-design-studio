const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold gradient-text">AM</span>
          <span className="text-muted-foreground">|</span>
          <span className="text-sm text-muted-foreground">
            Designed & built with care
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground">
          © {currentYear} Alex Morgan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
