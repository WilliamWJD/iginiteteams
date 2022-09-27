import imgLogo from '@assets/logo.png';

import { BackIcon, Container, Logo, BackButton } from "./styles";

type Props = {
    showBackButton?: boolean;
}

export function Header({ showBackButton = false }: Props) {
    return (
        <Container>
            {showBackButton && (
                <BackButton>
                    <BackIcon />
                </BackButton>
            )}
            <Logo source={imgLogo} />
        </Container>
    )
}