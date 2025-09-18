import React from 'react';
import SwitchLazy from '../pages/components/switch.lazy';

export default function TestComponent() {
    return (
        <>
            <SwitchLazy onChange={() => Promise.resolve()} />
        </>
    );
}
