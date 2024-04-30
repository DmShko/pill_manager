import { FC } from 'react'

//styles
import pec from './PageContainer.module.scss';

const PageContainer: FC<any> = ({ children }) => {
  return (
   
    <section className={pec.container}>{children}</section>
    
  )
}

export default PageContainer