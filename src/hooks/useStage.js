import { useState } from "react";

import { createStage } from "../gameHelpers";

export const useStage = () => {
    const [stage, setStage] = useState(createStage());

    // this hook will allow us to both read and alter the stage state
    // so return both the getter and the setter
    return [stage, setStage];
}