import styled from 'styled-components';

export const AddButton = styled.button`
    padding: 4px 20px;
    font-size: ${props => props.theme.colors.white};
    background-color: ${({ theme }) => theme.colors.lightPurple};
    border-radius: 20px;
    border: none;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.darkGrey};
    margin: 15px 0;
`;

