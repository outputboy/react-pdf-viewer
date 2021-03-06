/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import React, { FC, ReactElement } from 'react';
import { Modal, Store, Toggle } from '@react-pdf-viewer/core';

import PropertiesModal from './PropertiesModal';
import ShowPropertiesButton from './ShowPropertiesButton';
import StoreProps from './StoreProps';
import useDocument from './useDocument';

export interface RenderShowPropertiesProps {
    onClick(): void;
}

type RenderShowProperties = (props: RenderShowPropertiesProps) => ReactElement;

export interface ShowPropertiesProps {
    children?: RenderShowProperties;
}

const ShowProperties: FC<{
    children?: RenderShowProperties,
    store: Store<StoreProps>,
}> = ({ children, store }) => {
    const { currentDoc } = useDocument(store);
    const fileName = store.get('fileName') || '';

    const defaultChildren = (props: RenderShowPropertiesProps) => (
        <ShowPropertiesButton {...props} />
    );
    const render = children || defaultChildren;

    return (
        currentDoc
            ? (
                <Modal
                    target={
                        (toggle: Toggle) => render({
                            onClick: toggle,
                        })
                    }
                    content={
                        (toggle: Toggle) => <PropertiesModal doc={currentDoc} fileName={fileName} onToggle={toggle} />
                    }
                    closeOnClickOutside={true}
                    closeOnEscape={true}
                />
            )
            : <></>
    );
};

export default ShowProperties;
