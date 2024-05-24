
const Add = (props: React.SVGProps<SVGSVGElement>) => {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-beetwen'}}>
          <svg width="800px" height="800px" viewBox="0 0 24 24" stroke="#000000" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
           
            <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            
          </svg>
      </div>
    )
  }
  
  export default Add;