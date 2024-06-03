const Attention = (props: React.SVGProps<SVGSVGElement>) => {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-beetwen'}}>
          <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.53846C7.32682 3.53846 3.53846 7.32682 3.53846 12C3.53846 16.6732 7.32682 20.4615 12 20.4615C16.6732 20.4615 20.4615 16.6732 20.4615 12C20.4615 7.32682 16.6732 3.53846 12 3.53846ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="gray"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.64103C12.4248 7.64103 12.7692 7.98542 12.7692 8.41026V12.5128C12.7692 12.9377 12.4248 13.2821 12 13.2821C11.5752 13.2821 11.2308 12.9377 11.2308 12.5128V8.41026C11.2308 7.98542 11.5752 7.64103 12 7.64103Z" fill="gray"/>
            <path d="M13.0256 15.5897C13.0256 16.1562 12.5664 16.6154 12 16.6154C11.4336 16.6154 10.9744 16.1562 10.9744 15.5897C10.9744 15.0233 11.4336 14.5641 12 14.5641C12.5664 14.5641 13.0256 15.0233 13.0256 15.5897Z" fill="gray"/>
          </svg>
      </div>
    )
  }
  
  export default Attention;