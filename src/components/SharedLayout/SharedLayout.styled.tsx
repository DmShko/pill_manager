import styled from 'styled-components';

export const SharedLayoutStyles = styled.div`

    header {

        position: absolute;

        top: 0;
        left: 0;

        width: calc(100vw - 2px);
        height: 70px;

        padding: 10px 0;

        border-bottom: 2px solid rgba(16, 16, 24, 0.2);

    }

    .header-container {

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-item: center;

        height: 100%;

        padding: 0 20px;

        
        // background-color: orange;

    }

    .logo-container {

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 75px;
        height: 75px;

        box-shadow: inset 1px 1px 4px 3px rgba(16, 16, 24, 0.2);

        border-radius: 50%;

    }

    .logo {

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        font-size: 14px;

        height: fit-content;

        padding: 0;

        color: lightgray;
        
    }

    nav {

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        width: 100%;
        
    }

    .nav-list {

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        list-style: none;

        gap: 30px;

        margin: 0;
        padding: 0 5px;

    }

    .nav-link {

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }

`;