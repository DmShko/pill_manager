import styled from 'styled-components';

export const SharedLayoutStyles = styled.div`

    header {

        position: absolute;

        top: 0;
        left: 0;

        width: calc(100vw - 2px);
        height: 50px;

        border: 1px solid gray;

    }

    .header-content {

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-item: center;

        height: 100%;

        padding: 0 20px;

    }

    .logo {

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-item: center;

        width: fit-content;
        height: 100%;

        padding: 0 5px;
 
    }

    nav {

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-item: center;

        width: 100%
    }

    .nav-list {

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-item: center;

        list-style: none;

        gap: 30px;

        margin: 0;
        padding: 0 5px;

    }

    .nav-link {

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-item: center;

    }

`;