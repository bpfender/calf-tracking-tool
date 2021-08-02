import React from 'react';
import SourceSelector from '../SourceSelector';

export function Header(props) {
    const { framerate, playerDispatch, annotations } = props;

    return (
        <header className={props.className}>



            <SourceSelector
                fps={framerate}
                playerDispatch={playerDispatch}
                annotations={annotations}>
            </SourceSelector>
        </header>
    );
}