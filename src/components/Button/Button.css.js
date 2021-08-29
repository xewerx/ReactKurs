import styled from 'styled-components';

export const RootButton = styled.button`
    color: ${({ theme: { color }, primary }) => primary ? color.gray.light : color.pink.normal};
    cursor: inherit;
    border: none;
    background-color: transparent;
    cursor: ${props => props.to || props.onClick || props.type === 'submit' ? 'pointer' : 'default'};

    &:hover {
    opacity: .8;
    }
`;

export const InlineButton = styled(RootButton)`
    background: ${({ theme, primary }) => primary ? theme.color.pink.normal : theme.color.gray.light};
    margin: ${({ theme }) => `${theme.spacing.xs / 2}px`};
    padding: ${({ theme }) => `${theme.spacing.xs / 2}px ${theme.spacing.xs}px`};
    border: ${({ theme }) => `2px solid ${theme.color.pink.normal}`};
    border-radius: 3px;
    `;

export const RegularButton = styled(RootButton)`
    &:hover {
        text-decoration: underline;
    }
    `;