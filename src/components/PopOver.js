import React, { useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';
export default function MyPopover({ data }) {
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement);
  return (
    <Popover className='relative'>
      <Popover.Button ref={setReferenceElement}>Solutions</Popover.Button>
      <Transition
        enter='transition duration-100 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-75 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'>
        <Popover.Panel
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}>
          <div className='grid grid-cols-2'>
            <a href='/analytics'>Analytics</a>
            <a href='/engagement'>Engagement</a>
            <a href='/security'>Security</a>
            <a href='/integrations'>Integrations</a>
          </div>

          <img src='/solutions.jpg' alt='' />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
