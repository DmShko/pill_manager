import { FC } from "react";

import { BoobleProps } from '../../../types/animaTypes';

const Booble: FC<BoobleProps> = ({ styleProps }) => {
  return (
    <div style={{...styleProps} as {}}>
      
    </div>
  )
}

export default Booble;