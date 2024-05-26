import { FC } from 'react'

// styles
import pp from "./DescriptionPackage.module.scss";

// my components
import DescriptionDashboard from './DescriptionDashboard/DescriptionDashboard';


const DescriptionPackage: FC = () => {

  return (
    
    <div className={pp.descriptionContainer}>
      <DescriptionDashboard />
    </div>
    
  )
}

export default DescriptionPackage