import styled from 'styled-components';

export const CourseAddBoardStyled = styled.div`

   .course-addboard {
        
      height: fit-content;

      margin-bottom: 20px;
   }

   input {
      border: 1px dashed gray;
   }

   .course {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;

      margin-bottom: 20px;
   }

   .info-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      gap: 10px;
   }

   .doc-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
   }

   .cli-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
   }

   .visit-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: end;
   }

   .pills-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: start;

      gap: 10px;
   }

   .course-button {

      margin-left: 20px;

      transform: skew(160deg); 

      box-shadow: 1px 1px 3px 3px #B2B2B3;
   }

`;