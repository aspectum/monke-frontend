import styled from 'styled-components';
import { lighten } from 'polished';
import { buttonLightenAmmount } from '../../styles/colors';

interface ButtonProps {
    bgColor: string;
    textColor?: string;
}

const Button = styled.button<ButtonProps>`
    margin: 0 auto;
    background-color: ${({ bgColor }) => bgColor};
    color: ${({ textColor }) => textColor || '#fff'};
    border: 0;
    border-radius: 5px;
    padding: 5px 10px;
    transition: background-color ease-in-out 0.2s;

    &:hover {
        background-color: ${({ bgColor }) => lighten(buttonLightenAmmount, bgColor)};
    }

    &:active {
        position: relative;
        top: 1px;
    }
`;

export default Button;
