export const BrandLogoLeft = () => {
  return (
    <a href="/" aria-label="Home" className="ml-2 flex items-center gap-3">
      <img 
        src="/logo.svg" 
        alt="Style Logo"
        className="h-10 w-10 object-contain" 
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <span className="text-2xl font-light tracking-widest">STYLE</span>
    </a>
  )
}