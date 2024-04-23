import styled from 'styled-components';

export const AddPillsStyled = styled.div`

   .addpills-container {

      display: flex;
      flex-direction: row;
      align-items: start;
      justify-content: space-between;
        
      height: 100px;

      padding: 0;

   }

   .pills {

        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: space-between;

        width: 40%;
        height: 100%;
   }

   .input-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: space-between;  
   }

   .pills-info {

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;

        gap: 10px;

   }

   .pill-input {

        width: 55px;
        border: 1px dashed gray;
   }

   .pills-button {

        width: fit-content;
        height: 45px;

        padding: 0 5px;

        margin-left: 20px;

        transform: skew(160deg); 

        box-shadow: 1px 1px 3px 3px #B2B2B3;

    }

    .pills-container {

        width: 60%;
        height: 100px;
        border: 1px solid gray;

        padding: 0;

        overflow-y: scroll;

        border: 1px dashed gray;
    }

    .pills-list {

        display: flex;
        flex-direction: column;

        justify-content: start;

        gap: 5px;
        width: 100%;
        padding: 5px;

    }

    .pills-item {

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        padding: 5px;

        list-style: none;

        background-color: lightgray;
    }

    .pills-text {

        display: flex;
        flex-direction: row;
        align-items: center;

        margin: 0;
        gap: 10px;
    }

    .item-button {
        padding: 0 5px;
    }

    .item-input {
        width: 20px;
        border: none;
    }


`;