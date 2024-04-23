import styled from 'styled-components';

export const CourseItemStyled = styled.div`

   .course-item {

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      gap: 20px;
      
      padding: 0 10px;

      list-style: none;

      backdrop-filter: blur(5px);

      box-shadow: 1px 1px 4px 3px #A1A1A1;
   }

   .course-subcontainer {

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      width: 80%;

      background-color: white;

   }

   .courses-pills {

      width: 50%;
      height: 100px;
      padding: 5px;

      overflow-y: scroll;

      background-color: white;

      border: 2px dashed lightgray;
      border-top: none;
      border-bottom: none;
   }

   .pill-text-container {

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

   }

   .pill-item {

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;

      height: 42px;
      width: 95%;

      margin: 0 auto;

      padding: 0 5px;

      box-shadow: 1px 1px 4px 3px #A1A1A1;

   }

   .pill-text {

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      width: 40px;

      margin: 0;

      transform: skew(160deg); 

      border-left: 2px solid gray;

      background-color: lightgray;
   }

   .pill-name {

      font-style: italic;
      background-color: white;
   }

   .title {

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      height: 100%;

      text-align: center;
      font-weight: 600;

   }

   .registry-info {

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;

      gap: 5px;

      width: 200px;

      padding: 5px;
      margin: 0;

      color: #646cff;

      border: 2px solid white;
      border-radius: 8px;
   }

   .info-item {

      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;

      gap: 5px;

      height: 20px;
      width: 95%;

      margin: 0 auto;
      padding: 0 3px;

      background-color: white;

      border: 1px dashed lightgray;
      border-radius: 5px;

   }

   .name-item {
      width: 100px;

      margin: 0;
      overflow-x: hidden;
   }

   .name-item-title {

      font-size: 20px;
      font-weight: 600;

      margin: 0;

      color: blue;
   }

   .pill-title-value {
      
      font-weight: 600;
      font-size: 18px;

      width: 100%;

      color: blue;

   }

   .pill-title {

      font-size: 10px;

   }

   .title-value {

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      font-style: italic;

      height: 100%;

      color: black;

   }

   /*######### status #########*/

   .status-container {

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      height: 100px;

      border: 2px dashed lightgray;
      border-radius: 8px;

   }

   .status-indicator {

      width: 100%;
      height: 20%;

      border-radius: 8px;

      background-color: orange;
     
   }

   .status-title {

      font-weight: 600;

   }

   .status-item {

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      height: 80%;
      margin: 0;

   }

`;