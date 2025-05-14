import React from "react"
import {screen, render} from "@testing-library/react"

import {DdaiChatBox} from "./ddai-chat-box";

describe("DdaiChatBox", () => {
    it("should render the component", () => {
        render(<DdaiChatBox contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
