import lo from './Loading.module.scss';

const Loading = (props: React.SVGProps<SVGSVGElement>) => {
    return (
      <div className={lo.loader}>
          <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M17.6566 12H21M3 12H6.34315M12 6.34342L12 3M12 21L12 17.6569" stroke="#363853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 8.00025L18.3642 5.63611M5.63629 18.364L8.00025 16M8.00022 8.00025L5.63608 5.63611M18.364 18.364L16 16" stroke="#0095FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          <style>
            
          </style>
      </div>
    )
  }
  
export default Loading;