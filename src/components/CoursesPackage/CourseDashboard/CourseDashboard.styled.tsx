import styled from 'styled-components';

import back from '../../../images/courses/pills-svgrepo-com.svg';

export const CourseDashboardStyled = styled.div`

   .course-dashboard {
        
      height: 50px;

   }

   .courses {

      padding: 20px;

   }

   .courses-list {

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;

      gap: 10px;

      magrin: 0;
      padding: 5px;

      height: 200px;

      border: 1px solid gray;

      list-style: none;

      background-image: url(${back});
      background-position: center;

      overflow-y: scroll;
   }

   .courses-item {
      width: 100%;
   }

`;