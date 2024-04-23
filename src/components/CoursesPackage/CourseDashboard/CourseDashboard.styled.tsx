import styled from 'styled-components';

import back from '../../../images/courses/pills-svgrepo-com.svg';

export const CourseDashboardStyled = styled.div`

   .course-dashboard {
        
      height: 50px;

   }

   .courses {

      padding: 10px;

      box-shadow: 1px 1px 4px 3px #A1A1A1;

   }

   .courses-list {

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;

      gap: 10px;

      margin: 0;
      padding: 10px 5px;

      height: 200px;

      border: 2px solid #646cff;
      border-left: 1px solid #646cff;
      border-right: 1px solid #646cff;

      list-style: none;

      background-image: url(${back});
      background-position: center;

      overflow-y: scroll;

   }

   .courses-item {
      width: 100%;
   }

   .courses-drive {

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      gap: 10px;

      padding: 10px 0;

      border-top: 2px solid #646cff;

   }

   .courses-button {

      display: flex;
      align-items: center;
      justify-content: center;

      width: 30px;
      height: 30px;

      transform: skew(160deg); 

      box-shadow: 1px 1px 3px 3px #B2B2B3;

   }

`;