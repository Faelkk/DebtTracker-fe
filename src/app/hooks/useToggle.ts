import { useCallback, useState } from "react";

export default function useToggle() {
    const [isToggled, setIsToggled] = useState(false);

    const toggle = useCallback(() => setIsToggled(prev => !prev), []);

    return {isToggled, toggle,setIsToggled};
}