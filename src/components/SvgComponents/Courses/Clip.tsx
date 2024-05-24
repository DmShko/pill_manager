
const Clip = (props: React.SVGProps<SVGSVGElement>) => {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'spaceBeetwen'}}>
          <svg width="800px" height="800px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" {...props}>
            <defs>
                <clipPath id="clipPaperclip2">
                <rect width="32" height="32"/>
                </clipPath>
            </defs>
            <g id="paperclip2" clipPath="url(#clipPaperclip2)">
                <g id="Group_3231" data-name="Group 3231" transform="translate(-416 -52)">
                <g id="Group_3230" data-name="Group 3230">
                    <g id="Group_3229" data-name="Group 3229">
                    <path id="Path_4013" data-name="Path 4013" d="M422.266,83.608a4.981,4.981,0,0,1-3.525-8.505l14.385-14.386a3.789,3.789,0,0,1,5.358,5.359L428.325,76.235a.75.75,0,0,1-1.06-1.06l10.159-10.16a2.289,2.289,0,0,0-3.237-3.237L419.8,76.163a3.484,3.484,0,0,0,4.927,4.928l19.1-19.1a4.747,4.747,0,0,0-6.713-6.713L421.721,70.673a.75.75,0,0,1-1.061-1.06l15.395-15.394a6.247,6.247,0,1,1,8.834,8.834l-19.1,19.1A4.967,4.967,0,0,1,422.266,83.608Z" fill="gray"/>
                    </g>
                </g>
                </g>
            </g>
          </svg>
      </div>
    )
  }
  
  export default Clip;