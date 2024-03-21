import { FC } from 'react'

//styles
import { PageContainerStyled } from './PageContainer.styled';

const PageContainer: FC<any> = ({children}) => {
  return (
    <PageContainerStyled>
      <section>{children}</section>
    </PageContainerStyled>
  )
}

export default PageContainer