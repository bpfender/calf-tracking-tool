import { Classes, Code, Drawer, DrawerSize, H4, H5, Icon, UL } from '@blueprintjs/core';
import React from 'react';

export function HelpDrawer(props) {
    const { open, setOpen } = props;

    return (
        <Drawer
            className="bp3-dark"
            isOpen={open}
            size={DrawerSize.SMALL}
            title="Help"
            icon="help"
            onClose={() => { setOpen(false) }}>
            <div className={Classes.DRAWER_BODY}>
                <div className={Classes.DIALOG_BODY}>
                    <p>NOT ALL SHORTCUTS WORK YET</p>
                    <p>
                        You will be asked to create a folder to store your project files.
                    </p>
                    <p>
                        This contains a <Code className="help-text-icon">/Videos</Code>
                        folder, into which videos are copied and a
                        <Code className="help-text-icon">/Exports</Code>
                        folder for exported annotations.
                    </p>
                    <p>
                        You can add videos to your project via the
                        <Code className="help-text-icon">Tasks</Code>
                        panel on the right.
                    </p>
                    <p>
                        Each <Code className="help-text-icon">Task</Code>
                        can have multiple
                        <Code className="help-text-icon">Tags</Code>
                        associated with it, identifying different classes of object.
                    </p>
                    <p>
                        You can add labels for each instance of a
                        <Code className="help-text-icon">Tag</Code>.
                    </p>
                    <p>
                        Video playback can be controlled via the
                        <Code className="help-text-icon">
                            <Icon icon="play" iconSize={14} />
                        </Code>
                        button to play/pause, the
                        <Code className="help-text-icon">
                            <Icon icon="arrow-left" iconSize={14} />
                            <Icon icon="arrow-right" iconSize={14} />
                        </Code>
                        buttons to move a frame backwards/forwards, and the
                        <Code className="help-text-icon">
                            <Icon icon="double-chevron-left" iconSize={14} />
                            <Icon icon="double-chevron-right" iconSize={14} />
                        </Code>
                        to skip multiple frames.
                    </p>
                    <p>
                        The video settings button
                        <Code className="help-text-icon">
                            <Icon icon="cog" iconSize={14} />
                        </Code>
                        lets you set the playback rate and frames to skip.
                    </p>
                    <H5>Shortcuts</H5>
                    <UL className="help-list">
                        <li>
                            <Code className="help-list-entry">
                                CTRL + S
                            </Code>
                            Save project
                        </li>
                        <li>
                            <Code className="help-list-entry">
                                CTRL + Z
                            </Code>
                            Undo
                        </li>
                        <li>
                            <Code className="help-list-entry">
                                CTRL + Y
                            </Code>
                            Redo
                        </li>
                        <li>
                            <Code className="help-list-entry">
                                C
                            </Code>
                            Confirm annotations
                        </li>
                        <li>
                            <Code className="help-list-entry">
                                X
                            </Code>
                            Reject annotations
                        </li>
                        <li>
                            <Code className="help-list-entry">
                                A
                            </Code>
                            Set/unset anchor
                        </li>

                        <li>
                            <Code className="help-list-entry">
                                Space
                            </Code>
                            Play video
                        </li>
                        <li>
                            <Code className="help-list-entry">
                                <Icon
                                    className="help-icon"
                                    icon="arrow-left" />
                                Left arrow
                            </Code>
                            Previous frame
                        </li>
                        <li>
                            <Code className="help-list-entry">
                                <Icon
                                    className="help-icon"
                                    icon="arrow-right" />
                                Right arrow
                            </Code>
                            Next frame
                        </li>
                        <li>
                            <Code className="help-list-entry">
                                CTRL + <Icon icon="arrow-left" />
                            </Code>
                            Skip frames backwards
                        </li>
                        <li>
                            <Code className="help-list-entry">
                                CTRL + <Icon icon="arrow-right" />
                            </Code>
                            Skip frames forward
                        </li>
                        <li>
                            <Code className="help-list-entry">
                                [ Left bracket
                            </Code>
                            Previous keyframe
                        </li>
                        <li>
                            <Code className="help-list-entry">
                                ] Right bracket
                            </Code>
                            Next keyframe
                        </li>
                        <li>
                            <Code className="help-list-entry">
                                ' Apostrophe
                            </Code>
                            Next reviewed frame
                        </li>
                        <li>
                            <Code className="help-list-entry">
                                ; Semicolon
                            </Code>
                            Previous reviewed frame
                        </li>
                        <li>
                            <Code className="help-list-entry">
                                , Comma
                            </Code>
                            Previous anchor (selected track)
                        </li>
                        <li>
                            <Code className="help-list-entry">
                                . Dot
                            </Code>
                            Next anchor (selected track)
                        </li>
                    </UL>

                </div>
            </div>
        </Drawer>
    )
}