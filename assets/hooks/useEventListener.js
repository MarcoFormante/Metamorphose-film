import React from 'react'

export const useEventListener = (eventName, element,callback,dependency = [],isRef) => {
   React.useEffect(()=>{

    if (!element) {
        return undefined
    }
    const el = isRef ? element.current : element
    el.addEventListener(eventName,callback)
   
    return () => el.removeEventListener(eventName,callback)
   },[...dependency])
}

